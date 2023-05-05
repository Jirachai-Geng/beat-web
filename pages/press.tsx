import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../styles/Press.module.css'
import { Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import US_i18n from '../public/locales/us.json'
import TH_i18n from '../public/locales/th.json'
import CN_i18n from '../public/locales/cn.json'
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Menu from './components/menu_outhome';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Footer from './components/footer';
import Link from 'next/link';

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


const images = [
    '/assets/press/1_01.jpg',
    '/assets/press/2_01.jpg',
];


const Press = () => {
    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const FooterRef = useRef(null)

    useEffect(() => {
        if (typeof router.query.lang === 'string') {
            i18n.changeLanguage(router.query.lang);
        }
    }, [router.query.lang]);

    const title = [t('press.press1_title'), t('press.press2_title')];
    const text = [t('press.press1_text'), t('press.press2_text')];

    const onNewpage = (page: any) => {
        router.push({
            pathname: page,
            query: { lang: i18next.language }
        });
    }
    return (
        <div >
            <Menu />

            <div className={styles.AppContent}>
                <div style={{ paddingTop: (width > 992) ? '106px' : '16px', paddingBottom: '38px' }}>
                    <span style={{ paddingLeft: (width > 992) ? '175px' : '60px', color: '#9E9E9E', cursor: 'pointer' }}
                        onClick={() => { onNewpage('/') }}> Home </span>
                    <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
                    <span style={{ color: '#FFFFFF' }}> Press </span>
                </div>

                <Container className={(width > 992) ? styles.scrollbar : styles.scrollbarMoblie}
                    style={{ backgroundColor: 'dark', paddingLeft: (width > 992) ? '175px' : '60px' }}>
                    {images.map((image, index) => (
                        <Row key={index} style={{ width: '100%', height: '800px' }} ref={componentRef} >
                            <Col lg={6}>
                                {(width < 992) ? <p className={styles.titleMoblie}> {title[index]}</p> : null}

                                <img style={{ maxWidth: (width > 992) ? '422px' : '352px' }} src={image} alt={text[index]} />
                            </Col>
                            <Col lg={6}>
                                {(width > 992) ? <p className={styles.title}> {title[index]}</p> : null}
                                {/* <p className={styles.text}>{text[index]}</p> */}
                                <p className={styles.text} dangerouslySetInnerHTML={{ __html: text[index] }}></p>

                                <p style={{ paddingTop: '50px' }} className={styles.text}>
                                <Link href={`/press_select?index=${index+1}`}>
                                        <a style={{ textDecoration: 'none' }}>Read more ...</a>
                                    </Link>
                                </p>

                            </Col>
                        </Row>
                    ))}

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


export default Press;