import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- BookList Component ---
function Book() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                console.log("in fetchbooks");
                const response = await axios.get('http://localhost:8080/rest/book', {
                    withCredentials: false // Include cookies and auth headers
                });
                setBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch books.');
                setLoading(false);
            }
        };



        fetchBooks();
    }, []); // Empty dependency array means this effect runs only once on mount

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {books.map(book => (
                <li key={book.id}>
                    {book.title} by {book.author} (ISBN: {book.isbn})
                </li>
            ))}
        </ul>
    );
}
export default Book