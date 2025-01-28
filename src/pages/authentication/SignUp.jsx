import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";



const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const auth = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { createUser, updateUserProfile, googleLogin } = auth;
    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name, data.photoURL)
                    .then(async () => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL,
                            role:'tourist'
                        }
                        await axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log(res)
                                if (res.data?.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate(from, { replace: true });
                                }
                            })


                    })
                    .catch(error => console.log(error))
            })
    };

    const handleGoogleLogin = () => {
        try {
            googleLogin()
                .then(async res => {

                    console.log("user from google", res.user)
                    const userInfo = {
                        name: res.user?.displayName,
                        email: res.user?.email,
                        photoURL: res.user?.photoURL,
                        role:'tourist',
                    }

                    await axiosPublic.post('/users', userInfo)

                        .then(res => {
                            if (res.data?.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/');
                            }
                        })
                })


        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <>
            <Helmet>
                <title>Tour Bangla | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className=" text-center"><small>Already have an account <Link to="/login">Login</Link></small></p>
                        {/* social logins */}
                        <div className="p-8">
                            <button onClick={handleGoogleLogin} className="btn btn-outline btn-success">
                                <FaGoogle className="mr-2" />  Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;