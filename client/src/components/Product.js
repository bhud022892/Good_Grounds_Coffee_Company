import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
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
    )
}

export default Product
