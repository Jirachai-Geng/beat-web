import { GetStaticProps, NextPage } from 'next';
import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Safety.module.css'
import { Col, Row } from 'react-bootstrap';
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


const Safety = () => {
    const { t } = useTranslation();
    return (
        <div >
            <Container fluid style={{ paddingLeft: '175px', paddingBottom: '88px' }}>
                <Row>
                    <Col lg={5}>
                        <p className={styles.text_title}> {t('safety.title')}</p>
                        <p className={styles.text}> {t('safety.text')}</p>

                    </Col>

                    <Col lg={7} className={styles.background_safety}>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default Safety;