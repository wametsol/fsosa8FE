import React, { useState, useEffect } from 'react'
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
  const [genre, setGenre] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState("")
  const [ getBooks, result ] = useLazyQuery(SET_GENRE)

  //const { chooseGenre } = props
  

  const books = props.books.allBooks

  //console.log(props.chosenBooks.allBooks)
  let genres = []
  books.map(b => {
    b.genres.map(g => {
      if(!genres.includes(g)){
        genres = genres.concat(g)
      }
    })
  })
  const chooseGenre = async (a) => {
    setSelectedGenre(a)
    getBooks( {variables: {genre: a} })
  }
  useEffect(() => {
    if(result.data){
      setGenre(result.data.allBooks)
    }
  }, [result])


  if (!props.show) {
    return null
  }

  const clearGenre = async () => {
    setGenre(null)
  }

  let showCurrent
  if (genre){
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
            {genre.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        <h3>Genres:</h3>
        <div>
      <p>Chosen genre: {selectedGenre} <button onClick={() => clearGenre()}>Clear</button></p>
    </div>
        {genres.map(a => 
                <button key={a} onClick={() => chooseGenre(a)}>{a}</button>
        )}
      </div>
    )
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