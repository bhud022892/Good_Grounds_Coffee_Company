import React from 'react'
import TrendingProducts from '../components/TrendingProducts'
import { Image, Button } from 'react-bootstrap'
import Meta from '../components/Meta'

const HomeScreen = ({ product }) => {
    return (
        <>
            <Meta title='Good Grounds | Home' />
            <div className='hero-row'>
                    <h1>Coffee With A Cause</h1>
                    <Button className='btn' href='/about'>Learn More</Button>
                <Image className='hero-image' src='/images/coffeeHero.jpg' />
            </div>

            <div className='trending-row'>
                    <h3>Trending Blends</h3>
                    <TrendingProducts />
            </div>
        </>                
    )
}

export default HomeScreen
