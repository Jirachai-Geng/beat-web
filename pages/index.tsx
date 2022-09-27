import type { InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import Game from './components/game'
import Carrer from './components/carrer';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './components/footer';
import Partner from './components/partner';
import { Tooltip } from 'react-bootstrap';
import Head from 'next/head'

const scrollToFoter = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToHome = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToCareer = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)

// export const getStaticProps = async () => {
//   const res = await fetch('{{url}}/{{v1}}/gamescore/');
//   const data = await res.json();

//   return {
//       props: {
//           swapis: data,
//       },
//   };
// };

// const Home = ({ swapis }: InferGetStaticPropsType<typeof getStaticProps>) =>  {

const Home = () => {

  const HomeRef = useRef(null)
  const FooterRef = useRef(null)
  const CareerRef = useRef(null)
  const ScrollHome = () => scrollToHome(HomeRef)
  const ScrollCareer = () => scrollToCareer(CareerRef)
  const ScrollFooter = () => scrollToFoter(FooterRef)

  let [showLang, setShowLang] = useState(false);
  let [showLangMobile, setShowLangMobile] = useState(false);

  return (
    <div>
      <Head>
        <title>BEAT Active</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar expand="lg">
        <Container className="paddingContainer" fluid ref={HomeRef}>
          <Navbar.Brand><img src='/assets/logo.svg' onClick={ScrollHome} className="App-logo" alt="logo" /> </Navbar.Brand>
          {/* <Tooltip  content={"English (US)"} placement="bottom">
                <div style={{ borderRadius: '5px' }} >
                  <img src="/assets/pic_i18/America.svg" alt="" />
                </div>
              </Tooltip> */}

          <div className={styles.dropdown} style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <div onClick={() => setShowLangMobile(!showLangMobile)} className={styles.dropbtn} id='lingo-mobile'>
              <img className={styles.img_languageSelectShow} src="/assets/pic_i18/America.svg" alt="" />
            </div>
            {(showLangMobile) ?
              <div className={styles.dropdown_contentMobile} style={{ display: "block" }}>
                <a onClick={() => setShowLangMobile(!showLangMobile)} href="#">
                  <img className={styles.img_languageSelect} src="/assets/pic_i18/America.svg" alt="" />
                  <span className={styles.text_languageSelectMobile}>English (US)</span>
                </a>

                <a onClick={() => setShowLangMobile(!showLangMobile)} href="#">
                  <img className={styles.img_language} src="/assets/pic_i18/Thai.svg" alt="" />
                  <span className={styles.text_languageMobile}>ภาษาไทย</span>
                </a>

                <a onClick={() => setShowLangMobile(!showLangMobile)} href="#">
                  <img className={styles.img_language} src="/assets/pic_i18/China.svg" alt="" />
                  <span className={styles.text_languageMobile}>简体中文</span>
                </a>
              </div>
              : null}
          </div>

          <Navbar.Collapse id="responsive-navbar-nav" className="ContainRight">
            <Nav className="size-menu text-center">
              <Nav.Link className={styles.text_link} onClick={ScrollHome}> Home </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={ScrollCareer}> Career </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={ScrollFooter}> Contact Us</Nav.Link>
              <div className={styles.dropdown}>
                <div onClick={() => setShowLang(!showLang)} className={styles.dropbtn} id='lingo-desktop'>
                  <img className={styles.img_languageSelectShow} src="/assets/pic_i18/America.svg" alt="" />
                </div>
                {(showLang) ?
                  <div className={styles.dropdown_content} style={{ display: "block" }}>
                    <a onClick={() => setShowLang(!showLang)} href="#">
                      <img className={styles.img_languageSelect} src="/assets/pic_i18/America.svg" alt="" />
                      <span className={styles.text_languageSelect}>English (US)</span>
                    </a>

                    <a onClick={() => setShowLang(!showLang)} href="#">
                      <img className={styles.img_language} src="/assets/pic_i18/Thai.svg" alt="" />
                      <span className={styles.text_language}>ภาษาไทย</span>
                    </a>

                    <a onClick={() => setShowLang(!showLang)} href="#">
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
          <Game />
        </div>
        <div ref={CareerRef} >
          <Carrer />
        </div>

        {/* <div>
          <Sport />
        </div> */}
        <video autoPlay={true} muted loop controls style={{ width: '100%', opacity: '100%' }}>
          <source src="/assets/web-vdo.mp4" />
        </video>
        <div>
          <Partner />
        </div>

        <footer ref={FooterRef} className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </div>

  )
}

export default Home

