import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';

const AddBook = () => {

    const { user } = useContext(AuthContext);

    const url = `https://library-server-blue.vercel.app/book?email=${user?.email}`;

    const handleAddBook = event => {
        event.preventDefault();

        const form = event.target;

        const bookName = form.bookName.value;
        const photo = form.photo.value;
        const shortDescription = form.shortDescription.value;
        const authorName = form.authorName.value;
        const quantityBook = form.quantityBook.value;
        const category = form.category.value;
        const rating = form.rating.value;
        const contents = form.contents.value;

        // const name = form.name.value;
        // const email = form.email.value;

        // const newSpot = { spotName, photo, shortDescription, countryName, location, averageCost, seasonality, travelTime, totalVisitorsPerYear, name, email }
        // console.log(newSpot);
        const newBook = { bookName, photo, shortDescription, authorName, quantityBook, category, rating, contents }
        // console.log(newBook);


        // send data to the server




        //  ------------- Test 
        axios.post(url, newBook, { withCredentials: true })
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Book Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    location.reload();
                }
            })
            .catch(error => {
                console.error('Error adding book:', error);
                // Handle error here
            });


    }

    return (
        <div>
            <Helmet>
                <title>Book Buddy | Add Book</title>
            </Helmet>
            {/* --------- for spacing----- */}
            <div className='mb-44'>
                <div className='text-[] md:text-3xl md:font-bold text-center text-blue-600 mb-4 flex flex-row items-center justify-center gap-2'>
                    <div>
                        {/* <FaAnglesRight /> */}
                    </div>
                </div>
            </div>
            <h2 className="text-2xl text-center text-blue-500 font-bold my-3">Add Book</h2>
            <div className="bg-[#F4F3F0] p-4 md:p-8 lg:p-24">
                <h2 className="text-3xl font-extrabold mb-4 text-center">Add Book</h2>
                <form onSubmit={handleAddBook} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    {/* Book_Name */}
                    <div className="form-control col-span-2 lg:col-span-4">
                        <label className="label">
                            <span className="label-text">Book_Name</span>
                        </label>
                        <input type="text" name="bookName" placeholder="Book_Name" required className="input input-bordered w-full" />
                    </div>
                    {/* Photo URL */}
                    <div className="form-control col-span-2 lg:col-span-4">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" name="photo" placeholder="Photo URL" required className="input input-bordered w-full" />
                    </div>
                    {/* short description */}
                    <div className="form-control col-span-2 lg:col-span-4">
                        <label className="label">
                            <span className="label-text">Short_Description</span>
                        </label>
                        <input type="text" name="shortDescription" placeholder="Short_Description" required className="input input-bordered w-full" />
                    </div>

                    {/* Author_Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Author_Name</span>
                        </label>
                        <input type="text" name="authorName" placeholder="Author_Name" required className="input input-bordered w-full" />
                    </div>
                    {/* Location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Quantity of the book</span>
                        </label>
                        <input type="number" name="quantityBook" placeholder="Quantity_of_the_book" required className="input input-bordered w-full" />
                    </div>

                    {/* average_cost */}
                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Average_Cost</span>
                        </label>
                        <input type="text" name="averageCost" placeholder="Average_Cost" className="input input-bordered w-full" />
                    </div> */}

                    {/* Category */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <input type="text" name="category" required placeholder="Category" className="input input-bordered w-full" />
                    </div>
                    {/* Rating */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <input type="number" min="1" max="5" name="rating" required placeholder="Rating" className="input input-bordered w-full" />
                    </div>

                    {/* contents */}
                    <div className="form-control col-span-2 lg:col-span-4">
                        <label className="label">
                            <span className="label-text">Contents</span>
                        </label>
                        <input type="text" name="contents" required placeholder="Contents" className="input input-bordered w-full" />
                    </div>

                    {/* totalVisitorsPerYear */}
                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Total Visitors Per Year</span>
                        </label>
                        <input type="text" name="totalVisitorsPerYear" placeholder="totalVisitorsPerYear" className="input input-bordered w-full" />
                    </div> */}

                    {/* User Name */}
                    {/* <div className="form-control ">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <input type="text" name="name" placeholder="User Name" className="input input-bordered w-full" />
                    </div> */}
                    {/* User Email */}
                    {/* <div className="form-control ">
                        <label className="label">
                            <span className="label-text">User Email</span>
                        </label>
                        <input type="text" name="email" placeholder="User Email" className="input input-bordered w-full" />
                    </div> */}

                    {/* Submit Button */}
                    <div className="form-control col-span-full">
                        <input type="submit" value="Add Book" className="btn bg-blue-400 text-white" />
                    </div>
                </form>
            </div>


        </div>
    );
};

export default AddBook;