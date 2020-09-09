import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';


class Players extends React.Component{
    render(){        
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card className="card bg-light p-3 push-top">
                                <Card.Body>
                                    <h2>
                                       players
                                    </h2>


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