import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
            e.target.reset();
        } else {
            history.push('/shop')
        }
    }

    return (
        <Form className='search-container' onSubmit={submitHandler} inline>
            <Form.Control 
            type='text' 
            name='q' 
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search...'
            className='mr-sm-2 ml-sm-5 search-input'
            ></Form.Control>
            <Button 
            type='submit' 
            variant='outline=success' 
            className='p-2 search-icon'
            >
                <i class="fas fa-search"></i>
            </Button>
        </Form>
    )
}

export default SearchBox
