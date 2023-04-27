import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import i18n from 'i18next';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import i18next from 'i18next';


const scrollToHome = (ref: MutableRefObject<any>) => window.scrollTo(0, ref.current.offsetTop)
const SelectedLanguage = (language: string) => {
    i18n.changeLanguage(language);
}

const Menu: React.FC = () => {
    const componentRef = useRef()
    const FooterRef = useRef(null)
    let [onHome, setOnHome] = useState(true);

    const router = useRouter();
    const { t, i18n } = useTranslation();

    const HomeRef = useRef(null)

    const ScrollHome = () => {
        scrollToHome(HomeRef)
    }

    let [showLang, setShowLang] = useState(false);
    let [showLangMobile, setShowLangMobile] = useState(false);

    useEffect(() => {
        if (typeof router.query.lang === 'string') {
            i18n.changeLanguage(router.query.lang);
        }
    }, [router.query.lang]);

    const onNewpage = (page: any, scrollToFooter = false) => {
        router.push({
            pathname: page,
            query: { lang: i18next.language, scrollToFooter: scrollToFooter },
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            <Head>
                <title>BEAT Active</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar expand="lg">
                <Container className="paddingContainer" fluid ref={HomeRef}>
                    <Navbar.Brand><img src='/assets/logo.png' onClick={ScrollHome} className="App-logo" alt="logo" /> </Navbar.Brand>
                    <div className={styles.dropdown} style={{ display: "flex", flexDirection: "row-reverse" }}>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <div onClick={() => setShowLangMobile(!showLangMobile)} className={styles.dropbtn} id='lingo-mobile'>
                            <img className={styles.img_languageSelectShow} src={(i18next.language === 'us') ? "/assets/pic_i18/America.svg" : (i18next.language === 'th') ? "/assets/pic_i18/Thai.svg" : '/assets/pic_i18/China.svg'} />
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
                            <Nav.Link className={styles.text_link} onClick={() => { onNewpage('/') }} > Home </Nav.Link>
                            <Nav.Link className={styles.text_link} onClick={() => { onNewpage('/services') }}> Service </Nav.Link>
                            <Nav.Link className={styles.text_link} onClick={() => { onNewpage('/press') }}> Press </Nav.Link>
                            <Nav.Link className={styles.text_link} onClick={() => { onNewpage('/safety') }}> Safety Standard </Nav.Link>
                            <Nav.Link className={styles.text_link} onClick={() => { onNewpage('faq') }}> FAQ </Nav.Link>
                            <Nav.Link className={styles.text_link} onClick={() => { scrollToBottom() }}> Contact Us </Nav.Link>

                            <button className={styles.btnTicket} >
                                <span>Buy Ticket</span>
                            </button>

                            <div className={styles.dropdown}>
                                <div onClick={() => setShowLang(!showLang)} className={styles.dropbtn} id='lingo-desktop'>
                                    <img className={styles.img_languageSelectShow}
                                        src={(i18next.language === 'us') ? "/assets/pic_i18/America.svg" : (i18next.language === 'th') ? "/assets/pic_i18/Thai.svg" : '/assets/pic_i18/China.svg'} />
                                </div>
                                {(showLang) ?
                                    <div className={styles.dropdown_content} style={{ display: "block" }}>

                                        <a onClick={() => { setShowLang(!showLang), SelectedLanguage('us') }} href="#">
                                            <img className={`${styles.img_language} ${i18next.language === 'us' ? styles.selected : ''}`} src="/assets/pic_i18/America.svg" alt="" />
                                            <span className={styles.text_language}>English (US)</span>
                                        </a>

                                        <a onClick={() => { setShowLang(!showLang), SelectedLanguage('th') }} href="#">
                                            <img className={`${styles.img_language} ${i18next.language === 'th' ? styles.selected : ''}`} src="/assets/pic_i18/Thai.svg" alt="" />
                                            <span className={styles.text_language}>ภาษาไทย</span>
                                        </a>

                                        <a onClick={() => { setShowLang(!showLang), SelectedLanguage('cn') }} href="#">
                                            <img className={`${styles.img_language} ${i18next.language === 'cn' ? styles.selected : ''}`} src="/assets/pic_i18/China.svg" alt="" />
                                            <span className={styles.text_language}>简体中文</span>
                                        </a>
                                    </div>
                                    : null}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    );
};


export default Menu;