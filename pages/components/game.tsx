import { Fragment, useRef, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import { UnityGame } from "./unityGame";
import Container from 'react-bootstrap/Container';
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '../../styles/Game.module.css'

const Game = () => {
    const TableData = [
        { id: 1, fullName: "Patsachol Tangsong...", score: '10,000' },
        { id: 2, fullName: "Klay Thomas", score: '8,800' },
        { id: 3, fullName: "Ja Morant", score: '8,000' },
        { id: 4, fullName: "Sunil Kumar", score: '5,600' },
        { id: 5, fullName: "Kajol Kumari", score: '5,000' },
        { id: 3, fullName: "Ja Morant", score: '8,000' },
        { id: 4, fullName: "Sunil Kumar", score: '5,600' },
        { id: 5, fullName: "Kajol Kumari", score: '5,000' }
    ]

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isShowGame, setShowGame] = useState(false);
    const { data: session } = useSession()


    const column = Object.keys(TableData[0]);

    // get table row data
    const tdData = () => {

        return TableData.map((data) => {
            return (
                <tr style={{ justifyContent: "space-between",padding:"20px !important" }}>
                    {
                        column.map((v) => {
                            if (v === "score") {
                                return <td className={styles.textOrange}>{data[v]} P</td>
                            } else if (v === "id") {
                                return <td> <div className={styles.numberCircle}> {data[v]}</div>  </td>
                            } else {
                                return <td> {data[v]} </td>
                            }
                        })
                    }
                </tr>
            )
        })
    }
    console.log(session)

    return (
        <div>
            <Container fluid>
                <Row className={styles.background_white}>
                    {/* Game */}
                    <Col sm={9} className="containerGame">
                        {session ? (
                            <Fragment>
                                <UnityGame />
                            </Fragment>
                        ) : <div className="endcontainer">
                            <button className="game-button" onClick={() => signIn()}>
                                Let’s Play →
                            </button>
                        </div>}
                    </Col>


                    {/* score */}
                    <Col className={styles.content} sm={3} style={{overflow:"auto", height:"599px"}}>
                        <p className={styles.textScore}> Leader Board </p>
                        <table className="table">
                            <thead>
                            </thead>
                            <tbody className={styles.tableScore}>
                                {tdData()}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}



export default Game;
