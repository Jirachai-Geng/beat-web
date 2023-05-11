import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import styles from '../../styles/Activity.module.css';
import { useTranslation } from 'react-i18next';
import { Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import US_i18n from '../../public/locales/us.json'
import TH_i18n from '../../public/locales/th.json'
import CN_i18n from '../../public/locales/cn.json'

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


const images: string[] = [];

for (let i = 1; i <= 55; i++) {
    images.push(`/assets/activity/activity${i}.webp`);
}


const resources = {
    us: {
        translation: US_i18n
    },
    th: {
        translation: TH_i18n
    },
    cn: {
        translation: CN_i18n
    }
};

const Activity = () => {
    const router = useRouter();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (typeof router.query.lang === 'string') {
            i18n.changeLanguage(router.query.lang);
        }
    }, [router.query.lang]);

    const [showAll, setShowAll] = useState(false);
    const [hideAll, setHideAll] = useState(false);

    const [imagesToShow, setImagesToShow] = useState(images.slice(0, 8));
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
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


    const handleShowAll = () => {
        setShowAll(true);
        setHideAll(false);
        setImagesToShow(images);
    };

    const handleShowLess = () => {
        setShowAll(false);
        setHideAll(false);
        setImagesToShow(images.slice(0, 8));
    };

    const handleHideAll = () => {
        setShowAll(false);
        setHideAll(true);
        setImagesToShow(images.slice(0, 0));
    };

    const handleImageHover = (index: any) => {
        setHoveredImageIndex(index);
    };

    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)

    return (
        <div>
            <div style={{ borderTop: '0.5px solid #E29886', margin: (width > 992) ? '0px 175px' : '0px 60px' , paddingBottom: '48px' }}></div>
            <Container fluid style={{ padding: (width > 992) ? '0px 64px 88px 64px' : '0px 16px 72px 16px' }}>

                <div className={styles.button_container}>
                    {hideAll ? (
                        <div className={styles.text_see} onClick={handleShowLess}>
                            <img src='\assets\activity\icons\see_less.svg' alt='see_less' />
                            <p>  See more </p>
                        </div>
                    ) : (
                        <div className={styles.text_see} onClick={handleHideAll}>
                            <img src='\assets\activity\icons\hide_all.svg' alt='hide_all' />
                            <p>  See less </p>
                        </div>
                    )}
                </div>

                <Row className={styles.gallery} ref={componentRef}>
                    {imagesToShow.map((imageName, index) => (
                        <div key={imageName} className={(width > 992) ? styles.image_container : styles.image_containerMobile}
                            onMouseEnter={() => handleImageHover(index)}
                            onMouseLeave={() => handleImageHover(null)}>
                            <img style={{ width: (width > 992) ? '256px' : '168px' }} src={imageName} alt={imageName} />
                            <div style={{ width: (width > 992) ? '256px' : '168px' }}
                                className={`${(width > 992) ? styles.image_text : styles.image_textMobile} 
                                ${hoveredImageIndex === index ? styles.visible : styles.hidden}`}>
                                <p className={styles.text_title}>{title[index]}</p>
                                <p className={styles.text}>{text[index]}</p>
                            </div>
                        </div>
                    ))}
                </Row>

                <div className={styles.button_container}>
                    <Link href="/viewall-activity">
                        <button className={styles.button} >
                            <span className={styles.text_button}>View All</span>
                        </button>
                    </Link>
                </div>
            </Container >

        </div>

    );
};
export default Activity;