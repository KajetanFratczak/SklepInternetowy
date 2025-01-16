import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveReview, getProductReviews, deleteReview } from '../mocks/reviews';
import { FaStar } from 'react-icons/fa';

const ProductReview = ({ productId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [reviews, setReviews] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (productId) {
            loadReviews();
        }
    }, [productId]);

    const loadReviews = () => {
        const productReviews = getProductReviews(parseInt(productId));
        setReviews(productReviews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!user) {
            setError('Musisz być zalogowany, aby dodać opinię.');
            return;
        }
        
        if (rating === 0) {
            setError('Proszę wybrać ocenę.');
            return;
        }
        
        if (message.length < 10) {
            setError('Opinia musi zawierać co najmniej 10 znaków.');
            return;
        }

        const newReview = {
            productId: parseInt(productId),
            userId: user.id,
            email: user.email,
            rating,
            message,
        };

        const result = saveReview(newReview);
        
        if (result.success) {
            setRating(0);
            setMessage('');
            setError('');
            loadReviews();
            window.location.reload();
        } else {
            setError(result.error);
        }
    };

    const handleDelete = (reviewId) => {
        const result = deleteReview(reviewId, user?.id, user?.role === 'admin');
        if (result.success) {
            loadReviews();
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="reviews-section">
            <h3>Opinie o produkcie</h3>
            
            {user && (
                <form onSubmit={handleSubmit} className="review-form">
                    <div className="star-rating">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        style={{ display: 'none' }}
                                    />
                                    <FaStar
                                        size={24}
                                        className="star"
                                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                        style={{ cursor: 'pointer', marginRight: '5px' }}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Napisz swoją opinię (minimum 10 znaków)..."
                        required
                        minLength={10}
                        className="review-textarea"
                        style={{
                            width: '100%',
                            minHeight: '100px',
                            padding: '10px',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                    />
                    
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                    
                    <button 
                        type="submit"
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Dodaj opinię
                    </button>
                </form>
            )}

            <div className="reviews-list" style={{ marginTop: '20px' }}>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div 
                            key={review.id} 
                            className="review-item"
                            style={{
                                border: '1px solid #ddd',
                                padding: '15px',
                                marginBottom: '10px',
                                borderRadius: '4px'
                            }}
                        >
                            <div className="review-header" style={{ marginBottom: '10px' }}>
                                <div className="stars" style={{ marginBottom: '5px' }}>
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            size={16}
                                            color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                                            style={{ marginRight: '2px' }}
                                        />
                                    ))}
                                </div>
                                <div style={{ fontSize: '0.9em', color: '#666' }}>
                                    <span>{review.email}</span>
                                    <span style={{ marginLeft: '10px' }}>{review.date}</span>
                                </div>
                            </div>
                            <p style={{ margin: '10px 0' }}>{review.message}</p>
                            {(user?.id === review.userId || user?.role === 'admin') && (
                                <button 
                                    onClick={() => handleDelete(review.id)}
                                    className="delete-review"
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Usuń opinię
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Brak opinii dla tego produktu.</p>
                )}
            </div>
        </div>
    );
};

export default ProductReview;