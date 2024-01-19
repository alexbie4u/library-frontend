import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../queries'
import { useNavigate } from 'react-router-dom'
import { updateCache } from '../App'
import { ALL_BOOKS } from '../queries'

const NewBook = (props) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [birthyear, setBirthyear] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation( ADD_BOOK, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
    },
  })

  const resetFields = () => {
    setTitle('')
    setPublished('')
    setAuthor('')
    setBirthyear('')
    setGenres([])
    setGenre('')
  }

  const submit = async (event) => {
    event.preventDefault()
  
    const publishedNumber = parseInt(published, 10);
    const born = parseInt(birthyear, 10);
  
    let authorObject = {
      name: author,
      born: born.length > 0 ? born : undefined
    }
  
    createBook({ variables: 
      { book: { 
        title, 
        published: publishedNumber, 
        genres: genres.length > 0 ? genres : undefined,
        author: authorObject
         } } 
      })
    .then(() => {
      console.log("Book created successfully");
      resetFields()
      navigate('/books')
    })
    .catch((error) => {
      console.error("Error creating book: ", error);
    });
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.toLowerCase()))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Author's birthyear
          <input
            type="number"
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          Genre
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div >genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook