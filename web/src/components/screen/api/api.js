const urlParams = new URLSearchParams(window.location.search);

const portBackend = urlParams.get('port');
const matchId = urlParams.get('match');
const isLocal = urlParams.get('local');

if(!matchId){console.error('match id not found')}

const address = isLocal ? `http://localhost:${portBackend}` : 'http://localhost:3001'

const apiFetch = async (url) =>{

    const options = {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    }

   
    return fetch(`${address}${url}`, options)
    .then(async res => {
        return res.json().catch(_e => res && res.status < 300)
    });
    
}


module.exports = {
    matches:{
        getMatch: async (id) => {return apiFetch(`/api/view/match/${id}`)}
    },
    teams:{
        getTeam: async (id) => {return apiFetch(`/api/view/team/${id}`)}
    },
    players:{
        getPlayer: async (id) => {return apiFetch(`/api/view/player/${id}`)}
    },
    resources:{
        resource: async (id) =>{

            switch (id) {

                case '1':
                    return 'p250.png'; // p228 pistol
        
                case '3':
                    return 'ssg08.png'; // scout 

                case '4':
                    return 'explosive_grenade.png'; // he grenade
    
                case '5':
                    return 'xm1014.png'; // auto shotgun

                case '6':
                    return 'c4.png'; // c4

                case '7':
                    return 'mac10.png'; // mac10

                case '8':
                    return 'aug.png'; // aug
 
                case '9':
                    return 'smoke_grenade.png'; // smoke bomb

                case '10':
                    return 'elite.png'; // dual beretas

                case '11':
                    return 'fiveseven.png'; // fiveseven pistol

                case '12':
                    return 'ump45.png'; // ump45

                case '13':
                    return 'sg553.png'; // sg550 rifle

                case '14':
                    return 'galil.png'; // galil

                case '15':
                    return 'famas.png'; // famas

                case '16':
                    return 'usp_silencer.png'; // usp

                case '17':
                    return 'glock.png'; // glock

                case '18':
                    return 'awp.png'; // awp    

                case '19':
                    return 'mp5.png'; // mp5 hekler   

                case '20':
                    return 'm249.png'; // m249 machinegun

                case '21':
                    return 'sawedoff.png'; // shotgun 

                case '22':
                    return 'm4a1.png'; // emka

                case '23':
                    return 'mp7.png'; // tmp submachine

                case '24':
                    return 'g3sg1.png'; // tt autosniper

                case '25':
                    return 'flash_grenade.png'; // flash

                case '26':
                    return 'deagle.png'; // deagle

                case '27':
                    return 'sg556.png'; // ct sg

                case '28':
                    return 'ak47.png'; // ak

                case '29':
                    return 'knife_css.png'; // knife

                case '30':
                    return 'p90.png'; // p90

                default:
                    return '';
            }
        }
    }
}

