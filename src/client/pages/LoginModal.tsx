import React from "react";
import { Input, Modal, Form, Button } from "antd";

interface LoginModalProps {
  showModal: () => void;
  hideModal: () => void;
  isModalVisible: boolean;
}

interface LoginModalState {
  email: string;
  password: string;
}

class LoginModal extends React.Component<LoginModalProps, LoginModalState> {
  constructor(props: LoginModalProps | Readonly<LoginModalProps>) {
    super(props);

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  state = {
    email: "",
    password: "",
  };

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
        <Modal
          title="Secure Login"
          visible={this.props.isModalVisible}
          onOk={this.props.hideModal}
          onCancel={this.props.hideModal}
          footer={
            <div>
              <Button
                style={{ display: "none" }}
                htmlType="submit"
                onClick={(e) => this.handleSubmitClick}
              >
                Signup
              </Button>
            </div>
          }
          okText="Login"
        >
          <Form id="login-form" layout="vertical">
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
          </Form>
        </Modal>
      </>
    );
  }
}

export default LoginModal;
