import React from 'react';
import Slider from 'react-slick';
import Modal from 'react-bootstrap/Modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/Services.module.css'

type ImageModalProps = {
  images: string[];
  initialSlide: number;
  title: any;
  show: boolean;
  onHide: () => void;
};

type CustomArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  type: 'prev' | 'next';
};

const ImageModal: React.FC<ImageModalProps> = ({ images, initialSlide, show, title, onHide }) => {
  const CustomArrow: React.FC<CustomArrowProps> = ({ className, style, onClick, type }) => {
    const iconPath = type === 'prev' ? '/assets/icons/prev-icon.svg' : '/assets/icons/next-icon.svg';
    return (
      <img
        className={`${className}`}
        style={{ ...style, display: 'block', width: '40px', height: '40px', marginRight: '40px', marginLeft: '40px', zIndex: 1 }}
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
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomArrow type="prev" />,
    nextArrow: <CustomArrow type="next" />,
    initialSlide: initialSlide,
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered style={{ maxHeight: '634px', overflow: 'hidden' }}>
      <Modal.Header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none'
        , paddingBottom: '24px'
      }}>
        <p className={styles.title_modal}> {title} </p>
        <button onClick={onHide} style={{ backgroundColor: 'transparent', border: 'none', }}>
          <img src="\assets\icons\close.svg" alt="Close button" />
        </button>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#666666', margin: '0 30px' }}>
        <Slider {...settings}>
          {images && images.map((image, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <img src={image} alt={`Slide ${index}`} style={{ maxHeight: '502px', margin: 'auto' }} />
            </div>
          ))}
        </Slider>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
