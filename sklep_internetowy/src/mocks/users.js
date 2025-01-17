//Zestaw przykładowych użytkowników.
export const mockUsers = [
    {
        id: 1,
        username: "admin",
        password: "admin123",
        email: "admin@example.com",
        role: "admin"
    },
    {
        id: 2,
        username: "user1",
        password: "user123",
        email: "user1@example.com",
        role: "user"
    }
];

export const saveUser = (newUser) => {
    // Pobierz aktualnych użytkowników z localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || mockUsers;
    
    // Dodaj nowego użytkownika
    const updatedUsers = [...storedUsers, {
        ...newUser,
        id: storedUsers.length + 1,
        role: 'user' // domyślna rola dla nowych użytkowników
    }];
    
    // Zapisz zaktualizowaną listę w localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    return true;
};

export const initializeMockUsers = () => {
    // Sprawdź czy użytkownicy już istnieją w localStorage
    const existingUsers = localStorage.getItem('users');
    
    if (!existingUsers) {
        // Jeśli nie, zapisz mock data do localStorage
        localStorage.setItem('users', JSON.stringify(mockUsers));
    }
};