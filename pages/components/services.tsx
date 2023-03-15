import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Services.module.css'
import { useTranslation } from 'react-i18next';
import { Col, Row, Modal, Carousel } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ImageSlider from './ImageSlider';

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
const Service = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (typeof router.query.lang === 'string') {
      i18n.changeLanguage(router.query.lang);
    }
  }, [router.query.lang]);

  const title = [t('service.Team_Building'), t('service.Schools_Group'), t('service.Birthday_Party'), t('service.Event'),];
  const text = [t('service.Team_Building_text'), t('service.Schools_Group_text'), t('service.Birthday_Party_text'), t('service.Event_text'),];

  const food = [t('service.Food'), t('service.Schools_Group'), t('service.Birthday_Party'), t('service.Event'),];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [selectedImages, setSelectedImages] = useState(images.slice(0, 5));
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + 5 >= images2.length) return;
    setStartIndex(startIndex + 5);
    setSelectedImages(images2.slice(startIndex + 5, startIndex + 10));
  };

  const handlePrev = () => {
    if (startIndex === 0) return;
    setStartIndex(startIndex - 5);
    setSelectedImages(images2.slice(startIndex - 5, startIndex));
  };

  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)

  return (
    <div style={{ width: '100%', paddingBottom: '222px', paddingTop: '20px' }}>
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

      <Container style={{ width: '100%', paddingTop: '300px' }}>
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
    </div >
  );
};


export default Service;