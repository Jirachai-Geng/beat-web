import React, { useState } from 'react';
import Slider from 'react-slick';
import ImageModal from './ImageModal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/Services.module.css'

type ImageSliderProps = {
    images: string[];
};

type CustomArrowProps = {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    type: 'prev' | 'next';
  };

  
const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const CustomArrow: React.FC<CustomArrowProps> = ({ className, style, onClick, type }) => {
        const iconPath = type === 'prev' ? '/assets/icons/prev-icon.svg' : '/assets/icons/next-icon.svg';
        return (
          <img
            className={`${className}`}
            style={{ ...style, display: 'block', width: '40px', height: '40px' }}
            onClick={onClick}
            src={iconPath}
            alt={`${type} arrow`}
          />
        );
      };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomArrow type="prev" />,
        nextArrow: <CustomArrow type="next" />,
        centerMode: true,
        centerPadding: '0px',
    };

    const handleClick = (index: number) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.centeredSlider}>
            <Slider {...settings}>
                {images && images.map((image, index) => (
                    <div key={index} className={styles.image_item} onClick={() => handleClick(index)}>
                        <img className={styles.image_size} src={image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Slider>
            {showModal && (
                <ImageModal
                    images={images}
                    initialSlide={selectedImageIndex}
                    show={showModal}
                    onHide={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ImageSlider;

