import React from "react";
import { Form, Input, Button } from "antd";
import FormItemLabel from "antd/lib/form/FormItemLabel";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

class ContactFormContent extends React.Component<any, ContactFormState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
    };
  }

  handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <Form id="contact-form" layout="vertical">
        <Form.Item label="Name">
          <Input
            onChange={(e) => this.handleNameChange(e)}
            value={this.state.name}
            placeholder="Enter Your Name"
          />
        </Form.Item>
        <Form.Item style={{display: "flex"}}>
          <Button htmlType="submit" style={{alignSelf: "center"}}>SEND</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ContactFormContent;
