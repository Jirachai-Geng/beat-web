import Container from 'react-bootstrap/Container';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { Row } from 'react-bootstrap';

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

interface BeyondProps {
    language: string;
}

i18next
    .use(initReactI18next)
    .init({
        lng: 'us', // default language
    });

const Beyond = () => {
    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)

    const backgroundImage = `/assets/beyond/beyond_${i18next.language}.webp`;
    const backgroundImageMobile = `/assets/beyond/beyondMobile_${i18next.language}.webp`;

    return (
        <div className='backgroundDark d-flex align-items-center'>
            <Container fluid style={{ padding: '0px'}}>
                <Row ref={componentRef}>
                    <img
                        src={(width > 992) ? backgroundImage : backgroundImageMobile} 
                        alt="Background"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Row>
            </Container>
        </div>
    )
}

export default Beyond;
