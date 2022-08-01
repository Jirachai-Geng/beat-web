import type { NextPage } from 'next'
import { Fragment, MutableRefObject, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './components/footer';
import Container from 'react-bootstrap/Container';
import { Stack } from 'react-bootstrap';
import Game from './components/game'
import Carrer from './components/carrer';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Sport from './components/sport';

const scrollToFoter = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToHome = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToCarrer = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)

const Home: NextPage = () => {
  const HomeRef = useRef(null)
  const FooterRef = useRef(null)
  const CarrerRef = useRef(null)

  const ScrollHome = () => scrollToHome(HomeRef)
  const ScrollCarrer = () => scrollToCarrer(CarrerRef)
  const ScrollFooter = () => scrollToFoter(FooterRef)

  return (
    <div className={styles.App}>
      <div className='text-menu'>
        <Stack direction="horizontal" gap={5}>
          <img src='/assets/logo.svg' className="App-logo" alt="logo" />
          <div className="text_pointer ms-auto" onClick={ScrollHome}>Home</div>
          <div className='text_pointer'> Press </div>
          <div className='text_pointer' onClick={ScrollFooter}>Safety Standard</div>
          <div className='text_pointer' onClick={ScrollFooter}>FAQ</div>
          <div className='text_pointer' onClick={ScrollCarrer}>Career</div>
          <div className='text_pointer' onClick={ScrollFooter}>Contact Us</div>
        </Stack>
      </div>
      <Fragment>
        <div ref={HomeRef}>
          <Game />
        </div>
        <div ref={CarrerRef}>
          <Carrer />
        </div>
        <div className='containerbeyond'></div>
        
        <Sport />


      </Fragment>
      <footer ref={FooterRef} className={styles.footer}>
        <Footer />
      </footer>
    </div>

  )
}

export default Home

