import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { auth } from '../../firebase';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and Password is required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be atleast 6 characters long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');
        // get userid token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log('user', user, 'idTokenResult', idTokenResult);

        // dispatch({
        //   type: 'LOGGED_IN_USER',
        //   payload: {
        //     email: user.email,
        //     token: idTokenResult.token,
        //   },
        // });

        // redirect
        toast.success('Successfully Registered');
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => {
    return (
      <form className="my-2" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control py-3"
          value={email}
          placeholder="Enter Email"
          disabled
        />
        <input
          type="password"
          className="form-control py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <Button
          className="my-4 btn btn-raised btn-primary"
          onClick={handleSubmit}
          type="submit"
          shape="round"
          block
          size="large"
        >
          Complete Registration
        </Button>
      </form>
    );
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="my-2">Complete Registration</h2>
          <p className="h6 mb-5">
            Register your account to get exclusive deals, track your orders,
            earn rewards and more
          </p>

          {completeRegistrationForm()}

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

export default RegisterComplete;
