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

  return (
    <div >
      <Menu />
      <div className={styles.AppContent} style={{ paddingTop: '106px' }}>
        <div style={{ paddingBottom: '38px' }}>
          <span style={{ paddingLeft: '175px', color: '#9E9E9E' }}> Home </span>
          <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
          <span style={{ color: '#FFFFFF' }}> FAQ </span>
        </div>
        <Container fluid style={{ paddingLeft: '175px', paddingBottom: '88px' }}>
          <p className={styles.text_title}> {t('faq.title_whatBEAT')} </p>
          <p style={{ paddingTop: '20px' }} className={styles.text}> {t('faq.text_whatBEAT')} </p>

          <p style={{ paddingTop: '128px' }} className={styles.text_title}> FAQ </p>
          <p style={{ color: '#FFFFFF', paddingTop: '20px', fontWeight: '600' }} className={styles.text}> {t('faq.text_q1')} </p>

          <p style={{ color: '#FFFFFF', fontWeight: '600' }} className={styles.text}> {t('faq.text_q2')} </p>
          <p className={styles.text_aws}> {t('faq.text_aws2')} </p>

          <p style={{ color: '#FFFFFF', fontWeight: '600' }} className={styles.text}> {t('faq.text_q3')} </p>
          <p className={styles.text_aws}> {t('faq.text_aws3')} </p>

          <p style={{ color: '#FFFFFF', fontWeight: '600' }} className={styles.text}> {t('faq.text_q4')} </p>
          <p className={styles.text_aws}> {t('faq.text_aws4')} </p>

          <p style={{ color: '#FFFFFF', fontWeight: '600' }} className={styles.text}> {t('faq.text_q5')} </p>
          <p className={styles.text_aws}> {t('faq.text_aws5')} </p>
        </Container>

        <div className={styles.AppContent}>
          <footer ref={FooterRef} className={styles.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    </div >
  );
};


export default Faq;