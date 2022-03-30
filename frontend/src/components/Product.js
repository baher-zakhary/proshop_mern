import React from 'react'
import { Card } from 'react-bootstrap'

function Product() {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${product._id}`}></a>
        </Card>
    )
}

export default Product