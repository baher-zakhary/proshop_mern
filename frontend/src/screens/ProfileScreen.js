import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, FormGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      setMessage(null);
      const upadatedUser = {
        name,
        email,
        password,
        _id: userInfo._id,
      };
      dispatch(updateUserDetails(upadatedUser));
    }
  };
  const dispatch = useDispatch();
  const { user, loading, error, success } = useSelector(
    (state) => state.userDetails
  );

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: listMyOrdersLoading,
    error: listMyOrdersError,
    orders: myOrders,
  } = useSelector((state) => state.listMyOrders);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails(userInfo._id));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, navigate, user]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message ? (
          <Message variant="danger">{message}</Message>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : success ? (
          <Message variant="success">Changes saved successfully !</Message>
        ) : (
          ""
        )}
        {loading && <Loader />}
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

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <FormGroup controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </FormGroup>

          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {listMyOrdersLoading ? (
          <Loader />
        ) : listMyOrdersError ? (
          <Message variant="danger">{listMyOrdersError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{color: 'red'}}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{color: 'red'}}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
