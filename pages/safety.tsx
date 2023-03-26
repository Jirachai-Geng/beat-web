import { GetStaticProps, NextPage } from 'next';
import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../styles/Safety.module.css'
import { Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import US_i18n from '../public/locales/us.json'
import TH_i18n from '../public/locales/th.json'
import CN_i18n from '../public/locales/cn.json'
import i18next from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import Menu from './components/menu_outhome';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Footer from './components/footer';

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

const resources = {
    us: {
        translation: US_i18n
    },
    th: {
        translation: TH_i18n
    },
    cn: {
        translation: CN_i18n
    }
};

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: 'us', // default language
    });


const Safety = () => {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const FooterRef = useRef(null)

    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)

    useEffect(() => {
        if (typeof router.query.lang === 'string') {
            i18n.changeLanguage(router.query.lang);
        }
    }, [router.query.lang]);


    return (
        <div >
            
            <Menu />
            <div className={styles.AppContent} style={{ padding:  (width > 992) ? '106px 0px' : '16px 0px' }}>
                <div style={{ paddingTop: (width > 992) ? '106px' : '16px' }}>
                    <span style={{ paddingLeft: (width > 992) ? '175px' : '16px', color: '#9E9E9E' }}> Home </span>
                    <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
                    <span style={{ color: '#FFFFFF' }}> Safety Standard </span>
                </div>

                <Container fluid style={{ paddingLeft: (width > 992) ? '175px' : '16px', paddingBottom: '88px' }}>
                    <Row>
                        <Col lg={5}>
                            <p className= {(width > 992) ? styles.text_title : styles.text_titleMobile}> {t('safety.title')}</p>
                            <p className= {(width > 992) ? styles.text : styles.textMobile}> {t('safety.text')}</p>

                        </Col>

                        <Col lg={7} className={ (width > 992) ? styles.background_safety : styles.background_safetyMobile}>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={styles.AppContent}>
                <footer ref={FooterRef} className={styles.footer}>
                    <Footer />
                </footer>
            </div>
        </div >
    );
};

export default Safety;