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
import { Modal } from 'react-responsive-modal';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageModalMobile from './components/ImageModalMobile';

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
  '/assets/services/team_building.webp',
  '/assets/services/schools_group.webp',
  '/assets/services/birthday_party.webp',
  '/assets/services/event.webp',
];
const images2 = [
  '/assets/services/foods/1.webp', '/assets/services/foods/2.webp', '/assets/services/foods/3.webp',
  '/assets/services/foods/4.webp', '/assets/services/foods/5.webp'
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

  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
          <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
          <span style={{ color: '#FFFFFF' }}> Service </span>
        </div>

        <Container className={(width > 992) ? styles.scrollbar : styles.scrollbarMoblie}
          style={{ backgroundColor: 'dark', paddingLeft: (width > 992) ? '175px' : '60px' }}>
          {images.map((image, index) => (
            <Row key={index} style={{ width: '100%', height: (width > 992) ? '800px' : 'auto' }} ref={componentRef}>
              <Col lg={6}>
                {(width < 992) ? <p className={styles.titleMoblie}> {title[index]}</p> : null}
                <img style={{ maxWidth: (width > 992) ? '422px' : '252px', paddingBottom: (width > 992) ? '0px' : '24px' }} src={image} alt={text[index]} />
              </Col>
              <Col lg={6}>
                {(width > 992) ? <p className={styles.title}> {title[index]}</p> : null}
                {(width > 992) ? <p className={styles.text}> {text[index]}</p> : <p className={styles.textMoblie}> {text[index]}</p>}
              </Col>
            </Row>
          ))}
        </Container>

        <Container style={{ width: '100%', paddingTop: (width > 992) ? '300px' : '110px', paddingBottom: '222px' }}>
          <Row fluid>
            <div>
              <div style={{ paddingLeft: (width > 992) ? '150px' : '60px', paddingBottom: '48px' }}>
                {(width > 992) ? <p className={styles.title_food}> {t('service.Food')} </p> : <p className={styles.title_foodMobile}> {t('service.Food')} </p>}
                {(width > 992) ? <p className={styles.text}> {t('service.Food_text')} </p> : <p className={styles.textMoblie}> {t('service.Food_text')} </p>}

              </div>

              {(width > 992) ?
                <div style={{ paddingLeft: '91px', paddingRight: '51px' }}>
                  <ImageSlider images={images2} />
                </div>
                : <div style={{ paddingLeft: '60px', display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll', paddingBottom: '15px' }}>
                  {images2.map((image, index) => (
                    <div key={index} onClick={() => handleClick(index)}>
                      <img src={image} alt={`Image ${index}`} style={{ maxHeight: '108px', marginRight: '16px' }} />
                    </div>

                  ))}
                  {showModal && (
                    <ImageModalMobile
                      title='Food & Beverage'
                      images={images2}
                      initialSlide={selectedImageIndex}
                      show={showModal}
                      onHide={handleCloseModal}
                    />
                  )}
                </div>
              }


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