import React from 'react';
import {Card, Container, Row, Col, Button, Spinner, ListGroup} from 'react-bootstrap';
import {BsFillPlusCircleFill, BsFillInfoCircleFill} from 'react-icons/bs';
import {Link} from "react-router-dom";

class Matches extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          matches: []
        };
        
    }

    componentDidMount() {
        fetch("/api/matches")
          .then(res => res.json())
          .then(
            (result) => {

                console.log(result)
             
                // Set state about players
                if(result.status_code === 200){
                    // eslint-disable-next-line
                    result.matches.map(match =>{
                        this.fetchTeams(match.id, match.match_type, [match.team_one, match.team_two])
                    })    
                }

            },
            (error) => {
    
              this.setState({
                isLoaded: true,
                error: error.toString(),
              });
            }
        )
    }

    fetchTeams(match_id, match_type, ids){

        const body = {
            "team_one": ids[0],
            "team_two": ids[1]
        }

        fetch('/api/matches/info', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then(res => res.json())
                .then((result) => {

                    console.log(result) 
                    
                    if(result.status_code === 200){
                        this.setState(previous => ({
                            isLoaded: true,
                            matches: [
                                ...previous.matches,
                                {
                                    match_id,
                                    team_one: result.team_one,
                                    team_two: result.team_two,
                                    match_type
                                }
                            ]
                        }))
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

        const { error, isLoaded, matches } = this.state;

        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card className="card bg-light p-3 push-top">
                                <Card.Body>

                                    <h2>
                                        Matches on site
                                        
                                        <Link to='/matches/add'>
                                            <Button  variant="success" className="float-right"> <BsFillPlusCircleFill /> Add match </Button>
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
                                     
                                    <ListGroup className="push-top">
                                        { isLoaded && 
                                                
                                            matches.map(match => 
                                                <ListGroup.Item key={match.match_id}>

                                                    <b>{match.team_one.team_name}</b> vs <b>{match.team_two.team_name}</b>

                                                    <span style={{paddingLeft: '10px'}}>Match type: <b>{match.match_type}</b></span>

                                                    <Link to={`/matches/view/${match.match_id}`}>
                                                        <Button size="sm" variant="primary" className="float-right"> <BsFillInfoCircleFill /> View match </Button>
                                                    </Link>
                                                     
                                                </ListGroup.Item>
                                            )
                                                
                                        }
                                    </ListGroup>
                                </Card.Body>
                            </Card>                        
                        </Col>
                    </Row>     
                </Container>    
            </div>       
        );
    }
}

export default Matches;