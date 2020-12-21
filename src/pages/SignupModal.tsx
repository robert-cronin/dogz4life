import React from "react";
import { Button, Input, Modal } from "antd";
import Form from "antd/lib/form/Form";

interface SignupModalState {
  email: string;
  password: string;
  passwordConfirm: string;
  isModalVisible: boolean;
}

class SignupModal extends React.Component<any, SignupModalState> {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    isModalVisible: false,
  };

  showModal() {
    this.setState({
      isModalVisible: true,
    });
  }

  handleOk() {
    this.setState({
      isModalVisible: false,
    });
  }

  handleCancel() {
    this.setState({
      isModalVisible: false,
    });
  }

  ///////////////////
  // Form handlers //
  ///////////////////
  handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value
    })
  }

  handlePasswordConfirmChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      passwordConfirm: e.target.value
    })
  }

  handleSubmitClick(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    this.setState({
      email: e.target.value
    })
  }

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Signup"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Signup"
          
        >
          <Form>
            <Input name="Email" type="text" value={this.state.email} onChange={(e) => this.handleEmailChange(e)} />
            <Input name="Password" type="password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} />
            <Input name="Confirm Password" type="password" value={this.state.passwordConfirm} onChange={(e) => this.handlePasswordConfirmChange(e)} />
            {/* <Button style={{display: "none"}} htmlType="submit" onClick={e => this.handleSubmitClick}>Signup</Button> */}
          </Form>
        </Modal>
      </>
    );
  }
}

export default SignupModal;
