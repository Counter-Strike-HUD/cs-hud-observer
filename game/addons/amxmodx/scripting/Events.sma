#include < amxmodx >
#include < sockets >
#include < json >
#include < cstrike >
#include < engine >
#include < hamsandwich >
#include < csx >
#include < fakemeta_util >

#define CONFIG_FILE	"addons/amxmodx/configs/HudObserverConfig.ini"

const m_flFlashedUntil = 514;
const m_flFlashedAt = 515;
const m_flFlashHoldTime = 516;
const m_flFlashDuration = 517;
const m_iFlashAlpha = 518; 

#define IsUserFlashed(%0)    ( get_pdata_float( %0, m_flFlashedUntil ) > get_gametime( ) )

const PRIMARY_WEAPONS_BIT_SUM = ( 1 << CSW_SCOUT ) | ( 1 << CSW_XM1014 ) | ( 1 << CSW_MAC10 ) | ( 1 << CSW_AUG ) | ( 1 << CSW_UMP45 ) | (  1 << CSW_SG550 ) | ( 1 << CSW_GALIL ) | ( 1 << CSW_FAMAS ) | ( 1 << CSW_AWP ) | ( 1 << CSW_MP5NAVY ) | ( 1 << CSW_M249 ) | ( 1 << CSW_M3 ) | ( 1 << CSW_M4A1 ) | ( 1 << CSW_TMP ) | ( 1 << CSW_G3SG1 ) | ( 1 << CSW_SG552 ) | ( 1 << CSW_AK47 ) | ( 1 << CSW_P90 )
const SECONDARY_WEAPONS_BIT_SUM = ( 1 << CSW_P228 ) | ( 1 << CSW_ELITE ) | ( 1 << CSW_FIVESEVEN ) | ( 1 << CSW_USP ) | ( 1 << CSW_GLOCK18 ) | ( 1 << CSW_DEAGLE )

new stock g_iSocket;
new szHost[ 16 ], iPort;

new const WEAPONENTNAMES[ ][ ] = {
	"weapon_p228", "weapon_scout", "weapon_xm1014", "weapon_mac10",
	"weapon_aug", "weapon_elite", "weapon_fiveseven", "weapon_ump45", "weapon_sg550",
	"weapon_galil", "weapon_famas", "weapon_usp", "weapon_glock18", "weapon_awp", "weapon_mp5navy", "weapon_m249",
	"weapon_m3", "weapon_m4a1", "weapon_tmp", "weapon_g3sg1", "weapon_deagle", "weapon_sg552",
	"weapon_ak47", "weapon_p90", "weapon_shield"
};

new szSteam[ 33 ][ 32 ];

new const g_iMaxAmmo[ 31 ] = {
	0, 52, 0, 90, 1, 32, 1, 100, 90,
	1, 120, 100, 100, 90, 90, 90,
	100, 120, 30, 120, 200, 32, 90,
	120, 90, 2, 35, 90, 90, 0, 100
};

new bool:g_bPlanting, bool:g_bDefusing;

enum BombSites {
	BOMBSITE_A,
	BOMBSITE_B
}

new g_iBombSiteEntity[ BombSites ];

new g_iTeamScore[ 2 ] = 0;

new const szNadeSounds[ ][ ] = {
	"weapons/flashbang-1.wav", "weapons/flashbang-2.wav",
	"weapons/debris1.wav", "weapons/debris2.wav", "weapons/debris3.wav",
	"weapons/sg_explode.wav"
};

new const szNadeTypes[ ][ ] = {
	"weapon_flashbang", "weapon_flashbang",
	"weapon_hegrenade", "weapon_hegrenade", "weapon_hegrenade",
	"weapon_smokegrenade"
};

new iNadeInfo[ 256 ];

public plugin_init( ) {
	register_plugin( "Events Test", "1.0.4b", "Damper" );
	
	// Open socket
	new iError;
	g_iSocket = socket_open( szHost, iPort, SOCKET_TCP, iError, SOCK_NON_BLOCKING );
	
	if( iError > 0 && iError <= 3 || g_iSocket < 1 ) {
		switch( iError ) {
			case 1: server_print( "Couldn't create a socket" );
			case 2: server_print( "Server unknown" );
			case 3: server_print( "Error while connecting" );
			default: server_print( "Couldn't create a socket" );
		}
	}
	
	// Bomb Site
	new szMap[ 11 ], BombSites:bsBombSiteA, BombSites:bsBombSiteB;
	get_mapname( szMap , charsmax( szMap ) );
	
	if ( equal( szMap, "de_chateau" ) || equal( szMap, "de_dust2" ) || equal( szMap, "de_train" ) ) {
		bsBombSiteA = BOMBSITE_B;
		bsBombSiteB = BOMBSITE_A;
	} else {
		bsBombSiteA = BOMBSITE_A;
		bsBombSiteB = BOMBSITE_B;
	}
	
	g_iBombSiteEntity[ bsBombSiteA ] = find_ent_by_class( -1, "func_bomb_target" );
	g_iBombSiteEntity[ bsBombSiteB ] = find_ent_by_class( g_iBombSiteEntity[ bsBombSiteA ], "func_bomb_target" );
	
	// Register Ham Module Forwards
	RegisterHam( Ham_Killed, "player", "fw_HamKilled" );
	
	for( new i = 1; i < sizeof WEAPONENTNAMES; i++ ) {
		if( WEAPONENTNAMES[ i ][ 0 ] ) {
			RegisterHam( Ham_CS_Item_CanDrop, WEAPONENTNAMES[ i ], "fw_OnItemDropPre", 0 );
		}
	}
	
	// Register client commands
	register_clcmd( "say", "fw_Say" );
	
	// Register forwards
	register_forward( FM_EmitSound, "fw_EmitSound" );
	
	// Register events
	register_event( "BarTime", "fw_BombPlantingStoped", "b", "1=0" );
	register_event( "CurWeapon", "fw_CurWeapon", "be", "1=1" );
	register_event( "Damage", "fw_Damage", "b", "2!0", "3=0", "4!0" );
	register_event( "WeapPickup", "fw_WeaponPickedUp", "be" );
	register_event( "Money", "fw_Money", "b" );
	
	// Register messages
	register_message( get_user_msgid( "TeamScore" ), "fw_ScoreUpdate" );
	register_message( get_user_msgid( "TextMsg" ), "fw_RoundEnd" );
	
	// Bomb dropped
	register_logevent( "fw_BombDropped", 3, "2=Dropped_The_Bomb" );
	
	// Bomb pick up
	register_logevent( "fw_BombPickUp", 3, "2=Spawned_With_The_Bomb" );
	register_logevent( "fw_BombPickUp", 3, "2=Got_The_Bomb" );
}

// Check configuration
public plugin_precache( ) {
	if( !file_exists( CONFIG_FILE ) ) {
		write_file( CONFIG_FILE, "; Here you can configure Hud Observer" );
		write_file( CONFIG_FILE, ";" );
		write_file( CONFIG_FILE, "SOCKET_IP = 127.0.0.1" );
		write_file( CONFIG_FILE, "SOCKET_PORT = 31520" );
	}
	
	new iFile = fopen( CONFIG_FILE, "rt" );
	new szData[ 128 ], szLeft[ 16 ], szRight[ 16 ];
	
	while( iFile && !feof( iFile ) ) {
		fgets( iFile, szData, charsmax( szData ) );
		replace( szData, charsmax( szData ), "^n", "" );
		
		if( szData[ 0 ] == EOS || ( szData[ 0 ] == ';' ) || ( szData[ 0 ] == '/' && szData[ 1 ] == '/' ) )
			continue;
		
		trim( szData );
		
		strtok( szData, szLeft, charsmax( szLeft ), szRight, charsmax( szRight ), '=' );
		
		trim( szLeft );
		trim( szRight );
		
		if( equal( szLeft, "SOCKET_IP" ) ) {
			copy( szHost, charsmax( szHost ), szRight );
			continue;
		} else if( equal( szLeft, "SOCKET_PORT" ) ) {
			iPort = str_to_num( szRight );
			continue;
		}
	}
	
	fclose( iFile );
}

// Close socket on plugin end
public plugin_end( ) if( g_iSocket ) socket_close( g_iSocket );

// Client authorized, get user steam id
public client_authorized( iPlayer ) {
	get_user_authid( iPlayer, szSteam[ iPlayer ], charsmax( szSteam[ ] ) );
}

// Buy forward
public CS_OnBuy( iPlayer, iItem ) {
	static iPrice;
	iPrice = GetItemPrice( iPlayer, iItem );
	
	if( cs_get_user_money( iPlayer ) < iPrice ) return;
	
	new szName[ 64 ], szAltName[ 64 ];
	cs_get_item_alias( iItem, szName, charsmax( szName ), szAltName, charsmax( szAltName ) );
	
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "buy_equipment" );
	json_object_set_number( Object, "weapon_id", iItem );
	json_object_set_string( Object, "weapon_buyer", szSteam[ iPlayer ] );
	json_object_set_number( Object, "weapon_price", iPrice );
	json_object_set_string( Object, "weapon_name", szName );
	json_object_set_string( Object, "weapon_altname", szAltName );
	
	SendToSocket( Object );
}

// Killed ham
public fw_HamKilled( iVictim, iAttacker, shouldgib ) {
	if( get_pdata_int( iVictim, 76 ) & DMG_FALL ) {
		new JSON:Object = json_init_object( );
		
		json_object_set_string( Object, "event_name", "kill" );
		json_object_set_number( Object, "weapon_id", 0 );
		json_object_set_bool( Object, "headshot", false );
		json_object_set_string( Object, "killer_id", szSteam[ iAttacker ] );
		json_object_set_bool( Object, "killer_flashed", false );
		json_object_set_string( Object, "victim_id", szSteam[ iVictim ] );
		json_object_set_bool( Object, "victim_flashed", false );
		json_object_set_bool( Object, "suicide", true );
		json_object_set_bool( Object, "wallbang", false );
		json_object_set_string( Object, "suicide_reason", "fall" );
		
		SendToSocket( Object );
	}
}

// Death forward
public client_death( iAttacker, iVictim, iWeapon, iHitPlace ) {
	new szSuicideReason[ 18 ];
	
	if( iAttacker == iVictim ) {
		switch( iWeapon ) {
			case CSW_C4: formatex( szSuicideReason, charsmax( szSuicideReason ), "weapon_c4" );
			case CSW_HEGRENADE: formatex( szSuicideReason, charsmax( szSuicideReason ), "weapon_hegrenade" );
			default: formatex( szSuicideReason, charsmax( szSuicideReason ), "kill" );
		}
	}
	
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "kill" );
	json_object_set_number( Object, "weapon_id", iWeapon );
	json_object_set_bool( Object, "headshot", ( iHitPlace == HIT_HEAD ) ? true : false );
	json_object_set_string( Object, "killer_id", szSteam[ iAttacker ] );
	json_object_set_bool( Object, "killer_flashed", IsUserFlashed( iAttacker ) ? true : false );
	json_object_set_string( Object, "victim_id", szSteam[ iVictim ] );
	json_object_set_bool( Object, "victim_flashed", IsUserFlashed( iVictim ) ? true : false );
	json_object_set_bool( Object, "suicide", ( iAttacker == iVictim ) ? true : false );
	json_object_set_bool( Object, "wallbang", !fm_is_ent_visible( iAttacker, iVictim ) );
	json_object_set_string( Object, "suicide_reason", szSuicideReason );
	
	SendToSocket( Object );
}

// Say command
public fw_Say( iPlayer ) {
	if( !is_user_connected( iPlayer ) ) return PLUGIN_CONTINUE;
	
	new szSaid[ 191 ], JSON:Object = json_init_object( );
	
	read_args( szSaid, charsmax( szSaid ) );
	remove_quotes( szSaid );
	
	json_object_set_string( Object, "event_name", "user_say" );
	json_object_set_string( Object, "message_invoker", szSteam[ iPlayer ] );
	json_object_set_string( Object, "message", szSaid );
	
	SendToSocket( Object );
	
	json_free( Object );
	
	return PLUGIN_CONTINUE;
}

// Bomb planting forward
public bomb_planting( iPlayer ) {
	g_bPlanting = true;
	g_bDefusing = false;
	
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "c4_planting" );
	json_object_set_string( Object, "plant_invoker_id", szSteam[ iPlayer ] );
	json_object_set_string( Object, "bombsite", CheckPlayerSite( iPlayer ) == 1 ? "A" : "B" );
	
	SendToSocket( Object );
	
	json_free( Object );
	
	return PLUGIN_CONTINUE;
}

// Bomb planted forward
public bomb_planted( iPlayer ) {
	g_bPlanting = false;
	g_bDefusing = false;
	
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "c4_planted" );
	json_object_set_string( Object, "plant_invoker_id", szSteam[ iPlayer ] );
	json_object_set_string( Object, "bombsite", CheckPlayerSite( iPlayer ) == 1 ? "A" : "B" );
	
	SendToSocket( Object );
	
	json_free( Object );
	
	return PLUGIN_CONTINUE;
}

// Bomb defusing forward
public bomb_defusing( iPlayer ) {
	g_bPlanting = false;
	g_bDefusing = true;
	
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "c4_defusing" );
	json_object_set_string( Object, "defuse_invoker_id", szSteam[ iPlayer ] );
	
	SendToSocket( Object );
	
	json_free( Object );
	
	return PLUGIN_CONTINUE;
}

// Bomb defused forward
public bomb_defused( iPlayer ) {
	g_bPlanting = false;
	g_bDefusing = false;
	
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "c4_defused" );
	json_object_set_string( Object, "defuse_invoker_id", szSteam[ iPlayer ] );
	
	SendToSocket( Object );
	
	json_free( Object );
	
	return PLUGIN_CONTINUE;
}

// Bomb planting and defusing stop forward
public fw_BombPlantingStoped( iPlayer ) {
	if( !is_user_alive( iPlayer ) )
		return;
	
	if( g_bPlanting ) {
		g_bDefusing = false;
		g_bPlanting = false;
		
		new JSON:Object = json_init_object( );
		
		json_object_set_string( Object, "event_name", "c4_planting_stopped" );
		json_object_set_string( Object, "plant_invoker_id", szSteam[ iPlayer ] );
		
		SendToSocket( Object );
		
		json_free( Object );
	}
	
	if( g_bDefusing ) {
		g_bDefusing = false;
		g_bPlanting = false;
		
		new JSON:Object = json_init_object( );
		
		json_object_set_string( Object, "event_name", "c4_defusing_stopped" );
		json_object_set_string( Object, "defuse_invoker_id", szSteam[ iPlayer ] );
		
		SendToSocket( Object );
		
		json_free( Object );
	}
}

// Bomb dropped forward
public fw_BombDropped( iPlayer ) {
	new iPlayer = get_loguser_index( );
	
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "c4_drop" );
	json_object_set_string( Object, "user_drop_id", szSteam[ iPlayer ] );
	
	SendToSocket( Object );
	
	json_free( Object );
}

// Bomb pick up forward
public fw_BombPickUp( iPlayer ) {
	new iPlayer = get_loguser_index( );
	
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "c4_pick" );
	json_object_set_string( Object, "user_pick_id", szSteam[ iPlayer ] );
	
	SendToSocket( Object );
	
	json_free( Object );
}

// Switch current weapon
public fw_CurWeapon( iPlayer ) {
	if( !is_user_alive( iPlayer ) ) return PLUGIN_CONTINUE
	
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "weapon_switched" );
	json_object_set_number( Object, "weapon_id", get_user_weapon( iPlayer ) );
	json_object_set_string( Object, "user_pick_id", szSteam[ iPlayer ] );
	
	SendToSocket( Object );
	
	return PLUGIN_CONTINUE;
}

// Switch current weapon
public fw_Damage( iVictim ) {
	if( !is_user_alive( iVictim ) ) return PLUGIN_CONTINUE;
	
	new iAttacker = get_user_attacker( iVictim );
	new iDamage = read_data( 2 );
	
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "damage" );
	json_object_set_number( Object, "weapon_id", get_user_weapon( iAttacker ) );
	json_object_set_string( Object, "attacker_id", szSteam[ iAttacker ] );
	json_object_set_number( Object, "health_reduced", iDamage );
	json_object_set_number( Object, "health", get_user_health( iVictim ) );
	json_object_set_string( Object, "victim_id", szSteam[ iVictim ] );
	
	SendToSocket( Object );
	
	return PLUGIN_CONTINUE;
}

// Pickup weapon
public fw_WeaponPickedUp( iPlayer ) {
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "pickup_item" );
	json_object_set_string( Object, "user_id", szSteam[ iPlayer ] );
	json_object_set_number( Object, "item_id", read_data( 1 ) );
	
	SendToSocket( Object );
	
	return PLUGIN_CONTINUE;
}

// Drop weapon
public fw_OnItemDropPre( iEnt ) {
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "drop_item" );
	json_object_set_string( Object, "user_id", szSteam[ fm_cs_get_weapon_ent_owner( iEnt ) ] );
	json_object_set_number( Object, "item_id", cs_get_weapon_id( iEnt ) );
	
	SendToSocket( Object );
}

// Money update
public fw_Money( iPlayer ) {
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "money_change" );
	json_object_set_string( Object, "user_id", szSteam[ iPlayer ] );
	json_object_set_number( Object, "current_money", cs_get_user_money( iPlayer ) );
	
	SendToSocket( Object );
}

// Score update
public fw_ScoreUpdate( ) {
	new szTeam[ 2 ];
	get_msg_arg_string( 1, szTeam, charsmax( szTeam ) );
	g_iTeamScore[ ( szTeam[ 0 ] == 'C' ) ? 0 : 1 ] = get_msg_arg_int( 2 );
}

// Round end
public fw_RoundEnd( iMessageId, iMessageDestination, iMessageEntity ) {
	new szMessage[ 36 ];
	get_msg_arg_string( 2, szMessage, charsmax( szMessage ) );
	
	if( equal( szMessage, "#Terrorists_Win" ) ) {
		RoundWon( 1 );
	} else if( equal( szMessage, "#CTs_Win" ) || equal( szMessage, "#Target_Saved" ) ) {
		RoundWon( 2 );
	}
	
	return PLUGIN_CONTINUE;
}

// Round won
public RoundWon( iTeam ) {
	new JSON:Object = json_init_object( );
	
	json_object_set_string( Object, "event_name", "round_end" );
	json_object_set_string( Object, "side_win", iTeam == 1 ? "TT" : "CT" );
	json_object_set_number( Object, "tt_rounds", g_iTeamScore[ 1 ] );
	json_object_set_number( Object, "ct_rounds", g_iTeamScore[ 0 ] );
	
	SendToSocket( Object );
}

// Grenade throw
public grenade_throw( iPlayer, gid, wid ) {
	new szName[ 64 ];
	get_weaponname( wid, szName, charsmax( szName ) );
	
	new JSON:Object = json_init_object( );
	
	iNadeInfo[ gid ] = iPlayer;
	
	json_object_set_string( Object, "event_name", "nade_throw" );
	json_object_set_string( Object, "invoker_id", szSteam[ iPlayer ] );
	json_object_set_string( Object, "nade_type", szName );
	
	SendToSocket( Object );
}

// Grenade land
public fw_EmitSound( iEnt, iChannel, const szSample[], Float:fVol, Float:fAttn, iFlags, iPitch ) {
	for( new i = 0; i < sizeof szNadeSounds; i++ ) {
		if( equal( szSample, szNadeSounds[ i ] ) ) {
			new Float:vOrigin[ 3 ];
			entity_get_vector( iEnt, EV_VEC_origin, vOrigin );
			
			new JSON:Object = json_init_object( );
			
			json_object_set_string( Object, "event_name", "nade_land" );
			json_object_set_string( Object, "invoker_id", szSteam[ iNadeInfo[ iEnt ] ] );
			json_object_set_string( Object, "nade_type", szNadeTypes[ i ] );
			json_object_set_real( Object, "landing_x", vOrigin[ 0 ] );
			json_object_set_real( Object, "landing_y", vOrigin[ 1 ] );
			json_object_set_real( Object, "landing_z", vOrigin[ 2 ] );
			
			SendToSocket( Object );
			
			return PLUGIN_CONTINUE;
		}
	}
	
	return PLUGIN_CONTINUE;
}

// Send info to Game Socket
stock SendToSocket( JSON:Object ) {
	if( !g_iSocket ) {
		server_print( "Socket not created!" );
		return;
	}
	
	static szBuffer[ 1024 ];
	
	json_serial_to_string( Object, szBuffer, charsmax( szBuffer ), true );
	
	socket_send( g_iSocket, szBuffer, charsmax( szBuffer ) );
}

// Get item price
stock GetItemPrice( iPlayer, iItem ) {
	if( !cs_is_valid_itemid( iItem ) ) return 0;
	
	if( cs_is_valid_itemid( iItem, true ) ) return cs_get_weapon_info( iItem, CS_WEAPONINFO_COST );
	
	switch( iItem ) {
		case CSI_VEST:		return 650;	// CS_KEVLAR_PRICE
		case CSI_VESTHELM:	return 1000;	// CS_KEVLAR_PRICE + CS_HELMET_PRICE
		case CSI_DEFUSER:	return 200;	// CS_DEFUSEKIT_PRICE
		case CSI_NVGS:		return 1250;	// CS_NVG_PRICE
		case CSI_SHIELD:	return 2200;	// CS_SHIELDGUN_PRICE
		case CSI_PRIAMMO: {
			static iWeap;
			iWeap = WeapType( iPlayer, 1 );
			
			if( iWeap && cs_get_user_bpammo( iPlayer, iWeap ) != g_iMaxAmmo[ iWeap ] ) return cs_get_weapon_info( iWeap, CS_WEAPONINFO_CLIP_COST );
		}
		case CSI_SECAMMO: {
			static iWeap;
			iWeap = WeapType( iPlayer, 2 );
			
			if( iWeap && cs_get_user_bpammo( iPlayer, iWeap ) != g_iMaxAmmo[ iWeap ] ) return cs_get_weapon_info( iWeap, CS_WEAPONINFO_CLIP_COST );
		}
	}
	
	return 9999999999;
}

// Credits for SayWhat?!
stock WeapType( iPlayer, iWeap ) {
	new iWeapons = pev( iPlayer, pev_weapons );
	
	for( new i = CSW_P228; i <= CSW_P90; i++ ) {
		if( ( iWeapons & ( 1 << i ) ) && ( iWeap == 1 ) && ( PRIMARY_WEAPONS_BIT_SUM & ( 1 << i ) ) ) return i;
		if( ( iWeapons & ( 1 << i ) ) && ( iWeap == 2 ) && ( SECONDARY_WEAPONS_BIT_SUM & ( 1 << i ) ) ) return i;
	}
	
	return 0;
}

// Credits for Exolent[jNr]
stock bool:is_user_flashed( iPlayer ) {
	static const m_flFlashedUntil = 514;
	return ( get_pdata_float( iPlayer, m_flFlashedUntil, 5 ) > get_gametime( ) );
}

stock CheckPlayerSite( const iPlayer ) {
	new Float:fOrigin[ 3 ];
	pev( iPlayer, pev_origin, fOrigin );
	
	new iEnt = -1;
	
	while( ( iEnt = find_ent_in_sphere( iEnt, fOrigin, 300.0 ) ) != 0 ) {
		if( iEnt == g_iBombSiteEntity[ BOMBSITE_A ] ) return 1;
		else if( iEnt == g_iBombSiteEntity[ BOMBSITE_B ] ) return 2;
	}
	
	return 0;
}

// Credits for The Specialist
stock get_loguser_index( ) {
	new szLogUser[ 80 ], szName[ 32 ];
	
	read_logargv( 0, szLogUser, charsmax( szLogUser ) );
	parse_loguser( szLogUser, szName, charsmax( szName ) );
	
	return get_user_index( szName );
}

stock fm_cs_get_weapon_ent_owner( iEnt ) {
	return ( pev_valid( iEnt ) != 2 ) ? 0 : get_pdata_cbase( iEnt, 41, 4 );
}
