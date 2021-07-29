


export interface AppState{
    backend: DataType;
    frontend: DataType;
    game: GameType;
}

export interface DataType{
    connected: boolean;
    id: string;
}

export interface GameType{
    connected: boolean;
    authed: boolean;
}


/**
 * AppState
 * 
 * Handle all internal socket state
 */
export class AppState{
    
    constructor(){
        
        // State holders
        this.backend ={
            connected: false,
            id: ''
        }
        this.frontend = {
            connected: false,
            id: ''
        }

        this.game = {
            connected: false,
            authed: false,
        }
    }
}