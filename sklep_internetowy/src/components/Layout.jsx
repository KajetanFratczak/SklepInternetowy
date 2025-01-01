import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Strona główna</Link>
            </li>
            <li>
              <Link to="/products">Produkty</Link>
            </li>
            <li>
              <Link to="/cart">Koszyk</Link>
            </li>
            <li>
              <Link to="/login">Logowanie</Link>
            </li>
            <li>
              <Link to="/register">Rejestracja</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Kajetan Frątczak</footer>
    </>
  );
};

export default Layout;