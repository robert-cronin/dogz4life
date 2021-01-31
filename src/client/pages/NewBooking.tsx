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
  name: string;
  description: string;
  variations: CatalogItemVariation[];
  isSelected: boolean;
  selectedVariationId?: string;
}

interface NewBookingState {
  options: CatalogItemData[];
  current: number;
  isLoading: boolean;
  error: string;
}

class NewBooking extends React.Component<any, NewBookingState> {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      current: 0,
      isLoading: false,
      error: "",
    };
  }

  selectOption = (itemId: string, variationId?: string) => {
    const options = this.state.options;
    const idx = options.findIndex((v) => v.id == itemId);
    const before = options.slice(0, idx);
    const item = { ...options[idx] };
    const after = options.slice(idx + 1);
    item.isSelected = !item.isSelected;
    item.selectedVariationId = variationId;
    this.setState({ options: [...before, item, ...after] });
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

                const variations: CatalogItemVariation[] = i.itemData?.variations.map(
                  (v) => {
                    const variation: CatalogItemVariation = {
                      id: v.id,
                      name: v.itemVariationData.name,
                      price: {
                        amount: v.itemVariationData?.priceMoney?.amount ?? -1,
                        currency: v.itemVariationData?.priceMoney?.currency ?? '',
                      },
                      duration: moment(
                        new Date(v.itemVariationData?.serviceDuration as number)
                      ),
                    };
                    return variation;
                  }
                );
                const item: CatalogItemData = {
                  id: i.id ?? "",
                  name: i.itemData?.name ?? "",
                  description: i.itemData?.description ?? "",
                  variations,
                  isSelected: false,
                  selectedVariationId: variations[0]?.id ?? undefined,
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

  render() {
    const steps = [
      {
        title: "Select Service",
        content: (
          <CatalogItemList
            options={this.state.options}
            selectOption={this.selectOption}
          />
        ),
      },
      {
        title: "Select date and time",
        content: (
          <BookingCalendar
            serviceVariationIdList={this.state.options
              .filter((o) => o.isSelected)
              .map((o) => o.selectedVariationId)}
          />
        ),
      },
      {
        title: "Enter your details",
        content: <span />,
      },
    ];
    return (
      <Card
        title="New Booking"
        id="new-booking-form-card"
        actions={[
          this.state.current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          ),
          this.state.current === steps.length - 1 && (
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
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>
            <div className="steps-content">
              {steps[this.state.current].content}
            </div>
          </div>
        </Form>
      </Card>
    );
  }
}

export default NewBooking;
export { CatalogItemData, CatalogItemVariation };
