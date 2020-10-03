import React from 'react';
import {Card, Container, Row, Col,Form,Button} from 'react-bootstrap';


class ViewPlayer extends React.Component{
    

    constructor(props) {
        super(props);

        this.state = {
            player_name: '',
            player_nickname: '',
            player_lastname: '',
            player_description: '',
            player_age: '',
            player_steamid: '',
            player_countrycode: '',
            player_teamid: null,
            teams: []
        }
    }

    componentDidMount() {

        fetch(`/api/view/player/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(
          (result) => {
              
              if(result && result.status_code === 200){

                  this.setState({
                      player_name: result.player_info.player_name,
                      player_nickname: result.player_info.player_nickname,
                      player_lastname: result.player_info.player_lastname,
                      player_description: result.player_info.player_description,
                      player_age: result.player_info.player_age,
                      player_steamid: result.player_info.player_steamid,
                      player_countrycode: result.player_info.player_countrycode,
                      player_teamid: result.player_info.player_teamid
                  })

              }

              if(result && result.status_code === 404){
                  this.setState({
                      isLoaded: true,
                      error: result.message
                  });
              }
          
          
            
          },
          (error) => {
          console.log(error)
            this.setState({
              isLoaded: true,
              error: error.toString()
            });
          }
        )
        
        fetch(`/api/teams`)
          .then(res => res.json())
          .then(
            (result) => {
                
                if(result && result.status_code === 200){

                    this.setState({
                        teams: result.teams
                    })

                    console.log(result)

                }

                if(result && result.status_code === 404){
                    this.setState({
                        isLoaded: true,
                        error: result.message
                    });
                }
            
            
              
            },
            (error) => {
            console.log(error)
              this.setState({
                isLoaded: true,
                error: error.toString()
              });
            }
          )
      }

    renderError = () =>{
        return this.state.error ? <h4>Error has been spotted: {this.state.error} </h4> : null;
    }

    handlePlayerNameInput = (event) =>{
        this.setState({player_name: event.target.value});
    }

    handlePlayerNicknameInput = (event) =>{
        this.setState({player_nickname: event.target.value});
    }

    handlePlayerLastnameInput = (event) =>{
        this.setState({player_lastname: event.target.value});
    }

    handlePlayerDescriptionInput = (event) =>{
        this.setState({player_description: event.target.value});
    }

    handlePlayerAgeInput = (event) =>{
        this.setState({player_age: event.target.value});
    }

    handlePlayerSteamIDInput = (event) =>{
        this.setState({player_steamid: event.target.value});
    }

    handlePlayerCountrycodeInput = (event) =>{
        this.setState({player_countrycode: event.target.value});
    }

    handlePlayerTeamInput = (event) =>{
        console.log(event.target.value)
        this.setState({player_teamid: event.target.value});
    }


    submit = (event) =>{

        event.preventDefault();

        const body = {
            'id': this.props.match.params.id,
            'player_name': this.state.player_name,
            'player_nickname': this.state.player_nickname,
            'player_lastname': this.state.player_lastname,
            'player_description': this.state.player_description,
            'player_age': this.state.player_age,
            'player_steamid': this.state.player_steamid,
            'player_countrycode': this.state.player_countrycode,
            'player_teamid': this.state.player_teamid
        }

        fetch('/api/editplayer', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then(res => res.json())
                .then((result) => {

                    console.log(result) 
                    
                    if(result.status_code === 200){
                        return window.location = `/players/view/${result.id}`
                    }

                    if(result.status_code === 500){
                       return this.setState({error: result.message, isLoaded: true})
                    }
                    
                    
                },
                (error) => {
                    return this.setState({error, isLoaded: true});
                }
                );

      

    }

    render(){    
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card className="card bg-light p-3 push-top">
                                <Card.Body>
                                    <h2>
                                        View player
                                    </h2>

                                    {this.renderError()}

                                    <Form className="push-top" onSubmit={event => this.submit(event)}>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Player name:</Form.Label>
                                                <Form.Control type="text" value={this.state.player_name} placeholder="First name" onChange={event => this.handlePlayerNameInput(event)} />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Nickname:</Form.Label>
                                                <Form.Control type="text" value={this.state.player_nickname} placeholder="Nickname ex. kalle" onChange={event => this.handlePlayerNicknameInput(event)} />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Last name:</Form.Label>
                                                <Form.Control type="text" value={this.state.player_lastname} placeholder="" onChange={event => this.handlePlayerLastnameInput(event)} />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Player description</Form.Label>
                                                <Form.Control placeholder="Say something" value={this.state.player_description} onChange={event => this.handlePlayerDescriptionInput(event)}/>
                                                <Form.Text muted>
                                                    Write something specific about this player.
                                                </Form.Text>                                        
                                            </Form.Group>

                                            
                                            <Form.Group as={Col}>
                                                <Form.Label>Player age</Form.Label>
                                                <Form.Control value={this.state.player_age} onChange={event => this.handlePlayerAgeInput(event)}/>
                                                <Form.Text muted>
                                                    How old is this player?
                                                </Form.Text>                                        
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Steam ID</Form.Label>
                                                <Form.Control value={this.state.player_steamid} onChange={event => this.handlePlayerSteamIDInput(event)}/>
                                                <Form.Text muted>
                                                    Use STEAM 64 ID
                                                </Form.Text>                                        
                                            </Form.Group>
                                        </Form.Row>

                         
                                        <Form.Group>
                                            <Form.Label>Country code</Form.Label>
                                            <Form.Control value={this.state.player_countrycode} placeholder="ex ba, rs, en, fr " onChange={event => this.handlePlayerCountrycodeInput(event)}/>
                                            <Form.Text muted>
                                                System is using ISO 3166 international standard country codes. See supported 
                                                <a href="https://www.iban.com/country-codes"> here</a>.
                                            </Form.Text>                                        
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Choose players team</Form.Label>
                                            <Form.Control
                                                as="select"
                                                custom
                                                onChange={event => this.handlePlayerTeamInput(event)}
                                            >
   
                                            {
                                                // eslint-disable-next-line
                                                this.state.teams && this.state.teams.map(team =>{
                                                    if(team.id === this.state.player_teamid){
                                                        return <option key={team.id} value={team.id}>{team.team_name}</option>
                                                    } 
                                                })
                                            }

                                            {
                                                // eslint-disable-next-line
                                                this.state.teams && this.state.teams.map(team =>{
                                                    if(team.id !== this.state.player_teamid){
                                                        return <option key={team.id} value={team.id}>{team.team_name}</option>
                                                    } 
                                                })
                                            }

                                            </Form.Control>
                                        </Form.Group>


                                        <Button variant="primary" type="submit">
                                            Save
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>                        
                        </Col>
                    </Row>     
                </Container>    
            </div>       
        );
    }
}


export default ViewPlayer;
