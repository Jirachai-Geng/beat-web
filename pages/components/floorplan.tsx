import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Services.module.css'
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
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

const images = [
  '/assets/services/service1.png',
  '/assets/services/service1.png',
  '/assets/services/service1.png',
  '/assets/services/service1.png',
];

const FloorPLan = () => {
  const router = useRouter();
const { t, i18n } = useTranslation();

useEffect(() => {
        if (typeof router.query.lang === 'string') {
          i18n.changeLanguage(router.query.lang);
        }
      }, [router.query.lang]);
  const title = [ t('service.Team_Building'), t('service.Schools_Group'), t('service.Birthday_Party'), t('service.Event'),];
  const text = [ t('service.Team_Building_text'), t('service.Schools_Group_text'), t('service.Birthday_Party_text'), t('service.Event_text'),];

  return (
    <div style={{ width: '100%', paddingBottom: '222px', paddingTop: '20px' }}>
      <Container className={styles.scrollbar} style={{ backgroundColor: 'dark', paddingLeft: '175px' }}>
        {images.map((image, index) => (
          <Row key={index} style={{ width: '100%',height: '800px' }}>
            <Col lg={6}>
              <img src={image} alt={text[index]} />
            </Col>
            <Col lg={6}>
              <p className={styles.title}>{title[index]}</p>
              <p className={styles.text}>{text[index]}</p>
            </Col>
          </Row>
        ))}
      </Container>
    </div >
  );
};


export default FloorPLan;