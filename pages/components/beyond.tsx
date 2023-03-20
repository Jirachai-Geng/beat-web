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

    let containerClass = "containerbeyond_us";
    if (i18next.language === "us") {
        containerClass = "containerbeyond_us";
    } else if (i18next.language === "th") {
        containerClass = "containerbeyond_th";
    } else if (i18next.language === "cn") {
        containerClass = "containerbeyond_cn";
    }

    let containerClassMobile = "containerbeyondMobile_us";
    if (i18next.language === "us") {
        containerClassMobile = "containerbeyondMobile_us";
    } else if (i18next.language === "th") {
        containerClassMobile = "containerbeyondMobile_th";
    } else if (i18next.language === "cn") {
        containerClassMobile = "containerbeyondMobile_cn";
    }
    

    return (
        <div className='backgroundDark d-flex align-items-center'>
            <Container>
                <Row className={(width > 992) ? containerClass : containerClassMobile}  ref={componentRef}>

                </Row>
            </Container>
        </div >
    )
}

export default Beyond;
