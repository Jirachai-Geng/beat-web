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

  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)

  useEffect(() => {
    if (typeof router.query.lang === 'string') {
      i18n.changeLanguage(router.query.lang);
    }
  }, [router.query.lang]);

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
        <div style={{ paddingTop: (width > 992) ? '106px' : '16px', paddingBottom: (width > 992) ? '38px' : '16px' }}>
          <span style={{ paddingLeft: (width > 992) ? '175px' : '60px', color: '#9E9E9E', cursor: 'pointer' }}
            onClick={() => { onNewpage('/') }}> Home </span>
          <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
          <span style={{ color: '#FFFFFF' }}> Floor Plan </span>
        </div>

        <Container fluid style={{ backgroundColor: 'dark', paddingLeft: (width > 992) ? '175px' : '40px' }}>
          <Row style={{ width: '100%' }} ref={componentRef}>
            <div>
              <p className={(width > 992) ? styles.title_food : styles.title_foodMobile}> Floor Plan </p>
              <p className={(width > 992) ? styles.text : styles.textMobileFloorplan}> {t('floor_plan.title')} </p>
              <img className={(width > 992) ? styles.imgFloorplan : styles.imgMobileFloorplan} src='\assets\floorplan.jpg' alt='floorplan' />
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


export default FloorPLan;