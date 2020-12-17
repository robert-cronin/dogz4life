import React from 'react'
import { Menu } from 'antd';
import {
  CalendarFilled,
  HomeFilled,
  InfoCircleFilled,
  PhoneFilled,
  CustomerServiceFilled,
} from '@ant-design/icons';
import { Link, withRouter } from "react-router-dom";

const { SubMenu } = Menu;

class Navigation extends React.Component<any, any> {
  render() {
    console.log(this.props.location.pathname)
    return (
      <Menu
        selectedKeys={[this.props.location.pathname]}
        mode="horizontal"
        multiple={false}
        className="navigation"
      >
        <Menu.Item color="white" key="/home" icon={<HomeFilled />}>
          <Link color="white" to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="/about" icon={<InfoCircleFilled />}>
          <Link to="/about"><span>About Us</span></Link>
        </Menu.Item>
        <Menu.Item key="/contact" icon={<PhoneFilled />}>
          <Link to="/contact"><span>Contact</span></Link>
        </Menu.Item>
        <Menu.Item key="/booking/new" icon={<CalendarFilled />}>
          <Link to="/booking/new"><span>Book</span></Link>
        </Menu.Item>
        <SubMenu key="services" icon={<CustomerServiceFilled />} title="Services">
          <Menu.Item key="/about/grooming" icon={<CustomerServiceFilled />}>
            <Link to="/about/grooming"><span>Grooming</span></Link>
          </Menu.Item>
          <Menu.Item key="/about/massage" icon={<CustomerServiceFilled />}>
            <Link to="/about/massage"><span>Massage</span></Link>
          </Menu.Item>
          <Menu.Item key="/about/training" icon={<CustomerServiceFilled />}>
            <Link to="/about/training"><span>Training</span></Link>
          </Menu.Item>
          <Menu.Item key="/about/nutrition" icon={<CustomerServiceFilled />}>
            <Link to="/about/nutrition"><span>Nutrition</span></Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}


export default withRouter(props => <Navigation {...props} />)