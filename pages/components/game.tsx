import { FormEvent, Fragment, useContext, useEffect, useRef, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '../../styles/Game.module.css'
import Facebook from "next-auth/providers/facebook";
import { Unity, useUnityContext } from "react-unity-webgl";
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

export const useContainerDimensionsGame = (myRef: any) => {
    const getDimensionsGame = () => ({
        widthGame: myRef.current.offsetWidth,
        heightGame: myRef.current.offsetHeight
    })

    const [dimensionsGame, setDimensionsGame] = useState({ widthGame: 0, heightGame: 0 })

    useEffect(() => {
        const handleResize = () => {
            setDimensionsGame(getDimensionsGame())
        }

        if (myRef.current) {
            setDimensionsGame(getDimensionsGame())
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [myRef])

    return dimensionsGame;
};

const Game = () => {
    const { unityProvider, requestFullscreen, isLoaded } = useUnityContext({
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
    const componentGameRef = useRef()

    const ref = useRef(null);

    const { width, height } = useContainerDimensions(componentRef)
    const { widthGame, heightGame } = useContainerDimensionsGame(componentGameRef)

    const canvasRef = useRef<HTMLCanvasElement>(null);

    let HeightGame = (widthGame * 9) / 16
    let mobile: boolean

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
        if (width < 400) {
            setShowModulSetScreen(true)
        } else {
            setIsPlaygame(true);
            if (width > 400) {
                setTimeout(() => {
                    delayEvent(ref.current, "click");
                }, 350);
            }
        }
        let getUserInfo: any = localStorage.getItem("userAuth");
        let userInfo: any = JSON.parse(getUserInfo)
        if (userInfo){
            if (userInfo.userAuth.type === "facebook") {
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
        }
    };

    const delayEvent = (el: any, eventName: any) => {
        const event = new Event(eventName, { bubbles: true });
        el.dispatchEvent(event);
    };

    const [email, setEmail] = useState("")
    const [UserName, setUserName] = useState("")
    const [Privacy, setPrivacy] = useState("")

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (Privacy === "true") {
            let userAuth = {
                'userAuth': {
                    type: 'email',
                    name: UserName,
                    social_url: email,
                    picture_url: null,
                }
            }
            localStorage.setItem('userAuth', JSON.stringify(userAuth))
            setIsPlaygame(true);
        }
    }

    const handleClickEnterFullscreen = () => {
        requestFullscreen(true);
    }

    const setUserFacebook = () => {
        console.log("setUserFacebook")
        let userAuth = {
            'userAuth': {
                type: 'facebook',
            }
        }
        localStorage.setItem('userAuth', JSON.stringify(userAuth))
    }

    const [isShowModulSetScreen, setShowModulSetScreen] = useState(false);
    const handleCloseSetScreen = () => setShowModulSetScreen(false);
    // console.log(session)
    // console.log(isPlaygame)
    let showResults = true
    return (
        <div>
            <Container fluid style={{ paddingTop: (width > 992) ? '50px' : '0px' }}>
                {!isPlaygame ? (
                    <Row className={styles.background_white} ref={componentRef}>
                        {session ? (
                            <Col sm={12} lg={9} className={(width > 992) ? styles.containerLogin : styles.animatedBackgroundMobile} ref={componentGameRef}>
                                <Row fluid setUserFacebook className={(width > 992) ? styles.animatedBackground : styles.background_hide} style={{ width: '100%', height: '100%' }}>
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
                            <Col sm={12} lg={9} className={isActive ?
                                ((width > 992) ? styles.containerLogin : styles.animatedBackgroundMobile) :
                                (width > 400) ? styles.backgroundBanner : styles.backgroundBannerMobile} ref={componentGameRef}>
                                <div className="endcontainer" style={{ display: isActive ? 'none' : '' }}>
                                    <button className="game-button" onClick={handleClick}>
                                        Let’s Play  →
                                    </button>
                                </div>

                                {/* Login */}
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

                                            <input type="checkbox" id="privacy" name="privacy" onChange={e => setPrivacy((e.target.checked).toString())} required />
                                            <label className={styles.textLabel}>
                                                Accept the terms and conditions also privacy policy.
                                            </label>

                                            <button type="submit" className={styles.btnEmail}>
                                                Let’s Play  →
                                            </button>
                                        </form>

                                        <div className={styles.line}> </div>
                                        <button className={styles.btnFacebook} onClick={() => { setUserFacebook(), signIn('facebook') }}>
                                            Login with Facebook
                                        </button>
                                    </Col>
                                    <Col sm={4}></Col>
                                </Row>
                            </Col>
                        }
                        {/* score */}
                        {(width > 992) ?
                            <Col className={styles.content} style={{ overflow: "auto", height: HeightGame }}>
                                <p className={styles.textScore}> Leader Board </p>
                                <table className="table">
                                    <thead>
                                    </thead>
                                    <tbody className={styles.tableScore}>
                                        {tdData()}
                                    </tbody>
                                </table>
                            </Col> : null}
                    </Row>

                ) :
                    <Row className={styles.background_white} >
                        {/* game play */}
                        <Col className={styles.containerGame} ref={componentRef}>
                            <Unity
                                unityProvider={unityProvider}
                                style={{ width: widthGame, height: heightGame }}
                                ref={canvasRef} />
                        </Col>


                        {/* score */}
                        {(width > 992) ?
                            <Col className={styles.content} style={{ overflow: "auto", height: HeightGame }} >
                                <p className={styles.textScore}> Leader Board </p>
                                <table className="table">
                                    <thead>
                                    </thead>
                                    <tbody className={styles.tableScore}>
                                        {tdData()}
                                    </tbody>
                                </table>
                            </Col> :
                            <button ref={ref} onClick={handleClickEnterFullscreen} style={{ visibility: 'hidden' }}>TEST</button>
                        }
                    </Row>
                }
            </Container>

            {(width < 992) ?
                <Modal
                    show={isShowModulSetScreen}
                    onHide={handleCloseSetScreen}
                    dialogClassName="modal-dialog-centered">
                    <Modal.Body style={{ display: 'flex', height: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            <div style={{ textAlign: "center" }}> <img src={"/assets/icons/screen_rotate.png"} alt="rotant" /> </div>
                            <div className={styles.textHeader} style={{ textAlign: "center" }}> Rotate the screen </div>
                            <div> The rotation of the screen will not be applied on the viewing screen </div>
                            <div style={{ textAlign: "center", cursor: "pointer" }} onClick={handleCloseSetScreen}> <img src={"/assets/icons/exit.png"} alt="rotant" /> Exit </div>
                        </div>
                    </Modal.Body>
                </Modal> : null
            }

        </div >


    )
}



export default Game;
