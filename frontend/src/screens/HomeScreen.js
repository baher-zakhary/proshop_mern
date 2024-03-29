import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const searchStr = params.searchStr;
  const pageNumberParam = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);

  const { loading, products, error, pageNumber, pages, total } = productList;

  useEffect(() => {
    dispatch(listProducts(searchStr, pageNumberParam));

  }, [dispatch, searchStr, pageNumberParam]);

  return (
    <>
      <Meta></Meta>
      <h1>{!searchStr ? 'Latest Products' : `Search results for keyword "${searchStr}"`}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {
            !searchStr && <ProductCarousel />
          }
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            pageNumber={pageNumber}
            total={total}
            keyword={searchStr ? searchStr : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
