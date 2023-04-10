import React from 'react'
import { Container } from 'react-bootstrap'
import Article from './Article.mdx'

const App = () => {
  return (
    <>
      <Container fluid className='bg-dark text-secondary px-4 py-5 text-center'>
        <h1 className='text-white'>CS492 Final Project</h1>
      </Container>
      <Container fluid="sm" className="px-4 py-5">
        <Article />
      </Container>
    </>
  )
}

export default App