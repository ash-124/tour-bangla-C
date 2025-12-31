import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL);
      await axiosPublic.post("/users", { ...data, role: "tourist" });
      reset();
      Swal.fire({
        icon: "success",
        title: "Account created!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      await axiosPublic.post("/users", {
        name: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
        role: "tourist",
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tour Bangla | Sign Up</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
          <p className="text-gray-500 mb-6">Create your account to start exploring</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-600 text-sm">Name is required</p>}

            <input
              {...register("photoURL", { required: true })}
              placeholder="Photo URL"
              className="input input-bordered w-full"
            />
            {errors.photoURL && <p className="text-red-600 text-sm">Photo URL is required</p>}

            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered w-full"
            />
            {errors.email && <p className="text-red-600 text-sm">Email is required</p>}

            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="input input-bordered w-full"
            />
            {errors.password && <p className="text-red-600 text-sm">Password must be at least 6 characters</p>}

            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <FaGoogle /> Continue with Google
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
