import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step }) => {
  return step ? (
    <Nav className='justify-content-center mb-4'>
        {
            <Nav.Item>
                {
                    step >= 1 ?
                    (
                            <LinkContainer to='/login'>
                                <Nav.Link>Sign In</Nav.Link>
                            </LinkContainer>
                    )
                    :
                    (
                        <Nav.Link disabled>Sign In</Nav.Link>
                    )
                }
            </Nav.Item>
        }
        {
            <Nav.Item>
            {
                step >= 2 ?
                (
                        <LinkContainer to='/shipping'>
                            <Nav.Link>Shipping</Nav.Link>
                        </LinkContainer>
                )
                :
                (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )
            }
            </Nav.Item>
        }
        {
            <Nav.Item>
            {
                step >= 3 ?
                (
                        <LinkContainer to='/payment'>
                            <Nav.Link>Payment</Nav.Link>
                        </LinkContainer>
                )
                :
                (
                    <Nav.Link disabled>Payment</Nav.Link>
                )
            }
            </Nav.Item>
        }
        {
            <Nav.Item>
            {
                step >= 4 ?
                (
                        <LinkContainer to='/placeorder'>
                            <Nav.Link>Place Order</Nav.Link>
                        </LinkContainer>
                )
                :
                (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )
            }
            </Nav.Item>
        }
    </Nav>
  )
  :
  null;
}

export default CheckoutSteps