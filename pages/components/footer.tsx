import { Fragment, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Partner.module.css'

const Footer = () => {
    return (
        <div style={{ width: '100%' }}>
            <Container className={styles.line}>
                <Row>
                    <Col xxl={5}>
                        <div className='text_title'>
                            Contact Information
                        </div>
                        <div className='text'>
                            <p>Beat Active </p>
                            <p>Tel : 02-888-8222</p>
                            <p>199/001 Soi Sukhumvit, Example for veryyy long information, and adresss, Bangkok 10110</p>
                        </div>
                    </Col>
                    <Col xxl={{ span: 4, offset: 1 }}>

                    </Col>
                    <Col xxl={2}>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default Footer;

