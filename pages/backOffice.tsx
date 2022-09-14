import { FormEvent, useEffect, useState } from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import styles from '../styles/Auth.module.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Router from 'next/router'
import { CSVLink } from "react-csv";
import moment from "moment";

const BackOffice = () => {
  const [selectMenu, setSelectMenu] = useState("pdpa")
  const [TablePDPAGame, setTablePDPAGame] = useState([])
  const [TablePDPACareer, setTablePDPACareer] = useState([])

  const [TableScore, setTableScore] = useState([])
  const [TablePlay, setTablePLay] = useState([])

  const [showScore, setScore] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("login") !== "true") {
      Router.push('/login')
    }
    fetch('https://beatactivethailand.com:8082/pdpa_game')
      .then((res) => res.json())
      .then((dataCarrer) => {
        setTablePDPAGame(dataCarrer.message)
      })

    fetch('https://beatactivethailand.com:8082/pdpa_career')
      .then((res) => res.json())
      .then((dataCarrer) => {
        setTablePDPACareer(dataCarrer.message)
      })

    fetch('https://beatactivethailand.com:8082/score')
      .then((res) => res.json())
      .then((data) => {
        setTableScore(data.message)
        setScore(true)
      })

    fetch('https://beatactivethailand.com:8082/player')
      .then((res) => res.json())
      .then((data) => {
        setTablePLay(data.message)
        setScore(true)
      })
  }, [])

  return <>
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand><img src='/assets/logo.svg' className="App-logo" alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="ContainRight">
          <Nav className="size-menu text-center">
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      <div className={styles.form_score} >
        <Row >
          <Col sm={2} className={styles.border_right}>
            <Row> <div className={styles.textScore} style={{ fontWeight: (selectMenu === "pdpa") ? 700 : 400, cursor: 'pointer' }}
              onClick={() => setSelectMenu("pdpa")}> PDPA Record </div> </Row>
            <Row> <div className={styles.textScore} style={{ fontWeight: (selectMenu === "game") ? 700 : 400, cursor: 'pointer' }}
              onClick={() => setSelectMenu("game")}> Game Data </div> </Row>
          </Col>

          {
            selectMenu === 'pdpa' ?
              <Col>
                <Row>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Col sm={3}> <div className={styles.textScore}> PDPA Data for Career </div></Col>
                    <Col sm={3}>
                      <div style={{ padding: "26px", textAlign: "center" }}>
                        <CSVLink className={styles.btnPolicy} filename={`PDPA_Career_${moment().format("YYYY.MM.DD_HH.mm.ss")}.csv`} data={TablePDPACareer}>Download</CSVLink>
                      </div>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Col sm={3}> <div className={styles.textScore}> PDPA Data for Game </div></Col>
                    <Col sm={3}>
                      <div style={{ padding: "26px", textAlign: "center" }}>
                        <CSVLink className={styles.btnPolicy} filename={`PDPA_Game_${moment().format("YYYY.MM.DD_HH.mm.ss")}.csv`} data={TablePDPAGame}>Download</CSVLink>
                      </div>
                    </Col>

                  </div>
                </Row>
              </Col>
              :
              <Col>
                <Row>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Col sm={3}> <div className={styles.textScore}> Game leader board </div></Col>
                    <Col sm={3}>
                      <div style={{ padding: "26px", textAlign: "center" }}>
                        <CSVLink className={styles.btnPolicy} filename={`Leader_Board_${moment().format("YYYY.MM.DD_HH.mm.ss")}.csv`} data={TableScore}>Download</CSVLink>
                      </div>
                    </Col>

                  </div>
                </Row>
                <Row>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Col sm={3}> <div className={styles.textScore}> Game player list </div></Col>
                    <Col sm={3}>
                      <div style={{ padding: "26px", textAlign: "center" }}>
                        <CSVLink className={styles.btnPolicy} filename={`Game_Player_${moment().format("YYYY.MM.DD_HH.mm.ss")}.csv`} data={TablePlay}>Download</CSVLink>
                      </div>
                    </Col>

                  </div>
                </Row>
              </Col>
          }



        </Row>

      </div>
    </div> </>
}

export default BackOffice