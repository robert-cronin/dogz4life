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

interface PetInfoDetailsBody {
  name: string;
  type: string;
  gender: string;
  desexed?: number;
  weight?: number;
  coatColor?: string;
  birthday?: string;
  allergies?: string;
  additionalGeneralNotes?: string;
  vaccinationRecord?: string;
  dateAdministered?: string;
  dateNextDue?: string;
  healthFlags?: string;
  additionalHealthNotes?: string;
}

interface NewPetModalState {
  current: number;
  isLoading: boolean;
  error?: string;
  visible: boolean;
  petInfoDetails: PetInfoDetails;
}

class NewPetModal extends React.Component<any, NewPetModalState> {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      isLoading: false,
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

  onFinish() {
    this.setState({isLoading: true})

    const details = this.state.petInfoDetails;

    message.success("Processing complete!");
    const newPetRequest: PetInfoDetailsBody = {
      name: details.name,
      type: details.type,
      gender: details.gender,
      desexed: details.desexed ? 1 : 0,
      weight: details.weight,
      coatColor: details.coatColor,
      birthday: details.birthday?.toISOString(),
      allergies: details.allergies,
      additionalGeneralNotes: details.additionalGeneralNotes,
      vaccinationRecord: details.vaccinationRecord,
      dateAdministered: details.dateAdministered?.toISOString(),
      dateNextDue: details.dateNextDue?.toISOString(),
      healthFlags: details.healthFlags
        ? window.btoa(JSON.stringify(Array.from(details.healthFlags.values())))
        : undefined,
      additionalHealthNotes: details.additionalHealthNotes,
    };

    fetch("/api/pets/new", {
      body: JSON.stringify(newPetRequest),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("pet");
          console.log(result);
          console.log("pet");

          this.setState({
            isLoading: false,
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            error,
          });
        }
      );
  }

  onFinishFailed(errorInfo) {
    message.error("Processing complete!");
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, isLoading: loading } = this.state;

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
                <Button type="primary" onClick={() => this.onFinish()}>
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
export { PetInfoDetails,PetInfoDetailsBody };
