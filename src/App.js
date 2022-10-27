import './App.css';
import React from 'react';
import Scraper from './js/pages/scraper';
import ModelScraper from './js/pages/partsFromModel';
import { Layout, Tabs } from 'antd';
import { CopyrightCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;

function App() {

  const items = [
    {
      label: "Parts",
      key: 1,
      children: <Scraper />
    },
    {
      label: "Model",
      key: 2,
      children: <ModelScraper />
    }
  ]

  return (
    < Layout >
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>

      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Tabs defaultActiveKey="2" items={items} />
      </Content>
      <Footer style={{ textAlign: 'center' }} >
        Copyright <CopyrightCircleOutlined /> Atlantic Appliance Inc. All Rights Reserved.
      </Footer>
    </Layout >


    //     Copyright <CopyrightCircleOutlined /> Atlantic Appliance Inc. All Rights Reserved.
  );
}

export default App;
