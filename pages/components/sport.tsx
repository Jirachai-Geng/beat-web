import { Fragment, useRef, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Sport.module.css'

const Sport = () => {

    return (
        <div className="containerSport d-flex align-items-center">
            <Container>
                <Row>
                    <Col className={styles.sport_1} xxl={3}></Col>
                    <Col className={styles.sport_2} xxl={3}></Col>
                    <Col className={styles.sport_3} xxl={3}></Col>
                    <Col className={styles.sport_4} xxl={3}></Col>
                </Row>
                <Row>
                    <Col className={styles.sport_5} xxl={3}></Col>
                    <Col className={styles.sport_6} xxl={3}></Col>
                    <Col className={styles.sport_7} xxl={3}></Col>
                    <Col className={styles.sport_8} xxl={3}></Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <button className={styles.button_showmall}>
                        View All
                    </button>
                </Row>

            </Container>
        </div >
    )
}



export default Sport;
