import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import styles from '../styles/ViewAllActivity.module.css'
import Footer from './components/footer';
import Menu from './components/menu_outhome';
import { Container } from 'react-bootstrap';

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
    '/assets/activity/activity11.png', '/assets/activity/activity12.png', '/assets/activity/activity13.png', '/assets/activity/activity14.png', '/assets/activity/activity15.png'
];

const texts = ["Text for image 1", "Text for image 2", "Text for image 3", "Text for image 4", "Text for image 5", "Text for image 6", "Text for image 7", "Text for image 8", "Text for image 9", "Text for image 10", "Text for image 11", "Text for image 12", "Text for image 13", "Text for image 14", "Text for image 15",];


const ViewAll: React.FC = () => {
    const componentRef = useRef()
    const FooterRef = useRef(null)
    let [onHome, setOnHome] = useState(true);

    const { width, height } = useContainerDimensions(componentRef)
    const router = useRouter();
    const { t, i18n } = useTranslation();


    useEffect(() => {
        if (typeof router.query.lang === 'string') {
            i18n.changeLanguage(router.query.lang);
        }
    }, [router.query.lang]);
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
    const handleImageHover = (index: any) => {
        setHoveredImageIndex(index);
    };

    return (
        <div>
            <Menu />
            <div className={styles.AppContent} style={{ paddingTop: '106px' }}>
                <div style={{ paddingBottom: '38px' }}>
                    <span style={{ paddingLeft: '175px', color: '#9E9E9E' }}> Home </span>
                    <span style={{ padding: '0px 23px', color: '#FFFFFF' }}> {'>'} </span>
                    <span style={{ color: '#FFFFFF' }}> All Acticity </span>
                </div>

                <Container fluid style={{ paddingLeft: '64px', paddingBottom: '88px', paddingRight: '64px' }}>
                    <div className={styles.gallery}>
                        {images.map((imageName, index) => (
                            <div key={imageName} className={styles.image_container} onMouseEnter={() => handleImageHover(index)} onMouseLeave={() => handleImageHover(null)}>
                                <img src={imageName} alt={imageName} />
                                <div className={`${styles.image_text} ${hoveredImageIndex === index ? styles.visible : styles.hidden}`}>
                                    <p>{texts[index]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
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