import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Row,
  Col,
} from "antd";
const { Option } = Select;

class NewClientInfo extends React.Component {
  render() {
    return (
      <>
        <Row gutter={50}>
          <Col span={12}>
            <Form.Item
              label="Pet Name"
              name="petname"
              rules={[
                { required: true, message: "Please input your pets name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Pet Type"
              name="pettype"
              rules={[
                { required: true, message: "Please select your pets type" },
              ]}
            >
              <Select placeholder="Select Type">
                <Option value="Dog">Dog</Option>
                <Option value="Cat">Cat</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Pet Gender"
              name="petgender"
              rules={[
                { required: true, message: "Please select your pets gender" },
              ]}
            >
              <Select placeholder="Select Gender">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Is she/he Sprayed or Neutered?" name="sprayed">
              <Switch />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <InputNumber /> kg
            </Form.Item>
            <Form.Item label="Coat Color" name="coatcolor">
              <Input />
            </Form.Item>
            <Form.Item label="Birthday" name="birthday">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Allergies" name="allergies">
              <Input.TextArea rows={7} />
            </Form.Item>
            <Form.Item label="Additional Notes" name="additionalnotes">
              <Input.TextArea rows={7} />
            </Form.Item>
            <Form.Item label="Vaccination Record" name="vaccinationrecord">
              <Select placeholder="Select Type">
                <Option value="Rabies">Rabies</Option>
                <Option value="Bordetella">Bordetella</Option>
                <Option value="Leptospirosis">Leptospirosis</Option>
                <Option value="CanineC3">Canine C3</Option>
                <Option value="CanineC4">Canine C4</Option>
                <Option value="CanineC5">Canine C5</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date Administered" name="vaccinedateadministered">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Next Due" name="vaccinenextdue">
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }
}

export default NewClientInfo;
