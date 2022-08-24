import { FormEvent, useEffect, useState } from 'react'
import { Col, Container, Nav, Navbar } from 'react-bootstrap'
import styles from '../styles/Auth.module.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Router from 'next/router'
import { CSVLink } from "react-csv";

const BackOffice = () => {
  const [password, setpassword] = useState("")
  const [UserName, setUserName] = useState("")

  const tdData = (TableData: any, column: any) => {
    return TableData.map((data: any, index: any) => {
      return (
        <tr key={index} style={{ justifyContent: "space-around", padding: "20px !important" }}>
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
    <div className={styles.backgroundDark}>
      <div className={styles.form_score} style={{ overflow: "auto" }} >

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div className={styles.textScore}> Leader Board </div>
          <div style={{ paddingRight: "30px" }}>
            <CSVLink className={styles.btnPolicy} data={TableData2}>Export CSV</CSVLink>

          </div>
        </div>


        <table className="table">
          <thead>
          </thead>

          <tbody className={styles.tableScore}>
            {tdData(TableData2, column)}
          </tbody>


        </table>
      </div>
    </div> </>
}

export default BackOffice