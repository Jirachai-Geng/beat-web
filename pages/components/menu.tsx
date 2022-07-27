import { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import logo from 'BEAT ACTIVE Logo White on White-01.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Menu = ({ }) => {
    return (
        <div style={{ padding: '35px' }}>
            <Row>
                <Col sm={3}>
                    <img src='/BEAT ACTIVE Logo White on White-01.png' className="App-logo" alt="logo" />
                </Col>

                <Col sm={9}>
                    <Row>
                        <Col>Home</Col>
                        <Col>Press</Col>
                        <Col>Sefety Standard</Col>
                        <Col>FAQ</Col>
                        <Col>Career</Col>
                        <Col>Contact Us</Col>
                        <Col>languages</Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Menu
