# Dokumentacja

## Temat projektu: Sklep Internetowy

---

### Setup projektu
Projekt jest zbudowany przy użyciu **React** i **Node.js z Express**.

#### Frontend
- React
- React DOM
- React Router DOM
- Context API (zarządzanie stanem)
- Axios (komunikacja z API)

#### Backend
- Express.js
- Mongoose
- MongoDB
- JSON Web Token (JWT)
- Middleware autoryzacji użytkownika
- CORS
- Body Parser

---

### Struktura projektu

#### Backend

- **`server/`**:
  - **`config/`**:
    - `database.js`: Łączenie aplikacji z bazą danych MongoDB przy użyciu biblioteki Mongoose.
    - `seedDatabase.js`: Wypełnienie bazy MongoDB przykładowymi danymi.

  - **`middleware/`**:
    - `auth.js`: Autoryzacja i weryfikacja roli użytkownika.

  - **`models/`**:
    - Schematy Mongoose dla kolekcji: `Order`, `Product`, `Review`, `User`.

  - **`routes/`**:
    - Trasy Express.js:
      - Zarządzanie zamówieniami.
      - Zarządzanie produktami.
      - Zarządzanie opiniami.
      - Zarządzanie użytkownikami.

  - `.env`: Definicja zmiennych środowiskowych.
  - `server.js`: Konfiguracja serwera Express.js.

#### Frontend

- **`public/`**:
  - `rotated_1.png`: Obrazek używany na stronie głównej.

- **`src/`**:
  - **`components/`**:
    - `Cart.jsx`: Zarządzanie koszykiem i składanie zamówień.
    - `Home.jsx`: Strona główna sklepu internetowego.
    - `Layout.jsx`: Szablon strony.
    - `Login.jsx`: Formularz logowania użytkownika.
    - `NoPage.jsx`: Obsługa błędu 404.
    - `OrderHistory.jsx`: Historia zamówień użytkownika.
    - `ProductDetails.jsx`: Szczegóły produktu.
    - `ProductReview.jsx`: Zarządzanie opiniami o produkcie.
    - `Products.jsx`: Lista produktów z wyszukiwarką i filtrowaniem.
    - `Profile.jsx`: Szczegóły profilu użytkownika.
    - `Register.jsx`: Rejestracja nowego użytkownika.
    - `SingleProduct.jsx`: Wyświetlanie pojedynczego produktu.

  - **`context/`**:
    - `AuthContext.jsx`: Zarządzanie autentykacją użytkownika.
    - `CartContext.jsx`: Zarządzanie koszykiem zakupowym.

  - **`mocks/`**:
    - `orders.js`: Przykładowe dane zamówień.
    - `reviews.js`: Przykładowe opinie.
    - `users.js`: Przykładowi użytkownicy.

  - **`utils/`**:
    - `api.js`: Funkcje do komunikacji z backendem.

  - **Inne pliki**:
    - `App.css`: Style aplikacji.
    - `App.jsx`: Główny komponent aplikacji.
    - `main.jsx`: Punkt startowy aplikacji React.
    - `ProtectedRoute.jsx`: Ochrona tras w aplikacji.

---

### Znalezione błędy i propozycje poprawek

1. **Problem**: Usunięcie opinii jako użytkownik, a następnie dodanie kolejnej uniemożliwia jej ponowne usunięcie.
   **Rozwiązanie**: Naprawić logikę usuwania opinii w bazie danych.

2. **Problem**: Brak automatycznego odświeżania strony po dodaniu opinii.
   **Rozwiązanie**: Implementacja automatycznego odświeżania komponentu.

3. **Funkcjonalność**: Dodanie logo i nazwy użytkownika po zalogowaniu.

4. **Funkcjonalność**: Implementacja panelu administratora.

5. **Rozszerzenie**: Migracja danych użytkowników, zamówień i opinii z FakeStoreAPI do MongoDB oraz implementacja pełnych operacji CRUD.

---

### Aktualna implementacja

- **Produkty**: Pełna integracja z MongoDB.
- **Pozostałe elementy** (użytkownicy, zamówienia, opinie): Korzystają obecnie z FakeStoreAPI jako źródła danych.

#### Operacje CRUD

##### Produkty (MongoDB):
- **Tworzenie**: `POST /api/products`
- **Odczyt**:
  - Wszystkie produkty: `GET /api/products`
  - Szczegóły produktu: `GET /api/products/:id`

##### Użytkownicy (FakeStoreAPI):
- **Rejestracja**: `POST /api/users/register`
- **Logowanie**: `POST /api/users/login`

##### Zamówienia (FakeStoreAPI):
- **Tworzenie**: `POST /api/orders`
- **Odczyt zamówień użytkownika**: `GET /api/orders/user/:user_id`

##### Opinie (FakeStoreAPI):
- **Dodawanie**: `POST /api/reviews`
- **Odczyt opinii produktu**: `GET /api/reviews/:productId`
- **Usuwanie opinii**: `DELETE /api/reviews/:id`

---
