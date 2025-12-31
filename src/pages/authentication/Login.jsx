import { useEffect, useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const [captchaInput, setCaptchaInput] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { signIn, googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => loadCaptchaEnginge(6), []);

  // Validate captcha whenever input changes
  useEffect(() => {
    if (captchaInput.length === 6) {
      setDisabled(!validateCaptcha(captchaInput));
    } else {
      setDisabled(true); // keep disabled if input incomplete
    }
  }, [captchaInput]);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!validateCaptcha(captchaInput)) {
      toast.error("Captcha is incorrect");
      return;
    }

    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 1200,
        });
        navigate(from, { replace: true });
      })
      .catch(err => toast.error(err.message));
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
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response?.status === 409) {
        // User already exists, just log them in
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          showConfirmButton: false,
          timer: 1200,
        });
        navigate(from, { replace: true });
      } else {
        toast.error("Google login failed");
        console.error(err);
      }
    }
};

return (
  <>
    <Helmet>
      <title>Tour Bangla | Login</title>
    </Helmet>

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
        <p className="text-gray-500 mb-6">Access your account to manage bookings</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          <div className="space-y-2">
            <LoadCanvasTemplate />
            <input
              type="text"
              placeholder="Enter captcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            disabled={disabled}
            className={`btn w-full ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'}`}
          >
            Login
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
          New here?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  </>
);
};

export default Login;
