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
        <div style={{ width: '100%', padding: "0px !important;" }}>
            <Container fluid style={{ padding: (width > 992) ? "0px 64px" : "0 16px" }}>
                <Row className={styles.line}>

                </Row>
                <Row style={{ padding: (width > 992) ? "64px 0px 0px 0px" : "16px" }} ref={componentRef}>
                    <Col style={{
                        marginBottom: (width > 992) ? "52px" : "0px"
                    }} sm={5} >
                        <div className={styles.text_title}>
                            Contact Information
                        </div>
                        <div className={styles.text}>
                            <p>Beat Active </p>
                            <p style={{ display: "inline-block" }}>Tel : 02-888-8222</p>
                            <p>Facebook :  <a style={{ display: "inline" }} href=" https://www.facebook.com/BEATActiveThailand" target="_blank">BEATActiveThailand</a></p>                         </div>
                    </Col>
                    <Col sm={{ span: 4, offset: 1 }}>
                        <div className={styles.text_title} style={{ paddingTop: (width > 992) ? "0px" : "36px" }}> Help</div>
                        <div className={styles.text}  >
                            <a href='https://www.bhirajburi.co.th/th/privacy-policy' target="_blank"
                                rel="noreferrer noopener" className="textpolicy" style={{ justifyContent: "start" }}>
                                <p className={styles.text}>Privacy Policy</p> </a>
                            <a href='https://www.bhirajburi.co.th/th/privacy-policy' target="_blank"
                                rel="noreferrer noopener" className="textpolicy" style={{ justifyContent: "start" }}>
                                <p className={styles.text}>Cookie Policy</p> </a>
                        </div>
                    </Col>
                    <Col className={(width < 992) ? "" : styles.boxRelative}
                        style={{
                            paddingRight: (width < 992) ? "16px" : "64px", paddingBottom: (width < 992) ? "45px" : "64px"
                            , marginBottom: "0px", display: "flex", alignItems: "end", justifyContent: "flex-end"
                        }} sm={2}>
                        <Row className={(width < 992) ? styles.boxRelative : ""} style={{ position: "absolute" }}>
                            <button onClick={goToTop} className={styles.btnGoTop}> ↑ </button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};


export default Footer;



