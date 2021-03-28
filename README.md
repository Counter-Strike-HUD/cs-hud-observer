# CS Hud Observer :video_camera:

CS Hud Observer is stream overlay for CS 1.6 
Basic idea behind this stream overlay is to show currently non existing game status to stream watcher.


## Idea

Using game server stream events over socket (TCP/ UDP) to local streamer who will run this software which will display data to stream watchers.

## Unluko things

CS 1.6 game server doesnt have native event stream like CSGO, so everything needs to be recreated in AmxModX.

## Work (CSS idea)

![screen](https://i.imgur.com/OSqQjtq.png)

## REST API

Info provided below will be rewritten in future.

| ENDPOINT               | METHOD | RETURN                 | NOTE                              |
|------------------------|--------|------------------------|-----------------------------------|
| `/api/matches/info`    | GET    | Matches list           |                                   |
| `/api/addmatch`        | POST   |                        | Add a new match to the database   |
| `/api/view/match/:id`  | GET    | Specific match info    | :id -> match id                   |
| `/api/editmatch`       | POST   |                        | ID of a match is necessary        |
| `/api/addplayer`       | POST   |                        | Adds a new player to the database |
| `/api/view/player/:id` | GET    | Specific player info   | :id -> player id                  |
| `/api/editplayer`      | POST   |                        | ID of a player is necessary       |
| `/api/players`         | GET    | Gets all players list  |                                   |
| `/api/teams`           | GET    | Teams list             |                                   |
| `/api/addclan`         | POST   |                        | Add a new team to the database    |
| `/api/view/team/:id`   | GET    | Get specific team info |                                   |
| `/api/editclan`        | POST   |                        | ID of a match is necessary        |



## Contributing
Special thanks to: 

* [Damper](https://github.com/Bog1sh4) for creating amxx plugins
* [guxi](https://github.com/4nte) for React help
* [Fastcup](https://cs.fastcup.net) for informations


## License
[MIT](https://choosealicense.com/licenses/mit/)