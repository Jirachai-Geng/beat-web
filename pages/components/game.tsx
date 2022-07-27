import { Fragment, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl/distribution/exports";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import { UnityGame } from "./unityGame";


const Game = () => {

  function handleClickMount() {
    setShowGame(true);
  }

  function handleClickUnmount() {
    setShowGame(false);
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ isShowGame, setShowGame] = useState(false);


  return (
    <div>

      <Container className="containerGame">
        <Row>
          {/* Game */}
          <Col sm={9}>
            
            {isShowGame === true ? (
              <Fragment>
                <button onClick={handleClickUnmount}>Unmount Unity Test</button>
                <UnityGame />
              </Fragment>
            ) : (
              <Fragment>
                <button onClick={() => handleClickMount()}>
                  Login Facebook
                </button>
              </Fragment>
            )}
          </Col>

          {/* score */}
          <Col sm={3}>
            <Card className="Card">
              <Card.Body>
                <Card.Title>LEADER BROAD</Card.Title>
                <Card.Text>
                  SCORE BROAD
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div >
  );
};

export { Game };
function setState(arg0: { show: boolean; }) {
  throw new Error("Function not implemented.");
}

