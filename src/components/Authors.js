  
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const SET_BIRTH = gql`
  mutation newBook($name: String!, $born: Int!) {
    editAuthor(
      name: $name
      setBornTo: $born
    ){
      name
    }
  }
`
const Authors = (props) => {
  
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(SET_BIRTH)

  if (!props.show) {
    return null
  }
  const authors = props.authors.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }


  let updateForm
    if(!props.notlogged){
      updateForm = (
      <div>
        <h3>Set birthyear</h3>
      <br/>
      <form onSubmit={submit}>
        <label>
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map(a => 
              <option key={a.name}>{a.name}</option>
            )}
          </select>
        </label>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
      </div>
      )
    } 
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
      {updateForm}
      </div>
  )
}

export default Authors
