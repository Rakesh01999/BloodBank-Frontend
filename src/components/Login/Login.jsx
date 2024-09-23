import React, { useContext, useState } from 'react';
import { FacebookAuthProvider, getAuth, signInWithPopup, updateProfile } from "firebase/auth";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase/firebase.config';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = () => {
    const [usr, setUsr] = useState(null);
    const { signInUser, signInWithGoogle, signInWithGithub, signInWithFacebook } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);
    // console.log(usr);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);

        signInUser(email, password)
            .then(result => {
                const loggedUsr = result.user;
                // console.log(loggedUsr);
                const user = { email };
                e.target.reset();
                setUsr(loggedUsr);
                // navigate('/');
                Swal.fire({
                    title: 'Success!',
                    text: 'Logged In Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })

                // navigate after login
                // toast.success('Successfully Logged in');
                navigate(location?.state ? location.state : '/')
                        

            })
            .catch(error => {
                console.error(error);
                toast.error('invalid email or password');

            })
        // location.reload()
    }


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                // console.log(result.user)
                // setUsr(result.user);
                const loggedUsr = result.user;
                // console.log(loggedUsr)
                e.target.reset();
                setUsr(loggedUsr);
                // console.log(usr.displayName);

                // navigate after login
                navigate(location?.state ? location.state : '/')
                toast.success('Successfully Logged in');

            })
            .catch(error => {
                console.error(error)
            })
        // location.reload()
    }

    const handleGithubSignIn = () => {
        signInWithGithub()
            .then(result => {
                // console.log(result.user)
                // setUsr(result.user);
                // console.log(usr.displayName);

                // ---------
                // const loggedUsr = result.user;
                // console.log(result.user)
                // console.log(currentUser)
                e.target.reset();
                setUsr(loggedUsr);
                // console.log(usr.displayName);



                // navigate after login
                navigate(location?.state ? location.state : '/')
                toast.success('Successfully Logged in');

            })
            .catch(error => {
                console.error(error);
            })
    }

    // const handleFacebookSignIn = () => {
    //   const signInWithFacebook = async () => {

    //       try {
    //           // console.log(result.user)
    //           // setUsr(result.user);
    //         //   const loggedUsr = result.user;
    //         //   console.log(loggedUsr)
    //         //   e.target.reset();
    //         //   setUsr(loggedUsr);
    //         //   console.log(usr.displayName);

    //         const provider = new FacebookAuthProvider();
    //         const result = await signInWithPopup(auth, provider) ;

    //           // navigate after login
    //         //   navigate(location?.state ? location.state : '/')

    //       }catch(error ) {
    //           console.error(error)
    //       }
    //   }
    // }

    // const [user, setUser] = useState(null);
    // const [profilePicture, setProfilePicture] = useState(null);

    // const signInWithFacebook = () => {
    //     const provider = new FacebookAuthProvider();
    //     signInWithPopup(auth, provider).then((result) => {
    //         setUser(result.user);
    //         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //         const credential = FacebookAuthProvider.credentialFromResult(result);
    //         const accessToken = credential.accessToken;
    //         // fetch facebook graph api to get user actual profile picture

    //         // update profile
    //         updateProfile(result.user, {
    //             displayName: name,
    //             photoURL: photo
    //         })
    //         .then( () => console.log('profile updated'))
    //         .catch()
    //         // fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
    //         //     .then((response) => response.blob())
    //         //     .then((blob) => {
    //         //         setProfilePicture(URL.createObjectURL(blob));
    //         //     })
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }


    // const handleFacebookSignIn = () => {
    //     signInWithFacebook()
    //         .then(result => {
    //             // console.log(result.user)
    //             // setUsr(result.user);
    //             const loggedUsr = result.user;
    //             console.log(loggedUsr)
    //             e.target.reset();
    //             setUsr(loggedUsr);
    //             console.log(usr.displayName);

    //             // navigate after login
    //             navigate(location?.state ? location.state : '/')

    //         })
    //         .catch(error => {
    //             console.error(error)
    //         })
    // }

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            {/* <h3 className='text-3xl text-center font-bold'>Login Page</h3> */}


            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center ">
                        <div className="text-3xl md:text-5xl font-bold text-blue-600 my-3">
                            <h1 class="animate__animated animate__fadeInDown">Login now!</h1>
                        </div>
                    </div>

                    <div className="card flex-shrink-0 w-full md:w-[800px] md:h-[600px] max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-[15px] md:text-[22px]">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" required className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-[15px] md:text-[22px]">Password</span>
                                    </label>
                                    <input type="password" name="password" required placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover text-[15px] md:text-[15px] text-blue-500">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="hover:bg-blue-600 btn btn-info font-bold text-[15px] md:text-[20px] text-white">Login</button>
                                </div>
                            </form>
                            <p className='text-[18px]'> New to this site? Please <Link to="/register">
                                <button className="btn text-blue-600 btn-link text-[18px]">Register</button>
                            </Link> </p>
                            <div>
                                <h2 className='text-center font-semibold text-[20px]'>or</h2>
                            </div>
                            <div>
                                <p><button onClick={handleGoogleSignIn} className=" btn btn-outline btn-info md:text-[19px] w-full "> <FcGoogle className='text-[25px]' /> Continue with Google</button></p>
                                {/* <p><button onClick={handleGithubSignIn} className="btn btn-outline btn-primary mt-5 md:text-[19px] w-full"><FaGithub className='text-[25px]' />Continue with Github</button></p> */}
                                {/* <p><button onClick={handleFacebookSignIn} className="btn btn-outline btn-primary mt-5 text-[19px]">Continue with Facebook</button></p> */}
                                {/* <p><button onClick={signInWithFacebook} className="btn btn-outline btn-primary mt-5 text-[19px]">Continue with Facebook</button></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------ */}
            <ToastContainer ></ToastContainer>
        </div>
    );
};

export default Login;