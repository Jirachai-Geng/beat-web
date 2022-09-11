import { FormEvent, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import styles from '../styles/Auth.module.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Router from 'next/router'

const Login = () =>  {
  const [password, setpassword] = useState("")
  const [UserName, setUserName] = useState("")

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    let userAuth = {
      type: 'email',
      name: UserName,
      social_url: password,
      picture_url: null,
    }
    const {pathname} = Router
    if(password === 'beatactive_1234' && UserName === 'admin'){
      Router.push('/backOffice')
      localStorage.setItem("login","true")
    } else {
      alert("Invalid UserName or password.");
    }
  }

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
      <section className={styles.form_wrapper}>
        <h4 style={{ paddingBottom: "20px" }}> Sign In to back office </h4>
        <form onSubmit={onSubmit}>
          <input className={styles.input_backgound} placeholder="User Name*"
            value={UserName} onChange={e => setUserName(e.target.value)}
            type="text" id="UserName" name="UserName" required />

          <input className={styles.input_backgound} placeholder="password*"
            value={password} onChange={e => setpassword(e.target.value)}
            type="password" id="password" name="password" required />

          <button type="submit" className={styles.btnLogin}>
            Sign In  →
          </button>
        </form>

      </section>

    </div> </>
}


export default Login