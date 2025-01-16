export const mockOrders = [
    {
        id: 1,
        userId: 1,
        orderId: 1,
        date: "2025-01-16",
        products: [{ 
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack",
            price: 109.95,
            quantity: 3
        }],
        totalPrice: 329.85,
        status: "in-progress"
    },

    {
        id: 2,
        userId: 2,
        orderId: 1,
        date: "2025-01-15",
        products: [{ 
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack",
            price: 109.95,
            quantity: 1
        }],
        totalPrice: 109.95,
        status: "completed"
    }
];

export const saveOrder = (newOrder) => {
    // Pobierz aktualne zamówienia z localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || mockOrders;
    
    // Znajdź wszystkie zamówienia danego użytkownika
    const userOrders = storedOrders.filter(order => order.userId === newOrder.userId);
    
    // Znajdź następny numer zamówienia dla tego użytkownika
    const nextOrderId = userOrders.length > 0 
        ? Math.max(...userOrders.map(order => order.orderId)) + 1 
        : 1;

    // Dodaj nowe zamówienie
    const updatedOrders = [...storedOrders, {
        ...newOrder,
        id: storedOrders.length + 1,
        orderId: nextOrderId,
        status: 'in-progress' // domyślny status nowego zamówienia
    }];
    
    // Zapisz zaktualizowaną listę w localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    return true;
};

export const initializeMockOrders = () => {
    // Sprawdź czy zamówienia już istnieją w localStorage
    const existingOrders = localStorage.getItem('orders');
    
    if (!existingOrders) {
        // Jeśli nie, zapisz mock data do localStorage
        localStorage.setItem('orders', JSON.stringify(mockOrders));
    }
};