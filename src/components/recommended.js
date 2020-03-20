import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

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

const Recommended = (props) => {
  const result = useQuery(SET_GENRE, {
    pollInterval: 2000,
    variables: {genre: props.me.data.me.favoriteGenre} 
  })
  

  
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>recommendations</h2>
    <p>books in your favorite genre <b>{props.me.data.me.favoriteGenre}</b></p>
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
    </div>
  )
}

export default Recommended