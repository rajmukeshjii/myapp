import React, { useState } from 'react';

const FormWithValidation = () => {
  // State to manage form data and validation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  // Helper function to validate the name field
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name is required.';
    }
    if (!/^[a-zA-Z]+$/.test(name)) {
      return 'Name should contain only alphabets.';
    }
    return '';
  };

  // Helper function to validate the email field
  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required.';
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return 'Invalid email format.';
    }
    return '';
  };

  // Helper function to validate the password field
  const validatePassword = (password) => {
    if (!password.trim()) {
      return 'Password is required.';
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      return 'Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.';
    }
    return '';
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate each field
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    // Set errors in the state
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });

    // If no errors, display success message
    if (!nameError && !emailError && !passwordError) {
      setSuccessMessage('Form submitted successfully!');
    }
  };

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for the changed field
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <div className="error">{errors.name}</div>
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <div className="error">{errors.email}</div>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className="error">{errors.password}</div>
        </div>

        <button type="submit">Submit</button>
      </form>

      {successMessage && <div className="success">{successMessage}</div>}
    </div>
  );
};

export default FormWithValidation;
