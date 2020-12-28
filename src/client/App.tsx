import React from "react";
import Menu from "./components/menu/Menu";
import DocumentTitle from "react-document-title";
import { Layout, Popover, Avatar, Button, Affix, Result } from "antd";
import { MessageOutlined, CloseOutlined } from "@ant-design/icons";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewClientPage from "./pages/NewClientPage";
import AboutUs from "./pages/AboutUs";
import PaymentForm from "./components/PaymentForm";
import ContactFormContent from "./components/contact-form/ContactFormContent";
import ContactFormTitle from "./components/contact-form/ContactFormTitle";

const { Header, Footer, Content } = Layout;

interface AppProps {}
interface AppState {
  contactFormVisible: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      contactFormVisible: false,
    };
  }

  render() {
    return (
      <Router>
        <Layout className="layout-window">
          <Header id="page-header">
            <Menu />
          </Header>
          <Content id="page-content">
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/">
                <Redirect push to="/home" />
              </Route>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route path="/about">
                <AboutUs />
              </Route>
              <Route path="/contact">
                <PaymentForm />
              </Route>
              <Route path="/booking">
                <NewClientPage />
              </Route>
              <Route path="*">
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={
                    <Button type="primary">
                      <Link to="/home">Back Home</Link>
                    </Button>
                  }
                />
              </Route>
            </Switch>
          </Content>

          <Footer id="page-footer">
            <span>Copyright ©2020 Dogz4Life. Created by FortyTwoApps.</span>
          </Footer>
          <div id="contact-popover">
            <Popover
              placement="bottomLeft"
              title={<ContactFormTitle />}
              content={<ContactFormContent />}
              trigger="click"
              onVisibleChange={(visible) => {
                this.setState({ contactFormVisible: visible });
              }}
            >
              <Avatar
                className="avatar"
                icon={
                  this.state.contactFormVisible ? (
                    <CloseOutlined />
                  ) : (
                    <MessageOutlined />
                  )
                }
              ></Avatar>
            </Popover>
          </div>
          <DocumentTitle title="Dogz4Life" />
        </Layout>
      </Router>
    );
  }
}

export default App;
