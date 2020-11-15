import React from 'react'
import { Form, Input } from 'antd';

class NewClientCredentials extends React.Component {
    render() {
        return (<>
            <Form.Item
                label="New Username"
                name="username"
                rules={[{ required: true, message: 'Please select a username, maybe your pets name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="New Password"
                name="password"
                rules={[{ required: true, message: 'Please select a secure password between 8-16 characters' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Confirm Password"
                name="passwordconfirmation"
                rules={[{ required: true, message: 'Please re-enter your password, they should match' }]}
            >
                <Input.Password />
            </Form.Item>
        </>);
    }
}


export default NewClientCredentials