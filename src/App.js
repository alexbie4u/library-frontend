import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { useSubscription, useApolloClient } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

// components

// pages
import Authors from './pages/Authors'
import Books from './pages/Books'
import NewBook from './pages/Add'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import Recommended from './pages/Recommended'

// layouts
import RootLayout from './layouts/RootLayout'



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="Authors" element={<Authors />} />
            <Route path="Books" element={<Books />} />
            <Route path="Recommended" element={<Recommended />} />
            <Route path="Add" element={<NewBook />} />
            

            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ books }) => {
    return {
      books: uniqByName(books.concat(addedBook)),
    }
  })
}

const App = () => {
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      if (addedBook) {
        console.log(addedBook, ' was added!');
        updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      }
    }
  })

  return (
    <RouterProvider router={router}/>
    )
  }



export default App
