import { getProviders, signIn, getCsrfToken, useSession } from "next-auth/react"
import styles from '../../styles/Home.module.css'
import { InferGetServerSidePropsType } from 'next'
import { FaGithub, FaTwitter, FaGoogle, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";
import { Container, Nav, Navbar } from "react-bootstrap";
import Game from "../components/game";
import Carrer from "../components/carrer";
import Footer from "../components/footer";
import { Fragment, MutableRefObject, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css';


const SignIn = ({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data: session } = useSession()
    const router = useRouter()


    useEffect(() => {
        if (session) {
            router.push('/')
        }
    }, [session])
    return (
        <>
            <div className={styles.backgroundDark}>
                <section className={styles.signup}>
                    <h1>SignIn to Continue</h1>

                    <div className={styles.formDiv}>

                        <form method="post" action="/api/auth/signin/email">
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <input type="email" id="email" name="email" placeholder="Email" />
                            <p></p>
                            <button className={styles.btn} type="submit">Sign in with Email</button>
                        </form>
                        <h1>OR</h1>

                        <div className={styles.icons}>

                            {providers ? (Object.values(providers).map((provider, i) => {
                                { provider.id }
                                if (provider.id !== 'email') {
                                    return (
                                        <div key={provider.name} className={styles.icon}>
                                            <button onClick={() => signIn(provider.id)} className={styles.btn} type="submit">Sign in with {provider.name}<FaFacebook /></button>

                                            <div className={styles.icon}></div>
                                        </div>
                                    )
                                }
                            }
                            )) : ('')}

                        </div>

                    </div>

                </section>
            </div>


        </>
    //     <div>
    //     <Navbar expand="lg">
    //       <Container fluid >
    //         <Navbar.Brand><img src='/assets/logo.svg' className="App-logo" alt="logo" /></Navbar.Brand>
    //         {/* <Tooltip  content={"English (US)"} placement="bottom">
    //               <div style={{ borderRadius: '5px' }} >
    //                 <img src="/assets/pic_i18/America.svg" alt="" />
    //               </div>
    //             </Tooltip> */}
    //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //         <Navbar.Collapse id="responsive-navbar-nav" className="ContainRight">
    //           <Nav className="size-menu text-center">
    //             <Nav.Link className={styles.text_link} > Home </Nav.Link>
    //             <Nav.Link className={styles.text_link} > Career </Nav.Link>
    //             <Nav.Link className={styles.text_link} > Contact Us</Nav.Link>
    //           </Nav>
    //         </Navbar.Collapse>
    //       </Container>
    //     </Navbar>
  
    //     <div className={styles.AppContent}>
  
    //       <video autoPlay={true} muted loop controls style={{ width: '100%', opacity: '100%' }}>
    //         <source src="/assets/web-vdo.mp4" />
    //       </video>
    //       <div style={{ paddingTop: '50px' }}>
    //         <Game />
    //       </div>
    //       <div >
    //         <Carrer />
    //       </div>
  
    //       <footer className={styles.footer}>
    //         <Footer />
    //       </footer>
    //     </div>
    //   </div>
    )
}


export const getServerSideProps = async (context: CtxOrReq | undefined) => {
    const providers = await getProviders()
    const csrfToken = await getCsrfToken(context)
    return {
        props: { providers, csrfToken },
    }
}


export default SignIn