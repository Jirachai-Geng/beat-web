import { NextPage } from 'next';
import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Faq.module.css'
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
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


const Faq = () => {
  const { t } = useTranslation();

  return(
    <div >
      <Container fluid style={{ paddingLeft: '175px', paddingBottom: '88px'}}>
        <p className={styles.text_title}> {t('faq.title_whatBEAT')} </p>
        <p style={{paddingTop: '20px'}} className={styles.text}> {t('faq.text_whatBEAT')} </p>

        <p style={{paddingTop: '128px'}} className={styles.text_title}> FAQ </p>

        <p style={{color: '#FFFFFF', paddingTop: '20px', fontWeight: '600'}} className={styles.text}> {t('faq.text_q1')} </p>
        <p className={styles.text_aws}> {t('faq.text_aws1')} </p>

        <p style={{color: '#FFFFFF', fontWeight: '600'}} className={styles.text}> {t('faq.text_q2')} </p>
        <p className={styles.text_aws}> {t('faq.text_aws2')} </p>

        <p style={{color: '#FFFFFF', fontWeight: '600'}} className={styles.text}> {t('faq.text_q3')} </p>
        <p className={styles.text_aws}> {t('faq.text_aws3')} </p>

        <p style={{color: '#FFFFFF', fontWeight: '600'}} className={styles.text}> {t('faq.text_q4')} </p>
        <p className={styles.text_aws}> {t('faq.text_aws4')} </p>

        <p style={{color: '#FFFFFF', fontWeight: '600'}} className={styles.text}> {t('faq.text_q5')} </p>
        <p className={styles.text_aws}> {t('faq.text_aws5')} </p>
      </Container>
    </div >
  );
};


export default Faq;