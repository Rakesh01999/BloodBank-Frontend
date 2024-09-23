import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLoaderData } from 'react-router-dom';
import SpotCard from '../SpotCard/SpotCard';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const MyList = () => {
    const { user } = useContext(AuthContext);
    // console.log(user.email);
    const slBorrowedBook = useLoaderData();
    // console.log(slBorrowedBook);


    // Filter borrowedBook based on user email
    const userBorrowedBook = slBorrowedBook.filter((borrowedBook) => borrowedBook.email === user.email);
    const [borrowedBooks, setBorrowedBooks] = useState(userBorrowedBook);


    // console.log(userBorrowedBook);

    // ------- Books ---------
    const [book, setBook] = useState([]);
    useEffect(() => {
        fetch('https://library-server-blue.vercel.app/book')
            .then(res => res.json())
            .then(data => setBook(data));
    }, [])
    const { _id, bookName, photo, shortDescription, authorName, quantityBook, category, rating, contents } = book;




    const handleIncrement = (bookId, _id) => {
        const updateBook = { bookName, photo, shortDescription, authorName, quantityBook, category, rating, contents }
        // const updateBook = { bookName, photo, shortDescription, authorName, category, rating, contents }

        fetch(`https://library-server-blue.vercel.app/book/increment/${bookId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateBook)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
        // console.log('clicked return ');


        // ----- to delete ----------
        Swal.fire({
            title: "Are you sure?",
            text: "You want to return this book !",
            // icon: "warning",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Return it !"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://library-server-blue.vercel.app/borrowedBook/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Returned!",
                                text: "Your book has been Returned.",
                                icon: "success"
                            });
                            const remaining = borrowedBooks.filter(borrowedBook => borrowedBook._id !== _id);
                            setBorrowedBooks(remaining);
                        }
                        // location.reload();
                        // window.location.reload();
                    })
            }
        });
    }



    return (
        <div>
            <Helmet>
                <title>Book Buddy | Borrowed Books</title>
            </Helmet>
            {/* --------- for spacing----- */}
            <div className='mb-44'>
                <div className='text-[] md:text-3xl md:font-bold text-center text-blue-600 mb-4 flex flex-row items-center justify-center gap-2'>
                    <div>
                        {/* <FaAnglesRight /> */}
                    </div>
                </div>
            </div>
            <h2 className="text-xl md:text-3xl text-center text-blue-600 font-bold my-3">Borrowed Books</h2>
            <div className='max-w-[370px] md:max-w-[540px] lg:max-w-[1540px] mx-auto px-4 md:px-8 py-8 md:py-12  rounded-3xl flex flex-col md:flex-row items-center mb-10'>
                <div className="mx-auto grid grid-cols-1 gap-4">
                    <div className="overflow-x-auto">
                        <table className="table bg-blue-300">
                            {/* head */}
                            <thead>
                                <tr className="font-bold md:text-xl bg-blue-500">
                                    <th>Photo</th>
                                    <th>Book Name</th>
                                    <th>Category</th>
                                    <th>Borrowed Date</th>
                                    <th>Return Date</th>
                                    <th><div>Action</div></th>
                                </tr>
                            </thead>
                            <tbody className="md:text-xl">
                                {/* row 1 */}

                                {borrowedBooks.map((borrowedBook) => (
                                    <tr className='hover'
                                        key={borrowedBook._id}
                                        borrowedBook={borrowedBook}
                                    >
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={borrowedBook.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">

                                                <div>
                                                    <div className="font-semibold">{borrowedBook.bookName}</div>
                                                    {/* <div className="text-sm opacity-50">{location}</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="">{borrowedBook.category}</span>
                                        </td>
                                        <td>{borrowedBook.borrowDate}</td>
                                        <td>{borrowedBook.returnDate}</td>
                                        <td>
                                            {/* <div className="flex gap-4">
                                                <Link to={`/updateSpot/${borrowedBook._id}`}>
                                                    <button className="btn btn-outline  btn-accent">Update</button>
                                                    </Link>
                                                    <button onClick={() => handleDelete(borrowedBook._id)} className="btn btn-outline btn-warning">Delete</button>
                                                </div> */}

                                            {/* <form onSubmit={handleDecrement}>
                                            </form> */}
                                            <button onClick={() => handleIncrement(borrowedBook.bookId, borrowedBook._id)} className="btn btn-sm md:h-12 btn-success text-white">Return</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyList;
