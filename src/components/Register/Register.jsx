import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from "react-helmet-async";
import { updateProfile } from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

    const { createUser } = useContext(AuthContext);

    // --------------
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);



    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(name);
        // console.log(name, photo, email, password);

        // reset error and success ----------------
        setRegisterError('');
        setSuccess('');


        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one upper case characters.')
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setRegisterError('Your password should have at least one lower case characters.')
            return;
        }
        else if (!/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/.test(password)) {
            setRegisterError('Your password should have at least one special character.');
            return;
        }

        // create user in firebase
        createUser(email, password)
            .then(result => {
                // console.log(result.user);
                setSuccess('User Created Successfully.');
                toast.success('User Created Successfully.')

                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => console.log('profile updated'))
                    .catch()
                location.reload()
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })
        // location.reload()
        // window.location.reload();

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Register</title>
            </Helmet>

            <div className="hero-content flex-col">
                {/* --------- for spacing----- */}
                <div className='mb-28'>
                    <div className='text-[] md:text-3xl md:font-bold text-center text-blue-600 mb-4 flex flex-row items-center justify-center gap-2'>
                        <div>
                            {/* <FaAnglesRight /> */}
                        </div>
                    </div>
                </div>

                <div className="text-center ">
                    <div className="text-3xl md:text-5xl font-bold text-blue-500 my-3">
                        <h1 class="animate__animated animate__fadeInDown">Register now!</h1>
                    </div>
                </div>
                {/* <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"> */}
                <div className="card flex w-full md:w-[600px] md:h-[600px] shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleRegister} className="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-[15px] md:text-[25px]">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Your Name" required className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-[15px] md:text-[25px]">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" required className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-[15px] md:text-[25px]">Photo URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" required className="input input-bordered" />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-semibold text-[15px] md:text-[25px]">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"} name="password" required placeholder="Password" className="input input-bordered" />
                                <span className="absolute  bottom-11 right-2" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEye className="text-2xl"></FaEye> : <FaEyeSlash className="text-2xl"></FaEyeSlash>
                                    }
                                </span>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover font-bold text-[] md:text-[15px] text-blue-700 ">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="hover:bg-blue-600 btn btn-info font-bold text-[15px] md:text-[25px] text-white">Register</button>
                            </div>
                        </form>

                        {
                            registerError && <p className="text-red-700">{registerError}</p>
                        }
                        {
                            success && <p className="text-green-600">{success}</p>
                        }

                        <p className="font-semibold text-[] md:text-[17px]"> Already have account? Please <Link to="/login">
                            <button className="btn text-blue-500 btn-link font-bold text-[15px] md:text-[20px]">Login</button>
                        </Link> </p>
                    </div>
                </div>
            </div>

            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Register;
