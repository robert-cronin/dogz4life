import './App.css';
import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from './components/Header';
import Banner from './components/Banner';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import Footer from './components/Footer';
import './static/style';

interface AppProps {
  
}
interface AppState {
}

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props)

  }


  componentDidMount() {
  }

  render() {
    return (
      <div className="home-page">
        <Header key="header" />
        <Banner key="banner" />
        <Page1 key="page1" />
        <Page2 key="page2" />
        <Page3 key="page3" />
        <Page4 key="page4" />
        <Footer key="footer" />
        <DocumentTitle title="凤蝶 - 移动建站平台" />
      </div>
    );
  }
}

export default App;
