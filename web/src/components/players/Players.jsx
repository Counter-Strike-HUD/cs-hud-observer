import React from 'react';
import {Card, Container, Row, Col, Button, Spinner} from 'react-bootstrap';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import {Link} from "react-router-dom";

class Players extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          isLoadedSteam: false,
          players: [],
          steam_info: [],
          avatar_list: [],
        };
        
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/players")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
            
                // Set state about players
                this.setState({
                    isLoaded: true,
                    players: result.players,
                    steamkey: result.steam_key,
                });

                // Init empty array
                let steamids = [];

                // Get all steamids and push to steam array list
                result.players.map(player =>{
                    return steamids.push(player.player_steamid)
                })

                console.log(steamids.join(','))

                // Call steam api to fetch info with joined steamds
                this.fetchInfo(steamids.join(','));

            },
            (error) => {
    
              this.setState({
                isLoaded: true,
                error: error.toString(),
              });
            }
        )
    }

    
    fetchInfo(steamids){
        
        fetch(`https://thingproxy.freeboard.io/fetch/https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.state.steamkey}&steamids=${steamids}`, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            },

        })
        .then(res =>
            res.json())
        .then(
            (result) => {
                console.log(result.response.players)
                this.setState({
                    isLoadedSteam: true,
                    steam_info: result.response.players
                })

                
          },
            (error) => {
                this.setState({
                error: error.toString()
                });
          }
      )

    }


    render(){     

        const { error, isLoaded, players, isLoadedSteam } = this.state;

        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card className="card bg-light p-3 push-top">
                                <Card.Body>

                                    <h2>
                                        Players on site
                                        
                                        <Link to='/players/add'>
                                            <Button  variant="success" className="float-right"> <BsFillPlusCircleFill /> Add player </Button>
                                        </Link>
                                     
                                    </h2>

                                    {error && isLoaded && 
                                        <h4>Error has been spotted: {error} </h4>
                                    }

                                    {
                                        !isLoaded && 
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    }
                                    
                                    { isLoadedSteam &&
                                        
                                        players.map((player, index) => (

                                            <Card className="push-top" key={player.id} style={{ width: '18rem', height: '500px', maxHeight: '500px', display: 'inline-block' }}>
                                                {
                                                    // eslint-disable-next-line
                                                    this.state.steam_info.map((steam_user, index) =>{
                                                        if(steam_user.steamid === player.player_steamid){
                                                            return <Card.Img key={index} variant="top" src={this.state.steam_info[index]?.avatarfull} />
                                                        }
                                                    })
                                                }
                                                <Card.Body>
                                                    <Card.Title>{player.player_nickname}</Card.Title>
                                                    <Card.Text className="truncate">
                                                        {player.player_name} "{player.player_nickname}" {player.player_lastname}
                                                    </Card.Text>

                                                    <a href={`/players/view/${player.id}`}>
                                                        <Button variant="primary">View player</Button>
                                                    </a>

                                                </Card.Body>
                                            </Card>
                                        ))
                                    }
                            
                                </Card.Body>
                            </Card>                        
                        </Col>
                    </Row>     
                </Container>    
            </div>       
        );
    }
}

export default Players;