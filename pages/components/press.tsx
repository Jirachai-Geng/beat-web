import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Press.module.css'
import { Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

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
    '/assets/services/service1.png',
    '/assets/services/service1.png',
    '/assets/services/service1.png',
    '/assets/services/service1.png',
];

const Press = () => {
    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)
    const router = useRouter();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (typeof router.query.lang === 'string') {
          i18n.changeLanguage(router.query.lang);
        }
      }, [router.query.lang]);
      


    const title = [t('press.press1_title'), t('press.press2_title'), t('press.press3_title'), t('press.press4_title'), t('press.press5_title')];
    const text = [t('press.press1_text'), t('press.press2_text'), t('press.press3_text'), t('press.press4_text'), t('press.press5_text')];


    return (
        <div style={{ width: '100%', paddingBottom: '222px', paddingTop: '20px' }}>
            <Container className={(width > 992) ? styles.scrollbar : styles.scrollbarMoblie}
                style={{ backgroundColor: 'dark', paddingLeft: (width > 992) ? '175px' : '60px' }}>
                {images.map((image, index) => (
                    <Row key={index} style={{ width: '100%', height: '800px' }} ref={componentRef} >
                        <Col lg={6}>
                            {(width < 992) ? <p className={styles.titleMoblie}> {title[index]}</p> : null}

                            <img style={{ height: (width > 992) ? 'auto' : '252px' }} src={image} alt={text[index]} />
                        </Col>
                        <Col lg={6}>
                            {(width > 992) ? <p className={styles.title}> {title[index]}</p> : null}
                            <p className={styles.text}>{text[index]}</p>

                            <p style={{ paddingTop: '50px' }} className={styles.text}> showmore... </p>

                        </Col>
                    </Row>
                ))}

            </Container>
        </div >
    );
};


export default Press;