import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { userActionTypes } from '../constants/actionTypes/userActionTypes';

const EditUserScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: userId, name, email, isAdmin }))
  };

  const userDetails = useSelector(state => state.userDetails)
  const userUpdate = useSelector(state => state.userUpdate)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userUpdate && userUpdate?.success) {
      dispatch({type: userActionTypes.userUpdate.USER_UPDATE_RESET})
      navigate('/admin/userlist')
    } else {
      if (!userDetails?.user.name || userDetails?.user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(userDetails?.user.name)
        setEmail(userDetails?.user.email)
        setIsAdmin(userDetails?.user.isAdmin)
      }
    }
  }, [dispatch, userId, navigate, userDetails?.user, userUpdate, userUpdate?.success]);

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        {userUpdate?.loading && <Loader />}
        {userUpdate?.error && <Message variant='danger'>{userUpdate?.error}</Message>}
        <h1>Edit User</h1>
        {userDetails?.loading ? (
          <Loader />
        ) : userDetails?.error ? (
          <Message variant="danger">{userDetails?.error}</Message>
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

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin ?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
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

export default EditUserScreen;
