#include < amxmodx >
#include < sockets >
#include < json >
#include < cstrike >
#include < fakemeta >
#include < hamsandwich >
#include < csx >

const PRIMARY_WEAPONS_BIT_SUM = (1 << CSW_SCOUT) | (1 << CSW_XM1014) | (1 << CSW_MAC10) | (1 << CSW_AUG) | (1 << CSW_UMP45) | (1 << CSW_SG550) | (1 << CSW_GALIL) | (1 << CSW_FAMAS) | (1 << CSW_AWP) | (1 << CSW_MP5NAVY) | (1 << CSW_M249) | (1 << CSW_M3) | (1 << CSW_M4A1) | (1 << CSW_TMP) | (1 << CSW_G3SG1) | (1 << CSW_SG552) | (1 << CSW_AK47) | (1 << CSW_P90)
const SECONDARY_WEAPONS_BIT_SUM = (1 << CSW_P228) | (1 << CSW_ELITE) | (1 << CSW_FIVESEVEN) | (1 << CSW_USP) | (1 << CSW_GLOCK18) | (1 << CSW_DEAGLE)

new const stock PORT		= 28000;
new const stock HOST[ ]		= "51.77.83.159";

new stock g_iSocket;

new szSteam[ 33 ][ 32 ];

new const g_iMaxAmmo[ 31 ] = {
	0, 52, 0, 90, 1, 32, 1, 100, 90,
	1, 120, 100, 100, 90, 90, 90,
	100, 120, 30, 120, 200, 32, 90,
	120, 90, 2, 35, 90, 90, 0, 100
};

new bool:g_bPlanting, bool:g_bDefusing;

public plugin_init( ) {
	register_plugin( "Events Test", "1.0.1b", "Damper" );
	
	// Open socket
	new iError;
	g_iSocket = socket_open( HOST, PORT, SOCKET_UDP, iError, SOCK_NON_BLOCKING );
	
	if( iError > 0 || g_iSocket < 1 ) {
		switch( iError ) {
			case SOCK_ERROR_CREATE_SOCKET: server_print( "Couldn't create a socket" );
			case SOCK_ERROR_SERVER_UNKNOWN: server_print( "Server unknown" );
			case SOCK_ERROR_WHILE_CONNECTING: server_print( "Error while connecting" );
			default: server_print( "Couldn't create a socket" );
		}
		return;
	}
	
	// Register Ham Module Forwards
	RegisterHam( Ham_Killed, "player", "fw_HamKilled" );
	
	// Register client commands
	register_clcmd( "say", "fw_Say" );
	register_clcmd( "say /team", "fw_ChangeTeam" );
	
	// Register events
	register_event( "BarTime", "fw_BombPlantingStoped", "b", "1=0" );
}

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
		json_object_set_string( Object, "victim_id", szSteam[ iVictim ] );
		json_object_set_bool( Object, "suicide", true );
		json_object_set_string( Object, "suicide_reason", "fall" );
		
		SendToSocket( Object );
	}
}

// Death forward
public client_death( iVictim, iAttacker, iWeapon, iHitPlace ) {
	new szSuicideReason[ 18 ];
	
	client_print( 0, print_chat, "iVictim %s | iAttacker %s", is_user_flashed( iVictim ) ? "true" : "false", is_user_flashed( iAttacker ) ? "true" : "false" );
	
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
	json_object_set_string( Object, "victim_id", szSteam[ iVictim ] );
	json_object_set_bool( Object, "suicide", ( iAttacker == iVictim ) ? true : false );
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
		
		json_object_set_string( Object, "event_name", "c4_planting_stoped" );
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

public fw_ChangeTeam( iPlayer ) cs_set_user_team( iPlayer, ( cs_get_user_team( iPlayer ) == CsTeams:CS_TEAM_CT ) ? CS_TEAM_T : CS_TEAM_CT );

stock SendToSocket( JSON:Object ) {
	static szBuffer[ 1024 ];
	
	json_serial_to_string( Object, szBuffer, charsmax( szBuffer ), true );
	
	socket_send( g_iSocket, szBuffer, charsmax( szBuffer ) );
}

stock GetItemPrice( iPlayer, iItem ) {
	if( !cs_is_valid_itemid( iItem ) ) return 0;
	
	if( cs_is_valid_itemid( iItem, true ) ) return cs_get_weapon_info( iItem, CS_WEAPONINFO_COST );
	
	switch( iItem ) {
		case CSI_VEST:		return 650;	//CS_KEVLAR_PRICE
		case CSI_VESTHELM:	return 1000;	//CS_KEVLAR_PRICE + CS_HELMET_PRICE
		case CSI_DEFUSER:	return 200;	//CS_DEFUSEKIT_PRICE
		case CSI_NVGS:		return 1250;	//CS_NVG_PRICE
		case CSI_SHIELD:	return 2200;	//CS_SHIELDGUN_PRICE
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
