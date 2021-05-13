import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import Meta from '../components/Meta'

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { 
        loading:loadingUpdate, 
        error:errorUpdate, 
        success:successUpdate 
    } = userUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userList')
        } else {
            if(!user.firstName || user._id !== userId) {
            dispatch(getUserDetails(userId))
            } else {
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }   
        }
        
    }, [user, history, dispatch, userId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, firstName, lastName, email, isAdmin }))
    }

    return (
        <>
        <Meta title='Good Grounds | Edit Account' />
            <Link to='/admin/userList' className='btn btn-light my-3'>
                Back
            </Link>
            <FormContainer>
            <h1>Edit User Info</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading 
            ? <Loader /> 
            : error 
            ? <Message variant='danger'>{error}</Message> 
            : (
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

                    <Form.Group controlId='isAdmin'>
                        <Form.Check
                        type='checkbox' 
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>

                    <Button 
                    type='submit'
                    variant='primary'
                    >
                        Update
                    </Button>
                </Form>
            )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen
