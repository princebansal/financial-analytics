import { Layout, message, Select } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import OxygenTrackerResults from "./OxygenTrackerResults";
const { Content, Footer, Header } = Layout;
const { Option } = Select;

function OxygenTrackerMainPage(props) {
  const [cities, setCities] = useState({});
  const [hospitals, setHospitals] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const { user, firebaseRef } = props;
  useEffect(() => {
    loadCities();
  });

  function loadCities() {
    props.firebaseRef
      .database()
      .ref()
      .child("cities")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCities(snapshot.val());
        } else {
          setCities({});
        }
      })
      .catch((error) => {
        message.info("No data available");
        setCities({});
      });
  }

  function loadHospitals(cityId) {
    props.firebaseRef
      .database()
      .ref()
      .child("hospitals")
      .child(cityId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setHospitals(snapshot.val());
        } else {
          setHospitals({});
        }
      })
      .catch((error) => {
        console.log(error);
        message.info("No hospitals found");
        setHospitals(null);
      });
  }

  function onChange(value) {
    setSelectedCity(value);
    loadHospitals(value);
  }
  return (
    <div>
      <Layout style={{ background: "white" }}>
        <Header>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a city"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {Object.keys(cities).map((cityKey) => (
              <Option key={cityKey} value={cityKey}>
                {cities[cityKey].City}
              </Option>
            ))}
          </Select>
        </Header>
        <Content>
          {hospitals && (
            <OxygenTrackerResults
              results={hospitals}
              user={user}
              firebaseRef={firebaseRef}
              cityId={selectedCity}
            />
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default OxygenTrackerMainPage;
