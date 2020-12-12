import React from "react";
import Navigation from "./components/Navigation";
import DocumentTitle from "react-document-title";
import { Layout, Popover, Avatar, Button, Affix } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewClientPage from "./pages/NewClientPage";
import AboutUs from "./pages/AboutUs";
import PaymentForm from "./components/PaymentForm";
import ContactFormContent from "./components/contact-form/ContactFormContent";
import ContactFormTitle from "./components/contact-form/ContactFormTitle";

const { Header, Footer, Content } = Layout;

interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Layout className="layout-window">
            <Header className="navigation">
              <Navigation />
            </Header>
          <Content className="site-content">
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route path="/about">
                <AboutUs />
              </Route>
              <Route path="/contact">
                <PaymentForm />
              </Route>
              <Route path="/booking/new">
                <NewClientPage />
              </Route>
            </Switch>
          </Content>

          <Footer id="page-footer">
            <span>Copyright ©2020 Dogz4Life. Created by FortyTwoApps.</span>
          </Footer>
        </Layout>
        <div id="contact-popover">
          <Popover
            placement="bottomLeft"
            title={<ContactFormTitle />}
            content={<ContactFormContent />}
            trigger="click"
          >
            <Avatar className="avatar" icon={<MessageOutlined />}></Avatar>
          </Popover>
        </div>
        <DocumentTitle title="Dogz4Life" />
      </Router>
    );
  }
}

export default App;
