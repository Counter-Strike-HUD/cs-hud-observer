import React from 'react';
import {Card, Container, Row, Col,Form,Button, Image} from 'react-bootstrap';


class ViewTeam extends React.Component{
    

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            file: null,
            name: '',
            clanName: '',
            clanShortName: '',
            clanCountryCode: '',
            clanLogo: '',
            clanDescription: '',
            error: null,
            isLoaded: false,
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3001/api/view/team/${this.props.match.params.id}`)
          .then(res => res.json())
          .then(
            (result) => {
                
                if(result && result.status_code === 200){

                    const {id, team_name, team_short_name, team_description, team_country_code} = result.team_info;

                    this.setState({
                        id,
                        clanName: team_name,
                        clanShortName: team_short_name,
                        clanDescription: team_description,
                        clanCountryCode: team_country_code,
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
                error
              });
            }
          )
      }

    renderError = () =>{
        return this.state.error ? <h4>Error has been spotted: {this.state.error} </h4> : null;
    }

    previewClanLogo = (event) =>{

        const file = URL.createObjectURL(event.target.files[0]);
        const blob = event.target.files[0];  

        this.setState({
            file,
            name: event.target.files[0].name,
        })

        this.getBase64(blob, base64 =>{
            this.setState({
                clanLogo: base64
            })
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

    handleClanDescriptionInput = (event) =>{
        this.setState({clanDescription: event.target.value});
    }


    getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            cb(reader.result)
        };
        reader.onerror = (error) =>{
            console.log('Error: ', error);
        };
    }

    submit = (event) =>{

        event.preventDefault();

        const body = {
            'id': this.props.match.params.id,
            'team_name': this.state.clanName,
            'team_short_name': this.state.clanShortName,
            'team_country_code': this.state.clanCountryCode,
            'team_logo': this.state.clanLogo | null,
            'team_description': this.state.clanDescription,
        }

        fetch('http://localhost:3001/api/editclan', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then(res => res.json())
                .then((result) => {

                    console.log(result) 
                    
                    if(result.status_code === 200){
                        return window.location = `/teams/view/${result.id}`
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
                                        View team
                                    </h2>

                                    {this.renderError()}

                                    <Form className="push-top" onSubmit={event => this.submit(event)}>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Team name:</Form.Label>
                                                <Form.Control value={this.state.clanName} type="text" placeholder="Enter clan name" onChange={event => this.handleClanNameInput(event)} />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Short name:</Form.Label>
                                                <Form.Control value={this.state.clanShortName} type="text" placeholder="Short clan name ex. myst;" onChange={event => this.handleClanShortNameInput(event)} />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Group>
                                            <Form.Label>Team description</Form.Label>
                                            <Form.Control value={this.state.clanDescription} placeholder="Say something" onChange={event => this.handleClanDescriptionInput(event)}/>
                                            <Form.Text muted>
                                                Write something specific about this team.
                                            </Form.Text>                                        
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Country code</Form.Label>
                                            <Form.Control value={this.state.clanCountryCode} placeholder="ex ba, rs, en, fr " onChange={event => this.handleClanCountryInput(event)}/>
                                            <Form.Text muted>
                                                System is using ISO 3166 international standard country codes. See supported 
                                                <a href="https://www.iban.com/country-codes"> here</a>.
                                            </Form.Text>                                        
                                        </Form.Group>
                                        

                                        <Form.Group>
                                            <Form.Label>Clan logo</Form.Label>
                                            <Form.File onChange={event => {this.previewClanLogo(event);}} 
                                                id="clan-logo"
                                                label="Upload logo"
                                                custom
                                                accept='image/*'
                                            />
                                        </Form.Group>

                                        <Image src={`/assets/${this.state.id}.png`} alt='Loading...' rounded />

                                        <Form.Group>
                                            {imageName}
                                            {imagePreview}
                                        </Form.Group>


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


export default ViewTeam;
