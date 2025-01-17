import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {

  const {user, logout} = useAuth();
  
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

            {user ? (
              <>
                <li>
                  <Link to="/orders">Zamówienia</Link>
                </li>
                <li>
                  <Link to="/profile">Mój Profil</Link>
                </li>
                <li>
                  <button onClick={logout}>Wyloguj się</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Zaloguj się</Link>
                </li>
                <li>
                  <Link to="/register">Zarejestruj się</Link>
                </li>
              </>
            )}
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