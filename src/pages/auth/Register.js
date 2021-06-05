import React, { useState } from 'react';

import { toast } from 'react-toastify';

import { auth } from '../../firebase';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };

      await auth.sendSignInLinkToEmail(email, config);
      toast.success(
        `Email send to ${email}. click the link to complete your registration`
      );

      window.localStorage.setItem('emailForRegistration', email);
      setEmail('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const registerForm = () => {
    return (
      <form className="my-2" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control py-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter Email"
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
          <h2 className="my-2">Register</h2>
          <p className="h6 mb-5">
            Create an account to get exclusive deals, track your orders, earn
            rewards and more
          </p>

          {registerForm()}

          <p className="text-center h6">
            By continuing you agree to our{' '}
            <a className="text-primary">Terms of Use </a> &
            <a className="text-primary"> Privacy Policy </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
