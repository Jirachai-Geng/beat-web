import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import styles from '../styles/ViewAllActivity.module.css'
import Footer from './components/footer';
import Menu from './components/menu_outhome';
import { Container, Row } from 'react-bootstrap';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import US_i18n from '../public/locales/us.json'
import TH_i18n from '../public/locales/th.json'
import CN_i18n from '../public/locales/cn.json'

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


const images = [
    '/assets/activity/activity1.png', '/assets/activity/activity2.png', '/assets/activity/activity3.png', '/assets/activity/activity4.png', '/assets/activity/activity5.png',
    '/assets/activity/activity6.png', '/assets/activity/activity7.png', '/assets/activity/activity8.png', '/assets/activity/activity9.png', '/assets/activity/activity10.png',
    '/assets/activity/activity11.png', '/assets/activity/activity12.png', '/assets/activity/activity13.png', '/assets/activity/activity14.png', '/assets/activity/activity15.png',
    '/assets/activity/activity1.png', '/assets/activity/activity2.png', '/assets/activity/activity3.png', '/assets/activity/activity4.png', '/assets/activity/activity5.png',
    '/assets/activity/activity1.png', '/assets/activity/activity2.png', '/assets/activity/activity3.png', '/assets/activity/activity4.png', '/assets/activity/activity5.png',
    '/assets/activity/activity1.png', '/assets/activity/activity2.png', '/assets/activity/activity3.png', '/assets/activity/activity4.png', '/assets/activity/activity5.png',
    '/assets/activity/activity1.png', '/assets/activity/activity2.png', '/assets/activity/activity3.png', '/assets/activity/activity4.png', '/assets/activity/activity5.png',
    '/assets/activity/activity1.png', '/assets/activity/activity2.png', '/assets/activity/activity3.png', '/assets/activity/activity4.png', '/assets/activity/activity5.png',
    '/assets/activity/activity1.png', '/assets/activity/activity2.png', '/assets/activity/activity3.png', '/assets/activity/activity4.png', '/assets/activity/activity5.png',
    '/assets/activity/activity1.png', '/assets/activity/activity2.png', '/assets/activity/activity3.png', '/assets/activity/activity4.png', '/assets/activity/activity5.png',
    '/assets/activity/activity1.png', '/assets/activity/activity2.png', '/assets/activity/activity3.png', '/assets/activity/activity4.png', '/assets/activity/activity5.png',
];


const ViewAll: React.FC = () => {
    const componentRef = useRef()
    const FooterRef = useRef(null)
    const router = useRouter();

    const { width, height } = useContainerDimensions(componentRef)
    const [title, setTitle] = useState<string[]>([]);
    const [text, setText] = useState<string[]>([]);

    useEffect(() => {
        if (i18next.language == 'cn') {
            setTitle(Object.keys(CN_i18n.all_activity).map((key) => key.replace(/_/g, ' ')))
            setText(Object.values(CN_i18n.all_activity))
        }
        else if (i18next.language == 'th') {
            setTitle(Object.keys(TH_i18n.all_activity).map((key) => key.replace(/_/g, ' ')))
            setText(Object.values(TH_i18n.all_activity))
        } else {
            setTitle(Object.keys(US_i18n.all_activity).map((key) => key.replace(/_/g, ' ')))
            setText(Object.values(US_i18n.all_activity))
        }

    }, [i18next.language]);

    const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
    const handleImageHover = (index: any) => {
        setHoveredImageIndex(index);
    };

    const onNewpage = (page: any) => {
        router.push({
            pathname: page,
            query: { lang: i18next.language }
        });
    }

    return (
        <div>
            <Menu />
            <div className={styles.AppContent}>
                <div style={{ paddingTop: (width > 992) ? '106px' : '16px', paddingBottom: '38px' }}>
                    <span style={{ paddingLeft: (width > 992) ? '175px' : '60px', color: '#9E9E9E', cursor: 'pointer' }}
                        onClick={() => { onNewpage('/') }}> Home </span>
                    <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
                    <span style={{ color: '#FFFFFF' }}> All Activity  </span>
                </div>

                <Container fluid style={{ padding: (width > 992) ? '0px 64px 88px 64px' : '0px 16px 72px 16px' }} >
                    <div className={styles.gallery}>
                        {images.map((imageName, index) => (
                            <div key={imageName} className={(width > 992) ? styles.image_container : styles.image_containerMobile}
                                onMouseEnter={() => handleImageHover(index)}
                                onMouseLeave={() => handleImageHover(null)}
                            >
                                <img style={{ width: (width > 992) ? '256px' : '168px' }} src={imageName} alt={imageName} />
                                <div style={{ width: (width > 992) ? '256px' : '168px' }}
                                    className={`${(width > 992) ? styles.image_text : styles.image_textMobile} 
                           ${hoveredImageIndex === index ? styles.visible : styles.hidden}`}>
                                    <p className={styles.text_title}>{title[index]}</p>
                                    <p className={styles.text}>{text[index]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Row ref={componentRef}></Row>
                </Container >
            </div>


            <div className={styles.AppContent}>
                <footer ref={FooterRef} className={styles.footer}>
                    <Footer />
                </footer>
            </div>

        </div >
    );
};


export default ViewAll;