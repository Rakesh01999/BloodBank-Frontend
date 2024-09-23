import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import Review from './Review';
import AuthProvider, { AuthContext } from '../../Providers/AuthProvider';

const BookReview = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        // fetch('https://library-server-blue.vercel.app/category')
        // fetch('http://localhost:5000/review')
        fetch('https://library-server-blue.vercel.app/review')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [])
    console.log(reviews);

    const handleAddBookReview = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const bookName = form.bookName.value;
        const categoryName = form.categoryName.value;
        const review = form.review.value;

        const newReview = { name, email, bookName, categoryName, review }

        console.log(newReview);

        // send data to the server

        // fetch('https://library-server-blue.vercel.app/category', {
        // fetch('http://localhost:5000/review', {
        fetch('https://library-server-blue.vercel.app/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newReview)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Book Review Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    location.reload();
                }
            })
    }

    return (
        <div>
            <Helmet>
                <title>Book Buddy | Book Review </title>
            </Helmet>
            {/* --------- for spacing----- */}
            <div className='mb-44'>
                <div className='text-[] md:text-3xl md:font-bold text-center text-blue-600 mb-4 flex flex-row items-center justify-center gap-2'>
                    <div>
                        {/* <FaAnglesRight /> */}
                    </div>
                </div>
            </div>
            <h2 className="text-2xl md:text-4xl my-3 font-bold text-center text-blue-600">Book Review </h2>

            {/* ------ */}
            <div className="bg-blue-300 p-4 md:p-8 lg:p-24">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"> */}
                <div className="flex flex-col mx-auto gap-10">
                    {
                        reviews.map(review => <Review key={review._id} review={review}></Review>)
                    }
                </div>
            </div>

            {/* <div className="bg-[#F4F3F0] p-4 md:p-8 lg:p-24"> */}
            <div className="bg-cyan-100 p-4 md:p-8 lg:p-24">
                <h2 className="text-3xl font-extrabold mb-4 text-center">Add Book Review</h2>
                <form onSubmit={handleAddBookReview} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">


                    {/* Name */}
                    {/* <div className="form-control col-span-2 lg:col-span-4"> */}
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <input type="text" name="name" placeholder="User Name" defaultValue={user?.displayName} className="input input-bordered w-full" readOnly required />
                    </div>

                    {/* Email */}
                    {/* <div className="form-control col-span-2 lg:col-span-4"> */}
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">User Email</span>
                        </label>
                        <input type="text" name="email" placeholder="User Email" defaultValue={user?.email} className="input input-bordered w-full" readOnly required />
                    </div>

                    {/* Book Name */}
                    {/* <div className="form-control col-span-2 lg:col-span-4"> */}
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Book Name</span>
                        </label>
                        <input type="text" name="bookName" placeholder="Book Name" className="input input-bordered w-full" required />
                    </div>

                    {/* Category Name */}
                    {/* <div className="form-control col-span-2 lg:col-span-4"> */}
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Book Category</span>
                        </label>
                        <input type="text" name="categoryName" placeholder="Category_Name" className="input input-bordered w-full" required />
                    </div>

                    {/* Book Review */}
                    <div className="form-control col-span-2 lg:col-span-4">
                        <label className="label">
                            <span className="label-text">Book Review</span>
                        </label>
                        {/* <input type="text" name="review" placeholder="Book Review" className="input input-bordered w-full" required /> */}
                        <textarea name="review" className="textarea textarea-bordered" placeholder="Book Review" required></textarea>
                    </div>



                    {/* Submit Button */}
                    <div className="form-control col-span-full">
                        <input type="submit" value="Add Book Review" className="btn bg-blue-400" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookReview;