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
            <Container fluid style={{ padding: (width > 992) ? "0px 64px" : "0 5px" }}>
                <Row className={styles.line}>
                    <img style={{ width: '103px', padding: (width > 992) ? '48px 0px 0px 0px' : "16px" }} src="\assets\BEAT LOGO-01.png" alt="kids" />

                </Row>
                <Row style={{ padding: (width > 992) ? "64px 0px 0px 0px" : "16px" }} ref={componentRef}>
                    <Col style={{ marginBottom: (width > 992) ? "52px" : "0px" }} sm={4} md={3} >
                        <div className={(width > 992) ? styles.footer_title : styles.footer_titleMobile}>
                            Location
                        </div>
                        <div >
                            <p className={(width > 992) ? styles.footer_text : styles.footer_textMobile}>
                                BEAT Active, BITEC BURI, 88 Debaratana Road Bangna Tai. Bangna, Bangkok 10260, Thailand
                            </p>
                            <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="\assets\partner\footer\calenda.svg" alt="calenda" style={{ paddingRight: '8px' }} />
                                    <span> Monday to Sunday </span>
                                </p>
                                <p className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="\assets\partner\footer\clock.svg" alt="clock" style={{ paddingRight: '8px' }} />
                                    <span> 9:00 AM - 9:00 PM </span>
                                </p>
                            </Row>
                        </div>
                    </Col>

                    <Col style={{ marginBottom: (width > 992) ? "52px" : "0px" }} sm={3} md={3} >
                        <div className={(width > 992) ? styles.footer_title : styles.footer_titleMobile}>
                            How to get here
                        </div>
                        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>

                            <p className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ display: 'flex', alignItems: 'start' }}>
                                <img src="\assets\partner\footer\p.svg" alt="calenda" style={{ paddingRight: '8px' }} />
                                <span> Private car can park at BITEC BURI parking lot </span>
                            </p>
                            <p className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ display: 'flex', alignItems: 'start' }}>
                                <img src="\assets\partner\footer\BTS.svg" alt="clock" style={{ paddingRight: '8px' }} />
                                <span>BTS Bangna Station Exit 1</span>
                            </p>
                        </Row>
                    </Col>

                    <Col style={{ marginBottom: (width > 992) ? "52px" : "0px" }} sm={2} md={3}>
                        <div className={(width > 992) ? styles.footer_title : styles.footer_titleMobile}>
                            Contact Us
                        </div>
                        <div>
                            <p> <a className={styles.no_decoration} href="https://line.me/R/ti/p/@861iezgb" target="_blank" rel="noreferrer noopener">
                                <img src="\assets\partner\footer\line.svg" alt="line" />
                                <span className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ paddingLeft: '10px' }}>  @beatactive </span> </a></p>

                            <p> <a className={styles.no_decoration} href="https://www.facebook.com/BEATActiveThailand/" target="_blank" rel="noreferrer noopener">
                                <img src="\assets\partner\footer\facebook.svg" alt="facebook" />
                                <span className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ paddingLeft: '10px' }}>  BEAT Active </span> </a></p>

                            <p> <a className={styles.no_decoration} href="https://www.instagram.com/beatactive.thailand/?fbclid=IwAR2qWKAY8CTyz6Ic1S8TSHTBUIaqWVsh251whXQzVuK4OJe70fmlYAPrXlg" target="_blank" rel="noreferrer noopener">
                                <img src="\assets\partner\footer\ig.svg" alt="ig" />
                                <span className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ paddingLeft: '10px' }}>  @BEATACTIVE_ </span> </a></p>

                            <p> <a className={styles.no_decoration} href="https://twitter.com/BEATACTIVE_" target="_blank" rel="noreferrer noopener">
                                <img src="\assets\partner\footer\twitter.svg" alt="twitter" />
                                <span className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ paddingLeft: '10px' }}>  beatactive.thailand </span> </a></p>

                            <p> <a className={styles.no_decoration} href="https://www.tiktok.com/@beatactive.thailand" target="_blank" rel="noreferrer noopener">
                                <img src="\assets\partner\footer\tiktok.png" style={{ maxWidth: '25px' }} alt="TikTok" />
                                <span className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ paddingLeft: '10px' }}>  @beatactive.thailand </span> </a></p>

                            <p> <a className={styles.no_decoration} href="https://www.youtube.com/channel/UCeQWunwLPdnq1sxKXnKCyQg" target="_blank" rel="noreferrer noopener">
                                <img src="\assets\partner\footer\youtube.png" style={{ maxWidth: '25px' }} alt="Youtube" />
                                <span className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ paddingLeft: '10px' }}>  BEAT Active </span> </a></p>

                            <p> <a className={styles.no_decoration} href="mailto:info@beatactivethailand.com" target="_blank" rel="noreferrer noopener">
                                <img src="\assets\partner\footer\email.png" style={{ maxWidth: '25px' }} alt="email" />
                                <span className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} style={{ paddingLeft: '10px' }}>  beatactivethailand </span> </a></p>

                        </div>
                    </Col>

                    <Col sm={{ span: 2, offset: 0 }} >
                        <div className={(width > 992) ? styles.footer_title : styles.footer_titleMobile}>
                            Help
                        </div>

                        <div className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile}   >
                            <a className="textpolicy" style={{ justifyContent: "start" }}>
                                <Link href="/floor-plan">
                                    <p className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} > Floor Plan </p>
                                </Link>
                            </a>

                            <a href='https://www.bhirajburi.co.th/th/privacy-policy' target="_blank"
                                rel="noreferrer noopener" className="textpolicy" style={{ justifyContent: "start" }}>
                                <p className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} >Privacy Policy</p> </a>
                            <a href='https://www.bhirajburi.co.th/th/privacy-policy' target="_blank"
                                rel="noreferrer noopener" className="textpolicy" style={{ justifyContent: "start" }}>
                                <p className={(width > 992) ? styles.footer_textB : styles.footer_textBMobile} >Cookies Policy</p> </a>
                        </div>
                    </Col>

                    <Col className={(width < 992) ? "" : styles.boxRelative}
                        style={{
                            paddingRight: (width < 992) ? "16px" : "64px", paddingBottom: (width < 992) ? "45px" : "64px"
                            , marginBottom: "0px", display: "flex", alignItems: "end", justifyContent: "flex-end"
                        }} sm={1}>
                        <Row className={(width < 992) ? styles.boxRelative : ""} style={{ position: "absolute" }}>
                            <div onClick={goToTop} style={{ cursor: "pointer" }}>
                                <img src='\assets\activity\icons\hide_all.svg' alt='btnGoTop' />
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>


        </div >
    );
};


export default Footer;



