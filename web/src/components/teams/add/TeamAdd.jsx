import React from 'react';
import {Card, Container, Row, Col,Form,Button} from 'react-bootstrap';


class TeamAdd extends React.Component{
    

    constructor(props) {
        super(props);

        this.state = {
            file: null,
            name: '',
            clanName: null,
            clanShortName: null,
            clanCountryCode: null,
            clanLogo: null,
        }
    }

    previewClanLogo = (event) =>{

        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            name: event.target.files[0].name,
        })
    }

    handleClanNameInput = (event) =>{
        this.setState({clanName: event.target.value});
    }

    handleClanShortNameInput = (event) =>{
        this.setState({clanShortName: event.target.value});
    }

    handleClanCountryInput = (event) =>{
        this.setState({clanCountryCode: event.target.value});
    }

    handleClanLogoInput = (event) =>{
        this.setState({clanLogo: URL.createObjectURL(event.target.files[0])});
    }

    submit = (event) =>{

        event.preventDefault();

        const body = {
            'clan_name': this.state.clanName,
            'clan_short_name': this.state.clanShortName,
            'clan_country_code': this.state.clanCountryCode,
            'clan_logo': this.state.clanLogo,
        }

        console.log(body)

        fetch('http://localhost:3001/api/addclan', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body),
          mode: 'cors'
        })
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result)
            
        },
        (error) => {
            console.log(error) 
        }
        );
    }

    render(){    
        let imagePreview;
        let imageName;

        if (this.state.file) {
            imagePreview = <img className="image-preview" src={this.state.file} alt='' />;
            imageName = <p>{this.state.name}</p>
        }

        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card className="card bg-light p-3 push-top">
                                <Card.Body>
                                    <h2>
                                        Add a new team
                                    </h2>

                                    <Form className="push-top" onSubmit={event => this.submit(event)}>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Team name:</Form.Label>
                                                <Form.Control type="text" placeholder="Enter clan name" onChange={event => this.handleClanNameInput(event)} />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Short name:</Form.Label>
                                                <Form.Control type="text" placeholder="Short clan name ex. myst;" onChange={event => this.handleClanShortNameInput(event)} />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Group>
                                            <Form.Label>Country code</Form.Label>
                                            <Form.Control placeholder="ex ba, rs, en, fr " onChange={event => this.handleClanCountryInput(event)}/>
                                            <Form.Text muted>
                                                System is using ISO 3166 international standard country codes. See supported 
                                                <a href="https://www.iban.com/country-codes"> here</a>.
                                            </Form.Text>                                        
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Clan logo</Form.Label>
                                            <Form.File onChange={event => this.previewClanLogo(event), event =>  this.handleClanLogoInput(event)}
                                                id="clan-logo"
                                                label="Upload logo"
                                                custom
                                                accept='image/*'
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            {imageName}
                                            {imagePreview}
                                        </Form.Group>


                                        <Button variant="primary" type="submit">
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


export default TeamAdd;
