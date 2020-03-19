import React, { useState } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'

const SET_GENRE = gql`
query setGenre($genre: String!){
  allBooks (genre: $genre){
    title
      author{
        name
      }
      published
      genres
  }
}
`


const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [visibleBooks, setVisibleBooks] = useState('')
  const [ allBooks ] = useLazyQuery(SET_GENRE)
  if (!props.show) {
    return null
  }

  const books = props.books.allBooks

  console.log(props.chosenBooks.allBooks)
  let genres = []
  books.map(b => {
    b.genres.map(g => {
      if(!genres.includes(g)){
        genres = genres.concat(g)
      }
    })
  })
  const chooseGenre = async (a) => {
    setGenre(a)
    let fetchedBooks = allBooks( {variables: {genre: a} })

    setVisibleBooks(fetchedBooks)
   
    console.log(fetchedBooks)
  }

  const clearGenre = async () => {
    setGenre('')
    setVisibleBooks(books)
  }
  console.log('GENRES: ' ,genres)

  let showCurrent
  console.log(visibleBooks)
  if (genre){
    showCurrent=(
    <div>
      <p>Chosen genre: {genre} <button onClick={() => clearGenre()}>Clear</button></p>
    </div>)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Genres:</h3>
      {showCurrent}
      {genres.map(a => 
              <button key={a} onClick={() => chooseGenre(a)}>{a}</button>
      )}
    </div>
  )
}

export default Books