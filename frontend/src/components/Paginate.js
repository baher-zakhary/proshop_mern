import React from 'react'
import { Container, Pagination, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, pageNumber, baseRoute = '', keyword = '' }) => {
  console.log('pageNubmer',pageNumber)
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
          <div>{`Showing ${pageNumber} - ${(pageNumber)*10} of ${pages}`}</div>
        </Row>
      </Container>
    // )
  )
}

export default Paginate;