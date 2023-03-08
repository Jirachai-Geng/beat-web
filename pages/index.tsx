import type { InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import Game from './components/game'
import Faq from './components/faq'
import Carrer from './components/carrer';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './components/footer';
import Partner from './components/partner';
import Event from "./components/event";
import { Tooltip } from 'react-bootstrap';
import Head from 'next/head'
import Beyond from './components/beyond';
import i18n from 'i18next';
import Safety from './components/safety';
import Activity from './components/activity';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import US_i18n from '../public/locales/us.json' 
import TH_i18n from '../public/locales/th.json' 
import CN_i18n from '../public/locales/cn.json' 

const SelectedLanguage = (language: string) => {
  i18n.changeLanguage(language);
}
const scrollToFoter = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToHome = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToCareer = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)

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


const Home = () => {

  const HomeRef = useRef(null)
  const FooterRef = useRef(null)
  const CareerRef = useRef(null)

  let [onHome, setOnHome] = useState(true);
  let [onFaq, setOnFaq] = useState(false);
  let [onSafety, setOnSafety] = useState(false);

  const ScrollHome = () => {
    if (onHome) {
      scrollToHome(HomeRef)
    } else {
      checkOnPage('home'),
        setTimeout(() => {
          scrollToHome(HomeRef)
        }, 1000);
    }
  }
  const ScrollCareer = () => {
    if (onHome) {
      scrollToCareer(CareerRef)
    } else {
      checkOnPage('home'),
        setTimeout(() => {
          scrollToCareer(CareerRef)
        }, 1000);
    }
  }
  const ScrollFooter = () => {
    if (onHome) {
      scrollToFoter(FooterRef)
    } else {
      checkOnPage('home'),
        setTimeout(() => {
          scrollToFoter(FooterRef)
        }, 1000);
    }
  }

  const checkOnPage = (name: String) => {
    if (name === 'faq') {
      setOnHome(false)
      setOnFaq(true)
      setOnSafety(false)
    } else if (name === 'safety') {
      setOnHome(false)
      setOnFaq(false)
      setOnSafety(true)
    } else {
      setOnHome(true)
      setOnFaq(false)
      setOnSafety(false)

    }
  }

  let [showLang, setShowLang] = useState(false);
  let [showLangMobile, setShowLangMobile] = useState(false);

  const SelectedLanguage = (language: any) => {
    i18n.changeLanguage(language);
  }

  return (
    <div>
      <Head>
        <title>BEAT Active</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar expand="lg">
        <Container className="paddingContainer" fluid ref={HomeRef}>
          <Navbar.Brand><img src='/assets/logo.svg' onClick={ScrollHome} className="App-logo" alt="logo" /> </Navbar.Brand>

          <div className={styles.dropdown} style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <div onClick={() => setShowLangMobile(!showLangMobile)} className={styles.dropbtn} id='lingo-mobile'>
              <img className={styles.img_languageSelectShow} src="/assets/pic_i18/America.svg" alt="" />
            </div>
            {(showLangMobile) ?
              <div className={styles.dropdown_contentMobile} style={{ display: "block" }}>
                <a onClick={() => { setShowLangMobile(!showLangMobile), SelectedLanguage('us') }} href="#">
                  <img className={styles.img_languageSelect} src="/assets/pic_i18/America.svg" alt="" />
                  <span className={styles.text_languageSelectMobile}>English (US)</span>
                </a>

                <a onClick={() => { setShowLangMobile(!showLangMobile), SelectedLanguage('th') }} href="#">
                  <img className={styles.img_language} src="/assets/pic_i18/Thai.svg" alt="" />
                  <span className={styles.text_languageMobile}>ภาษาไทย</span>
                </a>

                <a onClick={() => { setShowLangMobile(!showLangMobile), SelectedLanguage('cn') }} href="#">
                  <img className={styles.img_language} src="/assets/pic_i18/China.svg" alt="" />
                  <span className={styles.text_languageMobile}>简体中文</span>
                </a>
              </div>
              : null}
          </div>

          <Navbar.Collapse id="responsive-navbar-nav" className="ContainRight">
            <Nav className="size-menu text-center">
              <Nav.Link className={styles.text_link} onClick={ScrollHome}> Home </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={() => { checkOnPage('service') }}> Service </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={() => { checkOnPage('press') }}> Press </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={() => { checkOnPage('safety') }}> Safety Standard </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={() => { checkOnPage('faq') }}> FAQ </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={ScrollCareer}> Career </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={ScrollFooter}> Contact Us </Nav.Link>

              <div className={styles.dropdown}>
                <div onClick={() => setShowLang(!showLang)} className={styles.dropbtn} id='lingo-desktop'>
                  <img className={styles.img_languageSelectShow} src="/assets/pic_i18/America.svg" alt="" />
                </div>
                {(showLang) ?
                  <div className={styles.dropdown_content} style={{ display: "block" }}>
                    <a onClick={() => { setShowLang(!showLang), SelectedLanguage('us') }} href="#">
                      <img className={styles.img_languageSelect} src="/assets/pic_i18/America.svg" alt="" />
                      <span className={styles.text_languageSelect}>English (US)</span>
                    </a>

                    <a onClick={() => { setShowLang(!showLang), SelectedLanguage('th') }} href="#">
                      <img className={styles.img_language} src="/assets/pic_i18/Thai.svg" alt="" />
                      <span className={styles.text_language}>ภาษาไทย</span>
                    </a>

                    <a onClick={() => { setShowLang(!showLang), SelectedLanguage('cn') }} href="#">
                      <img className={styles.img_language} src="/assets/pic_i18/China.svg" alt="" />
                      <span className={styles.text_language}>简体中文</span>
                    </a>
                  </div>
                  : null}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={styles.AppContent}>

        <div>
          {
            onHome ? (<Game />) : null
          }
        </div>

        <div>
          {
            onHome ? (<div ref={CareerRef} >
              <Carrer />
            </div>) : null
          }
        </div>

        <div>
          {
            onHome ? (<Beyond />) : null
          }
        </div>

        {
          onHome ? (<video autoPlay={true} muted loop controls style={{ width: '100%', opacity: '100%' }}>
            <source src="/assets/web-vdo.mp4" />
          </video>) : null
        }


        <div>
          {
            onHome ? (<Event />) : null
          }
        </div>

        <div>
          {
            onHome ? (<Activity />) : null
          }
        </div>

        <div>
          {
            onHome ? (<Partner />) : null
          }
        </div>

        <div >
          {
            !onHome && onSafety ? (
              <div  style={{ paddingTop: '106px'}}>
                <span style={{ paddingLeft: '175px', color: '#9E9E9E'}}> Home </span> 
                <span style={{ padding: '0px 23px', color: '#FFFFFF'}}> {'>'} </span> 
                <span style={{ color: '#FFFFFF'}}> Safety Standard </span> 

                <Safety />
              </div>
            ) : null
          }
        </div>


        <div >
          {
            !onHome && onFaq ? (
              <div  style={{ paddingTop: '106px'}}>
                <span style={{ paddingLeft: '175px', color: '#9E9E9E'}}> Home </span> 
                <span style={{ padding: '0px 23px', color: '#FFFFFF'}}> {'>'} </span> 
                <span style={{ color: '#FFFFFF'}}> FAQ </span> 

                <Faq />
              </div>
            ) : null
          }
        </div>

        <footer ref={FooterRef} className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </div>

  )
}

export default Home

