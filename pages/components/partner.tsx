import { Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Partner.module.css'
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)

    return (
        <div style={{ width: '100%', padding: "0px !important;" }}>
            <Container fluid style={{ paddingLeft: '175px', paddingBottom: '88px' }} className={styles.containerbackgroud_price}>
                <Row>
                    <Col lg={7}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' ,paddingBottom: '10px'}}>
                            <p className={styles.price_title}> Price</p>
                            <p className={styles.price_text}> ( จ-ศ / ส-อา และวันหยุดนขัตฤกษ์)</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={styles.price_textB}>Kids</p>
                            <p className={styles.price_text}>240 / 300</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={styles.price_textB}>Sport Novice</p>
                            <p className={styles.price_text}>320 / 420</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={styles.price_textB}>Sport Advance</p>
                            <p className={styles.price_text}>480 / 680</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={styles.price_textB}>Sport Extreme</p>
                            <p className={styles.price_text}>550 / 750</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={styles.price_textB}>THAI FIGHT League (Weekend)</p>
                            <p className={styles.price_text}>1,250 / 2,000</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={styles.price_textB}>THAI FIGHT psysport</p>
                            <p className={styles.price_text}>1,250</p>
                        </div>

                    </Col>

                    <Col lg={5} >
                        <img className={`${styles.responsive} mx-auto`} style={{ height: (width > 922) ? "300px" : "200px" }} src="/assets/price.svg" alt="" />

                    </Col>
                </Row>
            </Container>

            <Container>
                <Row ref={componentRef} className={styles.line} style={{ padding: (width > 992) ? "0px 64px" : "0 16px" }}>
                    <Col lg={3}>
                        <div className={(width > 922) ? styles.textParner : styles.textParnerMobile}>
                            <p style={{ textAlign: (width > 1281) ? "start" : "center", fontSize: (width > 1350) ? "48px" : (width > 1281) ? "36px" : "24px" }}>Our </p>
                            <p style={{ textAlign: (width > 1281) ? "start" : "center", fontSize: (width > 1350) ? "48px" : (width > 1281) ? "36px" : "24px" }}>Partner </p>
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
            <Container >
                <Row className={styles.line} style={{ paddingTop: '20px' }}>
                    <Col className="d-flex align-items-start">
                        <p className={styles.textMap}>
                            MAP
                        </p>
                    </Col>
                </Row>
                <Row>
                    <img src='/assets/map.png' className={styles.showmap} alt="logo" />
                </Row>
            </Container>
            <Container>
                <Row className={styles.line} style={{ paddingTop: '64px' }}>

                </Row>
            </Container>

        </div >
    );
};


export default Partner;



