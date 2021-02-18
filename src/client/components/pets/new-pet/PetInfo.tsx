import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Row,
  Col,
} from "antd";
import { PetInfoDetails } from "./NewPetModal";
const { Option } = Select;

interface PetInfoProps {
  petInfoDetails: PetInfoDetails;
  updatePetInfoDetails: (info: PetInfoDetails) => void;
}

class PetInfo extends React.Component<PetInfoProps, any> {
  render() {
    return (
      <>
        <Row gutter={50}>
          <Col span={24}>
            <Form.Item
              label="Pet Name"
              name="petname"
              rules={[
                { required: true, message: "Please input your pets name" },
              ]}
            >
              <Input
                value={this.props.petInfoDetails.name}
                onChange={(e) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    name: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Pet Type"
              name="pettype"
              rules={[
                { required: true, message: "Please select your pets type" },
              ]}
            >
              <Select
                placeholder="Select Type"
                value={this.props.petInfoDetails.type}
                onChange={(value, option) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    type: value,
                  })
                }
              >
                <Option value="Dog">Dog</Option>
                <Option value="Cat">Cat</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Pet Gender"
              name="petgender"
              rules={[
                { required: true, message: "Please select your pets gender" },
              ]}
            >
              <Select
                placeholder="Select Gender"
                value={this.props.petInfoDetails.gender}
                onChange={(value, option) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    gender: value,
                  })
                }
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Is she/he Desexed?" name="desexed">
              <Switch
                checked={this.props.petInfoDetails.desexed}
                onChange={(value) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    desexed: value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <InputNumber
                value={this.props.petInfoDetails.weight}
                onChange={(value) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    weight: value as number,
                  })
                }
              />{" "}
              kg
            </Form.Item>
            <Form.Item label="Coat Color" name="coatcolor">
              <Input
                value={this.props.petInfoDetails.coatColor}
                onChange={(e) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    coatColor: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Birthday" name="birthday">
              <DatePicker
                value={this.props.petInfoDetails.birthday}
                onChange={(value) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    birthday: value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Allergies" name="allergies">
              <Input.TextArea
                rows={7}
                value={this.props.petInfoDetails.allergies}
                onChange={(e) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    allergies: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Additional Notes" name="additionalnotes">
              <Input.TextArea
                rows={7}
                value={this.props.petInfoDetails.additionalGeneralNotes}
                onChange={(e) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    additionalGeneralNotes: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Vaccination Record" name="vaccinationrecord">
              <Select
                placeholder="Select Type"
                value={this.props.petInfoDetails.vaccinationRecord}
                onChange={(value, option) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    vaccinationRecord: value,
                  })
                }
              >
                <Option value="Rabies">Rabies</Option>
                <Option value="Bordetella">Bordetella</Option>
                <Option value="Leptospirosis">Leptospirosis</Option>
                <Option value="CanineC3">Canine C3</Option>
                <Option value="CanineC4">Canine C4</Option>
                <Option value="CanineC5">Canine C5</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date Administered" name="vaccinedateadministered">
              <DatePicker 
                value={this.props.petInfoDetails.dateAdministered}
                onChange={(value) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    dateAdministered: value,
                  })
                }/>
            </Form.Item>
            <Form.Item label="Next Due" name="vaccinenextdue">
              <DatePicker 
                value={this.props.petInfoDetails.dateNextDue}
                onChange={(value) =>
                  this.props.updatePetInfoDetails({
                    ...this.props.petInfoDetails,
                    dateNextDue: value,
                  })
                }/>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }
}

export default PetInfo;
