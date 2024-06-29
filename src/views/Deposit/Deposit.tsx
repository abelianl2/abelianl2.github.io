import { Button, Form, Input, Radio } from "antd";
import { RequiredMark } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Deposit() {
  const [form] = Form.useForm();
  const navigator = useNavigate();
  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>("optional");

  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const handleBack = () => {
    navigator("/ABELStaking");
  };
  return (
    <div className="page-deposit relative flex items-center justify-center h-100%">
      <div className="flex items-center absolute left-0 top-0">
        <div className="flex items-center cursor-pointer" onClick={handleBack}>
          <i className="i-mi-arrow-left font-size-24px mr-8px"></i>{" "}
          <span className="font-size-16px">Staking</span>
        </div>
      </div>
      <div className="max-w-840px min-w-500px w-100%">
        <div className="font-size-30px mb-20px">Deposit ABEL to get QDAY</div>
        <div>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ requiredMarkValue: requiredMark }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
          >
            <div className="flex">
              <div className="flex-1">
                <Form.Item label="From Network" required>
                  <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item label="From Address">
                  <Input placeholder="Enter address" />
                </Form.Item>
                <Form.Item label="Amount of Abel to deposit">
                  <Input placeholder="Enter the amount of ABEL you will deposit for Qday" />
                </Form.Item>
              </div>
              <div className="flex flex-col justify-around mx-18px">
                <i className="i-mi-arrow-right font-size-24px"></i>
                <i className="i-mi-arrow-right font-size-24px"></i>
                <i className="i-mi-arrow-right font-size-24px"></i>
              </div>
              <div className="flex-1">
                <Form.Item label="To Network" required>
                  <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item label="To Address">
                  <Input placeholder="Enter address" />
                </Form.Item>
                <Form.Item label="Amount of Qday to Receive">
                  <Input placeholder="Enter Amount of Qday to Receive" />
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Form.Item>
                <Button type="primary">Generate QR Code for Abelian Pro</Button>
              </Form.Item>
            </div>
          </Form>
          <div className="code-box flex justify-center items-center">
            <div>
              <div></div>
              <div className="font-size-14px w-320px text-center">
                Please use Abelian Pro to scan this QR Code and submit the
                transaction.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
