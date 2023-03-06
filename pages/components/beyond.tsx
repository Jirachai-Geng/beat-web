import Container from 'react-bootstrap/Container';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

interface BeyondProps {
    language: string;
}

i18next
    .use(initReactI18next)
    .init({
        lng: 'us', // default language
    });

const Beyond = () => {
    let containerClass = "containerbeyond_us";
    if (i18next.language === "us") {
        containerClass = "containerbeyond_us";
    } else if (i18next.language === "th") {
        containerClass = "containerbeyond_th";
    } else if (i18next.language === "cn") {
        containerClass = "containerbeyond_cn";
    }

    return (
        <div className='backgroundDark d-flex align-items-center'>
            <Container className={containerClass}>
            </Container>
        </div >
    )
}

export default Beyond;
