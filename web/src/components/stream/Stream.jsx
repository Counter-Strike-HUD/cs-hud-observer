import React, {useState, useEffect} from 'react';
import {Card, Container, Row, Col, Form, Button, ListGroup} from 'react-bootstrap';
import {BsFillPlusCircleFill, BsFillInfoCircleFill} from 'react-icons/bs';

function Stream() { 

    // Set state holder hooks
    const [address, setAddress] = useState('');
    const [port, setPort] = useState('');
    const [token, setToken] = useState('');
    const [authSubmited, setAuthSubmited] = useState(false);
    const [connected, setConnected] = useState(false);
    const [authed, setAuthed] = useState(false);
    const [textarea, setTextarea] = useState(['Waiting for connection']);


    /**
     * Try to call backend for auth check
     */
    const makeAuth = (e) =>{

            // Prevent default behaviour
            e.preventDefault();

            // Set submited for input disable
            setAuthSubmited(true);

            // Set connecting message
            setTextarea(textarea => ([...textarea, `Trying to connect on ${address}:${port}`])); 

            // Body data
            const body = {
                address,
                port,
                token
            }

            fetch('http://localhost:3000/api/socketconnect', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
                mode: 'cors'
            })
                .then(res => res.json())
                    .then((result) => {

                        console.log(result.message)

                        if(result.status_code === 400){
                            setTextarea(textarea => ([...textarea, result.message])); 
                            setAuthSubmited(false);   
                        }

                        if(result.status_code === 200){
                            setTextarea(textarea => ([...textarea, result.message])); 
                            setAuthed(true);

                            setConnected(result.connection);
                            setAuthed(result.auth);
                        }
                    },
                        (error) => {
                            
                        }
                    );
    
    }


    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <Card className="card bg-light p-3 push-top">
                            <Card.Body>
                                <h2>
                                    Auth
                                </h2>

                                    {!authed &&
                                        <Form onSubmit={e => makeAuth(e)} >
                                            <Form.Row>
                                                <Form.Group as={Col} md={4} controlId="formGridAddress">
                                                    <Form.Label>Socket address</Form.Label>
                                                    <Form.Control disabled={authSubmited} onChange={e => setAddress(e.target.value)} type="text" placeholder="Enter remote address" />
                                                </Form.Group>

                                                <Form.Group as={Col}  md={2} controlId="formGridPassword">
                                                    <Form.Label>Socket port</Form.Label>
                                                    <Form.Control disabled={authSubmited} onChange={e => setPort(e.target.value)} type="number" min="1" max="65536" placeholder="Enter remote port" />
                                                </Form.Group>

                                                <Form.Group as={Col} md={4} controlId="formGridToken">
                                                    <Form.Label>Auth token</Form.Label>
                                                    <Form.Control disabled={authSubmited} onChange={e => setToken(e.target.value)} type="text" placeholder="Enter auth token" />
                                                </Form.Group>

                                                <Form.Group as={Col} md={2} controlId="formGridSubmit">
                                                    <Form.Label>Send auth request</Form.Label>
                                                    <Button disabled={authSubmited} variant="primary" type="submit" style={{width: '100%'}}>
                                                        Auth
                                                    </Button>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    }

                                <h2 style={{marginTop: 25}}>
                                    Status: 
                                    {!authed && !authSubmited && 
                                        <span style={{color: 'red'}}> not connected</span>
                                    }

                                    {authSubmited && !authed && 
                                        <span style={{color: 'orange'}}> connecting</span>
                                    }

                                    {connected && !authed && 
                                        <span style={{color: 'green'}}> connected but not authed</span>
                                    }

                                    {connected && authed && 
                                        <span style={{color: 'green'}}> connected and authed</span>
                                    }


                                </h2>

                                <textarea readOnly rows="5" style={{width: '100%', whiteSpace: 'preline', border: 'none'}} value={textarea.join('\n')}></textarea>

                            </Card.Body>
                        </Card>
                        <Card className="card bg-light p-3 push-top">
                            <Card.Body>
                                <h2>
                                    Auth
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Stream;
