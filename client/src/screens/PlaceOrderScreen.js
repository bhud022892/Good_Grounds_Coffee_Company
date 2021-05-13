import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import Meta from '../components/Meta'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    // Round to two decimal places always
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // Calculate Prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = addDecimals(Number((0.07 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) + 
        Number(cart.shippingPrice) + 
        Number(cart.taxPrice)
        ).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <>
        <Meta title='Good Grounds | Place Order' />
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='shipping-container'>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item className='payment-container'>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item className='order-items-container'>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 
                            ? <Message>Your Cart Is Empty</Message> 
                            : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item className='place-order-card-container' key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Link className='order-total-image-link' to={`/product/${item.product}`}>
                                                        <Image 
                                                            src={item.image} 
                                                            alt={item.name} 
                                                            fluid 
                                                            rounded 
                                                        />
                                                    </Link>
                                                </Col>

                                                <Col className='place-order-title' md={4}>
                                                    <Link className='place-order-link' to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col className='place-order-qty' md={2}>
                                                    Qty: {item.qty}
                                                </Col>

                                                <Col className='place-order-price' md={3}>
                                                    Total: ${item.qty * item.price}
                                                </Col>

                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                        <ListGroup variant='flush' className='order-summary-container'>
                            <ListGroup.Item>
                                <h2>Your Order</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {error && <Message variant='danger'>{error}</Message>}
                            
                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn-block place-order-btn' 
                                    disabled={cart.cartItems === 0} 
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>              
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
