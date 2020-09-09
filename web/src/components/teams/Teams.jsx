import React from 'react';
import {Card, Container, Row, Col, Button, Spinner} from 'react-bootstrap';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import {Link} from "react-router-dom";

class Teams extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          teams: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/teams")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
              this.setState({
                isLoaded: true,
                teams: result.teams
              });
            },
            (error) => {
            console.log(error)
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render(){     

        const { error, isLoaded, teams } = this.state;

        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card className="card bg-light p-3 push-top">
                                <Card.Body>

                                    <h2>
                                        Teams on site
                                        
                                        <Link to='/teams/add'>
                                            <Button  variant="success" className="float-right"> <BsFillPlusCircleFill /> Add team </Button>
                                        </Link>
                                     
                                    </h2>

                                    {error && isLoaded && 
                                        <h4>Error has been spotted:  </h4>
                                    }

                                    {
                                        !isLoaded && 
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    }

                                    {
                                        teams.map(team => (
                                            <Card className="push-top" key={team.team_name} style={{ width: '18rem' }}>
                                                <Card.Img variant="top" src={'http://localhost:3001/assets/' + team.team_logo_name} />
                                                <Card.Body>
                                                    <Card.Title>{team.team_name}</Card.Title>
                                                    <Card.Text>
                                                        {team.team_description}
                                                    </Card.Text>
                                                    <Button variant="primary">View team</Button>
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

export default Teams;