import { Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Partner.module.css'
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

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
    const router = useRouter();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (typeof router.query.lang === 'string') {
            i18n.changeLanguage(router.query.lang);
        }
    }, [router.query.lang]);

    const containerRef = useRef(null);
    const { width, height } = useContainerDimensions(containerRef)

    return (
        <div >
            <Container fluid style={{ width: '100%', padding: (width > 992) ? "120px 120px 175px 88px" : "0 16px 72px" }}
                ref={containerRef} className={styles.containerbackgroud_price}>
                <Row>
                    <Col lg={8}>
                        {
                            ((width > 992) ? <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}>
                                <p className={styles.price_title} > Price </p>
                                <p className={styles.price_text} > {t('price.Price_late')}  </p>
                            </div>
                                :
                                <div>
                                    <p className={styles.price_titleMobile} > Price</p>
                                    <p className={styles.price_textMobile} > {t('price.Price_late')}  </p>
                                </div>
                            )}


                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={(width > 992) ? styles.price_textB : styles.price_textBMobile}> {t('price.Kid')} </p>
                            <p className={(width > 992) ? styles.price_text : styles.price_textMobile} >{t('price.Price_kid')}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={(width > 992) ? styles.price_textB : styles.price_textBMobile}> {t('price.Sport_Novice')}</p>
                            <p className={(width > 992) ? styles.price_text : styles.price_textMobile} >{t('price.Price_Sport_Novice')}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={(width > 992) ? styles.price_textB : styles.price_textBMobile}>{t('price.Sport_Advance')}</p>
                            <p className={(width > 992) ? styles.price_text : styles.price_textMobile} >{t('price.Price_Sport_Advance')}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={(width > 992) ? styles.price_textB : styles.price_textBMobile}>{t('price.Sport_Extreme')}</p>
                            <p className={(width > 992) ? styles.price_text : styles.price_textMobile} >{t('price.Price_Sport_Extreme')}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={(width > 992) ? styles.price_textB : styles.price_textBMobile}>{t('price.THAI_FIGHT_Weekend')}</p>
                            <p className={(width > 992) ? styles.price_text : styles.price_textMobile} >{t('price.Price_THAI_FIGHT_Weekend')}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={(width > 992) ? styles.price_textB : styles.price_textBMobile}>{t('price.THAI_FIGHT')}</p>
                            <p className={(width > 992) ? styles.price_text : styles.price_textMobile} >{t('price.Price_THAI_FIGHT')}</p>
                        </div>

                    </Col>

                    <Col lg={4} >
                        <img className={`${styles.responsive} mx-auto`} style={{ height: (width > 922) ? "300px" : "200px" }} src="/assets/price.svg" alt="" />
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row className={styles.line} style={{ padding: (width > 992) ? "0px 64px" : "0 16px" }}>
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
                    <img src='/assets/map.jpg' className={styles.showmap} alt="logo" />
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



