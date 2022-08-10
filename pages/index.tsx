import type { InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment, MutableRefObject, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import { Stack } from 'react-bootstrap';
import Game from './components/game'
import Carrer from './components/carrer';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Sport from './components/sport';
import Beyond from './components/beyond';
import { Tooltip } from '@nextui-org/react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ReactPlayer from 'react-player'
import Footer from './components/footer';
import { CtxOrReq } from 'next-auth/client/_utils';
import { FaGithub, FaTwitter, FaGoogle, FaFacebook } from "react-icons/fa";
import { getProviders, signIn, getCsrfToken, useSession } from "next-auth/react"
import { useRouter } from "next/router";

const scrollToFoter = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToHome = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToCareer = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)

// export const getStaticProps = async () => {
//   const res = await fetch('http://localhost:3000/api/hello/');
//   const data = await res.json();

//   return {
//       props: {
//           swapis: data,
//       },
//   };
// };

// const Home = ({ swapis }: InferGetStaticPropsType<typeof getStaticProps>) =>  {

const Home = () =>  {

  const HomeRef = useRef(null)
  const FooterRef = useRef(null)
  const CareerRef = useRef(null)

  const ScrollHome = () => scrollToHome(HomeRef)
  const ScrollCareer = () => scrollToCareer(CareerRef)
  const ScrollFooter = () => scrollToFoter(FooterRef)

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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="ContainRight">
            <Nav className="size-menu text-center">
              <Nav.Link className={styles.text_link} onClick={ScrollHome}> Home </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={ScrollCareer}> Career </Nav.Link>
              <Nav.Link className={styles.text_link} onClick={ScrollFooter}> Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={styles.AppContent}>

        <video autoPlay={true} muted loop controls style={{ width: '100%', opacity: '100%' }}>
          <source src="/assets/web-vdo.mp4" />
        </video>
        <div style={{ paddingTop: '50px' }}>
          <Game />
        </div>
        <div ref={CareerRef} >
          <Carrer />
        </div>

        <footer ref={FooterRef} className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </div>

  )
}

export default Home

