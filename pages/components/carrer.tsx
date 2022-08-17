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
import { Modal } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
    let [careerFile, setCareerFile] = useState("")
    let [breakUpload, setbreakUpload] = useState(false)
    const handleFileChange = (event: any) => {
        if (event.target.value) {
            setCareerFile(event.target.value)
            if (event.target.files[0].size > 20971520) {
                setbreakUpload(true);
            } else {
                if (event.target.files.length > 0) {
                    setbreakUpload(false);
                }
            }
        }

    };

    const [startDate, setStartDate] = useState(new Date());

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

    // Validate URL
    const [isValidURL, setValidURL] = useState(false);
    const checkValidURL = (string: string) => {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res !== null) {
            setValidURL(true)
        } else {
            setValidURL(false)
        }
        console.log(res)
        return (res !== null)
    };

    // career 3
    let arrCareer3 = [0, 0, 0, 0, 0, 0, 0, 0]
    let [arrCareer_3, setArrCareer3] = useState([0, 0, 0, 0, 0, 0, 0, 0])
    const setArrCareer_3 = (index: any) => {
        arrCareer3[index] = 1
        setArrCareer3(arrCareer3)
        console.log(arrCareer_3)
    }

    // career 4
    let arrCareer4 = [0, 0, 0, 0, 0, 0, 0, 0]
    let [arrCareer_4, setArrCareer4] = useState([0, 0, 0, 0, 0, 0, 0, 0])
    const setArrCareer_4 = (index: any) => {
        arrCareer4[index] = 1
        setArrCareer3(arrCareer4)
        console.log(arrCareer_4)
    }

    const steps = [
        {
            // sareer 1
            label: <span className={styles.headerTitle}>ข้อมูลส่วนตัว</span>,
            page: <span className={styles.headerTitle}>1/18</span>,
            step: 5.5,
            description:
                <div className={styles.career1}  style={{padding: (width > 992) ? "0px 200px": "16px"}}>
                    <input className={styles.btnFill} placeholder="Full Name*"
                        type="text" id="UserName" name="UserName" />

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', columnGap: "8px" }}>
                        <input className={styles.btnFill} placeholder="Birth Date*"
                            type="text" id="BirthDate" name="BirthDate" required />

                        <input className={styles.btnFill} placeholder="Month*"
                            type="text" id="Month" name="Month" required />

                        <input className={styles.btnFill} placeholder="Year*"
                            type="text" id="Year" name="Year" required />
                    </div>

                    <select name="cars" id="cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>

                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    />

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', columnGap: "8px" }}>
                        <input className={styles.btnFill} placeholder="Email*"
                            type="text" id="Email" name="Email" required />

                        <input className={styles.btnFill} placeholder="Email*"
                            type="text" id="Email" name="Email" required />
                    </div>

                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <input className={styles.btnFill} placeholder="Full Name*"
                        type="text" id="UserName" name="UserName" />

                    <input className={styles.btnFill} placeholder="Full Name*"
                        type="text" id="UserName" name="UserName" />
                </div>
        },
        {
            label: <span className={styles.headerTitle}>วิดีโอแนะนำตัวคุณ ความยาวไม่เกิน 1 นาทีในรูปแบบที่เป็นตัวตนของตัวเอง</span>,
            page: <span className={styles.headerTitle}>2/18</span>,
            step: 11,
            description:
                <div className={styles.career2} style={{padding: (width > 992) ? "0px 270px": "16px"}}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                        {breakUpload ?
                            <label className={styles.fileUpload} >
                                <input type="file" accept="video/mp4" onChange={handleFileChange} />
                                <img style={{ width: "39.95px", paddingBottom: "15px" }} src={"/assets/icons/cantUpload.png"} alt="choose_file" />
                                <span style={{ fontFamily: 'Prompt', fontWeight: "600", fontSize: "20px", lineHeight: "30px", color: "#D66F56" }}>
                                    {careerFile.split(/\\/g).pop()} </span>
                                <span> File couldn’t upload. Please try again.</span>
                            </label>
                            : (
                                careerFile ?
                                    <label className={styles.fileUpload}>
                                        <input type="file" accept="video/mp4" onChange={handleFileChange} />
                                        <img style={{ width: "39.95px", paddingBottom: "15px" }} src={"/assets/icons/havefile.png"} alt="choose_file" />
                                        <p style={{ fontFamily: 'Prompt', fontWeight: "600", fontSize: "20px", lineHeight: "30px", color: "#4CA183" }}>
                                            {careerFile.split(/\\/g).pop()} </p>
                                    </label>
                                    : <label className={styles.fileUpload}>
                                        <input type="file" accept="video/mp4" onChange={handleFileChange} />
                                        <img style={{ width: "53.33px", paddingBottom: "5px" }} src={"/assets/icons/choose_file.png"} alt="choose_file" />
                                        <p style={{ fontFamily: 'Prompt', fontWeight: "600", fontSize: "20px", lineHeight: "30px" }}>Choose file</p>
                                    </label>
                            )
                        }

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", color: (breakUpload) ? "#D66F56" : (careerFile ? "#4CA183" : "#FFF") }}>
                        <p>Allowed file extexsions : MP4</p>
                        <p>Max file size : 20MB.</p>
                    </div>

                    <div className={styles.line}></div>

                    <div className={`${styles.buttonIn} `}>
                        <input className={`${styles.btnFill}`} placeholder="Paste your video url*"
                            type={`${isValidURL ? 'text' : 'search'}`} onChange={e => checkValidURL(e.target.value)}
                            id="videoURL" name="videoURL" />
                        {/* <button className={`${styles.buttonClare} `} >clear</button> */}
                    </div>




                </div >,
        },
        {
            label: <span className={styles.headerTitle}>โปรดเลือกเพียง 1 ภาพ ที่สามารถนิยามความเป็นตัวคุณได้มากที่สุด</span>,
            page: <span className={styles.headerTitle}>3/18</span>,
            step: 16.5,
            description:
                <Container fluid >
                    <Row>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(0)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport1.png" alt="sport1" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 1 </span>
                                </div>
                                {(arrCareer_3[0] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sport1" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(1)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport2.png" alt="sport2" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 2 </span>
                                </div>
                                {(arrCareer_3[1] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect2" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(2)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport3.png" alt="sport3" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 3 </span>
                                </div>
                                {(arrCareer_3[2] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect3" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(3)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport4.png" alt="sport4" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 4 </span>
                                </div>
                                {(arrCareer_3[3] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect4" />
                                    </div> : null}
                            </label></Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }} >
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(4)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport5.png" alt="sport5" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 5 </span>
                                </div>
                                {(arrCareer_3[4] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sport5" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(5)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport6.png" alt="sport6" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 6 </span>
                                </div>
                                {(arrCareer_3[5] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect6" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(6)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport7.png" alt="sport7" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 7 </span>
                                </div>
                                {(arrCareer_3[6] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect7" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(7)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport8.png" alt="sport8" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 8 </span>
                                </div>
                                {(arrCareer_3[7] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect8" />
                                    </div> : null}
                            </label></Col>
                    </Row>
                </Container>,
        },
        {
            label: <span className={styles.headerTitle}>โปรดเลือกเพียง 1 ภาพ ที่สามารถนิยามความเป็นตัวคุณได้มากที่สุด</span>,
            page: <span className={styles.headerTitle}>3/18</span>,
            step: 22,
            description:
                <Container fluid >
                    <Row>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(0)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport1.png" alt="sport1" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 1 </span>
                                </div>
                                {(arrCareer_3[0] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sport1" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(1)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport2.png" alt="sport2" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 2 </span>
                                </div>
                                {(arrCareer_3[1] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect2" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(2)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport3.png" alt="sport3" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 3 </span>
                                </div>
                                {(arrCareer_3[2] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect3" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(3)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport4.png" alt="sport4" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 4 </span>
                                </div>
                                {(arrCareer_3[3] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect4" />
                                    </div> : null}
                            </label></Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }} >
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(4)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport5.png" alt="sport5" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 5 </span>
                                </div>
                                {(arrCareer_3[4] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sport5" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(5)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport6.png" alt="sport6" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 6 </span>
                                </div>
                                {(arrCareer_3[5] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect6" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(6)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport7.png" alt="sport7" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 7 </span>
                                </div>
                                {(arrCareer_3[6] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect7" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_3(7)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career3/sport8.png" alt="sport8" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 8 </span>
                                </div>
                                {(arrCareer_3[7] == 1) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect8" />
                                    </div> : null}
                            </label></Col>
                    </Row>
                </Container>,
        },
        {
            label: '',
            page: "5/18",
            step: 27.5,
            description: ``,
        },
        {
            label: '',
            page: "6/18",
            step: 33,
            description: ``,
        },
        {
            label: '',
            page: "7/18",
            step: 38.5,
            description: ``,
        },
        {
            label: '',
            page: "8/18",
            step: 44,
            description: ``,
        },
        {
            label: '',
            page: "9/18",
            step: 49.5,
            description: ``,
        },
        {
            label: '',
            page: "10/18",
            step: 55,
            description: ``,
        },
        {
            label: '',
            page: "11/18",
            step: 60.5,
            description: ``,
        },
        {
            label: '',
            page: "12/18",
            step: 66,
            description: ``,
        },
        {
            label: '',
            page: "13/18",
            step: 71.5,
            description: ``,
        },
        {
            label: '',
            page: "14/18",
            step: 77,
            description: ``,
        },
        {
            label: '',
            page: "15/18",
            step: 82.5,
            description: ``,
        },
        {
            label: '',
            page: "16/18",
            step: 88,
            description: ``,
        },
        {
            label: '',
            page: "17/18",
            step: 93.5,
            description: ``,
        },
        {
            label: '',
            page: "18/18",
            step: 99,
            description: ``,
        },
        {
            label: '',
            page: "",
            step: 99,
            description: ``,
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
    const [open, setOpen] = useState(false);

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
                dialogClassName="modal-dialog-centered modal-policy">
                <Modal.Header style={{ borderBottom: 'none', padding: "36px" }}>
                    <Modal.Title>Privacy Policy </Modal.Title>
                    <div onClick={handleClose} className="btnClose"> <ClearIcon /> </div>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', height: '100%', width: "100%", borderBottom: 'none', padding: "24px" }}>
                    <form onSubmit={onSubmit} method="post" className={styles.careerPolicy}>
                        <p style={{ padding: '12px 20px' }}>
                            This website uses cookies to improve user experience. By visiting our
                            website you consent to all cookies in accordance with our privacy policy.
                        </p>

                        <div style={{ padding: '12px 20px' }}>
                            <input type="checkbox" id="privacy" name="privacy" onChange={e => setChecked((e.target.checked))} required />
                            <label className={styles.textLabel}>
                                Accept the terms and conditions also privacy policy.
                            </label>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '36px 0px' }}>
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
                dialogClassName={`modal-dialog-centered ${(width > 992) ? "modal-carrer" : "modal-carrer-mobile"} `}>
                <LinearProgress variant="determinate" style={{ backgroundColor: '#FFEAE0' }} value={steps[activeStep].step} />

                <Modal.Header style={{ borderBottom: 'none' }}>
                    <Modal.Title> {steps[activeStep].label} </Modal.Title>
                    <div style={{ display: "flex", alignItems: "top" }}>
                        <div style={{ paddingRight: "32px" }}> {steps[activeStep].page} </div>
                        <div onClick={handleCloseCareer} className="btnClose"> <ClearIcon /> </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {steps[activeStep].description}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 8px' }}>
                        <button className={styles.btnPrevious} onClick={handleBack} disabled={activeStep === 0}>
                            <WestIcon style={{ fontSize: "15px" }} />
                            <span> Previous </span>
                        </button>

                        <button className={styles.btnOrange} onClick={handleNext} disabled={activeStep === maxSteps - 1} >
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


