import React from "react";
import moment from "moment";
import { Steps, Button, message, Card, Form } from "antd";
import CatalogItemList from "../components/catalog/CatalogItemList";
import BookingCalendar from "../components/booking-calendar/BookingCalendar";
import { AppointmentOption } from "../components/booking-calendar/BookingCalendar";
import BookingConfirmation from "../components/booking-confirmation/BookingConfirmation";
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
  selectedAppointmentOption?: AppointmentOption;
}

class NewBooking extends React.Component<any, NewBookingState> {
  brisbaneLocationId = "LMQY4941CGM9H";
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
    // change the item
    if (variationId) {
      console.log(variationId);

      item.selectedVariationId = variationId;
      item.isSelected = true;
    } else {
      item.isSelected = !item.isSelected;
    }
    // set state
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
                const variations: CatalogItemVariation[] = i.itemData?.variations.map(
                  (v) => {
                    const variation: CatalogItemVariation = {
                      id: v.id,
                      name: v.itemVariationData.name,
                      price: {
                        amount: v.itemVariationData?.priceMoney?.amount ?? -1,
                        currency:
                          v.itemVariationData?.priceMoney?.currency ?? "",
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

  createBooking() {
    this.setState({ isLoading: true });
    const newBookingRequest = {
      appointmentSegments: this.state.selectedAppointmentOption.apointmentSegments.map((a) => {
        return {
          teamMemberId: a.teamMemberId,
          serviceVariationId: a.serviceVariationId,
          serviceVariationVersion: a.serviceVariationVersion,
          durationMinutes: a.durationMinutes,
        };
      }),
      startAt: this.state.selectedAppointmentOption.startAt,
      locationId: this.brisbaneLocationId,
      customerNote: "sample customer note",
    };
    console.log();
    
    fetch("/api/booking/new", {
      body: JSON.stringify(newBookingRequest),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('booking');
          console.log(result);
          console.log('booking');
          
          this.setState({
            isLoading: false,
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

  onFinish() {
    const selectedOptions = this.state.options.filter((o) => o.isSelected);
    const selectedTime = this.state.selectedAppointmentOption;
    console.log(selectedOptions);
    console.log(selectedTime);
    this.createBooking()
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
            selectedAppointmentOption={this.state.selectedAppointmentOption}
            selectAppointmentOption={(option: AppointmentOption) =>
              this.setState({ selectedAppointmentOption: option })
            }
            locationId={this.brisbaneLocationId}
          />
        ),
      },
      {
        title: "Booking Confirmation",
        content: (
          <BookingConfirmation
            selectedCatalogOptions={this.state.options.filter(
              (o) => o.isSelected
            )}
            selectedAppointmentOption={this.state.selectedAppointmentOption}
          />
        ),
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
                onClick={() => {
                  message.success("Processing complete!");
                  this.onFinish();
                }}
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
            <div
              className="steps-content"
              style={{
                width: "80vw",
              }}
            >
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
