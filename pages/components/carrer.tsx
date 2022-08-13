import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import router from 'next/router';
import { setCookie } from 'cookies-next';
import styles from '../../styles/Career.module.css'
import Head from "next/head";

export interface FormProps {
    isChecked: boolean;
}

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

const Career = () => {
    const [isShowModul, setShowModul] = useState(false);
    const handleShow = () => setShowModul(true);
    const handleClose = () => setShowModul(false);

    const [checked, setChecked] = useState(false);

    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)

    const acceptPolicy = (checked: any) => {
        setCookie('Privacy_Policy', 'Privacy Policy');
        setShowModul(false)
        setShowModulCareer1(true)
    }

    const [isShowModulCareer1, setShowModulCareer1] = useState(false);
    const handleCloseCareer1 = () => setShowModulCareer1(false);

    const career1 = () => {
        return (
            <Modal.Body style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex' }}>
                    <div> ข้อมูลส่วนตัว </div>
                    <div onClick={handleCloseCareer1} className='btnClose'></div>
                </div>
                <p>
                    This website uses cookies to improve user experience. By visiting our
                    website you consent to all cookies in accordance with our privacy policy.
                </p>

                <div>
                    <input checked={checked} type="checkbox" id="privacy" name="privacy"
                        onChange={() => { setChecked(!checked) }}
                    />
                    <label className={styles.textLabel}>
                        Accept the terms and conditions also privacy policy.
                    </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <button className={styles.btnPolicy}>
                        Continue
                    </button>
                </div>
            </Modal.Body>
        )
    }

    const [formStep, setFormStep] = useState(0);

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    return (
        <div className='backgroundDark d-flex align-items-center'>
            <Container fluid>
                <Row className="p-0" ref={componentRef}>
                    <Col sm={8} className={styles.background2} style={{ height: (width > 992) ? "400px" : "162px" }}>
                    </Col>

                    <Col sm={4} className="backgroundJoinUs d-flex flex-column" style={{ height: (width > 992) ? "400px" : "162px" }}>
                        <Row className="myCentreAlign">
                            <Row className={(width > 992) ? styles.textJoinUs : styles.textJoinUsMobile}>
                                <div style={{ display: "flex", alignItems: "center" , justifyContent: "center"}}>
                                    <p>want to join us</p>
                                </div>

                                <div>
                                    <button className={(width > 992) ? styles.btnCarrer : styles.btnCarrerMobile} onClick={() => setShowModul(true)}>
                                        {
                                            (width > 400) ? <span>Apply Now</span> : <span> Join Us </span> 
                                        }
                                    </button>

                                </div>

                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Container >
            <Modal
                show={isShowModul}
                onHide={handleClose}
                dialogClassName="modal-content">
                <Modal.Header style={{ borderBottom: 'none' }}>
                    <Modal.Title>Privacy Policy </Modal.Title>
                    <div onClick={handleClose} className='btnClose'></div>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', height: '100%' }}>
                    <p>
                        This website uses cookies to improve user experience. By visiting our
                        website you consent to all cookies in accordance with our privacy policy.
                    </p>

                    <div>
                        <input checked={checked} type="checkbox" id="privacy" name="privacy"
                            onChange={() => { setChecked(!checked) }} required
                        />
                        <label className={styles.textLabel}>
                            Accept the terms and conditions also privacy policy.
                        </label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <button className={styles.btnPolicy} onClick={() => acceptPolicy(checked)} >
                            Continue
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={isShowModulCareer1}
                onHide={handleCloseCareer1}
                dialogClassName="modal-content">

                <Modal.Body style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex' }}>
                        <div> ข้อมูลส่วนตัว </div>
                        <div onClick={handleCloseCareer1} className='btnClose'></div>
                    </div>

                </Modal.Body>
            </Modal>

        </div >
    )
}



export default Career;


