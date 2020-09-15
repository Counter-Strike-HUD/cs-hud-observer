import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';


class Welcome extends React.Component{
    render(){        
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card className="card bg-light p-3 push-top">
                                <Card.Body>
                                    <h2> Counter Strike HUD Observer
                                       
                                    </h2>

                                    <p style={{marginTop: '30px'}} >
                                        So what is Counter Strike HUD Observer? Its an idea to implement rich spectator view with full overview of game.
                                        Its inspired by first well known HLTV overlay for CS 1.6 and now newer CSGO stream huds.
                                    </p>

                                    <p style={{marginTop: '20px'}} >
                                       Project is available on  
                                       <a href="https://github.com/kallefrombosnia/cs-hud-observer"> github/kallefrombosnia/cs-hud-observer</a>.
                                       
                                    </p>

                                    <h4 style={{marginTop: '30px'}} >
                                       What techonologies are used on this project?
                                    </h4>

                                    <p style={{marginTop: '17px'}} >
                                      
                                        <a href="https://github.com/facebook/react">
                                            React.js
                                        </a> 
                                    </p>

                                    <p style={{marginTop: '17px'}} >
                                        
                                        <a href="https://nodejs.org/en/">
                                            Node.js
                                        </a>
                                    </p>


                                    <p style={{marginTop: '17px'}} >
                                        <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API">
                                            WebRTC techonologies
                                        </a>
                                    </p>

                                    <p style={{marginTop: '17px'}} >
                                        <a href="https://github.com/socketio/socket.io/">
                                            Socket.io
                                        </a>
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

export default Welcome;