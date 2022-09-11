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

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid ref={HomeRef}>
          <Navbar.Brand><img src='/assets/logo.svg' onClick={ScrollHome} className="App-logo" alt="logo" /></Navbar.Brand>
          {/* <Tooltip  content={"English (US)"} placement="bottom">
                <div style={{ borderRadius: '5px' }} >
                  <img src="/assets/pic_i18/America.svg" alt="" />
                </div>
              </Tooltip> */}

          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <div id='lingo-mobile'>
              <img src="/assets/pic_i18/America.svg" alt="lingo" />
              <select style={{ display: "flex" }} name="test" id="">
                <option value="test1"> test2 </option>
              </select>
            </div>
          </div>

          <Navbar.Collapse id="responsive-navbar-nav" className="ContainRight">
            <Nav className="size-menu text-center">
              <Nav.Link className={styles.text_link} onClick={ScrollHome}> Home </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={ScrollCareer}> Career </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={ScrollFooter}> Contact Us</Nav.Link>
              <div className={styles.dropdown}>
                <div onClick={() => setShowLang(!showLang)} className={styles.dropbtn} id='lingo-desktop'>
                  <img src="/assets/pic_i18/America.svg" alt="" />
                </div>
                {(showLang) ?
                  <div className={styles.dropdown_content} style={{ display: "block" }}>
                    <a onClick={() => setShowLang(!showLang)} href="#">
                      <img src=
                        "https://media.geeksforgeeks.org/wp-content/uploads/20200630132503/iflag.jpg"
                        width="20" height="15" /> India</a>

                    <a onClick={() => setShowLang(!showLang)} href="#">
                      <img src=
                        "https://media.geeksforgeeks.org/wp-content/uploads/20200630132504/uflag.jpg"
                        width="20" height="15" /> USA</a>
                    <a onClick={() => setShowLang(!showLang)} href="#">
                      <img src=
                        "https://media.geeksforgeeks.org/wp-content/uploads/20200630132502/eflag.jpg"
                        width="20" height="15" /> England</a>
                  </div>
                  : null}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={styles.AppContent}>

        <video autoPlay={true} muted loop controls style={{ width: '100%', opacity: '100%' }}>
          <source src="/assets/web-vdo.mp4" />
        </video>
        <div>
          <Game />
        </div>
        <div ref={CareerRef} >
          <Carrer />
        </div>

        {/* <div>
          <Sport />
        </div> */}

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

