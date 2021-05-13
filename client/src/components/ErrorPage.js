import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'

const ErrorPage = () => {
    return (
        <div className='error-page-container'>
            <Image className='error-image' src='/images/error.png' />
            <h2>Looks like you drank a little too much coffee!</h2>
            <Link className='error-home-btn' to='/'>Home</Link>
        </div>
    )
}

export default ErrorPage
