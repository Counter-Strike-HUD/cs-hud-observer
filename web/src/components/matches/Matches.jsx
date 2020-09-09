import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';


class Matches extends React.Component{
    render(){        
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card className="card bg-light p-3 push-top">
                                <Card.Body>
                                    <p>
                                        matches
                                    </p>
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