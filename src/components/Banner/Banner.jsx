import React from 'react';
import { Link } from 'react-router-dom';
import banner5 from '../../../public/images/bnp5.png'

import Slider from '../Slider/Slider';
import { FaAnglesRight } from "react-icons/fa6";
import 'animate.css';
import { Typewriter } from 'react-simple-typewriter';
import { FaArrowRightLong } from "react-icons/fa6";


const Banner = () => {

    return (
        <div>
            {/* --------- for spacing----- */}
            <div className='mb-44'>
                <div className='text-[] md:text-3xl md:font-bold text-center text-blue-600 mb-4 flex flex-row items-center justify-center gap-2'>
                    <div>
                        {/* <FaAnglesRight /> */}
                    </div>
                </div>
            </div>
            <div className='hero max-w-[370px]  md:max-w-[540px] lg:max-w-[1540px] mx-auto  rounded-3xl  mb-10 bg-no-repeat' style={{ backgroundImage: 'url(https://i.postimg.cc/5077FVWM/rafael-m-CTNHIGI2-Wc-U-unsplash.jpg)' }}>

                <div className='hero-overlay bg-opacity-70 rounded-3xl flex flex-col md:flex-row items-center lg:p-32 md:px-8 px-4 py-8 md:py-2'>
                    <div className='rounded-3xl w-full md:w-[70%]'>

                        {/* <div className='text-xl md:text-3xl lg:text-3xl font-bold'> */}
                        <div className='text-[40px] md:text-4xl font-serif italic text-blue-400 lg:text-6xl font-bold'>
                            <h1 class="animate__animated animate__fadeInLeft">
                                Find Your Desired Blood At Our
                                <span className='text-red-300'>
                                    Blood Bank
                                </span>
                            </h1>
                        </div>
                        <div className='text-[20px] md:text-xl lg:text-2xl text-white font-bold'>
                            <h1 class="animate__animated animate__fadeInLeft">

                                <Typewriter
                                    loop
                                    cursor
                                    cursorStyle='|'
                                    typeSpeed={90}
                                    deleteSpeed={90}
                                    delaySpeed={1000}
                                    // words={['Hello', 'World', 'React']}
                                    // words={[' Tourizzo makes your travel ', ' more convenient', '  and more enjoyable']}
                                    words={[' Learning Is A Lifetime  Journey', ' ', ' ']}
                                />
                            </h1>
                        </div>
                    </div>

                    <div className=' md:rounded-full mt-4 md:w-[30%] md:ml-[50px] lg:ml-32'>
                        <h1 class="animate__animated animate__zoomIn">
                            <Link to="/allBook">
                                <button className='btn btn-outline btn-accent md:btn-lg '>
                                    <div className='flex gap-2 items-center'>
                                        <p>Explore</p> <FaArrowRightLong />
                                    </div>
                                </button>
                            </Link>
                        </h1>
                    </div>
                </div>


            </div>


            {/* Slider */}
            <div className='max-w-[370px] md:max-w-[540px] lg:max-w-[1540px] mx-auto px-4 md:px-8 py-8 md:py-10  rounded-3xl mb-10'>
                <div className='text-[] md:text-3xl md:font-bold text-center text-blue-600 mb-4 flex flex-row items-center justify-center gap-2'>
                    <h3 className='text-center'></h3>
                    <div>
                        {/* <FaAnglesRight /> */}
                    </div>
                </div>
                <Slider />
            </div>



        </div>
    );
};

export default Banner;
