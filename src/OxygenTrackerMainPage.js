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
  const { user } = props;
  useEffect(() => {
    loadCities();
  });

  function loadCities() {
    
  }

  function loadHospitals(cityId) {
    
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
              cityId={selectedCity}
            />
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default OxygenTrackerMainPage;
