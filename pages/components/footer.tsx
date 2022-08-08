import { Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Partner.module.css'
import handler, { connectToDatabase } from "../api/hello";
import hello from "../api/hello";
import { GetStaticProps, GetStaticPaths, GetServerSideProps, InferGetStaticPropsType } from 'next'
import type { AppProps } from 'next/app'

const Footer = () => {
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    console.log(FilmList)

    return (
        <div style={{ width: '100%' }}>
            <Container>
                <Row className={styles.contantLine}>
                    <Col className={styles.OurPartner} xxl={3}></Col>
                    <Col className={styles.partner_1} xxl={3}></Col>
                    <Col className={styles.partner_2} xxl={3}></Col>
                    <Col className={styles.partner_3} xxl={3}></Col>
                </Row>
            </Container>

            {/* map */}
            {/* <Container >
                <Row className={styles.line}>
                    <Col className="d-flex align-items-start">
                        <p className={styles.textMap}>
                            MAP
                        </p>
                    </Col>
                </Row>
                <Row>
                    <img src='/assets/map.png' className={styles.showmap} alt="logo" />
                </Row>
            </Container> */}

            <Container>

                <Row className={styles.line}>
                    <Col xxl={5}>
                        <div className={styles.text_title}>
                            Contact Information
                        </div>
                        <div className={styles.text}>
                            <p>Beat Active </p>
                            <p>Tel : 02-888-8222</p>
                            <p>199/001 Soi Sukhumvit, Example for veryyy long information, and adresss, Bangkok 10110</p>
                        </div>
                    </Col>
                    <Col xxl={{ span: 4, offset: 1 }}>

                    </Col>
                    <Col xxl={2}>
                        <button onClick={goToTop} className={styles.btnGoTop}>Top</button>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};


export const getStaticProps = async () => {
    const res = await fetch('https://www.swapi.tech/api/');
    const data = await res.json();

    return {
        props: {
            swapis: data,
        },
    };
};

const FilmList = ({ swapis }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log(swapis)
    return (
        <>
            <h2>List of Films</h2>
            {Object.entries({}).map(([key, value]) => (
                console.log(value)
            ))}
        </>
    );
};

export default Footer;



