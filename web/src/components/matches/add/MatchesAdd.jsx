import React from 'react';
import {Card, Container, Row, Col, Form, Button} from 'react-bootstrap';


class MatchesAdd extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            team_one: '',
            team_two: '',
            match_type: ''
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

    handleMatchTypeInput = (event) =>{
        this.setState({match_type: event.target.value});
    }

    handleTeamOneInput = (event) =>{
        this.setState({team_one: event.target.value});
    }

    handleTeamTwoInput = (event) =>{
        this.setState({team_two: event.target.value});
    }

    submit = (event) =>{

        event.preventDefault();

        const body = {
            'team_one': this.state.team_one,
            'team_two': this.state.team_two, 
            'status': 'ongoing',
            'match_type': this.state.match_type
        }

        fetch('/api/addmatch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then(res => res.json())
                .then((result) => {

                    console.log(result) 
                    
                    if(result.status_code === 200){
                        // window.location = `/matches/view/${result.id}`
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
                                        Add a new match
                                    </h2>

                                    {this.renderError()}

                                    <Form className="push-top" onSubmit={event => this.submit(event)}>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Choose match type </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="my-1 mr-sm-2"
                                                    id="inlineFormCustomSelectPref"
                                                    custom
                                                    onChange={event => this.handleMatchTypeInput(event)}
                                                >
                                                    
                                                <option value="">Choose type...</option>
                                                <option value="bo1">BO1</option>
                                                <option value="bo3">BO3</option>
                                                <option value="bo5">BO5</option>

                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Choose first team </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="my-1 mr-sm-2"
                                                    id="inlineFormCustomSelectPref"
                                                    custom
                                                    onChange={event => this.handleTeamOneInput(event)}
                                                >

                                                <option value="">Choose team...</option>
                                                {this.state.teams && this.state.teams.map(team =>{
                                                    return <option key={team.id} value={team.id}>{team.team_name}</option>
                                                })}

                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Choose second team</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="my-1 mr-sm-2"
                                                    id="inlineFormCustomSelectPref"
                                                    custom
                                                    onChange={event => this.handleTeamTwoInput(event)}
                                                >
                                                
                                                <option value="">Choose team...</option>

                                                {this.state.teams && this.state.teams.map(team =>{
                                                    return <option key={team.id} value={team.id}>{team.team_name}</option>
                                                })}

                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>
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


export default MatchesAdd;
