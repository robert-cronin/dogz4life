import React from "react";
import { Button } from "antd";
import { ApointmentOption } from "./BookingCalendar";

interface ApointmentOptionsListProps {
  timeOfDay: "Morning" | "Afternoon" | "Evening";
  options: ApointmentOption[];
}

class ApointmentOptionsList extends React.Component<
  ApointmentOptionsListProps,
  any
> {
  render() {
    if (!this.props.options) {
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
            {this.props.options.map((o) => {
              return <Button>{o.startAt.get("hour")}</Button>;
            })}
          </div>
        </div>
      );
    }
  }
}

export default ApointmentOptionsList;
