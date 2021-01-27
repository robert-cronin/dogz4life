import React from "react";
import { Steps, Button, message, Card, Form, Space } from "antd";
import CatalogItemList from "../components/catalog/CatalogItemList";
import BookingCalendar from "../components/booking-calendar/BookingCalendar";
const { Step } = Steps;

class NewBooking extends React.Component {
  state = {
    current: 0,
  };

  next() {
    this.setState({
      current: this.state.current + 1,
    });
  }

  prev() {
    this.setState({
      current: this.state.current - 1,
    });
  }

  onFinish(values) {
    console.log("Success:", values);
  }

  onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  steps = [
    {
      title: "Select Service",
      content: <CatalogItemList />,
    },
    {
      title: "Select date and time",
      content: <BookingCalendar />,
    },
    {
      title: "Enter your details",
      content: <CatalogItemList />,
    },
  ];

  render() {
    console.log("NODE_ENV")
    console.log(process.env.NODE_ENV)
    return (
      <Card
        title="New Booking"
        id="new-booking-form-card"
        actions={[
          this.state.current < this.steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          ),
          this.state.current === this.steps.length - 1 && (
            <Form.Item>
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            </Form.Item>
          ),
          this.state.current > 0 && (
            <Form.Item>
              <Button onClick={() => this.prev()}>Previous</Button>
            </Form.Item>
          ),
        ]}
      >
        <Form
          name="basic"
          layout="horizontal"
          size="middle"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <Steps direction="vertical" current={this.state.current}>
                {this.steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>
            <div className="steps-content">
              {this.steps[this.state.current].content}
            </div>
          </div>
        </Form>
      </Card>
    );
  }
}

export default NewBooking;
