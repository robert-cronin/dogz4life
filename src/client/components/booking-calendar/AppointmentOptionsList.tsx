import React from "react";
import moment from "moment";
import { Button } from "antd";
import { AppointmentOption } from "./BookingCalendar";

interface AppointmentOptionsListProps {
  timeOfDay: "Morning" | "Afternoon" | "Evening";
  appointmentOptions: AppointmentOption[];
  selectedAppointmentOption: AppointmentOption;
  selectAppointmentOption: (option: AppointmentOption) => void;
}

class AppointmentOptionsList extends React.Component<
  AppointmentOptionsListProps,
  any
> {
  render() {
    if (this.props.appointmentOptions.length == 0) {
      return (
        <div>
          <h2>{this.props.timeOfDay}</h2>
          <Button disabled={true}>All booked</Button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>{this.props.timeOfDay}</h2>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
            }}
          >
            {this.props.appointmentOptions.map((o) => {
              return (
                <Button
                  key={o.startAt.toISOString()}
                  style={{ margin: "5px" }}
                  type={
                    o.startAt.format("HH:mm") ==
                      this.props.selectedAppointmentOption?.startAt.format("HH:mm") ??
                    ""
                      ? "primary"
                      : "link"
                  }
                  onClick={() => {
                    this.props.selectAppointmentOption(o);
                    console.log("selected: ", o.startAt.format("HH:mm"));
                  }}
                >
                  {o.startAt.format("HH:mm")}
                </Button>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default AppointmentOptionsList;
