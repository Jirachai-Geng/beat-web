import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Modal from 'react-bootstrap/Modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/Services.module.css'

type ImageModalProps = {
    images: string[];
    title: any;
    initialSlide: number;
    show: boolean;
    onHide: () => void;
};

const ImageModalMobile: React.FC<ImageModalProps> = ({ images, initialSlide, show, title, onHide }) => {
    const [slideIndex, setSlideIndex] = useState(initialSlide);
    const [slider, setSlider] = useState<Slider | null>(null);

    useEffect(() => {
        if (slider) {
            slider.slickGoTo(slideIndex);
        }
    }, [slideIndex, slider]);


    return (
        <Modal show={show} onHide={onHide} size="lg" centered style={{ height: '100%', overflow: 'hidden' }}>
            <Modal.Header style={{
                display: 'flex', justifyContent: 'space-between', backgroundColor: '#191919'
                , alignItems: 'center', border: 'none', marginTop: '0px', paddingBottom: '0px'
            }}>
                <p className={styles.title_modal} style={{ marginBottom: '0px' }}> {title} </p>
                <button onClick={onHide} style={{ backgroundColor: 'transparent', border: 'none', }}>
                    <img src="\assets\icons\close.svg" alt="Close button" />
                </button>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#191919', margin: '0 0px', border: 'none' }}>
                {/* container big image */}
                <div style={{ backgroundColor: '#191919', margin: '30px 0px' }}>
                    <Slider ref={(sliderInstance) => setSlider(sliderInstance)}
                        dots={false}
                        infinite={false}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        arrows={false}
                        initialSlide={slideIndex} >
                        {images?.map((image, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>

                                <img src={image} alt={`Slide ${index}`} style={{ width: '100%' }} />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* container small image*/}
                <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll', paddingBottom: '30px' }}>
                    {images?.map((imageSmall, indexSmall) => (
                        <div key={indexSmall} onClick={() => setSlideIndex(indexSmall)}>
                            <img src={imageSmall} alt={`Image ${indexSmall}`} style={{ maxHeight: '108px', marginRight: '16px' }} />
                        </div>
                    ))}
                </div>

            </Modal.Body>
        </Modal>
    );
};

export default ImageModalMobile;

