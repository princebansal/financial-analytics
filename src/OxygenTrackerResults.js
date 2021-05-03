import { Col, List, Row, Typography, Input, Space } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import HospitalResultItem from "./HospitalResultItem";
const { Title } = Typography;
const { Search } = Input;

function OxygenTrackerResults(props) {
  const { results, user, firebaseRef, cityId } = props;
  const [filteredResults, setFilteredResults] = useState(null);

  function onSearch(value) {
    if (value && value.length > 0) {
      const filteredKeys = Object.keys(results).filter((item) =>
        results[item].name.toUpperCase().startsWith(value.toUpperCase())
      );
      setFilteredResults(filteredKeys);
    }else{
      setFilteredResults(null);
    }
  }
  return (
    results && (
      <Space
        style={{ textAlign: "start", padding: "10px", width: "100%" }}
        direction="vertical"
      >
        <Row>
          <Col span={24} style={{ textAlign: "end" }}>
            <Search
              placeholder="Enter hospital name"
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </Col>
        </Row>

        <List
          size="large"
          header={<Title level={3}>Hospitals</Title>}
          bordered
          dataSource={filteredResults ? filteredResults : Object.keys(results)}
          renderItem={(item) => (
            <List.Item>
              <HospitalResultItem
                firebaseRef={firebaseRef}
                data={results[item]}
                hospitalId={item}
                user={user}
                cityId={cityId}
              />
            </List.Item>
          )}
        />
      </Space>
    )
  );
}

export default OxygenTrackerResults;
