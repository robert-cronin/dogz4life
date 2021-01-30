import React from "react";
import moment from "moment";
import { Calendar, Button, Alert } from "antd";
import {
  createApointmentOptions,
  createAvailabilityRequestBody,
} from "./utils";
import ApointmentOptionsList from "./ApointmentOptionsList";

interface BookingCalendarProps {
  serviceVariationIdList: string[];
}
// Morning: anything before 12pm
// Afternoon: anything between the other two
// Evening: anything after 5pm
interface BookingCalendarState {
  isLoading: boolean;
  morningOptions: ApointmentOption[];
  afternoonOptions: ApointmentOption[];
  eveningOptions: ApointmentOption[];
  date: moment.Moment;
  selectedDate: moment.Moment;
  error: string;
}

interface ApointmentOption {
  startAt: moment.Moment;
  locationId: string;
  apointmentSegments: {
    durationMinutes: number;
    serviceVariationId: string;
    teamMemberId: string;
  }[];
}

class BookingCalendar extends React.Component<
  BookingCalendarProps,
  BookingCalendarState
> {
  brisbaneLocationId = "LMQY4941CGM9H";
  constructor(props: BookingCalendarProps | Readonly<BookingCalendarProps>) {
    super(props);

    this.state = {
      isLoading: false,
      morningOptions: [],
      afternoonOptions: [],
      eveningOptions: [],
      date: moment(),
      selectedDate: moment(),
      error: "",
    };
  }

  onSelect = (date: moment.Moment) => {
    this.setState({
      date,
      selectedDate: date,
      isLoading: true,
    });
    fetch("/api/booking/availability", {
      body: createAvailabilityRequestBody(
        this.brisbaneLocationId,
        this.props.serviceVariationIdList
      ),
    })
      .then((res) => res.json())
      .then(
        (result) =>
          this.setState({
            isLoading: false,
            ...createApointmentOptions(result),
          }),
        (error) =>
          this.setState({
            isLoading: false,
            error,
          })
      );
  };

  onPanelChange = (date: moment.Moment) => {
    this.setState({ date });
  };

  render() {
    const { date, selectedDate } = this.state;
    return (
      <div
        style={{
          width: "80vw",
        }}
      >
        <Calendar
          fullscreen={false}
          value={date}
          onSelect={this.onSelect}
          onPanelChange={this.onPanelChange}
          validRange={[moment(), moment().add(4, "months")]}
        />
        <div>
          <h2>
            {this.state.selectedDate.format(
              "[Available on] ddd[.,] MMM[.] DD[,] YYYY"
            )}
          </h2>
          <div>
            You can schedule an appointment between 1 day and 365 days ahead of
            time.
          </div>
          <ApointmentOptionsList
            timeOfDay="Morning"
            options={this.state.morningOptions}
          />
          <ApointmentOptionsList
            timeOfDay="Afternoon"
            options={this.state.afternoonOptions}
          />
          <ApointmentOptionsList
            timeOfDay="Evening"
            options={this.state.eveningOptions}
          />
        </div>
      </div>
    );
  }
}

export default BookingCalendar;
export { ApointmentOption };
