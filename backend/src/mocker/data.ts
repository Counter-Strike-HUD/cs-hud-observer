/*
    Event list, use supported event names and increment time 
    All other data can be suplied in "eventname" object property

*/

export default [

    {
        "round_start": {
            "time": 0
        },
    },  

    {
        "bomb_drop":{
            "steamid": 12121212,
            "time": 5000
        },
    },

    {
        "bomb_pickup": {
            "steamid": 12121212,
            "time": 5200
        },
    },

    {
        "freeztime_over": {
            "time": 15000
        },
    },

    {
        "kill":{
            "victim":{
                "name": "kalle",
                "side": "ct"
            },
            "killer": {
                "name": "kauk",
                "side": "tt"
            },
            "time": 18000,
        },
    },
    {
        "kill":{
            "victim":{
                "name": "kalle",
                "side": "ct"
            },
            "killer": {
                "name": "LEG1JADZEKO11",
                "side": "tt"
            },
            "time": 21000,
        }
    },
 
]
