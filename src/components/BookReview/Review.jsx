import React from 'react';
import { FaBookReader, FaSmile } from 'react-icons/fa';
import { GiFeather } from 'react-icons/gi';

const Review = ({ review }) => {
    return (
        <div>
            
            <div data-aos="fade-right" className="bg-cyan-200 shadow-md rounded-lg p-6">
                {/* <FaBook className="text-4xl text-blue-500 mb-4 mx-auto" /> */}
                <h2 className="text-xl font-bold font-serif italic mb-2 flex items-center gap-3"> <FaBookReader className='text-3xl' />
                    {review.name}
                </h2>
                <p className="text-xl ">
                    <span className='font-semibold'>Book Name:</span> {review.bookName}
                </p>
                <p className="text-xl ">
                    <span className='font-semibold'>Review:</span>  {review.review}
                </p>
            </div>
        </div >
    );
};

export default Review;