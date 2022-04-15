import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <>
      <div style={{height: '100%', width: '100%', position: 'fixed', top: '0', left: '0', backgroundColor: 'white', opacity: '0.4'}}></div>
      <Spinner animation='border' role='status'
          style={{width: '100px', height: '100px', margin: '-50px 0 0 -50px', position: 'absolute', top: '50%', left: '50%'}}>
              <span className='sr-only'>Loading...</span>
      </Spinner>
    </>
  )
}

export default Loader