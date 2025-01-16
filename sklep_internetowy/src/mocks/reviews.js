export const mockReviews = [
    {
        id: 1,
        userId: 1,
        productId: 1,
        date: "2025-01-15",
        username: "user1",
        rating: 4,
        email: "user1@example.com",
        message: "Świetny produkt, polecam gorąco!"
    },

    {
        id: 2,
        userId: 2,
        productId: 1,
        date: "2025-01-16",
        username: "admin",
        rating:1,
        email: "admin@example.com",
        message: "Słaby produkt, odradzam zakup!"
    }
];

export const saveReview = (newReview) => {
    // Pobierz aktualne opinie z localStorage
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || mockReviews;
    
    // Sprawdź czy użytkownik już dodał opinię dla tego produktu
    const hasUserReviewed = storedReviews.some(
        review => review.userId === newReview.userId && review.productId === newReview.productId
    );
    
    if (hasUserReviewed) {
        return { success: false, error: 'Możesz dodać tylko jedną opinię do produktu.' };
    }

    // Dodaj nową opinię
    const updatedReviews = [...storedReviews, {
        ...newReview,
        id: storedReviews.length + 1,
        date: new Date().toISOString().split('T')[0]
    }];
    
    // Zapisz zaktualizowaną listę w localStorage
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    
    return true;
};

export const getProductReviews = (productId) => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || mockReviews;
    return storedReviews.filter(review => review.productId === productId);
};

export const deleteReview = (reviewId, userId, isAdmin) => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || mockReviews;
    const review = storedReviews.find(r => r.id === reviewId);

    // Czy dany użytkownik może usunąć tą opinię?
    if (!review || (!isAdmin && review.userId !== userId)){
        return {success: false, error: 'Brak uprawnień do usunięcia tej opinii.'};
    }

    const updatedReviews = storedReviews.filter(r => r.id != reviewId);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));

    return true;
};

export const initializeMockReviews = () => {
    // Sprawdź czy opinie już istnieją w localStorage
    const existingReviews = localStorage.getItem('reviews');
    
    if (!existingReviews) {
        // Jeśli nie, zapisz mock data do localStorage
        localStorage.setItem('reviews', JSON.stringify(mockReviews));
    }
};