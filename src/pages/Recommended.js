import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_BOOKS_WITH_GENRE, ME } from "../queries"
import React, { useState, useEffect } from "react"

const Recommended = () => {
  const user = useQuery(ME)
  const [favoriteBooks, setFavoriteBooks] = useState([])
  const [getFavoriteBooks, result] = useLazyQuery(ALL_BOOKS_WITH_GENRE)

  useEffect(() => {
    if (result.data ) {
      setFavoriteBooks(result.data.books)
    }
  }, [setFavoriteBooks, result]) // eslint-disable-line

  useEffect(() => {
    if ( user.data ) {
      getFavoriteBooks({ variables: { genre: user.data.me.favoriteGenre } })
      
    }
  }, [getFavoriteBooks, user]) // eslint-disable-line

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    console.error("Error fetching favorite books:", result.error);
    return <div>Error loading favorite books</div>;
  }

  if (!result.data ) {

      return 'Nothing to show, mate.';
    }

    return (
      <div>
        <h2>Books in your favorite genre: {user.data.me.favoriteGenre}</h2>
  
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {favoriteBooks.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    )
  }
  
export default Recommended