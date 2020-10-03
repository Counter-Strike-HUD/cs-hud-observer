import React from 'react';
import {Card, Container, Row, Col, Form, Button} from 'react-bootstrap';


class PlayerAdd extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
            player_name: '',
            player_nickname: '',
            player_lastname: '',
            player_description: '',
            player_age: null,
            player_steamid: '',
            player_countrycode: '',
            player_teamid: null,
            teams: []
        }
    }

    componentDidMount() {
        fetch("/api/teams")
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({teams: result.teams})
            },
            (error) => {
    
    
            }
        )
    }

    renderError = () =>{
        return this.state.error ? <h4>Error has been spotted: {this.state.error.toString()} </h4> : null;
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
            'player_name': this.state.player_name,
            'player_nickname': this.state.player_nickname,
            'player_lastname': this.state.player_lastname,
            'player_description': this.state.player_description,
            'player_age': this.state.player_age,
            'player_steamid': this.state.player_steamid,
            'player_countrycode': this.state.player_countrycode,
            'player_teamid': this.state.player_teamid
        }

        fetch('/api/addplayer', {
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
                                        Add a new player
                                    </h2>

                                    {this.renderError()}

                                    <Form className="push-top" onSubmit={event => this.submit(event)}>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Player name:</Form.Label>
                                                <Form.Control type="text" placeholder="First name" onChange={event => this.handlePlayerNameInput(event)} />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Nickname:</Form.Label>
                                                <Form.Control type="text" placeholder="Nickname ex. kalle" onChange={event => this.handlePlayerNicknameInput(event)} />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Last name:</Form.Label>
                                                <Form.Control type="text" placeholder="" onChange={event => this.handlePlayerLastnameInput(event)} />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Player description</Form.Label>
                                                <Form.Control placeholder="Say something" onChange={event => this.handlePlayerDescriptionInput(event)}/>
                                                <Form.Text muted>
                                                    Write something specific about this player.
                                                </Form.Text>                                        
                                            </Form.Group>

                                            
                                            <Form.Group as={Col}>
                                                <Form.Label>Player age</Form.Label>
                                                <Form.Control onChange={event => this.handlePlayerAgeInput(event)}/>
                                                <Form.Text muted>
                                                    How old is this player?
                                                </Form.Text>                                        
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Steam ID</Form.Label>
                                                <Form.Control onChange={event => this.handlePlayerSteamIDInput(event)}/>
                                                <Form.Text muted>
                                                    Use STEAM 64 ID
                                                </Form.Text>                                        
                                            </Form.Group>
                                        </Form.Row>

                         
                                        <Form.Group>
                                            <Form.Label>Country code</Form.Label>
                                            <Form.Control placeholder="ex ba, rs, en, fr " onChange={event => this.handlePlayerCountrycodeInput(event)}/>
                                            <Form.Text muted>
                                                System is using ISO 3166 international standard country codes. See supported 
                                                <a href="https://www.iban.com/country-codes"> here</a>.
                                            </Form.Text>                                        
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Choose players team</Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="my-1 mr-sm-2"
                                                id="inlineFormCustomSelectPref"
                                                custom
                                                onChange={event => this.handlePlayerTeamInput(event)}
                                            >

                                            {this.state.teams && this.state.teams.map(team =>{
                                                return <option key={team.id} value={team.id}>{team.team_name}</option>
                                            })}

                                            </Form.Control>
                                        </Form.Group>
                                

                                        <Button className="push-top" variant="primary" type="submit">
                                            Submit
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


export default PlayerAdd;
