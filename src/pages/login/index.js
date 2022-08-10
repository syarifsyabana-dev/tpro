import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const dispatch = useDispatch()

  const handleLogin = (values) => {
    console.log(values);
    dispatch({
      type: 'auth/HANDLE_LOGIN',
      payload: values
    })
  }

  return (
    <div className='main login'>
      <Form
        style={{ width: '100%' }}
        name='FormLogin'
        onFinish={handleLogin}
      >
        <Space direction='vertical' className='my-container'>
          <Form.Item
            name='email'
            noStyle
            initialValue={process.env.REACT_APP_USER}
          >
            <Input
              type="email"
            />
          </Form.Item>
          <Form.Item
            name='password'
            noStyle
          >
            <Input.Password />
          </Form.Item>
          <Button
            type='primary'
            className='button-100'
            htmlType='submit'
          >
            Masuk
          </Button>
        </Space>
      </Form>
    </div>
  );
}

export default LoginPage;