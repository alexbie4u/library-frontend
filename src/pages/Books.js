import { ALL_BOOKS } from "../queries"
import { useState, useEffect } from "react"
import { useQuery } from '@apollo/client'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [genres, setGenres] = useState(['all genres'])
  const [selectedGenre, setSelectedGenre] = useState('all genres')




  useEffect(() => {
    if ( result.data ) {
      console.log('Book data: ');
      console.log(result.data);

      const allBooks = result.data.books;
      setBooks(allBooks);
      allBooks.forEach(b => {
        b.genres.forEach(g => {
          const lowerCaseGenre = g.toLowerCase()
          if (!genres.includes(lowerCaseGenre)) {
            genres.push(lowerCaseGenre);
          }
        })
      setGenres(genres);
      })
    }
  }, [result.data]) // eslint-disable-line

  useEffect(() => {
    if (selectedGenre === 'all genres') {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(
        books.filter((b) => b.genres.includes(selectedGenre.toLowerCase()))
      )
    }
  }, [books, selectedGenre])

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!result.data ) {
      console.log('Book data: ');
      console.log(result.data);

      return 'Nothing to show, mate.';
    }

    return (
      <div>
        <h2>books</h2>
  
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filteredBooks.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
        {genres.length > 0 &&
          genres.map((g) => (
            <button onClick={() => { console.log(`Selected Genre: ${g.toLowerCase()}`); setSelectedGenre(() => g.toLowerCase()); }} key={g}>
              {g}
            </button>
          ))}
        </div>
      </div>

      
    )
  }
  
  export default Books