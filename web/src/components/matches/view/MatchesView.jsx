import React from 'react';
import {Card, Container, Row, Col,Form,Button} from 'react-bootstrap';


class ViewPlayer extends React.Component{
    

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            team_one: '',
            team_two: '',
            match_type: '',
            status: '',
            teams: []
        }
    }

    componentDidMount() {

        fetch(`/api/view/match/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(
          (result) => {
              
              if(result && result.status_code === 200){
                    console.log(result.match_info.match_type)
                  this.setState({
                    isLoaded: true,
                    team_one: result.match_info.team_one,
                    team_two: result.match_info.team_two,
                    match_type: result.match_info.match_type,
                    status: result.match_info.status
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
            'id': this.props.match.params.id,
            'team_one': this.state.team_one,
            'team_two': this.state.team_two, 
            'status': 'ongoing',
            'match_type': this.state.match_type
        }

        fetch('/api/editmatch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then(res => res.json())
                .then((result) => {

                    console.log(result) 
                    
                    if(result.status_code === 200){
                        return window.location = `/matches/view/${result.id}`
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
                                        View match
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
                         
                                                <option value={this.state.match_type}>{this.state.match_type.toUpperCase()}</option>
                                                
                                                {
                                                    // eslint-disable-next-line
                                                    ['bo1', 'bo3', 'bo5'].map(type =>{
                                                        if(this.state.match_type !== type){
                                                            return <option key={type} value={type}>{type.toUpperCase()}</option>
                                                        }
                                                    })
                                                } 

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

                                                    {
                                                        // eslint-disable-next-line
                                                        this.state.teams && this.state.teams.map(team =>{
                                                            if(team.id === this.state.team_one){
                                                                return <option key={team.id} value={team.id}>{team.team_name}</option>
                                                            } 
                                                        })
                                                    }

                                                    {
                                                        // eslint-disable-next-line
                                                        this.state.teams && this.state.teams.map(team =>{
                                                            if(team.id !== this.state.team_one){
                                                                return <option key={team.id} value={team.id}>{team.team_name}</option>
                                                            } 
                                                        })
                                                    }

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
                                                
                                               

                                                {
                                                        // eslint-disable-next-line
                                                        this.state.teams && this.state.teams.map(team =>{
                                                            if(team.id === this.state.team_two){
                                                                return <option key={team.id} value={team.id}>{team.team_name}</option>
                                                            } 
                                                        })
                                                    }

                                                    {
                                                        // eslint-disable-next-line
                                                        this.state.teams && this.state.teams.map(team =>{
                                                            if(team.id !== this.state.team_two){
                                                                return <option key={team.id} value={team.id}>{team.team_name}</option>
                                                            } 
                                                        })
                                                    }

                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>


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
