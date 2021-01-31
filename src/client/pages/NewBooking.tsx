import React from "react";
import moment from "moment";
import { Steps, Button, message, Card, Form } from "antd";
import CatalogItemList from "../components/catalog/CatalogItemList";
import BookingCalendar from "../components/booking-calendar/BookingCalendar";
const { Step } = Steps;

interface CatalogItemVariation {
  id: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
  duration: moment.Moment;
}

interface CatalogItemData {
  id: string;
  checked: boolean;
  name: string;
  description: string;
  variations: CatalogItemVariation[];
  selectedVariationId?: number;
}

interface NewBookingState {
  options: CatalogItemData[];
  selectedOptions: { itemId: string; variationId: string }[];
  current: number;
  isLoading: boolean;
  error: string;
}

class NewBooking extends React.Component<any, NewBookingState> {
  state = {
    options: [],
    selectedOptions: [],
    current: 0,
    isLoading: false,
    error: "",
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("/api/catalog/list")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoading: false,
            options: result
              .filter((i) => {
                return i.type == "ITEM";
              })
              .map((i) => {
                console.log(i);

                const variationData = i.itemData?.variations;
                const item: CatalogItemData = {
                  id: i.id ?? "",
                  name: i.itemData?.name ?? "",
                  description: i.itemData?.description ?? "",
                  checked: false,
                  variations: variationData.map((v) => {
                    const variation: CatalogItemVariation = {
                      id: v.id,
                      name: v.name,
                      price: {
                        amount: v.itemVariationData.priceMoney.amount,
                        currency: v.itemVariationData.priceMoney.currency,
                      },
                      duration: moment(
                        new Date(v.itemVariationData.serviceDuration as number)
                      ),
                    };
                    return variation;
                  }),
                };
                return item;
              }),
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            error,
          });
        }
      );
  }

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
      content: (
        <BookingCalendar
          serviceVariationIdList={this.state.serviceVariationIdList}
        />
      ),
    },
    {
      title: "Enter your details",
      content: <CatalogItemList />,
    },
  ];

  render() {
    console.log("NODE_ENV");
    console.log(process.env.NODE_ENV);
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
export { CatalogItemData, CatalogItemVariation };
