import React, { useState, useRef, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Event.module.css'
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


const Event = () => {
  const { t } = useTranslation();

  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)

  const [activeImage, setActiveImage] = useState(0);
  const [activityImage, setActivityImage] = useState(0);

  const containerRef = useRef(null);

  const setEventPrevious = () => {
    setActiveImage((activeImage) => activeImage - 1);
  };

  const setEventNext = () => {
    setActiveImage((activeImage) => activeImage + 1);
  };

  const setActivityPrevious = () => {
    setActivityImage((activityImage) => activityImage - 1);
  };

  const setActivityNext = () => {
    setActivityImage((activityImage) => activityImage + 1);
  };

  console.log(activityImage)


  return (
    <div >
      <Container fluid ref={containerRef} className={styles.containerbackgroud_event}>
        <Row fluid ref={componentRef} style={{ padding: (width > 992) ? "120px 120px" : "0 16px" }}>
          <Col lg={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            <button className={styles.button_left} onClick={() => setEventPrevious()}
              style={{ display: activeImage !== 0 ? '' : 'none' }}> </button>

          </Col>

          <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            <Row fluid style={{ width: '100%', height: '100%', display: activeImage === 0 ? '' : 'none' }}>
              <Col lg={6}>
                <img src="/assets/events/kids.svg" alt="kids" />
              </Col>
              <Col lg={6}>
                <span className={styles.textTitle}> KIDS </span>
                <p className={styles.text}> {t('event.text_kid')}</p>
              </Col>
            </Row>

            <Row fluid style={{ width: '100%', height: '100%', display: activeImage === 1 ? '' : 'none' }}>
              <Col lg={6}>
                <img src="/assets/events/novice.svg" alt="novice" />
              </Col>
              <Col lg={6}>
                <span className={styles.textTitle}> NOVICE </span>
                <p className={styles.text}> {t('event.text_novice')} </p>
              </Col>
            </Row>

            <Row fluid style={{ width: '100%', height: '100%', display: activeImage === 2 ? '' : 'none' }}>
              <Col lg={6}>
                <img src="/assets/events/advance.svg" alt="advance" />
              </Col>
              <Col lg={6}>
                <span className={styles.textTitle}> ADVANCE </span>
                <p className={styles.text}>  {t('event.text_advance')} </p>
              </Col>
            </Row>

            <Row fluid style={{ width: '100%', height: '100%', display: activeImage === 3 ? '' : 'none' }}>
              <Col lg={6}>
                <img src="/assets/events/extreme.svg" alt="extreme" />
              </Col>
              <Col lg={6}>
                <span className={styles.textTitle}> EXTREME </span>
                <p className={styles.text}>  {t('event.text_extreme')} </p>
              </Col>
            </Row>

            <Row fluid style={{ width: '100%', height: '100%', display: activeImage === 4 ? '' : 'none' }}>
              <Col lg={6}>
                <img src="/assets/events/thaifight.svg" alt="thaifight" />
              </Col>
              <Col lg={6}>
                <span className={styles.textTitle}> THAI FIGHT </span>
                <p className={styles.text}>  {t('event.text_thaifight')} </p>
              </Col>
            </Row>
          </Col>

          <Col lg={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <button className={styles.button_right} onClick={() => setEventNext()}
              style={{ display: activeImage !== 4 ? '' : 'none' }}> </button>
          </Col>

        </Row>

      </Container>

      <Container fluid>
        <Row fluid ref={componentRef} style={{ padding: (width > 992) ? "120px 120px" : "0 16px" }}>

          <Col >
            <p className={styles.title_activity}> Active zone</p>
            <p className={styles.text_activity}> {t('activity.text1')}</p>
            <p className={styles.text_activity}> {t('activity.text2')}</p>
            <p className={styles.text_activity}> {t('activity.text3')}</p>

          </Col>

          <Col >
            <Row fluid>
              <img src="/assets/events/activity/kid.svg" alt="kids" />

            </Row>

            <Row fluid style={{ width: '100%', display: activityImage === 0 ? '' : 'none' }}>
              <span className={styles.pic_title}> {t('activity.title_KIDS')} </span>
              <p className={styles.pic_text}> {t('activity.text_KIDS')} </p>
            </Row>

            <Row fluid style={{ width: '100%', display: activityImage === 1 ? '' : 'none' }}>
              <span className={styles.pic_title}> {t('activity.title_NOVICE')} </span>
              <p className={styles.pic_text}> {t('activity.text_NOVICE')} </p>
            </Row>

            <Row fluid style={{ width: '100%', display: activityImage === 2 ? '' : 'none' }}>
              <span className={styles.pic_title}> {t('activity.title_ADVANCE')} </span>
              <p className={styles.pic_text}> {t('activity.text_ADVANCE')} </p>
            </Row>

            <Row fluid style={{ width: '100%', display: activityImage === 3 ? '' : 'none' }}>
              <span className={styles.pic_title}> {t('activity.title_EXTREME')} </span>
              <p className={styles.pic_text}> {t('activity.text_EXTREME')} </p>
            </Row>

            <Row fluid style={{ width: '100%', display: activityImage === 4 ? '' : 'none' }}>
              <span className={styles.pic_title}> {t('activity.title_THAIFIGHT')} </span>
              <p className={styles.pic_text}> {t('activity.text_THAIFIGHT')} </p>
            </Row>

            <Row fluid>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <button className={styles.button_left} onClick={() => setActivityPrevious()}
                  style={{ display: activityImage !== 0 ? '' : 'none' }}> </button>

              </Col>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <button className={styles.button_left} onClick={() => setActivityNext()}
                  style={{ display: activityImage !== 4 ? '' : 'none' }}> </button>

              </Col>
            </Row>

          </Col>
        </Row>

      </Container>

    </div>
  );
};

export default Event;
