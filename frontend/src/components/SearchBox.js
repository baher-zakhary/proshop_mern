import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { matchPath } from 'react-router'
import { Form, Button } from "react-bootstrap";

const SearchBox = () => {
  
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();
  const { pathname } = useLocation()
  const params = matchPath({ path: "/search/:searchStr" }, pathname);

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) {
      navigate(`/search/${trimmedKeyword}`)
    } else {
      navigate('/')
    }
  };

  useEffect(() => {
    setKeyword(params?.params?.searchStr || '');
  }, [params?.params?.searchStr]);

  return (
    <Form onSubmit={submitHandler} className='d-flex align-items-center'>
      <Form.Control
        type="text"
        name="searchBox"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placholder='Search ...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-info' className="mt-0 p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
