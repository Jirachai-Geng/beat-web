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

const images = [
    '/assets/press/press_select.svg', '/assets/events/kids.svg', '/assets/events/novice.svg', '/assets/events/advance.svg'];


const useRouterTitle = (router: any) => {
    const [title, setTitle] = useState(router.query.title);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            const newTitle = new URL(url, window.location.href).searchParams.get('title');
            if (newTitle) {
                setTitle(newTitle);
            }
        };

        if (!title && typeof window !== "undefined") {
            setTitle(new URL(window.location.href).searchParams.get('title'));
        }

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router, title]);

    return title;
};


const PressSelect = () => {
    const router = useRouter();
    const showTitle = useRouterTitle(router);

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
                    <span style={{ color: '#FFFFFF' }}> {showTitle} </span>
                </div>

                <Container className={(width > 992) ? styles.scrollbar : styles.scrollbarMoblie}
                    style={{ backgroundColor: 'dark', paddingLeft: (width > 992) ? '125px' : '60px' }}>
                    <Row style={{ width: '100%', height: '800px' }} ref={componentRef} >
                        <Col lg={6}>
                            {(width < 992) ? <p className={styles.titleMoblie}> {showTitle} </p> : null}

                            <img style={{ height: (width > 992) ? '526px' : 'auto', width: '100%' }} src='\assets\press\press_select.svg' onClick={() => handleImageClick(0)} />

                            <div style={{
                                padding: '60px 0px', display: 'flex', flexWrap: 'nowrap'
                                , maxWidth: (width > 992) ? '526px' : 'auto'
                                , width: '100%'
                                , justifyContent: 'space-between'
                            }}>
                                {images.slice(1).map((image, index) => (
                                    <div key={index} onClick={() => handleImageClick(index)}>
                                        <img
                                            src={image}
                                            alt={`Image ${index}`}
                                            style={{ maxHeight: (width > 992) ? '222px' : '108px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Col>
                        {(width < 992) ? <ImageModalMobile
                            images={images}
                            initialSlide={selectedImageIndex}
                            title={showTitle}
                            show={showModal}
                            onHide={() => setShowModal(false)}
                        /> :
                            <ImageModal
                                images={images}
                                initialSlide={selectedImageIndex}
                                title={showTitle}
                                show={showModal}
                                onHide={() => setShowModal(false)}
                            />
                        }


                        <Col lg={6}>
                            {(width > 992) ? <p className={styles.title}> {showTitle}</p> : null}
                            <p className={styles.textSelect}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit egestas augue interdum bibendum. Duis eget ex a tortor rhoncus pharetra a varius nunc. Nunc vestibulum commodo libero, vel venenatis nulla laoreet vitae. Donec non sem velit. Pellentesque non varius ex. Quisque eu mi sapien. Aliquam interdum pellentesque mauris ut blandit. Curabitur nec semper est, et posuere est. Etiam suscipit, dolor eget dapibus finibus, velit lacus dictum mi, ac sodales dolor lacus quis eros. Nullam eget mi sed dui aliquet mollis. Nunc id facilisis eros, vehicula elementum est. Phasellus et Cras et efficitur ipsum, et aliquet est. Sed ut porta odio. Nam feugiat augue nulla, quis efficitur elit viverra ac. Donec finibus, ante id euismod fermentummagna non sem ultrices hendrerit et eget nisl. Donec egestas dignissim lacus a ultrices. Sed posuere vel metus eu auctor. Nullam egestas facilisis augue luctus pellentesque. Aliquam vitae purus vitae quam maximus elementum. Cras id rhoncus ante. Aenean sollicitudin risus vel posuere auctor. Duis quis tortor nec lacus varius scelerisque ac nec velit. Pellentesque at luctus sapien. Praesent et dignissim nisl. Integer sagittis, eros dictum facilisis maximus, leo velit fermentum est, eu euismod dui velit eu dui. Nunc sodales id nulla sit amet ultrices. Proin elementum velit eget libero euismod, eu laoreet turpis lacinia. Fusce rhoncus viverra nulla, ac facilisis nisl ornare et. Donec interdum libero a sollicitudin vehicula. Nullam at lectus et enim pulvinar cursus eget at arcu. Suspendisse lobortis accumsan ligula eu tincidunt. Cras tincidunt eros sit amet magna rutrum vestibulum.</p>
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
