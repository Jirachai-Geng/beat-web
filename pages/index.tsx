import type { NextPage } from 'next'
import { Fragment, MutableRefObject, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './components/footer';
import Container from 'react-bootstrap/Container';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const scrollToFoter = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToHome = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToCarrer = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)

const Home: NextPage = () => {
  const HomeRef = useRef(null)
  const FooterRef = useRef(null)
  const CarrerRef = useRef(null)

  const ScrollHome = () => scrollToHome(HomeRef)
  const ScrollFooter = () => scrollToFoter(FooterRef)

  return (
    <div className={styles.App}>
      <Navbar expand="lg" className='bg-light'>
        <Container fluid ref={HomeRef}>
          <Navbar.Brand><img src='/assets/logo.svg' onClick={ScrollHome} className="App-logo" alt="logo" /></Navbar.Brand>
          {/* <Tooltip  content={"English (US)"} placement="bottom">
                <div style={{ borderRadius: '5px' }} >
                  <img src="/assets/pic_i18/America.svg" alt="" />
                </div>
              </Tooltip> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="ContainRight">
            <Nav className="size-menu text-center">
              <Nav.Link className={styles.text_link} onClick={ScrollHome}> Home </Nav.Link>
              <Nav.Link  className={styles.text_link} onClick={ScrollFooter}> Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={styles.AppContent}>
        <video autoPlay={true} muted loop controls style={{ width: '100%',opacity: '100%'}}>
          <source src="/assets/web-vdo.mp4" />
        </video>


        <footer ref={FooterRef} className={styles.footer}>
          <Footer />
        </footer>
      </div>


    </div>
  )
}

export default Home

