import React from "react";
import moment from "moment";
import {} from "antd";
import { CatalogItemData } from "../../pages/NewBooking";
import { AppointmentOption } from "../booking-calendar/BookingCalendar";

interface BookingConfirmationProps {
  selectedCatalogOptions: CatalogItemData[];
  selectedAppointmentOption: AppointmentOption;
}
interface BookingConfirmationState {}

class BookingConfirmation extends React.Component<
  BookingConfirmationProps,
  BookingConfirmationState
> {
  constructor(
    props: BookingConfirmationProps | Readonly<BookingConfirmationProps>
  ) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
        }}
      >
      <div>
        <h1>Selected Catalog Options</h1>
        <div>{JSON.stringify(this.props.selectedCatalogOptions, undefined, 2)}</div>
      </div>
        <div>
          <h1>Selected Appointment Option</h1>
          <div>{JSON.stringify(this.props.selectedAppointmentOption, undefined, 2)}</div>
        </div>
      </div>
    );
  }
}

export default BookingConfirmation;
