import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FormEvent, useEffect, useRef, useState } from 'react';
import router from 'next/router';
import { setCookie } from 'cookies-next';
import styles from '../../styles/Career.module.css'
import Head from "next/head";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Modal } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import LinearProgress from '@mui/material/LinearProgress';

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

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (checked) {
            setCookie('Privacy_Policy', true);
            setShowModul(false)
            setShowModulCareer(true)
        }
    }

    const [isShowModulCareer, setShowModulCareer] = useState(false);
    const handleCloseCareer = () => setShowModulCareer(false);

    const steps = [
        {
            label: <span>ข้อมูลส่วนตัว</span>,
            page: "1/18",
            step: 5.5,
            description:
                <div className={styles.career1}>
                    <input className={styles.fill} placeholder="Full Name*"
                        type="text" id="UserName" name="UserName" />

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <input placeholder="Email*"
                            type="text" id="Email" name="Email" required />

                        <input placeholder="Email*"
                            type="text" id="Email" name="Email" required />

                        <input placeholder="Email*"
                            type="text" id="Email" name="Email" required />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <input placeholder="Email*"
                            type="text" id="Email" name="Email" required />

                        <input placeholder="Email*"
                            type="text" id="Email" name="Email" required />
                    </div>

                    <input placeholder="Full Name*"
                        type="text" id="UserName" name="UserName" />

                    <input placeholder="Full Name*"
                        type="text" id="UserName" name="UserName" />


                </div>
        },
        {
            label: 'Create an ad group',
            page: "2/18",
            step: 11,
            description:
                'An ad group contains one or more ads which target a shared set of keywords.',
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 16.5,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "4/18",
            step: 22,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 27.5,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 33,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 38.5,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 44,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 49.5,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 55,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 60.5,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 66,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 71.5,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 77,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 82.5,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 88,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "3/18",
            step: 93.5,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "18/18",
            step: 99,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
        {
            label: 'Create an ad',
            page: "",
            step: 99,
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
    ];

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return (
        <div className='backgroundDark d-flex align-items-center'>
            <Container fluid>
                <Row className="p-0" ref={componentRef}>
                    <Col sm={8} className={styles.background2} style={{ height: (width > 992) ? "400px" : "162px" }}>
                    </Col>

                    <Col sm={4} className="backgroundJoinUs d-flex flex-column" style={{ height: (width > 992) ? "400px" : "162px" }}>
                        <Row className="myCentreAlign">
                            <Row className={(width > 992) ? styles.textJoinUs : styles.textJoinUsMobile}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p>want to join us</p>
                                </div>

                                <div>
                                    <button className={(width > 992) ? styles.btnCarrer : styles.btnCarrerMobile} onClick={() => setShowModul(true)}>
                                        {
                                            (width > 992) ? <span>Apply Now</span> : <span> Join Us </span>
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
                dialogClassName="modal-dialog-centered">
                <Modal.Header style={{ borderBottom: 'none' }}>
                    <Modal.Title>Privacy Policy </Modal.Title>
                    <div onClick={handleClose} className="btnClose"> <ClearIcon /> </div>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', height: '100%', width: "100%" }}>
                    <form onSubmit={onSubmit} method="post" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <p style={{ padding: '0px 20px' }}>
                            This website uses cookies to improve user experience. By visiting our
                            website you consent to all cookies in accordance with our privacy policy.
                        </p>

                        <div>
                            <input type="checkbox" id="privacy" name="privacy" onChange={e => setChecked((e.target.checked))} required />
                            <label className={styles.textLabel}>
                                Accept the terms and conditions also privacy policy.
                            </label>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <button className={styles.btnPolicy} type="submit" >
                                Continue
                            </button>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>

            <Modal
                show={isShowModulCareer}
                onHide={handleCloseCareer}
                dialogClassName="modal-dialog-centered modal-lg">
                <LinearProgress variant="determinate" style={{ backgroundColor: '#FFEAE0' }} value={steps[activeStep].step} />

                <Modal.Header style={{ borderBottom: 'none' }}>
                    <Modal.Title> {steps[activeStep].label} </Modal.Title>
                    <div style={{ display: "flex" }}>
                        <div style={{ paddingRight: "32px" }}> {steps[activeStep].page} </div>
                        <div onClick={handleCloseCareer} className="btnClose"> <ClearIcon /> </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {steps[activeStep].description}

                    <div >
                        <button onClick={handleBack} disabled={activeStep === 0}>
                            <WestIcon style={{ fontSize: "15px" }} />
                            <span> Previous </span>
                        </button>

                        <button onClick={handleNext} disabled={activeStep === maxSteps - 1} >
                            <span> Next </span>
                            <EastIcon style={{ fontSize: "15px" }} />
                        </button>
                    </div>

                </Modal.Body>
            </Modal>

        </div >
    )
}



export default Career;


