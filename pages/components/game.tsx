import { FormEvent, Fragment, useContext, useEffect, useRef, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '../../styles/Game.module.css'
import { Unity, useUnityContext } from "react-unity-webgl";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { FullScreen, useFullScreenHandle } from "react-full-screen";


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

// get table row data
const tdData = (TableData: any, column: any) => {
    return TableData.map((data: any, index: any) => {
        return (
            <tr key={index} style={{ justifyContent: "space-between", padding: "20px !important" }}>
                {
                    column.map((v: any) => {
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


const Game = () => {
    const handle = useFullScreenHandle();

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

    let TableData = [
        { id: 1, fullName: "", score: 0 },
    ]
    let column = Object.keys(TableData[0]);


    const [TableData2, setTableData2] = useState([])
    const [showScore, setScore] = useState(false)
    useEffect(() => {
        fetch('http://103.13.231.185:8080/api/v1/score')
            .then((res) => res.json())
            .then((data) => {
                setTableData2(data.meta.response_data)
                console.log("TableData2:", TableData2)
                setScore(true)
                console.log(column)
            })
    }, [])

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
            if (width < 922) {
                if (width > 400) {
                    setTimeout(() => {
                        delayEvent(ref.current, "click");
                    }, 350);
                }
            }
        }
        let getUserInfo: any = localStorage.getItem("userAuth");
        let userInfo: any = JSON.parse(getUserInfo)
        if (userInfo) {
            if (userInfo.type === "facebook") {
                let userAuth = {
                    type: 'facebook',
                    name: session?.user.name,
                    social_url: session?.user.email,
                    picture_url: session?.user.image,
                }
                localStorage.setItem('userAuth', JSON.stringify(userAuth))
            }
        }
    };

    const [openCollapse, setOpenCollapse] = useState(false);

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
                type: 'email',
                name: UserName,
                social_url: email,
                picture_url: null,
            }
            localStorage.setItem('userAuth', JSON.stringify(userAuth))
            if (width < 400) {
                setShowModulSetScreen(true)
            } else {
                setIsPlaygame(true);
                if (width < 922) {
                    if (width > 400) {
                        setTimeout(() => {
                            delayEvent(ref.current, "click");
                        }, 350);
                    }
                }
            }
        }
    }

    const handleClickEnterFullscreen = () => {
        requestFullscreen(true);
    }

    const setUserFacebook = () => {
        console.log("setUserFacebook")
        let userAuth = {
            type: 'facebook',
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
            <Container fluid style={{ paddingTop: (width > 1290) ? '50px' : '0px' }}>
                {!isPlaygame ? (
                    <Row className={(width > 1290) ? styles.background_white : styles.background_mobile} ref={componentRef}>
                        {session ? (
                            <Col sm={12} lg={9} className={(width > 1290) ? styles.containerLogin : styles.animatedBackgroundMobile} ref={componentGameRef}>
                                <Row fluid setUserFacebook className={(width > 1290) ? styles.animatedBackground : styles.background_hide} style={{ width: '100%', height: '100%' }}>
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
                                ((width > 1290) ? styles.containerLogin : styles.animatedBackgroundMobile) :
                                (width > 1290) ? styles.backgroundBanner : styles.backgroundBannerMobile} ref={componentGameRef}>
                                <div className="endcontainer" style={{ display: isActive ? 'none' : '' }}>
                                    <button className="game-button" onClick={handleClick}>
                                        Let’s Play →
                                    </button>

                                </div>

                                {/* Login */}
                                <Row className={styles.animatedBackground} style={{ width: '100%', display: !isActive ? 'none' : '' }}>
                                    <Col sm={(width > 1290) ? 4 : 3}></Col>
                                    <Col sm={(width > 1290) ? 4 : 5}>
                                        <p className={styles.textLogIn}>
                                            Proven your speed and accuracy with
                                            Beat Active game.
                                        </p>

                                        <form onSubmit={onSubmit} method="post">
                                            <input className={styles.iconUser} placeholder="User Name"
                                                value={UserName} onChange={e => setUserName(e.target.value)}
                                                type="text" id="UserName" name="UserName" required />

                                            <input className={styles.iconMail} placeholder="Email*"
                                                value={email} onChange={e => setEmail(e.target.value)}
                                                type="email" id="Email" name="Email" required />

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
                                    <Col sm={(width > 1290) ? 4 : 3}></Col>
                                </Row>
                            </Col>
                        }
                        {/* score */}
                        {(width > 1290) ?
                            <Col className={styles.content} style={{ overflow: "auto", height: (width > 1290) ? heightGame : "auto" }}>
                                <p className={styles.textScore}> Leader Board </p>
                                <table className="table">
                                    <thead>
                                    </thead>
                                    {(showScore) ?
                                        <tbody className={styles.tableScore}>
                                            {tdData(TableData2, column)}
                                        </tbody>
                                        : <tbody className={styles.tableScore}>
                                            {tdData(TableData, column)}
                                        </tbody>
                                    }
                                </table>
                            </Col> :

                            <Col style={{ height: "100%" }} >
                                {/* <Collapse in={openCollapse} >
                                    <div className={styles.overlay} >
                                        <div className={styles.content}>
                                            <p className={styles.textScore}> Leader Board </p>
                                            <table className="table">
                                                <thead>
                                                </thead>
                                                {(showScore) ?
                                                    <tbody className={styles.tableScore}>
                                                        {tdData(TableData2, column)}
                                                    </tbody>
                                                    : <tbody className={styles.tableScore}>
                                                        {tdData(TableData, column)}
                                                    </tbody>
                                                }
                                            </table>
                                        </div>
                                    </div>
                                </Collapse>
                                <Button
                                    onClick={() => setOpenCollapse(!openCollapse)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={openCollapse}
                                >
                                    click
                                </Button> */}

                                <div className={(openCollapse) ? styles.slider : `${styles.slider} ${styles.close}`}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "30px" }}>
                                        <span className={styles.textScore}> Leader Board </span>
                                        <img onClick={() => setOpenCollapse(false)} style={{ width: "12px" }} src={"/assets/icons/arrowDrop.png"} alt="Collapse" />
                                    </div>
                                    <table className="table">
                                        <thead>
                                        </thead>
                                        {(showScore) ?
                                            <tbody className={styles.tableScore}>
                                                {tdData(TableData2, column)}
                                            </tbody>
                                            : <tbody className={styles.tableScore}>
                                                {tdData(TableData, column)}
                                            </tbody>
                                        }
                                    </table>
                                </div>

                                <div style={{ height: "78px", display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "30px" }}>
                                    <span className={styles.textScore}> Leader Board </span>
                                    <img onClick={() => setOpenCollapse(true)} style={{ width: "12px" }} src={"/assets/icons/arrowTop.png"} alt="Collapse" />
                                </div>
                            </Col>
                        }
                    </Row>

                ) :
                    <Row className={styles.background_white} >
                        {/* game play */}
                        <Col className={styles.containerGame} ref={componentRef}>
                            <FullScreen handle={handle}>
                                <Unity
                                    unityProvider={unityProvider}
                                    style={{ width: widthGame, height: (width > 1290) ? heightGame : "auto" }}
                                    ref={canvasRef} />
                            </FullScreen>
                        </Col>

                        {/* score */}
                        {(width > 1290) ?
                            <Col className={styles.content} style={{ overflow: "auto", height: "auto" }} >
                                <p className={styles.textScore}> Leader Board </p>
                                <table className="table">
                                    <thead>
                                    </thead>
                                    {(showScore) ?
                                        <tbody className={styles.tableScore}>
                                            {tdData(TableData2, column)}
                                        </tbody>
                                        : <tbody className={styles.tableScore}>
                                            {tdData(TableData, column)}
                                        </tbody>
                                    }
                                </table>
                            </Col> :
                            // <button ref={ref} onClick={handleClickEnterFullscreen} style={{ visibility: 'hidden' }}>TEST</button>
                            <button ref={ref} onClick={handle.enter} style={{ visibility: 'hidden' }}>Enter fullscreen </button>
                        }
                    </Row>
                }
            </Container>

            {(width < 1290) ?
                <Modal
                    show={isShowModulSetScreen}
                    onHide={handleCloseSetScreen}
                    dialogClassName="modal-dialog-centered ">
                    <Modal.Body style={{ display: 'flex', height: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            <div style={{ textAlign: "center", padding: "21px" }}> <img src={"/assets/icons/screen_rotate.png"} alt="rotant" /> </div>
                            <div className={styles.textHeader} style={{ textAlign: "center", padding: "10px" }}> Rotate the screen </div>
                            <div> The rotation of the screen will not be applied on the viewing screen </div>
                            <div style={{ textAlign: "center", cursor: "pointer", padding: "21px" }} onClick={handleCloseSetScreen}> <img src={"/assets/icons/exit.png"} alt="rotant" /> Exit </div>
                        </div>
                    </Modal.Body>
                </Modal> : null
            }

        </div >


    )
}



export default Game;

