import { Fragment, useRef, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import { UnityGame } from "./unityGame";
import Container from 'react-bootstrap/Container';
import { useSession, signIn, signOut } from "next-auth/react"

const Game = () => {

    function handleClickMount() {
        setShowGame(true);
    }

    function handleClickUnmount() {
        setShowGame(false);
    }

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isShowGame, setShowGame] = useState(false);
    const { data: session } = useSession()

    console.log(session)
    if (session) {
        return (
            <div>
                <Container fluid>
                    <Row>
                        {/* Game */}
                        <Col sm={9} className="containerGame">
                            <Fragment>
                                <UnityGame />
                            </Fragment>
                        </Col>

                        {/* score */}
                        <Col sm={3} className="containerScore">
                                Leader Board
                        </Col>
                    </Row>
                </Container>

            </div >
        );
    } else {
        return (
            <div>
                <Container fluid>
                    <Row>
                        {/* Game */}
                        <Col sm={9} className="containerGame">
                            <Fragment>
                                <button className="game-button" onClick={() => signIn()}>
                                    Let’s Play →
                                </button>
                            </Fragment>
                        </Col>

                        {/* score */}
                        <Col sm={3} className="containerScore">
                                Leader Board
                        </Col>
                    </Row>
                </Container>


            </div >
        );
    }

}



export default Game;
