import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ children }) => {
    return (
        <Alert className='alert-message'>
            {children}
        </Alert>
    )
}

export default Message