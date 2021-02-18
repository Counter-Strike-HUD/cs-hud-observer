#include < amxmodx >

public plugin_init( ) {
	register_plugin( "Events Loger", "1.0", "Damper" );
}

public plugin_log( ) {
	static szMain[ 512 ], szDetail[ 512 ], szRegistered[ 512 ];
	static iArgsNum, n, m, szTemp[ 64 ];
	
	read_logdata( szMain, 511 );
	
	iArgsNum = read_logargc( );
	
	n = 0;
	m = formatex( szRegistered, 511, "register_logevent(^"function_name^", %d, ", iArgsNum );
	
	for( new i; i<iArgsNum; i++ ) {
		read_logargv( i, szTemp, 63 );
		n += formatex( szDetail[ n ], 511 - n, "^n%d=%s", i, szTemp );
		m += formatex( szRegistered[ m ], 511 - m, "^"%d=%s^", ", i, szTemp );
	}
	
	m += formatex( szRegistered[ m ], 511 - m, ")^n" );
	
	static szLog[ 1024 ];
	formatex( szLog, charsmax( szLog ), "%s%s^n%s^n", szMain, szDetail, szRegistered );
	write_file( "addons/amxmodx/logs/Events.txt", szLog );
}
