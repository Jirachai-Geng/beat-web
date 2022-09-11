import { Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Partner.module.css'
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

const Partner = () => {
    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)
    let test = '';

    return (
        <div style={{ width: '100%', padding: "0px !important;" }}>
            <Container fluid>
                <Row ref={componentRef} style={{ padding: (width > 992) ? "0px 64px" : "0 16px" }}>
                    <Col lg={3}>
                        <div className={(width > 922) ? styles.textParner : styles.textParnerMobile}>
                            <p style={{ textAlign: (width > 1280) ?"start": "center", fontSize: (width > 1280) ? "48px" : "24px" }}>Our </p>
                            <p style={{ textAlign: (width > 1280) ?"start": "center", fontSize: (width > 1280) ? "48px" : "24px" }}>Partner </p>
                        </div>
                    </Col>
                    <Col className={styles.OurPartner} lg={3}>
                        <img className={styles.responsive} style={{ height: (width > 922) ? "300px" : "200px" }} src="/assets/partner/Plantoys.svg" alt="" /></Col>
                    <Col className={styles.OurPartner} lg={3}>
                        <img className={styles.responsive} style={{ height: (width > 922) ? "300px" : "200px" }} src="/assets/partner/Berg.svg" alt="" /></Col>
                    <Col className={styles.OurPartner} lg={3}>
                        <img className={styles.responsive} style={{ height: (width > 922) ? "300px" : "200px" }} src="/assets/partner/Thaifight.svg" alt="" /></Col>
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
        </div >
    );
};


export default Partner;



