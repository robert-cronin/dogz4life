import React from "react";
import { Form, Input, Button } from "antd";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

class ContactForm extends React.Component<any, ContactFormState> {
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
      <Form>
        <Form.Item>
          <Input onChange={(e) => this.handleNameChange(e)} value={this.state.name} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">SEND</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ContactForm;
