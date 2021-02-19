import clsx from "clsx";
import React from "react";
import { Button, Avatar } from "antd";
import {
  CalendarFilled,
  HomeFilled,
  InfoCircleFilled,
  PhoneFilled,
  CustomerServiceFilled,
  MenuOutlined,
  CloseOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import MenuButton from "./MenuButton";
import UserDropdown from "../user/UserDropdown";

interface NavigationProps {
  location: any;
}

interface NavigationState {
  isOpen: boolean;
  loggedIn: boolean;
  userProfile?: any;
}

class Menu extends React.Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps | Readonly<NavigationProps>) {
    super(props);
    this.state = {
      isOpen: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    fetch("/site/user")
      .then((res) => res.json())
      .then(
        (userProfile) => {
          if (userProfile.id) {
            this.setState({
              loggedIn: true,
              userProfile
            });
          }
        },
        (error) => {
          console.log("error");
          console.log(error);
        }
      );
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
          id="open-menu-button"
          onClick={(e) => this.handleOpenButtonClick(e)}
          icon={<MenuOutlined />}
        />
        <div
          className={navClass}
          style={{
            display: "static",
          }}
        >
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
          {(this.state.loggedIn && this.state.userProfile) ? (
            <UserDropdown userProfile={this.state.userProfile} />
          ) : (
            <MenuButton
              icon={<LoginOutlined />}
              text="Login/Signup"
              route=""
              onButtonClick={() => {
                this.handleButtonClick();
                window.location.replace('/site/login')
              }}
            />
          )}
          <Button
            type="link"
            id="close-menu-button"
            onClick={(e) => this.handleCloseButtonClick(e)}
            icon={<CloseOutlined />}
          />
        </div>
      </>
    );
  }
}

export default withRouter((props) => <Menu {...props} />);
