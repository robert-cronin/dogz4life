import React from "react";
import moment, {duration} from 'moment';
import { Calendar } from "antd";

interface BookingCalendarListState {
}

class BookingCalendar extends React.Component<any, BookingCalendarListState> {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    // fetch("/api/catalog/list")
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result);

    //       this.setState({
    //         isLoaded: true,
    //         items: result
    //         .filter(i => {
    //           return i.type == "ITEM"
    //         })
    //         .map(i => {
    //           console.log(i);

    //           const item: CatalogItemOptions = {
    //             id: i.id ?? "",
    //             title: i.itemData?.name ?? "",
    //             description: i.itemData?.description ?? "",
    //             checked: false,
    //             options: [],
    //             selectedOptionIndex: 0,
    //           };
    //           return item;
    //         }),
    //       });
    //     },
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error,
    //       });
    //     }
    //   );
  }

  render() {
    return (
        <div 
        style={{
            width: '80vw'
        }}>
            <Calendar fullscreen={false} validRange={[moment(), moment().add(5, 'days')]}/>
        </div>
    );
  }
}

export default BookingCalendar;
