import React from "react";
import { Button, Input, Modal, Form } from "antd";
import { LoginOutlined } from "@ant-design/icons";

interface LoginModalState {
  email: string;
  password: string;
  isModalVisible: boolean;
}

class LoginModal extends React.Component<any, LoginModalState> {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  state = {
    email: "",
    password: "",
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
      email: e.target.value,
    });
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmitClick(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
  }

  render() {
    return (
      <>
        <Button type="link" icon={<LoginOutlined />} onClick={this.showModal}>
          Login
        </Button>
        <Modal
          title="Secure Login"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Login"
        >
          <Form
            id="login-form"
            layout="vertical"
          >
            <Form.Item label="Email">
              <Input
                type="text"
                required={true}
                value={this.state.email}
                onChange={(e) => this.handleEmailChange(e)}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Input
                type="password"
                required={true}
                value={this.state.password}
                onChange={(e) => this.handlePasswordChange(e)}
              />
            </Form.Item>
            {/* <Button style={{display: "none"}} htmlType="submit" onClick={e => this.handleSubmitClick}>Signup</Button> */}
          </Form>
        </Modal>
      </>
    );
  }
}

export default LoginModal;
