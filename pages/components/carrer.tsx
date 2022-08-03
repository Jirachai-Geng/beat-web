import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import router from 'next/router';

const Career = () => {
    const [isShowModul, setShowModul] = useState(false);

    return (
        <div className='backgroundDark d-flex align-items-center'>
            <Container fluid>
                <Row className="p-0">
                    <Col sm={8} className="background2">
                    </Col>

                    <Col sm={4} className="backgroundJoinUs d-flex flex-column">
                        <Row className="myCentreAlign">
                            <Row className="textJoinUs">
                                want to join us
                                <div>
                                    <button id='elRef' className="carrer-button" onClick={() => setShowModul(true)}>
                                        Apply Now
                                    </button>

                                </div>

                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Container >
            {isShowModul ? (
                <Modal key={router.asPath} />
            ): null}
            
                    
        </div >
    )
}



export default Career;
