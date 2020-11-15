import React from 'react'
import { Form, Input, Checkbox, Select, Row, Col } from 'antd';
const { Option } = Select;

class NewClientInfo extends React.Component {
    render() {
        return (<>
            <Row gutter={50}>
                <Col span={12}>
                    <Form.Item
                        label="Prefix"
                        name="prefix"
                        rules={[{ required: false, }]}
                    >
                        <Select placeholder="Select Prefix">
                            <Option value="Miss">Miss</Option>
                            <Option value="Mrs">Mrs</Option>
                            <Option value="Ms">Ms</Option>
                            <Option value="Mr">Mr</Option>
                            <Option value="Dr">Dr</Option>
                            <Option value="Sir">Sir</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[{ required: true, message: 'Please input your first name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[{ required: true, message: 'Please input your last name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address - Line 1"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address - Line 2"
                        name="address2"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please input your city' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="State"
                        name="state"
                        rules={[{ required: true, message: 'Please input your state' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Post Code"
                        name="postcode"
                        rules={[{ required: true, message: 'Please input your post code' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Contact Methods"
                        name="contactmethod"
                        rules={[{ required: true, message: 'Please input your contact methods' }]}
                    >
                        <Select defaultValue="Vetenarian">
                            <Option value="Home">Home</Option>
                            <Option value="Mobile">Mobile</Option>
                            <Option value="Email">Email</Option>
                            <Option value="Work">Work</Option>
                            <Option value="Vetenarian">Vetenarian</Option>
                        </Select>
                        <Input placeholder="Phone number or Full Name" />
                    </Form.Item>
                    <Form.Item
                        label="Preferred Contact Methods"
                        name="preferredcontact"
                        rules={[{ required: true, message: 'Please select your preferred contact' }]}
                    >
                        <Checkbox.Group options={[
                            "Home",
                            "Mobile",
                            "Email",
                            "Work",
                            "Vetenarian",
                        ]} defaultValue={["Home"]} />
                    </Form.Item>
                    <Form.Item
                        label="Notes"
                        name="notes"
                    >
                        <Input.TextArea rows={10} />
                    </Form.Item>
                </Col>
            </Row>
        </>);
    }
}


export default NewClientInfo