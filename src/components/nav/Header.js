import React, { useState } from 'react';
import { Menu, Typography } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  let dispatch = useDispatch();
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGGED_OUT',
      payload: null,
    });
    history.push('./login');
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
      style={{ background: '#002329' }}
    >
      <Item key="logo" className="mx-3">
        <Link to="/">
          <Title level={3} className="m-2" type="success">
            CROMA
          </Title>
        </Link>
      </Item>

      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
      </Item>
      <Item key="login" className="float-right" icon={<UserOutlined />}>
        <Link to="/login">Login</Link>
      </Item>

      <SubMenu
        key="username"
        icon={<SettingOutlined />}
        title="Username"
        className="float-right"
      >
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />} onClick={logout}>
          LogOut
        </Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
