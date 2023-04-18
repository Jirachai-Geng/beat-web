import { NextPage } from 'next';
import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../styles/Faq.module.css'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import US_i18n from '../public/locales/us.json'
import TH_i18n from '../public/locales/th.json'
import CN_i18n from '../public/locales/cn.json'
import { initReactI18next } from 'react-i18next';
import Menu from './components/menu_outhome';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Footer from './components/footer';
import i18next from 'i18next';
import { Col, Row } from 'react-bootstrap';
import { colors } from '@mui/material';

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

const Faq = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const FooterRef = useRef(null)

  useEffect(() => {
    if (typeof router.query.lang === 'string') {
      i18n.changeLanguage(router.query.lang);
    }
  }, [router.query.lang]);

  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)

  const onNewpage = (page: any) => {
    router.push({
      pathname: page,
      query: { lang: i18next.language }
    });
  }
  return (
    <div >
      <Menu />
      <div className={styles.AppContent} >
        <div style={{ paddingTop: (width > 992) ? '106px' : '16px', paddingBottom: '38px' }}>
          <span style={{ paddingLeft: (width > 992) ? '175px' : '60px', color: '#9E9E9E', cursor: 'pointer' }}
            onClick={() => { onNewpage('/') }}> Home </span>
          <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
          <span style={{ color: '#FFFFFF' }}> FAQ </span>
        </div>

        <Container style={{ width: '100%', paddingBottom: '222px' }}>
          <Row fluid ref={componentRef}>
            <div style={{ paddingLeft: (width > 992) ? '125px' : '24px', paddingBottom: '48px' }}>
              <p className={(width > 992) ? styles.text_title : styles.text_titleMoblie}> {t('faq.title_whatBEAT')} </p>

              <p style={{ paddingTop: '20px' }} className={(width > 992) ? styles.text : styles.textMoblie}> {t('faq.text_whatBEAT')} </p>

              <p style={{ paddingTop: (width > 992) ? '128px' : '64px' }} className={(width > 992) ? styles.text_title : styles.text_titleMoblie}> FAQ </p>

              <div style={{ display: "flex", alignItems: "start" }}>
                <div className={styles.text_q}> Q: </div>
                <div className={(width > 992) ? styles.text : styles.textMoblie}> {t('faq.text_q1')} </div>
              </div>
              <div style={{ display: "flex", alignItems: "start" }}>
                <div className={styles.text_q} style={{ color: '#CCCCCC' }}> A: </div>
                <div className={(width > 992) ? styles.text_aws : styles.text_awsMobile}> {t('faq.text_aws1')} </div>
              </div>

              <div style={{ display: "flex", alignItems: "start" }}>
                <div className={styles.text_q}> Q: </div>
                <div className={(width > 992) ? styles.text : styles.textMoblie}> {t('faq.text_q2')} </div>
              </div>
              <div style={{ display: "flex", alignItems: "start" }}>
                <div className={styles.text_q} style={{ color: '#CCCCCC' }}> A: </div>
                <div className={(width > 992) ? styles.text_aws : styles.text_awsMobile}> {t('faq.text_aws2')} </div>
              </div>

              <div style={{ display: "flex", alignItems: "start" }}>
                <div className={styles.text_q}> Q: </div>
                <div className={(width > 992) ? styles.text : styles.textMoblie}> {t('faq.text_q3')} </div>
              </div>
              <div style={{ display: "flex", alignItems: "start" }}>
                <div className={styles.text_q} style={{ color: '#CCCCCC' }}> A: </div>
                <div className={(width > 992) ? styles.text_aws : styles.text_awsMobile}> {t('faq.text_aws3')} </div>
              </div>

              <div style={{ display: "flex", alignItems: "start" }}>
                <div className={styles.text_q}> Q: </div>
                <div className={(width > 992) ? styles.text : styles.textMoblie}> {t('faq.text_q4')} </div>
              </div>
              <div style={{ display: "flex", alignItems: "start" }}>
                <div className={styles.text_q} style={{ color: '#CCCCCC' }}> A: </div>
                <div className={(width > 992) ? styles.text_aws : styles.text_awsMobile}> {t('faq.text_aws4')} </div>
              </div>

              <div style={{ display: "flex", alignItems: "start" }}>
                <div className={styles.text_q}> Q: </div>
                <div className={(width > 992) ? styles.text : styles.textMoblie}> {t('faq.text_q5')} </div>
              </div>
              <div style={{ display: "flex", alignItems: "start" }}>
                <div className={styles.text_q} style={{ color: '#CCCCCC' }}> A: </div>
                <div className={(width > 992) ? styles.text_aws : styles.text_awsMobile}> {t('faq.text_aws5')} </div>
              </div>
            </div>
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


export default Faq;