import React, { useState, useRef, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Event.module.css'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (typeof router.query.lang === 'string') {
      i18n.changeLanguage(router.query.lang);
    }
  }, [router.query.lang]);

  const images = [
    '/assets/events/kids.svg', '/assets/events/novice.svg', '/assets/events/advance.svg',
    '/assets/events/extreme.svg', '/assets/events/thaifight.svg'
  ];

  const title = [
    'KIDS', 'NOVICE', 'ADVANCE', 'EXTREME', 'THAIFIGHT'
  ];

  const text = [
    t('event.text_kid'), t('event.text_novice'), t('event.text_advance'), t('event.text_extreme'), t('event.text_thaifight')
  ];

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

  const events = [
    {
      src: "/assets/events/kids.svg",
      alt: "kids",
      title: "KID",
      text: t("event.text_kid")
    },
    {
      src: "/assets/events/novice.svg",
      alt: "novice",
      title: "NOVICE",
      text: t("event.text_novice")
    },
    {
      src: "/assets/events/advance.svg",
      alt: "advance",
      title: "ADVANCE",
      text: t("event.text_advance")
    },
    {
      src: "/assets/events/extreme.svg",
      alt: "extreme",
      title: "EXTREME",
      text: t("event.text_extreme")
    },
    {
      src: "/assets/events/thaifight.svg",
      alt: "thaifight",
      title: "THAI FIGHT",
      text: t("event.text_thaifight")
    }
  ];

  const activities = [
    {
      title: t("activity.title_KIDS"),
      text: t("activity.text_KIDS")
    },
    {
      title: t("activity.title_NOVICE"),
      text: t("activity.text_NOVICE")
    },
    {
      title: t("activity.title_ADVANCE"),
      text: t("activity.text_ADVANCE")
    },
    {
      title: t("activity.title_EXTREME"),
      text: t("activity.text_EXTREME")
    },
    {
      title: t("activity.title_THAIFIGHT"),
      text: t("activity.text_THAIFIGHT")
    },
  ];

  return (
    <div style={{ width: '100%', paddingBottom: (width > 992) ? '0px' : '72px', paddingTop: '20px' }}>
      <Container fluid ref={containerRef}>
        <Row fluid ref={componentRef} style={{
          padding: (width > 992) ? "120px 120px" : "0 16px",
          minHeight: (width > 992) ? '800px' : '560px'
        }}>
          {
            ((width > 992) ? <Col lg={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
              <button className={styles.button_left} onClick={() => setEventPrevious()}
                style={{ display: activeImage !== 0 ? '' : 'none' }}>
                <img src='/assets/icons/prev-icon.svg' alt='prev' />
              </button>
            </Col> : null)
          }

          <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            {
              ((width > 992) ?
                events.map((event, index) => (
                  <Row fluid key={index} style={{ width: '100%', height: '100%', display: activeImage === index ? '' : 'none' }}>
                    <Col lg={6}>
                      <img style={{ height: 'auto', display: 'block', margin: '0 auto' }}
                        src={event.src} alt={event.alt} />
                    </Col>
                    <Col lg={6}>
                      <span className={styles.textTitle} >{event.title}</span>
                      <p className={styles.text}>{event.text}</p>
                    </Col>
                  </Row>
                ))
                :
                events.map((event, index) => (
                  <Row fluid key={index} style={{ width: '100%', height: '100%', display: activeImage === index ? '' : 'none' }}>
                    <Col>
                      <Row fluid >
                        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span className={styles.texttitleMobile}>{event.title}</span>
                        </Col>
                      </Row>


                      <Row fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Col style={{ width: '10%' }}> <button className={styles.button_left} onClick={() => setEventPrevious()}
                          style={{ display: activeImage !== 0 ? '' : 'none' }}>
                          <img src='/assets/icons/prev-icon.svg' alt='prev' />
                        </button></Col>
                        <Col style={{ width: '70%' }}> <img style={{ height: '252px', display: 'block', margin: '0 auto' }}
                          src={event.src} alt={event.alt} /></Col>
                        <Col style={{ width: '10%' }}> <button className={styles.button_right} onClick={() => setEventNext()}
                          style={{ display: activeImage !== events.length - 1 ? '' : 'none' }}>
                          <img style={{ height: 'auto', display: 'block', margin: '0 auto' }}
                            src='/assets/icons/next-icon.svg' alt='next' />
                        </button></Col>
                      </Row>

                      <p className={styles.textMobile}>{event.text}</p>
                    </Col>

                  </Row>
                ))
              )
            }
          </Col>

          {
            ((width > 992) ? <Col lg={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
              <button className={styles.button_right} onClick={() => setEventNext()}
                style={{ display: activeImage !== events.length - 1 ? '' : 'none' }}>
                <img style={{ height: 'auto', display: 'block', margin: '0 auto' }}
                  src='/assets/icons/next-icon.svg' alt='next' />
              </button>
            </Col> : null)
          }

        </Row>


      </Container>

      <Container fluid>
        <Row fluid ref={componentRef} style={{ padding: (width > 992) ? "120px 120px" : "0 16px" }}>
          <Col>
            <p className={(width > 992) ? styles.title_activity : styles.texttitleMobile}> Active zone</p>
            <p className={(width > 992) ? styles.text_activity : styles.textMobile} > {t('activity.text1')}</p>
            <p className={(width > 992) ? styles.text_activity : styles.textMobile}> {t('activity.text2')}</p>
            <p className={(width > 992) ? styles.text_activity : styles.textMobile}> {t('activity.text3')}</p>
          </Col>
          <Col>
            <Row fluid>
              <img src="/assets/events/activity/kid.svg" alt="kids" />
            </Row>
            {
              activities.map((activity, index) => (
                <Row fluid key={index} style={{ width: '100%', display: activityImage === index ? '' : 'none' }}>
                  <span className={styles.pic_title}>{activity.title}</span>
                  <p className={styles.pic_text}>{activity.text}</p>
                </Row>
              ))
            }
            <Row fluid style={{ display: 'flex', justifyContent: 'start' }}>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <button className={styles.button_left} onClick={() => setActivityPrevious()}
                  style={{ display: activityImage !== 0 ? '' : 'none' }}>
                  <img src='/assets/icons/prev-icon.svg' alt='prev' />
                </button>
              </Col>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <button className={styles.button_left} onClick={() => setActivityNext()}
                  style={{ display: activityImage !== activities.length - 1 ? '' : 'none' }}>
                  <img src='/assets/icons/next-icon.svg' alt='next' />
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>


    </div>
  );
};

export default Event;
