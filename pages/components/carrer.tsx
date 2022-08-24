import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { setCookie } from 'cookies-next';
import styles from '../../styles/Career.module.css'
import { useTheme } from '@mui/material/styles';
import { Modal } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';


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
    const [btnDisable, setBtnDisable] = useState(true);


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

    const seleMonth = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December'];

    let qntYears = 30;
    let currentYear = new Date().getFullYear();
    const selectYear: any[] = [];
    for (var y = 0; y < qntYears; y++) {
        selectYear.push(currentYear - 15)
        currentYear--;
    }

    // career 1
    const [selectDate, setDate] = useState([1])
    const [dataCareer, setDataCareer] = useState({
        name: '',
        videoURL: '',
        birth_date: '',
        birth_month: '',
        birth_year: '',
        line_id: '',
        phone_countries: '+66',
    });
    const onChangeData = (e: any) => {
        console.log(e.target.name)
        const name = e.target.name
        const newValue = { ...dataCareer, [name]: e.target.value }
        console.log(e.target.value)
        let tempDate = [1];
        if (e.target.name === 'birth_month') {
            if (e.target.value === 'February') {
                for (var d = 2; d <= 29; d++) {
                    tempDate.push(d)
                }
            } else if (e.target.value in ['April', 'June', 'September', 'November']) {
                for (var d = 2; d <= 30; d++) {
                    tempDate.push(d)
                }
            } else {
                for (var d = 2; d <= 31; d++) {
                    tempDate.push(d)
                }
            }
            setDate(tempDate)
        }
        setDataCareer(newValue);
    }
    
    const [dataResume, setResume] = useState('Upload your resume*')
    const [filePDF, setFilePDF]: any = useState();
    const [fileNamePDF, setFileNamePDF] = useState("");
    const onChangeResume = (e: any) => {
        setResume(e.target.value)
        setFilePDF(e.target.files[0]);
        setFileNamePDF(e.target.files[0].name);
    }


    // career 2
    let [careerFile, setCareerFile] = useState("")
    let [breakUpload, setbreakUpload] = useState(false)
    const [fileVideo, setFileVDO]: any = useState();
    const [fileNameVideo, setFileNameVDO] = useState("");
    const handleFileChange = (event: any) => {
        if (event.target.value) {
            setCareerFile(event.target.value)
            if (event.target.files[0].size > 20971520) {
                setbreakUpload(true);
            } else {
                if (event.target.files.length > 0) {
                    setFileVDO(event.target.files[0]);
                    setFileNameVDO(event.target.files[0].name);
                    setbreakUpload(false);
                }
            }
        }

    };

    // career 3
    let arrCareer3 = [false, false, false, false, false, false, false, false]
    let [arrCareer_3, setArrCareer3] = useState([false, false, false, false, false, false, false, false])
    const setArrCareer_3 = (index: any) => {
        arrCareer3[index] = !arrCareer_3[index]
        setArrCareer3(arrCareer3)
        console.log(arrCareer_3)
    }

    // career 4
    // let [temp, setTemp4] = useState( [false, false, false, false, false, false, false, false])
    let arrCareer4 = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    let [arrCareer_4, setArrCareer4] = useState(arrCareer4)

    const setArrCareer_4 = (index: any) => {
        let temp_state = [...arrCareer_4];
        temp_state[index] = !temp_state[index];
        let count = temp_state.filter(Boolean).length;
        if (count <= 5) {
            setArrCareer4(temp_state)
        }
    }

    // career 5
    let career5 = 0;
    let [career_5, setCareer5] = useState(career5);

    // career 6
    let career6A = 0;
    let [career_6A, setCareer6A] = useState(career6A);
    let career6B = 0;
    let [career_6B, setCareer6B] = useState(career6B);

    // career 18
    let career18 = 0;
    let [career_18, setCareer18] = useState(career18);

    const onUploadFile = async (e: boolean) => {
        const formData = new FormData();
        formData.append("NameofFile", dataCareer.name);
        formData.append("filePDF", filePDF);
        formData.append("fileNamePDF", fileNamePDF);
        formData.append("video", (fileNameVideo !== '') ? 'true' : 'false');
        formData.append("fileVideo", fileVideo);
        formData.append("fileNameVideo", fileNameVideo);
        try {
            const res = await axios.post(
                "http://103.13.231.185:8082/upload",
                formData
            );

        } catch (ex) {
            console.log(ex);
        }

    }

    const steps = [
        {
            // sareer 1
            label: <span className={styles.headerTitle}>ข้อมูลส่วนตัว</span>,
            page: <span className={styles.headerTitle}>1/18</span>,
            step: 5.5,
            description:
                <div className={styles.career1} style={{ padding: (width > 992) ? "0px 200px" : "16px" }}>
                    <input className={styles.btnFill} placeholder="Full Name*"
                        type="text" id="UserName" name="name" value={dataCareer.name} onChange={onChangeData} />

                    {/* <div className="App">
                        <button onClick={uploadFile}>Upload</button>
                    </div> */}

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', columnGap: "8px" }}>
                        <select defaultValue={""} name="birth_month" value={dataCareer.birth_month} className={styles.btnFill} onChange={onChangeData} required>
                            <option value="" disabled selected>Month</option>
                            {seleMonth.map(item => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select defaultValue={""} name="birth_date" value={dataCareer.birth_date} className={styles.btnFill} onChange={onChangeData} required>
                            <option value="" disabled selected>Date</option>
                            {selectDate.map(item => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select defaultValue={""} name="birth_year" className={styles.btnFill} onChange={onChangeData} required>
                            <option value="" disabled selected>Year</option>
                            {selectYear.map(item => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', columnGap: "8px" }}>
                        <Col sm={3}>
                            <select defaultValue="+66" name="phone_countries" className={styles.btnFill} onChange={onChangeData} required>
                                <option value="+66" selected>+66</option>
                                {countries.map(item => (
                                    <option key={item.code} value={item.code}>
                                        {item.code}
                                    </option>
                                ))}
                            </select>
                        </Col>
                        <Col sm={9}>
                            <input className={styles.btnFill} onChange={onChangeData} placeholder="Phone Number"
                                type="text" id="Phone_number" name="Phone_number" required />
                        </Col>

                    </div>

                    <input className={styles.btnFill} onChange={onChangeData} placeholder="Line ID*"
                        type="text" id="line_id" name="line_id" />

                    <label htmlFor="resume" className={styles.custom_file_upload} >
                        <i className="fa fa-cloud-upload"></i> {dataResume}
                    </label>
                    <input placeholder={dataResume} onChange={e => { onChangeResume(e) }}
                        style={{ display: "none" }} id="resume" name="resume" type="file" accept=".pdf" />



                </div>
        },
        {
            label: <span className={styles.headerTitle}>วิดีโอแนะนำตัวคุณ ความยาวไม่เกิน 1 นาทีในรูปแบบที่เป็นตัวตนของตัวเอง</span>,
            page: <span className={styles.headerTitle}>2/18</span>,
            step: 11,
            description:
                <div className={styles.career2} style={{ padding: (width > 992) ? "0px 270px" : "16px" }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                        {breakUpload ?
                            <label className={styles.fileUpload} >
                                <input style={{ display: "none" }} type="file" accept="video/mp4" onChange={handleFileChange} />
                                <img style={{ width: "39.95px", paddingBottom: "15px" }} src={"/assets/icons/cantUpload.png"} alt="choose_file" />
                                <span style={{ fontFamily: 'Prompt', fontWeight: "600", fontSize: "20px", lineHeight: "30px", color: "#D66F56" }}>
                                    {careerFile.split(/\\/g).pop()} </span>
                                <span> File couldn’t upload. Please try again.</span>
                            </label>
                            : (
                                careerFile ?
                                    <label className={`${styles.fileUpload}`}>
                                        <input style={{ display: "none" }} type="file" accept="video/mp4" onChange={handleFileChange} />
                                        <img style={{ width: "39.95px", paddingBottom: "15px" }} src={"/assets/icons/havefile.png"} alt="choose_file" />
                                        <p style={{ fontFamily: 'Prompt', fontWeight: "600", fontSize: "20px", lineHeight: "30px", color: "#4CA183" }}>
                                            {careerFile.split(/\\/g).pop()} </p>
                                    </label>
                                    : <label className={styles.fileUpload}>
                                        <input style={{ display: "none" }} type="file" accept="video/mp4" onChange={handleFileChange} />
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
                            type={`${isValidURL ? 'text' : 'search'}`} onChange={e => { checkValidURL(e.target.value), onChangeData }}
                            id="videoURL" name="videoURL" value={dataCareer.videoURL} />
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
                                {(arrCareer_3[0]) ?
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
                                {(arrCareer_3[1]) ?
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
                                {(arrCareer_3[2]) ?
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
                                {(arrCareer_3[3]) ?
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
                                {(arrCareer_3[4]) ?
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
                                {(arrCareer_3[5]) ?
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
                                {(arrCareer_3[6]) ?
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
                                {(arrCareer_3[7]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect8" />
                                    </div> : null}
                            </label></Col>
                    </Row>
                </Container>,
        },
        {
            label: <span className={styles.headerTitle}>โปรดเลือก 1-5 ภาพ สำหรับกิจกรรมยามว่างที่คุณสนใจ</span>,
            page: <span className={styles.headerTitle}>4/18</span>,
            step: 22,
            description:
                <Container fluid >
                    <Row>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(0)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac1.png" alt="ac1" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 1 </span>
                                </div>
                                {(arrCareer_4[0]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sport10" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(1)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac2.png" alt="ac2" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 2 </span>
                                </div>
                                {(arrCareer_4[1]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect2" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(2)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac3.png" alt="ac3" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 3 </span>
                                </div>
                                {(arrCareer_4[2]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect3" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(3)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac4.png" alt="ac4" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 4 </span>
                                </div>
                                {(arrCareer_4[3]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect4" />
                                    </div> : null}
                            </label></Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }} >
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(4)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac5.png" alt="ac5" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 5 </span>
                                </div>
                                {(arrCareer_4[4]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sport5" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(5)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac6.png" alt="ac6" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 6 </span>
                                </div>
                                {(arrCareer_4[5]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect6" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(6)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac7.png" alt="ac7" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 7 </span>
                                </div>
                                {(arrCareer_4[6]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect7" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(7)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac8.png" alt="ac8" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 8 </span>
                                </div>
                                {(arrCareer_4[7]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect8" />
                                    </div> : null}
                            </label></Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }} >
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(8)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac9.png" alt="ac9" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 5 </span>
                                </div>
                                {(arrCareer_4[8]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sport5" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(9)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac10.png" alt="ac10" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 6 </span>
                                </div>
                                {(arrCareer_4[9]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect6" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(10)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac11.png" alt="ac11" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 7 </span>
                                </div>
                                {(arrCareer_4[10]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect7" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(11)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac12.png" alt="ac12" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 8 </span>
                                </div>
                                {(arrCareer_4[11]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect8" />
                                    </div> : null}
                            </label></Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }} >
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(12)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac13.png" alt="ac13" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 5 </span>
                                </div>
                                {(arrCareer_4[12]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sport5" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(13)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac14.png" alt="ac14" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 6 </span>
                                </div>
                                {(arrCareer_4[13]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect6" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(14)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac15.png" alt="ac15" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 7 </span>
                                </div>
                                {(arrCareer_4[14]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect7" />
                                    </div> : null}
                            </label></Col>
                        <Col xs={6} md={3} style={{ paddingBottom: (width > 992) ? "16px" : "8px" }}>
                            <label style={{ width: (width > 992) ? "198px" : "168px" }} className={styles.career3} onClick={() => setArrCareer_4(15)}>
                                <img style={{ height: (width > 992) ? "198px" : "168px" }} src="/assets/career4/ac6.png" alt="ac6" />
                                <div className={styles.career3_blur}>
                                    <span> Sport 8 </span>
                                </div>
                                {(arrCareer_4[15]) ?
                                    <div className={styles.career3_active}>
                                        <img style={{ height: (width > 992) ? "43.74px" : "37.11px" }} src="/assets/icons/careerSelect.png" alt="sportSelect8" />
                                    </div> : null}
                            </label></Col>
                    </Row>
                </Container>,
        },
        {
            label: <span className={styles.headerTitle}>เลือกให้คะแนนในคำถามแต่ละข้อ ตามความรู้สึก</span>,
            page: "5/18",
            step: 27.5,
            description:
                <Container fluid>
                    <div style={{ padding: (width > 992) ? "140px 120px" : "16px" }}>
                        <Row>
                            <div>
                                <p className={styles.question}
                                    style={{ fontSize: (width > 992) ? "24px" : "18px" }}>
                                    คุณสนุกสนานกับการเคลื่อนไหว ออกกำลังกาย เช่น การวิ่ง การกระโดด การปีนป่าย ฯลฯ มากกว่ากิจกรรมที่สร้างสมาธิ
                                </p>
                            </div>
                        </Row>
                        <Row className={styles.gapBtn}>
                            <Col xs={6} md={3} >
                                <div className={styles.career5BtnChoice} style={{
                                    backgroundColor: (career_5 === 1) ? "#FF5100" : "#1A1A1A"
                                    , marginBottom: (width > 992) ? "0px" : "8px"
                                }}
                                    onClick={() => { handleNext(1); setCareer5(1) }}>
                                    <p style={{ marginBottom: "5px", fontSize: "20px" }}>1</p>
                                    <p style={{ marginBottom: "0px" }}>ใช่ที่สุด</p>
                                </div>
                            </Col>
                            <Col xs={6} md={3}>
                                <div className={styles.career5BtnChoice} style={{ backgroundColor: (career_5 === 2) ? "#FF5100" : "#1A1A1A" }}
                                    onClick={() => { handleNext(1); setCareer5(2) }}>
                                    <p style={{ marginBottom: "5px", fontSize: "20px" }}>2</p>
                                    <p style={{ marginBottom: "0px" }}>ใช่</p>
                                </div>
                            </Col>
                            <Col xs={6} md={3}>
                                <div className={styles.career5BtnChoice} style={{ backgroundColor: (career_5 === 3) ? "#FF5100" : "#1A1A1A" }}
                                    onClick={() => { handleNext(1); setCareer5(3) }}>
                                    <p style={{ marginBottom: "5px", fontSize: "20px" }}>3</p>
                                    <p style={{ marginBottom: "0px" }}>เฉยๆ</p>
                                </div>
                            </Col>
                            <Col xs={6} md={3}>
                                <div className={styles.career5BtnChoice} style={{ backgroundColor: (career_5 === 4) ? "#FF5100" : "#1A1A1A" }}
                                    onClick={() => { handleNext(1); setCareer5(4) }}>
                                    <p style={{ marginBottom: "5px", fontSize: "20px" }}>4</p>
                                    <p style={{ marginBottom: "0px" }}>ไม่ใช่เลย</p>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </Container>,
        },
        {
            label: <span className={styles.headerTitle}>สไตล์การทำงานแบบไหนที่บ่งบอกความเป็นตัวคุณ</span>,
            page: "6/18",
            step: 33,
            description:
                <Container fluid>
                    <div style={{ padding: (width > 992) ? "140px 180px" : "16px" }}>
                        <Row className={styles.gapBtn} style={{ paddingBottom: "20px" }}>
                            <Col xs={12} md={1} >
                                <div style={{ height: (width > 992) ? "84px" : "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ marginBottom: "5px", fontSize: "20px" }}> A. </p>
                                </div>
                            </Col>

                            <Col xs={12} md={11}>
                                <Row>
                                    <Col xs={12} md={6} >
                                        <div className={(width > 992) ? styles.career6BtnChoice : styles.career6BtnChoiceMobile} style={{
                                            backgroundColor: (career_6A === 1) ? "#FF5100" : "#1A1A1A"
                                        }}
                                            onClick={() => {
                                                if (career_6B !== 0) {
                                                    handleNext(12)
                                                };
                                                setCareer6A(1)
                                            }}>
                                            <p style={{
                                                marginBottom: "5px"
                                                , fontSize: (width > 992) ? "20px" : "16px"
                                            }}>ชอบพูดคุยประสานงาน</p>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <div className={(width > 992) ? styles.career6BtnChoice : styles.career6BtnChoiceMobile} style={{
                                            backgroundColor: (career_6A === 2) ? "#FF5100" : "#1A1A1A"
                                        }}
                                            onClick={() => {
                                                if (career_6B !== 0) {
                                                    handleNext(12)
                                                };
                                                setCareer6A(2)
                                            }}>
                                            <p style={{
                                                marginBottom: "5px"
                                                , fontSize: (width > 992) ? "20px" : "16px"
                                            }}>ชอบวางแผนงาน</p>
                                        </div>
                                    </Col>
                                </Row>

                            </Col>

                        </Row>

                        <Row className={styles.gapBtn}>
                            <Col xs={12} md={1} >
                                <div style={{ height: (width > 992) ? "84px" : "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ marginBottom: "5px", fontSize: "20px" }}> B. </p>
                                </div>
                            </Col>

                            <Col xs={12} md={11}>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <div className={(width > 992) ? styles.career6BtnChoice : styles.career6BtnChoiceMobile} style={{
                                            backgroundColor: (career_6B === 1) ? "#FF5100" : "#1A1A1A"
                                        }}
                                            onClick={() => {
                                                if (career_6A !== 0) {
                                                    handleNext(12)
                                                };
                                                setCareer6B(1)
                                            }}>
                                            <p style={{
                                                marginBottom: "5px"
                                                , fontSize: (width > 992) ? "20px" : "16px"
                                            }}>ทำงานคนเดียว</p>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <div className={(width > 992) ? styles.career6BtnChoice : styles.career6BtnChoiceMobile} style={{
                                            backgroundColor: (career_6B === 2) ? "#FF5100" : "#1A1A1A"
                                        }}
                                            onClick={() => {
                                                if (career_6A !== 0) {
                                                    handleNext(12)
                                                };
                                                setCareer6B(2)
                                            }}>
                                            <p style={{
                                                marginBottom: "5px"
                                                , fontSize: (width > 992) ? "20px" : "16px"
                                            }}>ทำงานเป็นทีม</p>
                                        </div>
                                    </Col>
                                </Row>

                            </Col>

                        </Row>
                    </div >

                </Container >,
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
            label: <span className={styles.headerTitle}>สไตล์การทำงานแบบไหนที่บ่งบอกความเป็นตัวคุณ</span>,
            page: "18/18",
            step: 99,
            description:
                <Container fluid>
                    <div style={{ padding: (width > 992) ? "70px 180px" : "16px" }}>
                        <Row className={styles.gapBtn}>
                            <Col xs={12} md={1} >
                                <div style={{ height: (width > 992) ? "84px" : "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ marginBottom: "5px", fontSize: "20px" }}> A. </p>
                                </div>
                            </Col>

                            <Col xs={12} md={11}>
                                <div className={(width > 992) ? styles.career18BtnChoice : styles.career18BtnChoiceMobile}
                                    style={{ backgroundColor: (career_18 === 1) ? "#FF5100" : "#1A1A1A" }}
                                    onClick={() => { setCareer18(1), onUploadFile(true) }}>
                                    <p style={{ marginBottom: "5px", fontSize: (width > 992) ? "20px" : "16px" }}>เชื่อฟัง เคารพกฏ</p>
                                </div>
                            </Col>

                        </Row>
                        <Row className={styles.gapBtn}>
                            <Col xs={12} md={1} >
                                <div style={{ height: (width > 992) ? "84px" : "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ marginBottom: "5px", fontSize: "20px" }}> B. </p>
                                </div>
                            </Col>

                            <Col xs={12} md={11}>
                                <div className={(width > 992) ? styles.career18BtnChoice : styles.career18BtnChoiceMobile}
                                    style={{ backgroundColor: (career_18 === 2) ? "#FF5100" : "#1A1A1A" }}
                                    onClick={() => { setCareer18(2), onUploadFile(true) }}>
                                    <p style={{ marginBottom: "5px", fontSize: (width > 992) ? "20px" : "16px" }}>ปรับตัวเก่ง</p>
                                </div>
                            </Col>

                        </Row>
                        <Row className={styles.gapBtn}>
                            <Col xs={12} md={1} >
                                <div style={{ height: (width > 992) ? "84px" : "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ marginBottom: "5px", fontSize: "20px" }}> C. </p>
                                </div>
                            </Col>

                            <Col xs={12} md={11}>
                                <div className={(width > 992) ? styles.career18BtnChoice : styles.career18BtnChoiceMobile}
                                    style={{ backgroundColor: (career_18 === 3) ? "#FF5100" : "#1A1A1A" }}
                                    onClick={() => { setCareer18(3), onUploadFile(true) }}>
                                    <p style={{ marginBottom: "5px", fontSize: (width > 992) ? "20px" : "16px" }}>พึ่งคนอื่น ไว้ใจคน</p>
                                </div>
                            </Col>

                        </Row>
                        <Row className={styles.gapBtn}>
                            <Col xs={12} md={1} >
                                <div style={{ height: (width > 992) ? "84px" : "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <p style={{ marginBottom: "5px", fontSize: "20px" }}> D. </p>
                                </div>
                            </Col>

                            <Col xs={12} md={11}>
                                <div className={(width > 992) ? styles.career18BtnChoice : styles.career18BtnChoiceMobile}
                                    style={{ backgroundColor: (career_18 === 4) ? "#FF5100" : "#1A1A1A" }}
                                    onClick={() => { setCareer18(4), onUploadFile(true) }}>
                                    <p style={{ marginBottom: "5px", fontSize: (width > 992) ? "20px" : "16px" }}>ชอบริเริ่ม ต้องการความเปลี่ยนแปลง</p>
                                </div>
                            </Col>

                        </Row>
                    </div>
                </Container>,
        },
        {
            label: '',
            page: "",
            step: 100,
            description:
                <Container fluid>
                    <div style={{
                        padding: (width > 992) ? "25px 200px" : "16px", display: "flex",
                        flexDirection: "column", alignItems: "center", justifyContent: "center"
                    }}>
                        <img style={{ height: (width > 992) ? "144px" : "120px" }} src="/assets/icons/complete.png" alt="complete" />
                        <p style={{
                            fontSize: (width > 992) ? "36px" : "24px", fontFamily: "PromptBold", paddingTop: "36px"
                        }}> Thank you for submitting </p>

                        <div style={{
                            fontSize: (width > 992) ? "18px" : "16px", fontFamily: "Prompt", paddingTop: "36px", textAlign: "center", paddingBottom: "36px"
                        }}>
                            <p>Your submission has been sent. We’ll contact you when a decision is made</p>
                        </div>

                        <div className={styles.line} style={{ paddingBottom: "36px" }}> </div>

                        <button className={styles.btnPrevious} style={{ width: "100%" }}
                            onClick={() => { handleCloseCareer() }}> Back to home </button>
                    </div>
                </Container>,
        },
    ];

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = (page: number) => {
        setActiveStep((prevActiveStep) => prevActiveStep + page);
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
                    <Modal.Title>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                            <div style={{ paddingRight: "32px", fontSize: (width > 992) ? "20px" : "16px" }}>
                                {steps[activeStep].label}
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{
                                    paddingRight: (width > 992) ? "32px" : "5px"
                                    , fontFamily: (width > 992) ? "PromptBold" : "Prompt"
                                    , fontSize: (width > 992) ? "20px" : "16px"
                                }}> {steps[activeStep].page} </div>
                                {
                                    (activeStep !== 18) ?
                                        <div onClick={handleCloseCareer} className="btnClose"> <ClearIcon /> </div>
                                        : null}
                            </div>
                        </div>
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className={`${(width < 992) ? "scrollModal" : null} `}>
                        <div className={`${(width < 992) ? null : "scrollModal"} `} style={{ maxHeight: `${(width < 992) ? null : "480px"} ` }}>
                            {steps[activeStep].description}
                        </div>

                        {
                            (activeStep !== 18) ?
                                <div className={`${(width < 992) ? "fixedBtns" : "fixedBtnsDesktop"} `} >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 36px' }}>
                                        <button className={styles.btnPrevious} onClick={handleBack} disabled={activeStep === 0}>
                                            <WestIcon style={{ fontSize: "15px" }} />
                                            <span> Previous </span>
                                        </button>

                                        <button className={`${(btnDisable) ? styles.btnOrange : styles.btnDisable}`} 
                                            onClick={() => { handleNext(1) }} disabled={activeStep === maxSteps - 1} >
                                            <span> Next </span>
                                            <EastIcon style={{ fontSize: "15px" }} />
                                        </button>
                                    </div>
                                </div> : null}
                    </div>
                </Modal.Body>
            </Modal>

        </div >
    )
}



export default Career;


const countries = [
    {
        "code": "+7840",
        "name": "Abkhazia"
    },
    {
        "code": "+93",
        "name": "Afghanistan"
    },
    {
        "code": "+355",
        "name": "Albania"
    },
    {
        "code": "+213",
        "name": "Algeria"
    },
    {
        "code": "+1684",
        "name": "American Samoa"
    },
    {
        "code": "+376",
        "name": "Andorra"
    },
    {
        "code": "+244",
        "name": "Angola"
    },
    {
        "code": "+1264",
        "name": "Anguilla"
    },
    {
        "code": "+1268",
        "name": "Antigua and Barbuda"
    },
    {
        "code": "+54",
        "name": "Argentina"
    },
    {
        "code": "+374",
        "name": "Armenia"
    },
    {
        "code": "+297",
        "name": "Aruba"
    },
    {
        "code": "+247",
        "name": "Ascension"
    },
    {
        "code": "+61",
        "name": "Australia"
    },
    {
        "code": "+672",
        "name": "Australian External Territories"
    },
    {
        "code": "+43",
        "name": "Austria"
    },
    {
        "code": "+994",
        "name": "Azerbaijan"
    },
    {
        "code": "+1242",
        "name": "Bahamas"
    },
    {
        "code": "+973",
        "name": "Bahrain"
    },
    {
        "code": "+880",
        "name": "Bangladesh"
    },
    {
        "code": "+1246",
        "name": "Barbados"
    },
    {
        "code": "+1 268",
        "name": "Barbuda"
    },
    {
        "code": "+375",
        "name": "Belarus"
    },
    {
        "code": "+32",
        "name": "Belgium"
    },
    {
        "code": "+501",
        "name": "Belize"
    },
    {
        "code": "+229",
        "name": "Benin"
    },
    {
        "code": "+1441",
        "name": "Bermuda"
    },
    {
        "code": "+975",
        "name": "Bhutan"
    },
    {
        "code": "+591",
        "name": "Bolivia"
    },
    {
        "code": "+387",
        "name": "Bosnia and Herzegovina"
    },
    {
        "code": "+267",
        "name": "Botswana"
    },
    {
        "code": "+55",
        "name": "Brazil"
    },
    {
        "code": "+246",
        "name": "British Indian Ocean Territory"
    },
    {
        "code": "+1284",
        "name": "British Virgin Islands"
    },
    {
        "code": "+673",
        "name": "Brunei"
    },
    {
        "code": "+359",
        "name": "Bulgaria"
    },
    {
        "code": "+226",
        "name": "Burkina Faso"
    },
    {
        "code": "+257",
        "name": "Burundi"
    },
    {
        "code": "+855",
        "name": "Cambodia"
    },
    {
        "code": "+237",
        "name": "Cameroon"
    },
    {
        "code": "+1",
        "name": "Canada"
    },
    {
        "code": "+238",
        "name": "Cape Verde"
    },
    {
        "code": "+345",
        "name": "Cayman Islands"
    },
    {
        "code": "+236",
        "name": "Central African Republic"
    },
    {
        "code": "+235",
        "name": "Chad"
    },
    {
        "code": "+56",
        "name": "Chile"
    },
    {
        "code": "+86",
        "name": "China"
    },
    {
        "code": "+61",
        "name": "Christmas Island"
    },
    {
        "code": "+61",
        "name": "Cocos-Keeling Islands"
    },
    {
        "code": "+57",
        "name": "Colombia"
    },
    {
        "code": "+269",
        "name": "Comoros"
    },
    {
        "code": "+242",
        "name": "Congo"
    },
    {
        "code": "+243",
        "name": "Congo, Dem. Rep. of (Zaire)"
    },
    {
        "code": "+682",
        "name": "Cook Islands"
    },
    {
        "code": "+506",
        "name": "Costa Rica"
    },
    {
        "code": "+385",
        "name": "Croatia"
    },
    {
        "code": "+53",
        "name": "Cuba"
    },
    {
        "code": "+599",
        "name": "Curacao"
    },
    {
        "code": "+537",
        "name": "Cyprus"
    },
    {
        "code": "+420",
        "name": "Czech Republic"
    },
    {
        "code": "+45",
        "name": "Denmark"
    },
    {
        "code": "+246",
        "name": "Diego Garcia"
    },
    {
        "code": "+253",
        "name": "Djibouti"
    },
    {
        "code": "+1767",
        "name": "Dominica"
    },
    {
        "code": "+1809",
        "name": "Dominican Republic"
    },
    {
        "code": "+670",
        "name": "East Timor"
    },
    {
        "code": "+56",
        "name": "Easter Island"
    },
    {
        "code": "+593",
        "name": "Ecuador"
    },
    {
        "code": "+20",
        "name": "Egypt"
    },
    {
        "code": "+503",
        "name": "El Salvador"
    },
    {
        "code": "+240",
        "name": "Equatorial Guinea"
    },
    {
        "code": "+291",
        "name": "Eritrea"
    },
    {
        "code": "+372",
        "name": "Estonia"
    },
    {
        "code": "+251",
        "name": "Ethiopia"
    },
    {
        "code": "+500",
        "name": "Falkland Islands"
    },
    {
        "code": "+298",
        "name": "Faroe Islands"
    },
    {
        "code": "+679",
        "name": "Fiji"
    },
    {
        "code": "+358",
        "name": "Finland"
    },
    {
        "code": "+33",
        "name": "France"
    },
    {
        "code": "+596",
        "name": "French Antilles"
    },
    {
        "code": "+594",
        "name": "French Guiana"
    },
    {
        "code": "+689",
        "name": "French Polynesia"
    },
    {
        "code": "+241",
        "name": "Gabon"
    },
    {
        "code": "+220",
        "name": "Gambia"
    },
    {
        "code": "+995",
        "name": "Georgia"
    },
    {
        "code": "+49",
        "name": "Germany"
    },
    {
        "code": "+233",
        "name": "Ghana"
    },
    {
        "code": "+350",
        "name": "Gibraltar"
    },
    {
        "code": "+30",
        "name": "Greece"
    },
    {
        "code": "+299",
        "name": "Greenland"
    },
    {
        "code": "+1 473",
        "name": "Grenada"
    },
    {
        "code": "+590",
        "name": "Guadeloupe"
    },
    {
        "code": "+1 671",
        "name": "Guam"
    },
    {
        "code": "+502",
        "name": "Guatemala"
    },
    {
        "code": "+224",
        "name": "Guinea"
    },
    {
        "code": "+245",
        "name": "Guinea-Bissau"
    },
    {
        "code": "+595",
        "name": "Guyana"
    },
    {
        "code": "+509",
        "name": "Haiti"
    },
    {
        "code": "+504",
        "name": "Honduras"
    },
    {
        "code": "+852",
        "name": "Hong Kong SAR China"
    },
    {
        "code": "+36",
        "name": "Hungary"
    },
    {
        "code": "+354",
        "name": "Iceland"
    },
    {
        "code": "+91",
        "name": "India"
    },
    {
        "code": "+62",
        "name": "Indonesia"
    },
    {
        "code": "+98",
        "name": "Iran"
    },
    {
        "code": "+964",
        "name": "Iraq"
    },
    {
        "code": "+353",
        "name": "Ireland"
    },
    {
        "code": "+972",
        "name": "Israel"
    },
    {
        "code": "+39",
        "name": "Italy"
    },
    {
        "code": "+225",
        "name": "Ivory Coast"
    },
    {
        "code": "+1 876",
        "name": "Jamaica"
    },
    {
        "code": "+81",
        "name": "Japan"
    },
    {
        "code": "+962",
        "name": "Jordan"
    },
    {
        "code": "+7 7",
        "name": "Kazakhstan"
    },
    {
        "code": "+254",
        "name": "Kenya"
    },
    {
        "code": "+686",
        "name": "Kiribati"
    },
    {
        "code": "+965",
        "name": "Kuwait"
    },
    {
        "code": "+996",
        "name": "Kyrgyzstan"
    },
    {
        "code": "+856",
        "name": "Laos"
    },
    {
        "code": "+371",
        "name": "Latvia"
    },
    {
        "code": "+961",
        "name": "Lebanon"
    },
    {
        "code": "+266",
        "name": "Lesotho"
    },
    {
        "code": "+231",
        "name": "Liberia"
    },
    {
        "code": "+218",
        "name": "Libya"
    },
    {
        "code": "+423",
        "name": "Liechtenstein"
    },
    {
        "code": "+370",
        "name": "Lithuania"
    },
    {
        "code": "+352",
        "name": "Luxembourg"
    },
    {
        "code": "+853",
        "name": "Macau SAR China"
    },
    {
        "code": "+389",
        "name": "Macedonia"
    },
    {
        "code": "+261",
        "name": "Madagascar"
    },
    {
        "code": "+265",
        "name": "Malawi"
    },
    {
        "code": "+60",
        "name": "Malaysia"
    },
    {
        "code": "+960",
        "name": "Maldives"
    },
    {
        "code": "+223",
        "name": "Mali"
    },
    {
        "code": "+356",
        "name": "Malta"
    },
    {
        "code": "+692",
        "name": "Marshall Islands"
    },
    {
        "code": "+596",
        "name": "Martinique"
    },
    {
        "code": "+222",
        "name": "Mauritania"
    },
    {
        "code": "+230",
        "name": "Mauritius"
    },
    {
        "code": "+262",
        "name": "Mayotte"
    },
    {
        "code": "+52",
        "name": "Mexico"
    },
    {
        "code": "+691",
        "name": "Micronesia"
    },
    {
        "code": "+1808",
        "name": "Midway Island"
    },
    {
        "code": "+373",
        "name": "Moldova"
    },
    {
        "code": "+377",
        "name": "Monaco"
    },
    {
        "code": "+976",
        "name": "Mongolia"
    },
    {
        "code": "+382",
        "name": "Montenegro"
    },
    {
        "code": "+1664",
        "name": "Montserrat"
    },
    {
        "code": "+212",
        "name": "Morocco"
    },
    {
        "code": "+95",
        "name": "Myanmar"
    },
    {
        "code": "+264",
        "name": "Namibia"
    },
    {
        "code": "+674",
        "name": "Nauru"
    },
    {
        "code": "+977",
        "name": "Nepal"
    },
    {
        "code": "+31",
        "name": "Netherlands"
    },
    {
        "code": "+599",
        "name": "Netherlands Antilles"
    },
    {
        "code": "+1 869",
        "name": "Nevis"
    },
    {
        "code": "+687",
        "name": "New Caledonia"
    },
    {
        "code": "+64",
        "name": "New Zealand"
    },
    {
        "code": "+505",
        "name": "Nicaragua"
    },
    {
        "code": "+227",
        "name": "Niger"
    },
    {
        "code": "+234",
        "name": "Nigeria"
    },
    {
        "code": "+683",
        "name": "Niue"
    },
    {
        "code": "+672",
        "name": "Norfolk Island"
    },
    {
        "code": "+850",
        "name": "North Korea"
    },
    {
        "code": "+1670",
        "name": "Northern Mariana Islands"
    },
    {
        "code": "+47",
        "name": "Norway"
    },
    {
        "code": "+968",
        "name": "Oman"
    },
    {
        "code": "+92",
        "name": "Pakistan"
    },
    {
        "code": "+680",
        "name": "Palau"
    },
    {
        "code": "+970",
        "name": "Palestinian Territory"
    },
    {
        "code": "+507",
        "name": "Panama"
    },
    {
        "code": "+675",
        "name": "Papua New Guinea"
    },
    {
        "code": "+595",
        "name": "Paraguay"
    },
    {
        "code": "+51",
        "name": "Peru"
    },
    {
        "code": "+63",
        "name": "Philippines"
    },
    {
        "code": "+48",
        "name": "Poland"
    },
    {
        "code": "+351",
        "name": "Portugal"
    },
    {
        "code": "+1787",
        "name": "Puerto Rico"
    },
    {
        "code": "+974",
        "name": "Qatar"
    },
    {
        "code": "+262",
        "name": "Reunion"
    },
    {
        "code": "+40",
        "name": "Romania"
    },
    {
        "code": "+7",
        "name": "Russia"
    },
    {
        "code": "+250",
        "name": "Rwanda"
    },
    {
        "code": "+685",
        "name": "Samoa"
    },
    {
        "code": "+378",
        "name": "San Marino"
    },
    {
        "code": "+966",
        "name": "Saudi Arabia"
    },
    {
        "code": "+221",
        "name": "Senegal"
    },
    {
        "code": "+381",
        "name": "Serbia"
    },
    {
        "code": "+248",
        "name": "Seychelles"
    },
    {
        "code": "+232",
        "name": "Sierra Leone"
    },
    {
        "code": "+65",
        "name": "Singapore"
    },
    {
        "code": "+421",
        "name": "Slovakia"
    },
    {
        "code": "+386",
        "name": "Slovenia"
    },
    {
        "code": "+677",
        "name": "Solomon Islands"
    },
    {
        "code": "+27",
        "name": "South Africa"
    },
    {
        "code": "+500",
        "name": "South Georgia and the South Sandwich Islands"
    },
    {
        "code": "+82",
        "name": "South Korea"
    },
    {
        "code": "+34",
        "name": "Spain"
    },
    {
        "code": "+94",
        "name": "Sri Lanka"
    },
    {
        "code": "+249",
        "name": "Sudan"
    },
    {
        "code": "+597",
        "name": "Suriname"
    },
    {
        "code": "+268",
        "name": "Swaziland"
    },
    {
        "code": "+46",
        "name": "Sweden"
    },
    {
        "code": "+41",
        "name": "Switzerland"
    },
    {
        "code": "+963",
        "name": "Syria"
    },
    {
        "code": "+886",
        "name": "Taiwan"
    },
    {
        "code": "+992",
        "name": "Tajikistan"
    },
    {
        "code": "+255",
        "name": "Tanzania"
    },
    {
        "code": "+66",
        "name": "Thailand"
    },
    {
        "code": "+670",
        "name": "Timor Leste"
    },
    {
        "code": "+228",
        "name": "Togo"
    },
    {
        "code": "+690",
        "name": "Tokelau"
    },
    {
        "code": "+676",
        "name": "Tonga"
    },
    {
        "code": "+1 868",
        "name": "Trinidad and Tobago"
    },
    {
        "code": "+216",
        "name": "Tunisia"
    },
    {
        "code": "+90",
        "name": "Turkey"
    },
    {
        "code": "+993",
        "name": "Turkmenistan"
    },
    {
        "code": "+1 649",
        "name": "Turks and Caicos Islands"
    },
    {
        "code": "+688",
        "name": "Tuvalu"
    },
    {
        "code": "+1340",
        "name": "U.S. Virgin Islands"
    },
    {
        "code": "+256",
        "name": "Uganda"
    },
    {
        "code": "+380",
        "name": "Ukraine"
    },
    {
        "code": "+971",
        "name": "United Arab Emirates"
    },
    {
        "code": "+44",
        "name": "United Kingdom"
    },
    {
        "code": "+1",
        "name": "United States"
    },
    {
        "code": "+598",
        "name": "Uruguay"
    },
    {
        "code": "+998",
        "name": "Uzbekistan"
    },
    {
        "code": "+678",
        "name": "Vanuatu"
    },
    {
        "code": "+58",
        "name": "Venezuela"
    },
    {
        "code": "+84",
        "name": "Vietnam"
    },
    {
        "code": "+1 808",
        "name": "Wake Island"
    },
    {
        "code": "+681",
        "name": "Wallis and Futuna"
    },
    {
        "code": "+967",
        "name": "Yemen"
    },
    {
        "code": "+260",
        "name": "Zambia"
    },
    {
        "code": "+255",
        "name": "Zanzibar"
    },
    {
        "code": "+263",
        "name": "Zimbabwe"
    }
]