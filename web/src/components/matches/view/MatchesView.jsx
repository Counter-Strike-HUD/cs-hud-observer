import React, {useState, useEffect} from 'react';
import {Card, Container, Row, Col,Form,Button, ListGroup, Modal} from 'react-bootstrap';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import {HiUserRemove} from 'react-icons/hi'


export default function MatchView(props) {

    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [teamOne, setTeamOne] = useState('');
    const [teamTwo, setTeamTwo] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [teams, setTeams] = useState([]);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [players, setPlayers] = useState([])
    const [teamOnePlayers, setTeamOnePlayers] = useState([]);
    const [teamTwoPlayers, setTeamTwoPlayers] = useState([]);


    const showModalLeft = () =>{
        setShowLeft(true);
    }

    const showModalRight = () => {
        setShowRight(true);
    }

    const hideModalLeft = () =>{
        setShowLeft(false);
    }

    const hideModalRight = () =>{
        setShowRight(false);
    }

    const updateTeamOnePlayers = (event) =>{
        return teamOnePlayers.length <= 4 ? setTeamOnePlayers((players) => [...players, event]) : setShowLeft(false);
    }

    const updateTeamTwoPlayers = (event) =>{
        return teamTwoPlayers.length <= 4 ? setTeamTwoPlayers((players) => [...players, event]) : setShowRight(false);
    }

    const removeTeamOnePlayer = (id) =>{
        return setTeamOnePlayers(teamOnePlayers.filter(playerid => playerid !== id));
    }

    const removeTeamTwoPlayer = (id) =>{
        return setTeamOnePlayers(teamTwoPlayers.filter(playerid => playerid !== id));
    }


 
    useEffect( () => {

        fetch(`/api/view/match/${props.match.params.id}`)
        .then(res => res.json())
            .then(
                (result) => {
                
                    if(result && result.status_code === 200){
                    
                        setLoaded(true);
                        setTeamOne(result.match_info.team_one);
                        setTeamTwo(result.match_info.team_two);
                        setType(result.match_info.match_type);
                        setStatus(result.match_info.status);
                        setTeamOnePlayers(result.match_info.team_one_players);
                        setTeamTwoPlayers(result.match_info.team_two_players);

                    }

                    if(result && result.status_code === 404){
                        setLoaded(true);
                        setError(result.message);
                    }
                
                },
                (error) => {
                    setLoaded(true);
                    setError(error.toString());
                }
            )
        
        fetch(`/api/teams`)
          .then(res => res.json())
          .then(
            (result) => {
                
                if(result && result.status_code === 200){
                    setTeams(result.teams);
                    
                }

                if(result && result.status_code === 404){
                    setLoaded(true);
                    setError(result.message);
                }
            
            },
            (error) => {
        
                setLoaded(true);
                setError(error.toString());
            }
        );

        fetch("/api/players")
          .then(res => res.json())
          .then(
            (result) => {
               
                setPlayers(result.players)
 
            },
            (error) => {
    
                setLoaded(true);
                setError(error.toString());
            }
        );

    }, [0]);

    function renderError(){
        return error ? <h4>Error has been spotted: {error} </h4> : null;
    }

    function handleMatchTypeInput(event){
        setType(event.target.value);
    }


    function submit(event){

        event.preventDefault();

        const body = {
            'id': props.match.params.id,
            'team_one': teamOne,
            'team_two': teamTwo, 
            'status': 'ongoing',
            'match_type': type,
            'team_one_players': teamOnePlayers,
            'team_two_players': teamTwoPlayers
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
                        setLoaded(true);
                        setError(result.message);
                    }
                    
                    
                },
                (error) => {
                    setLoaded(true);
                    setError(error.toString());
                }
            );


    }

    
    return(
        <div>
            <Container>

            <Modal
                show={showLeft}
                onHide={hideModalLeft}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add players to team {teams.find((team) => team.id === teamOne)?.team_name} </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                
                    <Form.Control
                        as="select"
                        className="my-1 mr-sm-2"
                        custom
                        onChange={(event) => updateTeamOnePlayers(event.target.value)}
                        defaultValue="Choose..."
                    >
                    
                    <option>Choose...</option>

                    {
                        players && players.map(player =>{
                            if(!teamTwoPlayers.includes(player.id) && !teamOnePlayers.includes(player.id)){
                                return <option key={player.id} value={player.id}>{player.player_nickname}</option>
                            }
                        })
                    }

                    </Form.Control>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModalLeft}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>


            <Modal
                show={showRight}
                onHide={hideModalRight}
                backdrop="static"
                keyboard={false}
                
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add players to team {teams.find((team) => team.id === teamTwo)?.team_name} </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                
                    <Form.Control
                        as="select"
                        className="my-1 mr-sm-2"
                        id="inlineFormCustomSelectPref"
                        custom    
                        onChange={(event) => updateTeamTwoPlayers(event.target.value)}
                        defaultValue="Choose..."
                    >

                    <option>Choose...</option>

                    {players && players.map(player =>{
                        if(!teamTwoPlayers.includes(player.id) && !teamOnePlayers.includes(player.id)){
                            return <option key={player.id} value={player.id}>{player.player_nickname}</option>
                        }
                    })}


                    </Form.Control>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModalRight}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>

                <Row>
                    <Col>
                        <Card className="card bg-light p-3 push-top">
                            <Card.Body>
                                <h2>
                                    View match
                                </h2>

                                {renderError()}

                                <Form className="push-top" onSubmit={event => submit(event)}>
                                <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Choose match type </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="my-1 mr-sm-2"
                                                custom
                                                onChange={event => handleMatchTypeInput(event)}
                                            >
                        
                                            <option value={type}>{type.toUpperCase()}</option>
                                            
                                            {
                                                // eslint-disable-next-line
                                                ['bo1', 'bo3', 'bo5'].map(typeMatch =>{
                                                    if(type !== typeMatch){
                                                        return <option key={typeMatch} value={typeMatch}>{typeMatch.toUpperCase()}</option>
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
                                                custom
                                                disabled
                                            >

                                                {
                                                    // eslint-disable-next-line
                                                    teams && teams.map(team =>{
                                                        if(team.id === teamOne){
                                                            return <option key={team.id} value={team.id} className="selected disabled">{team.team_name}</option>
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
                                                custom
                                                disabled
                                            >
                                            

                                            {
                                                // eslint-disable-next-line
                                                teams && teams.map(team =>{
                                                    if(team.id === teamTwo){
                                                        return <option key={team.id} value={team.id} className="selected disabled">{team.team_name} </option>
                                                    } 
                                                })
                                            }

                            

                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Row className="matches-players">
                                        <Col md="12"><h3>Players</h3></Col>
                                        <Col md="6">
                                            <ListGroup>
                                                
                                                {
                                                    teamOnePlayers && teamOnePlayers.map((t1player)=>{
                                                       return <ListGroup.Item key={t1player}>{players.find((player) => player.id === t1player)?.player_nickname} <span className="float-right" onClick={() => removeTeamOnePlayer(t1player)} ><HiUserRemove color="red" size={25} /></span></ListGroup.Item>
                                                    })
                                                }

                                                {
                                                    teamOnePlayers && teamOnePlayers.length <= 4 &&
                                                    <ListGroup.Item className="player-add-item" onClick={showModalLeft}>
                                                        <BsFillPlusCircleFill color="green" /> 
                                                    </ListGroup.Item>  
                                                }
                                                
                                            </ListGroup>
                                        </Col>

                                        <Col md="6">

                                            <ListGroup> 

                                                {
                                                    teamTwoPlayers && teamTwoPlayers.map((t2player)=>{
                                                       return <ListGroup.Item key={t2player}>{players.find((player) => player.id === t2player)?.player_nickname} <span className="float-right" onClick={() => removeTeamTwoPlayer(t2player)} ><HiUserRemove  color="red" size={25} /></span> </ListGroup.Item>
                                                    })
                                                }

                                                {
                                                    teamTwoPlayers && teamTwoPlayers.length <= 4 &&
                                                    <ListGroup.Item className="player-add-item" onClick={showModalRight}>
                                                            <BsFillPlusCircleFill color="green"/> 
                                                    </ListGroup.Item>
                                                }
                                                    

                                            </ListGroup>
                                        </Col>
                                    </Row>

                                    <Button variant="primary" type="submit">
                                        Save
                                    </Button>

                                    <Button variant="success" type="submit" style={{marginLeft: 10}}>
                                        Start match
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


