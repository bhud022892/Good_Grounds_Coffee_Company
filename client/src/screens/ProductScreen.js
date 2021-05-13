import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { 
    listProductDetails, 
    createProductReview 
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { 
        loading, 
        error, 
        product 
    } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate

    useEffect(() => {
        if(successProductReview) {
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
            <Link
                to='/shop'
                className='product-back-btn' 
                type='button' 
                >
                    Continue Shopping
            </Link>
            {loading ? ( 
                <Loader /> 
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) 
            : (
                <>
                <Meta title={product.name} />
                <Row>
                <Col md={6}>
                    <Image className='individual-product-image' src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3 className='individual-product-name'>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price: 
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong> 
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 ? (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control 
                                            as='select' 
                                            value={qty} 
                                            onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x +1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ) : (
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status: 
                                    </Col>
                                    <Col>
                                        Out Of Stock 
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button 
                                onClick={addToCartHandler}
                                className='btn-block add-to-cart-btn' 
                                type='button' 
                                disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='reviews-container'>
                            <h4>Write A Review</h4>
                            {successProductReview && (
                            <Message variant='success'>
                                Review submitted successfully
                            </Message>
                            )}
                            {loadingProductReview && <Loader />}
                            {errorProductReview && (
                                <Message variant='danger'>{errorProductReview}</Message>
                            )}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control 
                                            as='select' 
                                            value={rating} 
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control 
                                        as='textarea' 
                                        row='3' 
                                        value={comment} 
                                        onChange={(e) => setComment(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button 
                                    type='submit' 
                                    variant='primary'
                                    className='review-btn'
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            ) : <Message>Please Login To Write A Review</Message>}
                        </ListGroup.Item>
                        <h4 className='reviews-title'>All Reviews</h4>
                        {product.reviews.length === 0 && <Message>Be The First To Leave A Review</Message>}
                        {product.reviews.map(review => (
                            <ListGroup.Item className='all-reviews-container' key={review._id}>
                                <div className='reviewer-container'>
                                    <p className='reviewer-name'>{review.firstName} {review.lastName.substring(0, 1)}.</p>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                </div>                        
                                <Rating className='reviewer-rating' value={review.rating} />
                                <p className='actual-review'>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            </>
            )}
        </>
    )
}

export default ProductScreen
