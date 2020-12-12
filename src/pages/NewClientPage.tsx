import React from 'react'
import { Steps, Button, message, Card, Form, Space } from 'antd';
import NewClientInfo from '../components/new-client/NewClientInfo'
import NewClientCredentials from '../components/new-client/NewClientCredentials'
import PetInfo from '../components/new-client/PetInfo'
const { Step } = Steps;

class NewClientPage extends React.Component {
  state = {
    current: 0,
  };

  next() {
    this.setState({
      current: this.state.current + 1
    })
  };

  prev() {
    this.setState({
      current: this.state.current - 1
    })
  };

  onFinish(values) {
    console.log('Success:', values);
  };

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  };

  steps = [{
    title: "Client Details",
    content: <NewClientInfo />
  }, {
    title: "Credentials",
    content: <NewClientCredentials />
  }, {
    title: "Pet Info",
    content: <PetInfo />
  }]

  render() {
    return (
      <Card title="New Client Form" className="new-client-form-card">
        <Form
          name="basic"
          layout="vertical"
          size="middle"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Steps current={this.state.current}>
            {this.steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <br />
          <div className="steps-content">{this.steps[this.state.current].content}</div>
          <Space align="end">
            {this.state.current < this.steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {this.state.current === this.steps.length - 1 && (
              <Form.Item>
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              </Form.Item>
            )}
            {this.state.current > 0 && (
              <Form.Item>
              <Button onClick={() => this.prev()}>
                Previous
              </Button>
              </Form.Item>
            )}
          </Space>
        </Form>
      </Card>
    );
  }
}


export default NewClientPage