import type { NextPage } from 'next'
import { Fragment, MutableRefObject, useRef } from 'react'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './components/footer';
import Container from 'react-bootstrap/Container';
import { Stack } from 'react-bootstrap';

const scrollToFoter = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const scrollToHome = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)

const Home: NextPage = () => {
  const HomeRef = useRef(null)
  const FooterRef = useRef(null)

  const ScrollHome = () => scrollToHome(HomeRef)
  const ScrollFooter = () => scrollToFoter(FooterRef)

  return (
    <div className={styles.App}>

      <Fragment>
        <div ref={HomeRef} className={styles.containerVDO}>
          <Container>
            <div className='text-menu'>

              <Stack direction="horizontal" gap={5}>
                <img src='/assets/logo.png' className="App-logo" alt="logo" />
                <div className="text_pointer ms-auto" onClick={ScrollHome}>Home</div>
                <div className='text_pointer' onClick={ScrollFooter}>Contact Us</div>
              </Stack>

              <video autoPlay={true} muted loop controls>
                <source src="/assets/web-vdo.mp4" />
              </video>
            </div>


          </Container>
        </div>
      </Fragment>
      <footer ref={FooterRef} className={styles.footer} id="first-seciton">
        <Footer />
      </footer>
    </div>

  )
}

export default Home
