
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/login'
import Recommended from './components/recommended'
import { gql, useQuery, useLazyQuery, useApolloClient } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author{
        name
      }
      published
      genres
    }
  }
`
const GET_ME = gql`
query {
  me {
    favoriteGenre
  }
}
`


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  
  const mee = useQuery(GET_ME, {
    pollInterval: 2000
  })

  if (authors.loading || books.loading ) {
    return <div>loading...</div>
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if (!token){
    return(
      <div>
        <Notify errorMessage={errorMessage} />
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('login')}>login</button>
          </div>

        <Authors authors={authors.data}
        show={page === 'authors'}
        notlogged={true}
      />

      <Books books={books.data}
        show={page === 'books'}
      />

      <Login setToken={setToken} setError={notify} setPage={setPage} show={page === 'login'}/>

    </div>
    )
  }
  
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors authors={authors.data}
        show={page === 'authors'}
      />

      <Books books={books.data}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />
      <Recommended
        me={mee}
        show={page === 'recommended'}
      />

    </div>
  )
}
const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App