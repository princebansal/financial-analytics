import {
  Alert,
  Button,
  Col,
  Input,
  Layout,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import OxygenTrackerMainPage from "./OxygenTrackerMainPage";
const { Content, Footer, Header } = Layout;
const { Title, Text, Paragraph } = Typography;

function Home(props) {
  const { firebaseRef } = props;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    firebaseRef.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
    });
  });

  function handleLoginSubmit() {
    if (email == null || password == null || email === "" || password === "") {
      return;
    }
    setLoginLoading(true);
    firebaseRef
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        setLoginLoading(false);
        setShowLoginModal(false);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        setLoginLoading(false);
        setLoginError(true);
        setLoggedInUser(null);
        // ..
      });
  }
  function onLoginClicked() {
    if (!showLoginModal) {
      setShowLoginModal(true);
    }
  }
  function onLogoutClicked() {
    firebaseRef
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }
  function handleCancel() {
    setEmail(null);
    setPassword(null);
    setShowLoginModal(false);
  }

  return (
    <div className="App">
      <Layout>
        <Header style={{ paddingTop: "10px", height: "auto" }}>
          <Row align="middle">
            <Col xs={0} sm={0} md={8}></Col>
            <Col xs={24} sm={24} md={8}>
              <Title style={{ color: "white" }} level={3}>
                Hospital Oxygen Tracker
              </Title>
            </Col>
            <Col xs={24} sm={24} md={8}>
              {loggedInUser && (
                <Space>
                  <Text style={{ color: "white" }}>{loggedInUser.email}</Text>
                  <Button type="link" onClick={onLogoutClicked}>
                    Logout
                  </Button>
                </Space>
              )}
              {!loggedInUser && (
                <Button type="link" onClick={onLoginClicked}>
                  Login
                </Button>
              )}
            </Col>
          </Row>
          <Modal
            title="Sign in"
            visible={showLoginModal}
            onOk={handleLoginSubmit}
            confirmLoading={loginLoading}
            onCancel={handleCancel}
            okText="Login"
            okButtonProps={{
              disabled:
                email == null ||
                password == null ||
                email === "" ||
                password === "",
            }}
            cancelButtonProps={{ disabled: loginLoading }}
          >
            <Row gutter={[8, 24]}>
              <Col span={24}>
                <Input
                  htmlType="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  onPressEnter={handleLoginSubmit}
                />
              </Col>
              <Col span={24}>
                <Input.Password
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onPressEnter={handleLoginSubmit}
                />
              </Col>
              <Col span={24}>
                {loginError && (
                  <Alert
                    message="Login failed. Please try again"
                    type="error"
                  />
                )}
              </Col>
            </Row>
          </Modal>
        </Header>
        <Content>
          <div>
            <OxygenTrackerMainPage {...props} user={loggedInUser} />
          </div>
        </Content>
        <Footer>
          Maintained by Bharat Covid Relief Group <br />
          <Text type="secondary">
            LEGAL DISCLAIMER This is to inform you that this database is being
            maintained by volunteers to provide COVID related resources
            (hereinafter, the "Resources") to anyone in need. All of the
            Resources have been personally verified by our team. Our team’s
            members personally contact the entities to verify the availability
            of the Resources, and would be continuedly updated the data base.
            Although our data base is continuously updated, still there is a
            possibility that the contact of the verified entity is not reachable
            due to the fact that the Resources are limited. Our team is not
            associated with any entity mentioned in our database and received no
            benefit/gain (monetary or whatsoever) from the same. Our team shall
            not be liable in case an entity tries to sell the resources at a
            higher price than the initial said price and/or the entity does not
            deliver the Resources and/or if there is a mismatch of quantity of
            the Resources. Furthermore, any malpractices/ fraud / cheating/
            misrepresentation by an entity would not make our team liability.
            Any of the volunteers or members cannot be held liable for any
            damages suffered from the data made available. This is being solely
            from a humanitarian perspective. Please, contact or transact at your
            discretion. Kindly only make payment when you receive or verify the
            Resource/ product. Do not make any payments in advance. Our team
            would not be liable if the Resource/ product is not delivering.
          </Text>
        </Footer>
      </Layout>
    </div>
  );
}

export default Home;
