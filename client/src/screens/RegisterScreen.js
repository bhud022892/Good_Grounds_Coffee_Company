import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import Meta from '../components/Meta'

const RegisterScreen = ({ location, history }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search 
        ? location.search.split('=')[1] 
        : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords Do Not Match')
        } else {
            dispatch(register(firstName, lastName, email, password))
        }        
    }

    return (
        <FormContainer>
            <Meta title='Good Grounds | Register' />
            <h1 className='register-title'>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='Enter First Name' 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='Enter Last Name' 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type='email' 
                    placeholder='Enter Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password' 
                    placeholder='Enter Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    type='password' 
                    placeholder='Confirm Password' 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button 
                type='submit'
                className='register-btn'
                >
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Registered Users Login
                        <Link
                        to={redirect 
                        ? `/login?redirect=${redirect}` 
                        : '/login'}
                        className='register-login-link'
                        > Here</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
