import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Layout,
  List,
  message,
  Row,
  Tag,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import "./App.css";

let sampleData = require("./data.json");
const { Content, Footer, Header } = Layout;
const { Title, Text, Paragraph } = Typography;

function Home(props) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [loginError, setLoginError] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        setUploadSuccessful(true);
        setResults(sampleData);
      } else {
        setUploadSuccessful(false);
        setResults([]);
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    },
  };

  useEffect(() => {});

  return (
    <div className="App">
      <Layout>
        <Header style={{ paddingTop: "10px", height: "auto" }}>
          <Row align="middle">
            <Col xs={0} sm={0} md={8}></Col>
            <Col xs={24} sm={24} md={8}>
              <Title style={{ color: "white" }} level={3}>
                Financial analytics
              </Title>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: 20 }}>
          <div>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <div style={{ textAlign: "start" }}>
              {uploadSuccessful && (
                <List
                  grid={{ column: 1 }}
                  dataSource={results ? results : []}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <Card
                        title={
                          {
                            POS: <Tag color="success">Positive</Tag>,
                            NEG: <Tag color="error">Negative</Tag>,
                          }[item.sentiment]
                        }
                      >
                        <Divider orientation="left">Review</Divider>
                        <Paragraph
                          ellipsis={{
                            rows: 2,
                            expandable: true,
                            symbol: "more",
                          }}
                        >
                          {item.Review}
                        </Paragraph>
                        <Divider orientation="left">Positive phrases</Divider>
                        <List
                          bordered
                          dataSource={item.positivePhrases}
                          renderItem={(item1) => <List.Item>{item1}</List.Item>}
                        />
                        <Divider orientation="left">Negative phrases</Divider>

                        <List
                          bordered
                          dataSource={item.negativePharses}
                          renderItem={(item2) => <List.Item>{item2}</List.Item>}
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Home;
