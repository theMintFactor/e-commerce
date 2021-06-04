import React, { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: 'https://localhost:3000/register/complete',
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email send to ${email}. click the link to complete your registration`
    );

    window.localStorage.setItem('emailForRegistration', email);
  };

  const registerForm = () => {
    return (
      <form className="my-2" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <button className="my-4 btn btn-raised btn-primary" type="submit">
          Register
        </button>
      </form>
    );
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
