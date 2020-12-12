import React from 'react'
import Banner from '../components/Banner';
import Logo from '../static/only-tree-background.jpg'
import Bella from '../static/bella.jpg'
import Benni from '../static/benni-silly.jpg'
import { Layout, BackTop, Row, Col, Image, List, Button } from 'antd';
import { UpCircleOutlined, CalendarOutlined } from '@ant-design/icons';
const { Header, Footer, Content } = Layout;

class HomePage extends React.Component {
    state = {
        current: 0,
    };

    next() {
        this.setState({
            current: this.state.current + 1
        })
    };

    prev() {
        this.setState({
            current: this.state.current - 1
        })
    };

    steps = [
        {
            title: 'First',
            content: 'First-content',
        },
        {
            title: 'Second',
            content: 'Second-content',
        },
        {
            title: 'Last',
            content: 'Last-content',
        },
    ];

    render() {
        const threeSteps = [
          "1. Book an apointment",
          "2. Bring your puppy on the selected date",
          "3. Come back when they're ready!"
        ]
        return (<>
            <Banner odd>
                <Row gutter={[24, 0]} style={{ height: '100vmin' }} justify="space-around" align="middle">
                    <Col span={24} style={{
                        height: '100vmin',
                        backgroundImage: `url(${Logo})`,
                        backgroundPosition: 'bottom',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}>
                    </Col>
                </Row>
            </Banner>
        </>);
    }
}


export default HomePage