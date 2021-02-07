import React from "react";
import moment from "moment";
import { Calendar, Button, Alert } from "antd";
import {
  createApointmentOptions,
  createAvailabilityRequestBody,
} from "./utils";
import AppointmentOptionsList from "./AppointmentOptionsList";

interface BookingCalendarProps {
  locationId: string;
  serviceVariationIdList: string[];
  selectedAppointmentOption?: AppointmentOption;
  selectAppointmentOption: (option: AppointmentOption) => void;
}
// Morning: anything before 12pm
// Afternoon: anything between the other two
// Evening: anything after 5pm
interface BookingCalendarState {
  isLoading: boolean;
  morningOptions: AppointmentOption[];
  afternoonOptions: AppointmentOption[];
  eveningOptions: AppointmentOption[];
  date: moment.Moment;
  selectedDate: moment.Moment;
  error: string;
}

interface AppointmentOption {
  startAt: moment.Moment;
  locationId: string;
  apointmentSegments: {
    durationMinutes: number;
    serviceVariationId: string;
    serviceVariationVersion: string;
    teamMemberId: string;
  }[];
}

class BookingCalendar extends React.Component<
  BookingCalendarProps,
  BookingCalendarState
> {
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
    const reqBody = createAvailabilityRequestBody(
      this.props.locationId,
      this.props.serviceVariationIdList,
      date
    );
    fetch("/api/booking/availability", {
      body: reqBody,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("finished");
          console.log(result);

          const apointmentOptions = createApointmentOptions(result);
          console.log(apointmentOptions);

          this.setState({
            isLoading: false,
            ...apointmentOptions,
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            error,
          });
        }
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
          width: "100%",
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
          <AppointmentOptionsList
            timeOfDay="Morning"
            appointmentOptions={this.state.morningOptions}
            selectedAppointmentOption={this.props.selectedAppointmentOption}
            selectAppointmentOption={(option: AppointmentOption) => {
              this.props.selectAppointmentOption(option);
            }}
          />
          <AppointmentOptionsList
            timeOfDay="Afternoon"
            appointmentOptions={this.state.afternoonOptions}
            selectedAppointmentOption={this.props.selectedAppointmentOption}
            selectAppointmentOption={(option: AppointmentOption) => {
              this.props.selectAppointmentOption(option);
            }}
          />
          <AppointmentOptionsList
            timeOfDay="Evening"
            appointmentOptions={this.state.eveningOptions}
            selectedAppointmentOption={this.props.selectedAppointmentOption}
            selectAppointmentOption={(option: AppointmentOption) => {
              this.props.selectAppointmentOption(option);
            }}
          />
        </div>
      </div>
    );
  }
}

export default BookingCalendar;
export { AppointmentOption };
