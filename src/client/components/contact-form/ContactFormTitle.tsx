import React from "react";
import { Form, Input, Button } from "antd";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

class ContactFormTitle extends React.Component<any, ContactFormState> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          display: "inline-flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h1 style={{
          color: 'white'
        }}>Contact Us</h1>
      </div>
    );
  }
}

export default ContactFormTitle;
