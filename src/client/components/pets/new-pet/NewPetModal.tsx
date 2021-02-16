import React from "react";
import moment from "moment";
import PetInfo from "./PetInfo";
import PetHealthFlags from "./PetHealthFlags";
import { FileAddOutlined } from "@ant-design/icons";
import { Steps, Button, message, Card, Form, Modal } from "antd";
const { Step } = Steps;

interface PetInfoDetails {
  // general info
  name: string;
  type: string;
  gender: string;
  desexed?: boolean;
  weight?: number;
  coatColor?: string;
  birthday?: moment.Moment;
  allergies?: string;
  additionalGeneralNotes?: string;
  vaccinationRecord?: string;
  dateAdministered?: moment.Moment;
  dateNextDue?: moment.Moment;
  // health flags
  healthFlags?: Set<string>;
  additionalHealthNotes?: string;
}

interface NewPetModalState {
  current: number;
  loading: boolean;
  visible: boolean;
  petInfoDetails: PetInfoDetails;
}

class NewPetModal extends React.Component<any, NewPetModalState> {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      loading: false,
      visible: false,
      petInfoDetails: {
        name: "",
        type: "",
        gender: "",
      },
    };
  }

  next() {
    this.setState({
      current: this.state.current + 1,
    });
  }

  prev() {
    this.setState({
      current: this.state.current - 1,
    });
  }

  onFinish(values) {
    console.log("Success:", values);
  }

  onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;

    const steps = [
      {
        title: "Pet Info",
        content: (
          <PetInfo
            petInfoDetails={this.state.petInfoDetails}
            updatePetInfoDetails={((info: PetInfoDetails) =>
              this.setState({ petInfoDetails: info })).bind(this)}
          />
        ),
      },
      {
        title: "Pet Health Flags",
        content: (
          <PetHealthFlags
            petInfoDetails={this.state.petInfoDetails}
            updatePetInfoDetails={((info: PetInfoDetails) =>
              this.setState({ petInfoDetails: info })).bind(this)}
          />
        ),
      },
    ];
    return (
      <>
        <Button icon={<FileAddOutlined />} onClick={this.showModal}>
          New Pet
        </Button>
        <Modal
          visible={visible}
          title="New Pet"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered={false}
          bodyStyle={{
            height: "60vh",
            overflowY: "scroll",
          }}
          width={"90vw"}
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {this.state.current > 0 && (
                <Button onClick={() => this.prev()}>Previous</Button>
              )}
              {this.state.current < steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  Next
                </Button>
              )}
              {this.state.current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
                  Done
                </Button>
              )}
            </div>
          }
        >
          <Form
            name="basic"
            layout="vertical"
            size="middle"
            id="new-client-form-card"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Steps current={this.state.current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <br />
            <div className="steps-content">
              {steps[this.state.current].content}
            </div>
          </Form>
        </Modal>
      </>
    );
  }
}

export default NewPetModal;
export { PetInfoDetails };
