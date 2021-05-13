import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Meta from '../components/Meta'

const AboutScreen = () => {
    return (
        <>
        <Meta title='Good Grounds | About' />
            <Row className='about-row'>
                <Col className='about-container' md={6}>
                    <h1 className='about-page-title'>Good Grounds Coffee Co.</h1>
                    <Image className='about-photo' src='/images/about-image.jpg' alt='Good Grounds Coffee Co' />
                </Col>
                <Col className='about-info-container' md={6}>
                    <p>Good Grounds Coffee Co. believes in providing quality brews while also offering hope to each of our communities are in. We began in 2010, and have grown to be the name you know today. Over the years, we have continued to create the best blends possible for our customers.</p>
                    <p>With each bag of coffee purchased, we donate 10% of the purchase to local homeless shelters, which in returns provides quality meals, job training, and additional funding for each shelter to better their patrons.</p>
                    <h4>"Our goal is to help one person in need one bag of coffee at a time."</h4>
                    <h6>- Tim Jenkins, Founder & CEO</h6>
                </Col>
            </Row> 
            <h4 className='insta-title'>Follow Our Mission</h4>
            <Carousel className='insta-slider'>
                <Carousel.Item>
                    <Row>
                        <img
                        className="w-50"
                        src="/images/1.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                        <img
                        className="w-50"
                        src="/images/2.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                    </Row>  
                    <Row>
                        <img
                        className="w-50"
                        src="/images/3.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                        <img
                        className="w-50"
                        src="/images/4.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                    </Row>                   
                </Carousel.Item>
                <Carousel.Item>
                    <Row>
                        <img
                        className="w-50"
                        src="/images/5.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                        <img
                        className="w-50"
                        src="/images/6.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                    </Row>  
                    <Row>
                        <img
                        className="w-50"
                        src="/images/7.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                        <img
                        className="w-50"
                        src="/images/8.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                    </Row>                   
                </Carousel.Item>
                <Carousel.Item>
                    <Row>
                        <img
                        className="w-50"
                        src="/images/9.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                        <img
                        className="w-50"
                        src="/images/10.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                    </Row>  
                    <Row>
                        <img
                        className="w-50"
                        src="/images/11.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                        <img
                        className="w-50"
                        src="/images/12.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                    </Row>                   
                </Carousel.Item>
                <Carousel.Item>
                    <Row>
                        <img
                        className="w-50"
                        src="/images/13.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                        <img
                        className="w-50"
                        src="/images/14.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                    </Row>  
                    <Row>
                        <img
                        className="w-50"
                        src="/images/15.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                        <img
                        className="w-50"
                        src="/images/16.jpg"
                        alt="Good Grounds Coffee Co. Instagram"
                        />
                    </Row>                   
                </Carousel.Item>
            </Carousel>
    </>
    )
}

export default AboutScreen
