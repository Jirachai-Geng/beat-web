import { Fragment, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Footer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isShowGame, setShowGame] = useState(false);

    return (
        <div style={{ width: '100%' }}>
            <Container>
                <Row>
                    <Col sm>
                        <div className='text_title'>
                            Contact Information
                        </div>
                        <div className='text'>
                            <p>Beat Active </p>
                            <p>Tel : 02-888-8222</p>
                            <p>199/001 Soi Sukhumvit, Example for veryyy long information, and adresss, Bangkok 10110</p>
                        </div>
                    </Col>
                    <Col sm>
                        <p className='text_title'>
                            Help
                        </p>

                        <div className='text'>
                            <p>Privacy Policy</p>
                            <p>Cookie Policy</p>
                        </div>
                    </Col>
                    <Col sm>
                    </Col>
                </Row>
            </Container>




        </div >
    );
};

export default Footer;

