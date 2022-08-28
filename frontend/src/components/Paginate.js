import React from 'react'
import { Container, Pagination, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, pageNumber, pageSize = 10, total, baseRoute = '', keyword = '' }) => {

  const getFirstElementNo = () => {
    return ((pageNumber-1) * pageSize) + 1;
  }

  const getLastElementNo = () => {
    const lastElementNo = pageNumber * pageSize;
    return lastElementNo < total ? lastElementNo : total;
  }

  return (
    // (pages > 1) && (
      <Container fluid>
        <Row className="justify-content-between align-items-center">
          <Pagination>
            {[...Array(pages).keys()].map(x => (
              <LinkContainer key={x+1} to={keyword ? `${baseRoute}/search/${keyword}/page/${x+1}` : `${baseRoute}/page/${x+1}`}>
                <Pagination.Item active={x+1 === pageNumber} activeLabel=''>{x+1}</Pagination.Item>
              </LinkContainer>
            ))}
          </Pagination>
          <div>{`Showing ${getFirstElementNo()} - ${getLastElementNo()} of ${total}`}</div>
        </Row>
      </Container>
    // )
  )
}

export default Paginate;