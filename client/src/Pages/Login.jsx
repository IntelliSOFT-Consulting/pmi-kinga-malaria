import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from '@/redux/actions/userActions';

export default function Login() {
  const { userInfo } = useSelector(state => state.userSignin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      // go back to the previous page
      window.history.back();
    }
  }, [userInfo]);

  const onFinish = values => {
    console.log('Received values of form: ', values);
    dispatch(signin(values));
  };

  return (
    <div className='login-grid'>
      <div className='login-section'>
        <div className='login-form'>
          <h1>Login</h1>
          <Form onFinish={onFinish}>
            <Form.Item
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please input a valid email!' },
              ]}
              name='email'
            >
              <Input size='large' placeholder='Email' />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
              name='password'
            >
              <Input.Password size='large' placeholder='Password' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div>
        <img
          src='https://d1u4sg1s9ptc4z.cloudfront.net/uploads/2021/12/PMI-ENG-Logo-Color-Full-Lockup@2x_1200-1024x380-1.png'
          alt='logo'
        />
      </div>
    </div>
  );
}
