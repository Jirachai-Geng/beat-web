import { Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Partner.module.css'
import hello from "../api/hello";
import type { AppProps } from 'next/app'
import { padding } from "@mui/system";
import Link from "next/link";

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
                    <img style={{ width: '103px', paddingTop: '48px' }} src="\assets\beat_footer.svg" alt="kids" />

                </Row>
                <Row style={{ padding: (width > 992) ? "64px 0px 0px 0px" : "16px" }} ref={componentRef}>
                    <Col style={{ marginBottom: (width > 992) ? "52px" : "0px" }} sm={3} >
                        <div className={styles.footer_title}>
                            Location
                        </div>
                        <div >
                            <p className={styles.footer_text}>BITEC Buri EH105 88 Debaratna Road Bangna Tai.Bangna, Bangkok 10260, Thailand
                            </p>
                            <p className={styles.footer_textB}> Monday to Sunday </p>
                            <p className={styles.footer_textB}> 9:00 AM - 9:00 PM </p>
                            {/* <p>Facebook :  <a style={{ display: "inline" }} href=" https://www.facebook.com/BEATActiveThailand" target="_blank">BEATActiveThailand</a></p> */}
                        </div>
                    </Col>
                    <Col style={{ marginBottom: (width > 992) ? "52px" : "0px" }} sm={3} >
                        <div className={styles.footer_title}>
                            How to get here
                        </div>
                        <div>
                            <p className={styles.footer_textB}> Private car can park at BITEC Bangna parking lot  </p>
                            <p className={styles.footer_textB}> BTS Bangna Station Exit 1</p>
                            {/* <p>Facebook :  <a style={{ display: "inline" }} href=" https://www.facebook.com/BEATActiveThailand" target="_blank">BEATActiveThailand</a></p> */}
                        </div>
                    </Col>
                    <Col style={{ marginBottom: (width > 992) ? "52px" : "0px" }} sm={3} >
                        <div className={styles.footer_title}>
                            Contact Us
                        </div>
                        <div>
                            <p className={styles.footer_textB}><img src="\assets\partner\footer\line.svg" alt="kids" /> @beatactive Page  </p>
                            <p> <a className={styles.no_decoration} href=" https://www.facebook.com/BEATActiveThailand" target="_blank">
                                <img src="\assets\partner\footer\facebook.svg" alt="kids" />
                                <span style={{ paddingLeft: '10px' }}>  BEAT Active </span> </a></p>
                            <p className={styles.footer_textB}> <img src="\assets\partner\footer\ig.svg" alt="kids" /> @BEATACTIVE_</p>
                            <p className={styles.footer_textB}> <img src="\assets\partner\footer\twitter.svg" alt="kids" /> beatactive.thailand</p>

                        </div>
                    </Col>
                    <Col sm={{ span: 2, offset: 0 }}>
                        <div className={styles.footer_title} style={{ paddingTop: (width > 992) ? "0px" : "36px" }}> Help</div>

                        <div className={styles.footer_textB}  >
                            {/* <Link href="/floor-plan"> */}
                                <p className={styles.footer_textB}> Floor Plan </p>
                            {/* </Link> */}

                            <a href='https://www.bhirajburi.co.th/th/privacy-policy' target="_blank"
                                rel="noreferrer noopener" className="textpolicy" style={{ justifyContent: "start" }}>
                                <p className={styles.footer_textB}>Privacy Policy</p> </a>
                            <a href='https://www.bhirajburi.co.th/th/privacy-policy' target="_blank"
                                rel="noreferrer noopener" className="textpolicy" style={{ justifyContent: "start" }}>
                                <p className={styles.footer_textB}>Cookie Policy</p> </a>
                        </div>
                    </Col>
                    <Col className={(width < 992) ? "" : styles.boxRelative}
                        style={{
                            paddingRight: (width < 992) ? "16px" : "64px", paddingBottom: (width < 992) ? "45px" : "64px"
                            , marginBottom: "0px", display: "flex", alignItems: "end", justifyContent: "flex-end"
                        }} sm={1}>
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



