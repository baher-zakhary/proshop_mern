import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createProductReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ProductCreateReviewActionTypes } from "../constants/actionTypes/productActionTypes";

const ProductScreen = () => {
  
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (productCreateReview?.success) {
      alert('Review Submitted');
      setRating(0);
      setComment('');
      dispatch({type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, productCreateReview?.success]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?quantity=${quantity}`)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, {rating, comment}))
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (index) => {
                                const count = index + 1;
                                return (
                                  <option key={count} value={count}>
                                    {count}
                                  </option>
                                );
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
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
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>} 
              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <h2>Write a Customer Review</h2>
              {productCreateReview?.error &&
                <Message variant='danger'>
                  {productCreateReview?.error}
                </Message>
              }
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option value=''>Select Rating</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as='textarea' row='3' value={comment} onChange={e => setComment(e.target.value)}>

                    </Form.Control>
                    <Button type='submit' variant="primary">
                      Submit
                    </Button>
                  </Form.Group>
                </Form>
              ) : (
                <Message>Please <Link to='/login'>Log in</Link> to write a review</Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
