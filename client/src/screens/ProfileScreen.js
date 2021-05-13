import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { 
    getUserDetails, 
    updateUserProfile 
} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listUserOrders } from '../actions/orderActions'
import Meta from '../components/Meta'

const ProfileScreen = ({ location, history }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListUser = useSelector(state => state.orderListUser)
    const { loading:loadingOrders, error:errorOrders, orders } = orderListUser

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user || !user.firstName || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listUserOrders())
            } else {
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords Do Not Match')
        } else {
            dispatch(updateUserProfile({ id: user._id, firstName, lastName, email, password }))
        }        
    }

    return (
        <Row>
            <Meta title='Good Grounds | Account' />
            <Col  md={12}>
                <h2 className='update-profile-title'>Update Information</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Information Updated</Message>}
                {loading && <Loader />}
                <Form className='update-profile-form' onSubmit={submitHandler}>
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
                    className='update-profile-btn'
                    >
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={12}>
                <h2 className='my-orders-title'>My Orders</h2>
                {loadingOrders 
                ? <Loader /> 
                : errorOrders 
                ? <Message variant='danger'>{errorOrders}</Message>
                : (
                    <Table 
                    striped 
                    bordered 
                    responsive 
                    className='table-sm orders-table'
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td> 
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>                                    
                                    <td><LinkContainer to={`/order/${order._id}`}>
                                            <Button 
                                            className='btn-sm order-details-btn'
                                            >
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
            </Col>
        </Row>
    )
}

export default ProfileScreen
