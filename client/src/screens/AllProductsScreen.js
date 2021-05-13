import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const AllProductsScreen = ({ match }) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Container>
            <Meta title='Good Grounds | Shop' />
                <h1 className='all-products-title'>Coffee Blends</h1>
                {loading ? ( 
                    <Loader /> 
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : ( 
                <>
                {keyword && 
                <div className='all-products-btn-container'>
                    <Link 
                        to='/shop' 
                        className='all-products-btn'
                    >
                        All Coffee Blends
                    </Link>
                </div> 
                }
                    <Row>
                        { products.map(product =>                     
                            <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                                <Product product={product} />
                            </Col>
                        )}
                    </Row>
                    <Paginate 
                        pages={pages} 
                        page={page} 
                        keyword={keyword ? keyword : ''} 
                    />
                    </>
                )}           
            </Container>
        </>
    )
}

export default AllProductsScreen
