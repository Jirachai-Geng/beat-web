import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../styles/Services.module.css'
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
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


const FloorPLan = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const FooterRef = useRef(null)

  useEffect(() => {
    if (typeof router.query.lang === 'string') {
      i18n.changeLanguage(router.query.lang);
    }
  }, [router.query.lang]);


  return (
    <div>
      <Menu />
      <div className={styles.AppContent} style={{ paddingTop: '106px' }}>
        <div style={{ paddingBottom: '38px' }}>
          <span style={{ paddingLeft: '175px', color: '#9E9E9E' }}> Home </span>
          <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
          <span style={{ color: '#FFFFFF' }}> Floor Plan </span>
        </div>

        <Container style={{ backgroundColor: 'dark', paddingLeft: '125px',paddingBottom: '104px' }}>
          <p className={styles.title_food}> Floor Plan </p>
          <p className={styles.text}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit egestas augue interdum bibendum. Duis eget ex a tortor rhoncus pharetra a varius nunc. Nunc vestibulum commodo libero, vel venenatis nulla laoreet vitae. Donec non sem velit. Pellentesque non varius ex. Quisque eu mi sapien. Aliquam interdum pellentesque mauris ut blandit.</p>
          <img style={{maxWidth: '1097px', paddingTop: '20px'}} src='\assets\floorplan.jpg' alt='floorplan' />

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


export default FloorPLan;