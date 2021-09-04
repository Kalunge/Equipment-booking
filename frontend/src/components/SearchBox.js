import React, { useState } from 'react';
import { Button, Form, FormControl, Col, Row } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyWord] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Row>
        <Col md={9}>
          <FormControl
            type='text'
            name='q'
            onChange={(e) => setKeyWord(e.target.value)}
            placeholder='search products ...'
            className='mr-sm-2 ml-sm-5 '
          ></FormControl>
        </Col>
        <Col md={3}>
          <Button type='submit' variant='outline-success' className='p-2'>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
