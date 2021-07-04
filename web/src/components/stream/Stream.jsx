import React, {useState} from 'react';
import {Card, Container, Row, Col, Form, Button} from 'react-bootstrap';
import {BsFillPlusCircleFill, BsFillInfoCircleFill} from 'react-icons/bs';

function Stream() { 

    const [authed, setAuthed] = useState(false);

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
                                        <Form>
                                            <Form.Row>
                                                <Form.Group as={Col} md={4} controlId="form-">
                                                    <Form.Label>Socket address</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter remote address" />
                                                </Form.Group>

                                                <Form.Group as={Col}  md={2} controlId="formGridPassword">
                                                    <Form.Label>Socket port</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter remote port" />
                                                </Form.Group>

                                                <Form.Group as={Col} md={4} controlId="formGridPassword">
                                                    <Form.Label>Auth token</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter auth token" />
                                                </Form.Group>

                                                <Form.Group as={Col} md={2} controlId="formGridPassword">
                                                    <Form.Label>Send auth request</Form.Label>
                                                    <Button variant="primary" type="submit">
                                                        Auth
                                                    </Button>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    }

                                    {authed &&
                                        <p>authed</p>
                                    }

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
