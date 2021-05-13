import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import Rating from './Rating'

const TrendingProducts = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <div className='trending-container'>
            {products.map(product => (
                <Link className='card-link' to={`/product/${product._id}`}>
                    <Card className='card' key={product._id}>
                        <Card.Img className='card-image' variant="top" src={product.image} alt={product.name} />
                        <Card.Title className='card-title'>{product.name}</Card.Title>
                        <Card.Text className='card-price'>${product.price}</Card.Text>
                            <Card.Text as='div' className='card-rating'>
                                <Rating 
                                    value={product.rating} 
                                />
                            </Card.Text>                    
                    </Card>
                </Link> 
            ))}
        </div>
    )
}

export default TrendingProducts
