import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { 
    Row, 
    Col, 
    ListGroup, 
    Image, 
    Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { 
    getOrderDetails, 
    payOrder,
    deliverOrder
} from '../actions/orderActions'
import { 
    ORDER_PAY_RESET, 
    ORDER_DELIVER_RESET 
} from '../constants/orderConstants'
import Meta from '../components/Meta'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if(!loading) {
        // Round to two decimal places always
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        // Calculate Prices
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
        order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 10)
        order.taxPrice = addDecimals(Number((0.07 * order.itemsPrice).toFixed(2)))
        order.totalPrice = (
            Number(order.itemsPrice) + 
            Number(order.shippingPrice) + 
            Number(order.taxPrice)
            ).toFixed(2)
    }    

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
        }, [dispatch, orderId, successPay, order, history, userInfo, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
    <Meta title='Good Grounds | Your Order' />
        <h3 className='order-id-title'>Order #{order._id}</h3>
        <Row>
            <Col className='summary-container' md={7}>
                <ListGroup className='final-order-summary' variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.firstName} {order.user.lastName}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        <p><strong>Delivered: </strong>
                        {order.isDelivered 
                        ? `Delivered ${order.deliveredAt}`
                        : 'Not Delivered'}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p><strong>Method: </strong>{order.paymentMethod}</p>
                        <p><strong>Status: </strong>
                        {order.isPaid 
                        ? `Paid On ${order.paidAt.substring(0, 10)}`
                        : `Needs Payment` }
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 
                        ? <Message>Your Order Is Empty</Message> 
                        : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item className='final-order-item-container' key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Link className='final-order-image-link' to={`/product${item.product}`}>
                                                    <Image 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        fluid 
                                                        rounded 
                                                    />
                                                </Link>
                                            </Col>

                                            <Col className='final-order-item-small' md={4}>
                                                <Link className='final-order-title-link' to={`/product${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>

                                            <Col className='final-order-item-small' md={2}>
                                                Qty: {item.qty}
                                            </Col>

                                            <Col className='final-order-item-small' md={3}>
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
                    <ListGroup className='final-order-summary-total' variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? (
                                    <Loader /> 
                                ) : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </ListGroup.Item>
                        )}

                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn btn-block' 
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>               
            </Col>
        </Row>
    </>
}

export default OrderScreen
