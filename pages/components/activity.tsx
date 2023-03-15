import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import styles from '../../styles/Activity.module.css';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

    const [imagesToShow, setImagesToShow] = useState(images.slice(0, 10));
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

    const handleShowAll = () => {
        setShowAll(true);
        setHideAll(false);
        setImagesToShow(images);
    };

    const handleShowLess = () => {
        setShowAll(false);
        setHideAll(false);
        setImagesToShow(images.slice(0, 10));
    };

    const handleHideAll = () => {
        setShowAll(false);
        setHideAll(true);
        setImagesToShow(images.slice(0, 0));
    };

    const handleImageHover = (index: any) => {
        setHoveredImageIndex(index);
    };
    return (
        <div>
            <Container fluid style={{ paddingLeft: '64px', paddingBottom: '88px', paddingRight: '64px' }}>

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

                <div className={styles.gallery}>
                    {imagesToShow.map((imageName, index) => (
                        <div key={imageName} className={styles.image_container} onMouseEnter={() => handleImageHover(index)} onMouseLeave={() => handleImageHover(null)}>
                            <img src={imageName} alt={imageName} />
                            <div className={`${styles.image_text} ${hoveredImageIndex === index ? styles.visible : styles.hidden}`}>
                                <p>{texts[index]}</p>
                            </div>
                        </div>
                    ))}
                </div>

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