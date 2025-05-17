import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../store/thunk/auththunk"; // adjust path if needed
import countries from "./country.json";
import "./signup.css";
import { toast } from "react-toastify";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", country: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");
    dispatch(signupUser(form)).then((res) => {
        toast.info("Sign up successfully...");
      if (!res.error) navigate("/"); // go to login on success
    });
  };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                </div>
                <div>
                    <label>Country</label>
                    <select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login here</Link>
            </p>
        </div>
    );
};

export default Signup;