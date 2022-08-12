import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '../../styles/Game.module.css'
import Facebook from "next-auth/providers/facebook";
import { Unity, useUnityContext  } from "react-unity-webgl";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { FaFacebook, FaUser } from "react-icons/fa";
import { useRouter } from "next/router";

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

const Game = () => {
    const { unityProvider } = useUnityContext({
        codeUrl: `/unitybuild/game.wasm`,
        dataUrl: `/unitybuild/game.data`,
        frameworkUrl: `/unitybuild/game.framework.js`,
        loaderUrl: `/unitybuild/game.loader.js`,
        webglContextAttributes: {
            preserveDrawingBuffer: true,
        },
    });
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.push('/')
        }
    }, [session])

    const componentRef = useRef()
    const { width, height } = useContainerDimensions(componentRef)
    const canvasRef = useRef<HTMLCanvasElement>(null);

    let Height = (width * 9) / 16
    let mobile:boolean

    const TableData = [
        { id: 1, fullName: "Patsachol Tangsong...", score: '10,000' },
        { id: 2, fullName: "Klay Thomas", score: '8,800' },
        { id: 3, fullName: "Ja Morant", score: '8,000' },
        { id: 4, fullName: "Sunil Kumar", score: '5,600' },
        { id: 5, fullName: "Kajol Kumari", score: '5,000' },
        { id: 3, fullName: "Ja Morant", score: '8,000' },
        { id: 4, fullName: "Sunil Kumar", score: '5,600' },
        { id: 5, fullName: "Kajol Kumari", score: '5,000' }
    ]


    const column = Object.keys(TableData[0]);

    // get table row data
    const tdData = () => {
        return TableData.map((data: any, index) => {
            return (
                <tr key={index} style={{ justifyContent: "space-between", padding: "20px !important" }}>
                    {
                        column.map((v) => {
                            if (v === "score") {
                                return <td className={styles.textOrange}>{data[v]} P</td>
                            } else if (v === "id") {
                                return <td> <div className={styles.numberCircle}> {data[v]}</div>  </td>
                            } else {
                                return <td> {data[v]} </td>
                            }
                        })
                    }
                </tr>
            )
        })
    }

    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive(current => !current);
    };

    const [isPlaygame, setIsPlaygame] = useState(false);
    const handleClickGame = () => {
        if (width > 400){
            setIsPlaygame(true);
        }else {
            setShowModulSetScreen(true)
        }
        
    };

    const [email, setEmail] = useState("")
    const [UserName, setUserName] = useState("")
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log(email)
        let userAuth = {
            'userAuth': {
                type: 'email',
                name: UserName,
                social_url: email,
                picture_url: null,
            }
        }
        localStorage.setItem('userAuth', JSON.stringify(userAuth))
        setIsPlaygame(true)
    }

    const setUserFacebook = () => {
        let userAuth = {
            'userAuth': {
                type: 'facebook',
                name: session?.user.name,
                social_url: session?.user.email,
                picture_url: session?.user.image,
            }
        }
        localStorage.setItem('userAuth', JSON.stringify(userAuth))
    }

    const [isShowModulSetScreen, setShowModulSetScreen] = useState(false);
    const handleCloseSetScreen = () => setShowModulSetScreen(false);
    // console.log(session)
    // console.log(isPlaygame)

    return (
        <div>
             <script type="text/javascript" src="/game.js"></script>
            <Container fluid>
                {!isPlaygame ? (
                    <Row className={styles.background_white}>
                        {session ? (
                            <Col sm={9} className={styles.containerLogin} ref={componentRef} >
                                <Row className={styles.animatedBackground} style={{ width: '100%' }}>
                                    <Col sm={4}></Col>
                                    <Col sm={4} style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', height: '100%' }}>
                                        <p className={styles.textLogIn}>
                                            Proven your speed and accuracy with
                                            Beat Active game.
                                        </p>
                                        <div className={styles.center}>
                                            <img className={styles.ImgFaceBook} src={`${session.user.image}`} alt="UserImage" />
                                            {/* <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=5442137125846980&height=250&width=250&ext=1662759925&hash=AeQaN7g3qvjntjfApmc"/> */}
                                        </div>

                                        <div>

                                            <p className={styles.textFaceBook}>
                                                {session.user.name}
                                            </p>
                                            <button className={styles.btnEmail} onClick={handleClickGame}>
                                                Let’s Play  →
                                            </button>
                                        </div>

                                    </Col>
                                    <Col sm={4}></Col>
                                </Row>
                            </Col>
                        ) :
                            <Col sm={9} className={isActive ? styles.containerLogin : styles.backgroundBanner} ref={componentRef}>

                                <div className="endcontainer" style={{ display: isActive ? 'none' : '' }}>
                                    <button className="game-button" onClick={handleClick}>
                                        Let’s Play  →
                                    </button>
                                </div>


                                <Row className={styles.animatedBackground} style={{ width: '100%', display: !isActive ? 'none' : '' }}>
                                    <Col sm={4}></Col>
                                    <Col sm={4} style={{}}>
                                        <p className={styles.textLogIn}>
                                            Proven your speed and accuracy with
                                            Beat Active game.
                                        </p>

                                        <form onSubmit={onSubmit} method="post">
                                            <input className={styles.iconUser} placeholder="User Name"
                                                value={UserName} onChange={e => setUserName(e.target.value)}
                                                type="text" id="UserName" name="UserName" />

                                            <input className={styles.iconMail} placeholder="Email*"
                                                value={email} onChange={e => setEmail(e.target.value)}
                                                type="text" id="Email" name="Email" required />

                                            <input type="checkbox" id="privacy" name="privacy" />
                                            <label className={styles.textLabel}>
                                                Accept the terms and conditions also privacy policy.
                                            </label>

                                            <button type="submit" onClick={handleClickGame} className={styles.btnEmail}>
                                                Let’s Play  →
                                            </button>
                                        </form>

                                        <div className={styles.line}> </div>
                                        <button className={styles.btnFacebook} onClick={() => { setUserFacebook() ,signIn('facebook') }}>
                                            Login with Facebook
                                        </button>
                                    </Col>
                                    <Col sm={4}></Col>
                                </Row>
                            </Col>
                        }
                        {/* score */}
                        <Col className={styles.content} style={{ overflow: "auto", height: Height }}>
                            <p className={styles.textScore}> Leader Board </p>
                            <table className="table">
                                <thead>
                                </thead>
                                <tbody className={styles.tableScore}>
                                    {tdData()}
                                </tbody>
                            </table>
                        </Col>
                    </Row>

                ) :
                    <Row className={styles.background_white}>
                        <Col className={styles.containerGame}>
                            <Unity
                                unityProvider={unityProvider}
                                style={{ border: "1px solid red", width: width, height: Height }}
                                ref={canvasRef} />
                        </Col>


                        {/* score */}
                        <Col className={styles.content} style={{ overflow: "auto", height: Height }}>
                            <p className={styles.textScore}> Leader Board </p>
                            <table className="table">
                                <thead>
                                </thead>
                                <tbody className={styles.tableScore}>
                                    {tdData()}
                                </tbody>
                            </table>
                        </Col>
                    </Row>

                }
            </Container>

            
            <Modal
                show={isShowModulSetScreen}
                onHide={handleCloseSetScreen}
                dialogClassName="modal-content">

                <Modal.Body style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex' }}>
                        <div> ข้อมูลส่วนตัว </div>
                        <div onClick={handleCloseSetScreen} className='btnClose'></div>
                    </div>
              
                </Modal.Body>
            </Modal>
        </div >

        
    )
}



export default Game;
