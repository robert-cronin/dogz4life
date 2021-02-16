import React from "react";
import { Avatar, Card, Skeleton } from "antd";
import { PetInfo } from "../../pages/Pets";
import FluffyDog from "../static/fluffy-dog.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";

interface PetSummaryProps {
  petInfo: PetInfo;
  onEditClick: (id: string) => void;
}

class PetSummary extends React.Component<PetSummaryProps, any> {
  constructor(props: PetSummaryProps | Readonly<PetSummaryProps>) {
    super(props);
  }

  render() {
    const { petInfo } = this.props;
    return (
      <Card
        style={{ margin: 5, flex: "1 1 0px", minWidth: "200px" }}
        actions={[
          <EditOutlined key="edit" />,
          <DeleteOutlined key="delete" style={{ color: "red" }} />,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={petInfo.name}
            description={petInfo.type}
          />
        </Skeleton>
      </Card>
    );
  }
}

export default PetSummary;
