import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      formErrors.email = "Invalid email format.";
    if (!formData.phone.match(/^\d{10}$/))
      formErrors.phone = "Phone must be 10 digits.";
    if (!formData.message) formErrors.message = "Message is required.";
    if (formData.password.length < 6)
      formErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match.";

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setErrors({});
    } else {
      setErrors(validationErrors);
      setSubmittedData(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Contact Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <small className="text-danger">{errors.phone}</small>
          )}
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            className="form-control"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && (
            <small className="text-danger">{errors.message}</small>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <small className="text-danger">{errors.confirmPassword}</small>
          )}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-4">
          <h4>Submitted Data</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
