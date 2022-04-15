import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login, Login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { useSearchParams } from "react-router-dom";
import { userActionTypes } from "../constants/actionTypes/userActionTypes";
import axios from "axios";

const LoginScreen = () => {
  
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [ searchParams ] = useSearchParams();
	const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}
	const dispatch = useDispatch();
	const { userInfo, loading, error } = useSelector(state => state.userLogin);

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [userInfo, navigate, redirect])

  return (
		<FormContainer>
				<h1>Sign In</h1>
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader/>}
				<Form onSubmit={submitHandler}>

					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control type='email' placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}>

						</Form.Control>
					</Form.Group>
					
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}>

						</Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>Sign in</Button>
				</Form>

				<Row className='py-3'>
					<Col>
						New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
					</Col>
				</Row>
		</FormContainer>
	);
};

export default LoginScreen;
