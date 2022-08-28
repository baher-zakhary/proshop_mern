import React, { useEffect } from "react";
import { Utils } from "../utils/utils";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import { ProductCreateActionTypes } from "../constants/actionTypes/productActionTypes";
import Paginate from "../components/Paginate";

const ProductListScreen = () => {
  
  const params = useParams();
  const pageNumberParam = params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const productDelete = useSelector((state) => state.productDelete);
  const productCreate = useSelector((state) => state.productCreate);
  const userLoginState = useSelector(state => state.userLogin)
  const navigate = useNavigate()

  useEffect(() => {

    if (!userLoginState.userInfo || !userLoginState.userInfo.isAdmin) {
      navigate('/login')
    }

    if (productCreate?.success) {
      const id = Utils.copy(productCreate.product._id);
      dispatch({ type: ProductCreateActionTypes.PRODUCT_CREATE_RESET })
      navigate(`/admin/product/${id}/edit`)
    } else {
      dispatch(listProducts('', pageNumberParam))
    }

  }, [dispatch, navigate, pageNumberParam, userLoginState?.userInfo, productDelete?.success, productCreate?.success, productCreate?.product]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {productDelete?.loading && <Loader />}
      {productDelete?.error && <Message variant='Danger'>{productDelete?.error}</Message>}
      {productCreate?.loading && <Loader />}
      {productCreate?.error && <Message variant='Danger'>{productCreate?.error}</Message>}
      {productList?.loading ? (
        <Loader />
      ) : productList?.error ? (
        <Message variant="danger">{productList?.error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productList?.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate baseRoute={'/admin/productlist'} pages={productList?.pages} pageNumber={productList?.pageNumber}>

          </Paginate>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
