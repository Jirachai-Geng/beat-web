import { Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Partner.module.css'
import handler, { connectToDatabase } from "../api/hello";
import hello from "../api/hello";
import type { AppProps } from 'next/app'

export const useContainerDimensions = (myRef: any) => {
    const getDimensions = () => ({
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight
    })

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const handleResize = () => {
            setDimensions(getDimensions())
        }

        if (myRef.current) {
            setDimensions(getDimensions())
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [myRef])

    return dimensions;
};

const Footer = () => {
    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div style={{ width: '100%', padding: "0px !impotant" }}>
            <Container fluid>
                <Row className={styles.contantLine} ref={componentRef}>
                    <Col className={styles.OurPartner} sm={3}>
                        <div className={(width > 992) ? styles.textParner : styles.textParnerMobile}>
                            <p>Our </p>
                            <p>Partner </p>
                        </div>
                    </Col>
                    <Col className={styles.OurPartner} sm={3}>
                        <img style={{ height: (width > 992) ? "300px" : "200px" }} src="/assets/partner/Plantoys.svg" alt="" /></Col>
                    <Col className={styles.OurPartner} sm={3}>
                        <img style={{ height: (width > 992) ? "300px" : "200px" }} src="/assets/partner/Berg.svg" alt="" /></Col>
                    <Col className={styles.OurPartner} sm={3}>
                        <img style={{ height: (width > 992) ? "300px" : "200px" }} src="/assets/partner/Thaifight.svg" alt="" /></Col>
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

            <Container fluid>
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
                    <Col className={styles.boxRelative} xxl={2}>
                        <button onClick={goToTop} className={styles.btnGoTop}> ↑ </button>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};


export default Footer;



