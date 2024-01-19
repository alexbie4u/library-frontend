import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import { useState } from "react"
import { UPDATE_AUTHOR } from "../queries"

const Authors = () => {
    const [birthyear, setBirthyear] = useState('')
    const [selectedAuthor, setSelectedAuthor] = useState('')

    const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })

    const result = useQuery(ALL_AUTHORS)

    const submit = async (event) => {
        event.preventDefault()
      
        const born = parseInt(birthyear, 10);
        const authorObject = result.data.authors.find((a) => a.name === selectedAuthor)

        const id = authorObject.id;

        console.log(authorObject);
        console.log("Author id: ", id);
        console.log("Author born: ", born);

        updateAuthor ({ variables: 
            { id: id, 
              edits: { born: born } 
            } 
          })
        .then(() => {
          setSelectedAuthor('')
          setBirthyear('')
        })
        .catch((error) => {
          console.error("Error updating author's birthyear: ", error);
        });
      }

    if (result.loading) {
        return <div>loading...</div>
    }

    if (!result.data ) {
        console.log('Author data: ');
        console.log(result.data);
        return 'Nothing to show, mate.';
        }

    return (
    <div>
        <h2>authors</h2>
        <table>
        <tbody>
            <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
            </tr>
            {result.data.authors.map((a) => (
            <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
                <td>{a.id}</td>
            </tr>
            ))}
        </tbody>
        </table>

      <form onSubmit={submit}>
        <div>
            <h2>Set birthyear</h2>
            Author: <br/>
          <select 
            value={selectedAuthor || ''}
            name="selectedAuthor"
            onChange={e => {
                console.log("selectedAuthor onChange:", e.target.value);
                setSelectedAuthor(e.target.value)}}
            style={{ color: 'black' }} 
            
          >
            
            <option value="">Select author</option>
            {result.data.authors.map((a) => (
                <option key={a.name} value={a.name}>
                    {a.name}
                </option>
            ))}

          </select>
        </div>
        <div>
          Author's birthyear
          <input
            value={birthyear}
            type="number"
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default Authors