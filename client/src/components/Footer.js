import React from 'react'
import { Row, Col, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Row className='footer-row'>
                <Col md={4} className='footer-info'> 
                    <p>Free Shipping On Orders Over $100!</p>                
                </Col>
                <Col md={4} className='socials'>
                    <div className='social-links'>
                        <LinkContainer to='#'>
                            <Nav.Link className='footer-link'><i class="fab fa-facebook-square"></i></Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='#'>
                            <Nav.Link className='footer-link'><i class="fab fa-instagram-square"></i></Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='#'>
                            <Nav.Link className='footer-link'><i class="fab fa-twitter-square"></i></Nav.Link>
                        </LinkContainer>
                    </div>
                </Col>
                <Col md={4} className='footer-info'>   
                    <p>&copy; Good Grounds Coffee Co.</p>              
                </Col>
            </Row>
        </footer>
    )
}

export default Footer
