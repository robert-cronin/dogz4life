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

  handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: e.target.value });
  }

  handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <Form
        id="contact-form"
        layout="vertical"
        style={{
          borderColor: "darkblue",
          margin: "10px",
          borderWidth: "10px",
        }}
      >
        <Form.Item label="Name">
          <Input
            onChange={(e) => this.handleNameChange(e)}
            value={this.state.name}
            placeholder="Enter Your Name"
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            onChange={(e) => this.handleEmailChange(e)}
            value={this.state.email}
            placeholder="Enter Your Email Address"
          />
        </Form.Item>
        <Form.Item label="Message">
          <Input.TextArea
            onChange={(e) => this.handleMessageChange(e)}
            value={this.state.message}
            placeholder="Enter Your Message"
            rows={10}
          />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button htmlType="submit">SEND</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ContactFormContent;
