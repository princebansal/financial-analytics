import {
  Col,
  Row,
  Typography,
  Divider,
  Tooltip,
  Button,
  Modal,
  InputNumber,
  Space,
  Input,
  Alert,
  message,
} from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import { EditOutlined } from "@ant-design/icons";
const { Title, Paragraph, Text, Link } = Typography;

function HospitalResultItem(props) {
  const { data, user, hospitalId, cityId } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [currentOxygen, setCurrentOxygen] = useState(data.oxygen.current);
  const [totalCapacity, setTotalCapacity] = useState(data.oxygen.required);
  const [comments, setComments] = useState(data.oxygen.comment);
  const [editError, setEditError] = useState(false);
  useEffect(() => {
    if (user) {
      const { owners = [] } = data;
      if (owners.includes(user.uid)) {
        setShowEdit(true);
      } else {
        setShowEdit(false);
      }
    } else {
      setShowEdit(false);
    }
  });

  function onEditClicked() {
    if (!showEditModal) {
      setShowEditModal(true);
    }
  }

  function handleEditSubmit() {
    if (currentOxygen == null || totalCapacity == null) {
      return;
    }
    setEditLoading(true);
    
    
  }
  function handleCancel() {
    setTotalCapacity(data.oxygen.required);
    setCurrentOxygen(data.oxygen.current);
    setComments(data.oxygen.comment);
    setShowEditModal(false);
  }

  return (
    data && (
      <div style={{ width: "100%" }}>
        {showEdit && (
          <Row>
            <Col span={2} offset={22}>
              <Tooltip title="Update">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={onEditClicked}
                />
              </Tooltip>
            </Col>
            <Modal
              title="Update details"
              visible={showEditModal}
              onOk={handleEditSubmit}
              confirmLoading={editLoading}
              onCancel={handleCancel}
              okText="Update"
              okButtonProps={{
                disabled: currentOxygen == null || totalCapacity == null,
              }}
              cancelButtonProps={{ disabled: editLoading }}
            >
              <Row gutter={[8, 24]}>
                <Col span={24}>
                  <Space direction="vertical">
                    <Text>Available Oxygen</Text>
                    <InputNumber
                      style={{ width: 300 }}
                      placeholder="Enter available oxygen"
                      min={0}
                      max={totalCapacity}
                      value={currentOxygen}
                      onChange={(value) => setCurrentOxygen(value)}
                    />
                  </Space>
                </Col>
                <Col span={24}>
                  <Space direction="vertical">
                    <Text>Total Required Oxygen</Text>
                    <InputNumber
                      style={{ width: 300 }}
                      placeholder="Enter required oxygen"
                      min={currentOxygen}
                      max={100000}
                      value={totalCapacity}
                      onChange={setTotalCapacity}
                    />
                  </Space>
                </Col>
                <Col span={24}>
                  <Space direction="vertical">
                    <Text>Comments</Text>
                    <Input
                      style={{ width: 300 }}
                      placeholder="(Enter comments if any)"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </Space>
                </Col>
                <Col span={24}>
                  {editError && (
                    <Alert
                      message="Update failed. Please try again"
                      type="error"
                    />
                  )}
                </Col>
              </Row>
            </Modal>
          </Row>
        )}
        <Row>
          <Col xs={24} sm={24} md={12}>
            <Title level={4}>{data.name}</Title>
            <Text strong={true}>Address</Text>
            <Paragraph>
              {data.address + " "}{" "}
              <Link href={data.maps_link} target="_blank">
                Map
              </Link>
            </Paragraph>
            <Text strong={true}>Contact</Text>
            <Paragraph>{data.contact.join(" | ")} </Paragraph>
          </Col>
          <Col xs={24} sm={24} md={12} style={{ marginBottom: 0 }}>
            <Paragraph strong={true}>Oxygen (in Litres)</Paragraph>
            <Title level={3}>
              {data.oxygen.current + " / " + data.oxygen.required}
            </Title>
            {data.oxygen.comment && data.oxygen.comment.length > 0 && (
              <Paragraph>{data.oxygen.comment}</Paragraph>
            )}
          </Col>
        </Row>
        <Row justify="start">
          <Col span={24}>
            <Text strong={true}>Last updated: </Text>
            <Text underline={true}> {data.oxygen.lastUpdated}</Text>
          </Col>
        </Row>
      </div>
    )
  );
}

export default HospitalResultItem;
