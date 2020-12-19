import clsx from "clsx";
import React from "react";
import { Button } from "antd";
import {
  CalendarFilled,
  HomeFilled,
  InfoCircleFilled,
  PhoneFilled,
  CustomerServiceFilled,
  MenuOutlined,
  CloseOutlined,
  LoginOutlined
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import MenuButton from "./MenuButton";

interface NavigationProps {
  location: any;
}

interface NavigationState {
  isOpen: boolean;
}

class Menu extends React.Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps | Readonly<NavigationProps>) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleCloseButtonClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault();
    this.setState({ isOpen: false });
  }

  handleOpenButtonClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault();
    this.setState({ isOpen: true });
  }

  handleButtonClick() {
    this.setState({ isOpen: false });
  }

  render() {
    const navClass = clsx(
      "nav-menu-container",
      this.state.isOpen ? "nav-open" : "nav-closed"
    );
    return (
      <>
        <Button
          type="link"
          id="open-button"
          onClick={(e) => this.handleOpenButtonClick(e)}
          icon={<MenuOutlined />}
        />
        <div className={navClass}>
          <MenuButton
            icon={<HomeFilled />}
            text="Home"
            route="/home"
            onButtonClick={() => this.handleButtonClick()}
          />
          <MenuButton
            icon={<InfoCircleFilled />}
            text="About Us"
            route="/about"
            onButtonClick={() => this.handleButtonClick()}
          />
          <MenuButton
            icon={<PhoneFilled />}
            text="Contact"
            route="/contact"
            onButtonClick={() => this.handleButtonClick()}
          />
          <MenuButton
            icon={<CalendarFilled />}
            text="Book"
            route="/booking"
            onButtonClick={() => this.handleButtonClick()}
          />
          <MenuButton
            icon={<CustomerServiceFilled />}
            text="Services"
            route="/services"
            onButtonClick={() => this.handleButtonClick()}
          />
          <hr />
          <div id="pc-menu-spacer" />
          <MenuButton
            icon={<LoginOutlined />}
            text="Login/Signup"
            route="/signup"
            onButtonClick={() => this.handleButtonClick()}
          />
          <Button
            type="link"
            id="close-button"
            onClick={(e) => this.handleCloseButtonClick(e)}
            icon={<CloseOutlined />}
          />
        </div>
      </>
    );
  }
}

export default withRouter((props) => <Menu {...props} />);
