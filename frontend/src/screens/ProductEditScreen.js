import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { ProductUpdateActionTypes } from "../constants/actionTypes/productActionTypes";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const productDetails = useSelector(state => state.productDetails)
  const productUpdate = useSelector(state => state.productUpdate)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (productUpdate?.success) {
      dispatch({ type: ProductUpdateActionTypes.PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!productDetails?.product?.name || productDetails?.product?._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(productDetails?.product?.name)
        setPrice(productDetails?.product?.price)
        setImage(productDetails?.product?.image)
        setBrand(productDetails?.product?.brand)
        setCategory(productDetails?.product?.category)
        setCountInStock(productDetails?.product?.countInStock)
        setDescription(productDetails?.product?.description)
      }
    }

  }, [dispatch, productId, navigate, productDetails?.product, productUpdate?.success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock
    }))
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        {/* {userUpdate?.loading && <Loader />}
        {userUpdate?.error && <Message variant='danger'>{userUpdate?.error}</Message>} */}
        <h1>Edit Product</h1>
        {productUpdate?.loading && <Loader />}
        {productUpdate?.error && <Message variant='danger'>{productUpdate?.error}</Message>}
        {productDetails?.loading ? (
          <Loader />
        ) : productDetails?.error ? (
          <Message variant="danger">{productDetails?.error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
