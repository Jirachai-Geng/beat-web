import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

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


const ViewAll : React.FC = () => {
    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)
    const router = useRouter();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (typeof router.query.lang === 'string') {
          i18n.changeLanguage(router.query.lang);
        }
      }, [router.query.lang]);


    return (
        <div style={{ width: '100%', paddingBottom: '222px', paddingTop: '20px' }}>

        </div >
    );
};


export default ViewAll;