import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useLoaderData } from 'react-router-dom';
import { Zoom } from 'react-toastify';
import BookCard from '../BookCard/BookCard';
import BookTable from '../BookTable/BookTable';
import axios from 'axios';
import { data } from 'autoprefixer';
import { AuthContext } from '../../Providers/AuthProvider';
// import BookTable from '../BookTable/BookTable'; // Import the BookTable component

const AllBook = () => {
    const { user, email } = useContext(AuthContext);
    // const books = useLoaderData();

    const url = `https://library-server-blue.vercel.app/book?email=${user?.email}`;

    const [displayBooks, setDisplayBooks] = useState([]);
    const [viewMode, setViewMode] = useState('card'); // State to track the view mode (card or table)


    useEffect(() => {

        axios.get(url, { withCredentials: true })
            .then(res => {
                setDisplayBooks(res.data);
            })
        // fetch(url , {credentials: 'include'})
        // .then(res => res.json())
        // .then(data => setDisplayBooks(data))
    }, [url])
    // console.log(displayBooks);

    const handleBookFilter = filter => {
        let filteredBooks = [...displayBooks];
        if (filter === 'availableBooks') {
            filteredBooks = filteredBooks.filter(book => book.quantityBook > 0);
        } else {
            // Default: 'all' or invalid filter
            filteredBooks = [...books];
        }
        setDisplayBooks(filteredBooks);
    };

    const toggleViewMode = () => {
        setViewMode(prevMode => (prevMode === 'card' ? 'table' : 'card')); // Toggle between card and table view mode
    };

    return (
        <div>
            <Helmet>
                <title>Book Buddy | All Books (Card View)</title>
            </Helmet>
            {/* --------- for spacing----- */}
            <div className='mb-44'>
                <div className='text-[] md:text-3xl md:font-bold text-center text-blue-600 mb-4 flex flex-row items-center justify-center gap-2'>
                    <div>
                        {/* <FaAnglesRight /> */}
                    </div>
                </div>
            </div>
            <h2 className="text-2xl text-center text-blue-500 font-bold my-3">All Books</h2>
            {/* Dropdown for filter */}
            <div className='text-center'>
                <details className="dropdown">
                    <summary className="m-1 btn bg-blue-500 md:h-[52px] text-white md:text-[18px] my-4">
                        Show available books <RiArrowDropDownLine className="text-2xl md:text-4xl" />
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li><a onClick={() => handleBookFilter('availableBooks')}>Show available books Only</a></li>
                    </ul>
                </details>
            </div>
            {/* Toggle between card and table view */}
            <div className='text-center'>
                <button onClick={toggleViewMode} className="m-1 btn bg-blue-500 md:h-[52px] text-white md:text-[18px] my-4">
                    {viewMode === 'card' ? 'Switch to Table View' : 'Switch to Card View'}
                </button>
            </div>
            {/* Render books based on view mode */}
            {viewMode === 'card' ? (
                <div className='max-w-[370px] md:max-w-[540px] lg:max-w-[1540px] mx-auto px-4 md:px-8 py-8 md:py-12  rounded-3xl flex flex-col md:flex-row items-center mb-10'>
                    <div className="mx-auto grid grid-cols-1 gap-4">
                        {displayBooks.map((book) => (
                            <BookCard key={book._id} book={book}></BookCard>
                        ))}
                    </div>
                </div>
            ) : (
                // <BookTable books={displayBooks} />
                <BookTable displayBooks={displayBooks} />
            )}
        </div>
    );
};

export default AllBook;
