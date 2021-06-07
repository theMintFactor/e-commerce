import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const Login = () => {
  const [email, setEmail] = useState('mintu.krish999@gmail.com');
  const [password, setPassword] = useState('mintu12345');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  const loginForm = () => {
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

        <input
          type="password"
          className="form-control py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <br />
        <Button
          onClick={handleSubmit}
          className="my-4 btn btn-raised btn-primary"
          block
          shape="round"
          icon={<LoginOutlined />}
          size="large"
          disabled={!email || password.length < 6}
          type="submit"
        >
          Login
        </Button>
      </form>
    );
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="my-2">Login</h2>
          <p className="h6 mb-5">
            Login to get exclusive deals, track your orders, earn rewards and
            more
          </p>

          {loginForm()}

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

export default Login;
