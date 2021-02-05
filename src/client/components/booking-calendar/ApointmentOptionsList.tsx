import React from "react";
import moment from "moment";
import { Button } from "antd";
import { ApointmentOption } from "./BookingCalendar";

interface ApointmentOptionsListProps {
  timeOfDay: "Morning" | "Afternoon" | "Evening";
  timeOptions: moment.Moment[];
  selectedTime: moment.Moment;
  selectTime: (time: moment.Moment) => void;
}

class ApointmentOptionsList extends React.Component<
  ApointmentOptionsListProps,
  any
> {
  render() {
    if (this.props.timeOptions.length == 0) {
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
            {this.props.timeOptions.map((o) => {
              return (
                <Button
                  key={o.toString()}
                  style={{ margin: "5px" }}
                  type={
                    o.format("HH:mm") ==
                      this.props.selectedTime?.format("HH:mm") ?? ""
                      ? "primary"
                      : "link"
                  }
                  onClick={() => {
                    this.props.selectTime(o);
                    console.log("selected: ", o.format("HH:mm"));
                  }}
                >
                  {o.format("HH:mm")}
                </Button>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default ApointmentOptionsList;
