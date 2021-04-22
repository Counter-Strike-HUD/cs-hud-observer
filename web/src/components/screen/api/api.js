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
    }
}

