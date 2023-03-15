// components/ImageModal.tsx

import React from 'react';
import Slider from 'react-slick';
import Modal from 'react-bootstrap/Modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type ImageModalProps = {
  images: string[];
  initialSlide: number;
  show: boolean;
  onHide: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ images, initialSlide, show, onHide }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: initialSlide,
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index}`} style={{ width: '100%' }} />
            </div>
          ))}
        </Slider>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
