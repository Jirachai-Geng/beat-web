import { Fragment, useRef, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import { UnityGame } from "./unityGame";
import Container from 'react-bootstrap/Container';
import { useSession, signIn, signOut } from "next-auth/react"

const Career = () => {

    return (
        <div >
            <Container fluid >
                <Row className="containerCareer">
                    {/* Game */}
                    <Col sm={8}>
                    </Col>

                    {/* score */}
                    <Col sm={4}>
                        <button className="carrer-button">
                            Apply Now
                        </button>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}



export default Career;
