import { NavLink, Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="root-layout">
        <header>
            <nav>
                <h1>Author Central</h1>
                <NavLink to="/">Home</NavLink>
                <NavLink to="authors">Authors</NavLink>
                <NavLink to="books">Books</NavLink>
                <NavLink to="recommended">Recommended</NavLink>
                <NavLink to="add">Add</NavLink>
            </nav>
        </header>

        <main>
            <Outlet />
        </main>
    </div>
  )
}
