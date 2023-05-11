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
import { json } from 'stream/consumers';
import ImageModalMobile from './components/ImageModalMobile';
import ImageModal from './components/ImageModal';

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

const imagePress1 = ['/assets/press/1_01.webp', '/assets/press/1_02.webp', '/assets/press/1_03.webp', '/assets/press/1_04.webp'];


const useRouterIndex = (router: any) => {
    const [index, setIndex] = useState(router.query.index);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            const newIndex = new URL(url, window.location.href).searchParams.get('index');
            if (newIndex) {
                setIndex(newIndex);
            }
        };

        if (!index && typeof window !== "undefined") {
            setIndex(new URL(window.location.href).searchParams.get('index'));
        }

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router, index]);

    return index;
};

const useTitleAndText = (index: number) => {
    const { t } = useTranslation();
    const title = t(`press.press${index}_title`);
    const text = t(`press.press${index}_text`);

    return { title, text };
};


const PressSelect = () => {
    const router = useRouter();
    const index = useRouterIndex(router);
    const { title, text } = useTitleAndText(parseInt(index));
    let images: any[] = ['/assets/press/2_01.webp', '/assets/press/2_02.webp', '/assets/press/2_03.webp', '/assets/press/2_04.webp']
    let imagesTop = '/assets/press/2_01.webp'
    if (index === '1') {
        images = imagePress1
        imagesTop = '/assets/press/1_01.webp'
    }

    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)
    const FooterRef = useRef(null)
    const onNewpage = (page: any) => {
        router.push({
            pathname: page,
            query: { lang: i18next.language }
        });
    }

    return (
        <div>
            <Menu />
            <div className={styles.AppContent}>
                <div style={{ paddingTop: (width > 992) ? '106px' : '16px', paddingBottom: '38px' }}>
                    <span style={{ paddingLeft: (width > 992) ? '175px' : '60px', color: '#9E9E9E', cursor: 'pointer' }}
                        onClick={() => { onNewpage('/') }}> Home </span>
                    <span style={{ padding: '0px 23px', color: '#9E9E9E' }}> {'>'} </span>
                    <span style={{ color: '#9E9E9E', cursor: 'pointer' }} onClick={() => { onNewpage('/press') }}> Press </span>
                    <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
                    <span style={{ color: '#FFFFFF' }}> {title} </span>
                </div>

                <Container className={(width > 992) ? styles.scrollbar : styles.scrollbarMoblie}
                    style={{ backgroundColor: 'dark', paddingLeft: (width > 992) ? '125px' : '20px' }}>
                    <Row style={{ width: '100%', height: '800px' }} ref={componentRef} >
                        <Col lg={6} style={{ textAlign: 'center' }}>
                            {(width < 992) ? <p className={styles.titleMoblie}> {title} </p> : null}

                            <img style={{ maxWidth: (width > 992) ? '422px' : '252px', height: 'auto' }} src={imagesTop} onClick={() => handleImageClick(0)} />

                            <div style={{
                                padding: (width > 992) ? '60px 0px' : '20px 0px', display: 'flex', flexWrap: 'nowrap'
                                , maxWidth: (width > 992) ? '526px' : 'auto'
                                , justifyContent: 'space-between'
                            }}>
                                {images.slice(1).map((image, index) => (
                                    <div key={index} onClick={() => handleImageClick(index)}>
                                        <img
                                            src={image}
                                            alt={`Image ${index}`}
                                            style={{ maxWidth: (width > 992) ? '165px' : '115px', textAlign: 'center' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Col>
                        {(width < 992) ? <ImageModalMobile
                            images={images}
                            initialSlide={selectedImageIndex}
                            title={title}
                            show={showModal}
                            onHide={() => setShowModal(false)}
                        /> :
                            <ImageModal
                                images={images}
                                initialSlide={selectedImageIndex}
                                title={title}
                                show={showModal}
                                onHide={() => setShowModal(false)}
                            />
                        }


                        <Col lg={6}>
                            {(width > 992) ? <p className={styles.title}> {title}</p> : null}
                            <p className={styles.textSelect} dangerouslySetInnerHTML={{ __html: text }}></p>

                            {/* <p className={styles.textSelect}> {showText} </p> */}
                        </Col>

                    </Row>

                </Container>
            </div>

            <div className={styles.AppContent}>
                <footer ref={FooterRef} className={styles.footer}>
                    <Footer />
                </footer>
            </div>
        </div>
    );
};

export default PressSelect;
