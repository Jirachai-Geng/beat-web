import { useEffect, useRef, useState } from 'react';
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
import ImageSlider from './components/ImageSlider';

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
const images2 = [
  '/assets/events/kids.svg', '/assets/events/novice.svg', '/assets/events/advance.svg',
  '/assets/events/extreme.svg', '/assets/events/thaifight.svg',
  '/assets/events/kids.svg', '/assets/events/novice.svg', '/assets/events/advance.svg',
  '/assets/events/extreme.svg', '/assets/events/thaifight.svg'
];

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

const Services: React.FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const FooterRef = useRef(null);

  useEffect(() => {
    if (typeof router.query.lang === 'string') {
      i18n.changeLanguage(router.query.lang);
    }
  }, [router.query.lang]);

  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)

  const title = [t('service.Team_Building'), t('service.Schools_Group'), t('service.Birthday_Party'), t('service.Event'),];
  const text = [t('service.Team_Building_text'), t('service.Schools_Group_text'), t('service.Birthday_Party_text'), t('service.Event_text'),];

  const food = [t('service.Food'), t('service.Schools_Group'), t('service.Birthday_Party'), t('service.Event'),];

  const [show, setShow] = useState(false);

  const [selectedImages, setSelectedImages] = useState(images.slice(0, 5));

  return (
    <div>
      <Menu />
      <div className={styles.AppContent} style={{ paddingTop: '106px' }}>
        <div style={{ paddingBottom: '38px' }}>
          <span style={{ paddingLeft: '175px', color: '#9E9E9E' }}> Home </span>
          <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
          <span style={{ color: '#FFFFFF' }}> Service </span>
        </div>

        <Container className={(width > 992) ? styles.scrollbar : styles.scrollbarMoblie}
          style={{ backgroundColor: 'dark', paddingLeft: (width > 992) ? '175px' : '60px' }}>
          {images.map((image, index) => (
            <Row key={index} style={{ width: '100%', height: '800px' }} ref={componentRef}>
              <Col lg={6}>
                {(width < 992) ? <p className={styles.titleMoblie}> {title[index]}</p> : null}
                <img style={{ height: (width > 992) ? 'auto' : '252px' }} src={image} alt={text[index]} />
              </Col>
              <Col lg={6}>
                {(width > 992) ? <p className={styles.title}> {title[index]}</p> : null}
                <p className={styles.text}>{text[index]}</p>
              </Col>
            </Row>
          ))}
        </Container>

        <Container style={{ width: '100%', paddingTop: '300px' , paddingBottom: '222px'}}>
          <Row fluid>
            <div>
              <div style={{ paddingLeft: '150px', paddingBottom: '88px' }}>
                <p className={styles.title_food}> {t('service.Food')} </p>
                <p className={styles.text}> {t('service.Food_text')}</p>
              </div>
              <div style={{ paddingLeft: '91px', paddingRight: '51px' }}>
                <ImageSlider images={images2} />
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


export default Services;