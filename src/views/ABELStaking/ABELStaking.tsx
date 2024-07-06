import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { submitWithMemo } from "../../api/modules/staking";
import { lockUpPeriod } from "../../const/enum";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
export default function ABELStaking() {
  const [form] = Form.useForm();
  // const navigator = useNavigate();
  // const handleBack = () => {
  //   navigator("/QdayStaking");
  // };
  const { address } = useWeb3ModalAccount();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields({ validateOnly: true });
      setLoading(true);
      const data = await submitWithMemo({
        ...formData,
        lockupPeriod: formData.lockupPeriod,
      });
      setCode(JSON.stringify(data));
      form.resetFields();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: number) => {
    const v = lockUpPeriod.find((item) => item.value === e);
    form.setFieldValue("rewardRatio", v?.ratio);
  };
  return (
    <div className="page-deposit relative flex items-center justify-center h-100%">
      <div className="max-w-840px min-w-500px w-100%">
        <div className="font-size-30px mb-20px">Deposit ABEL to get QDAY</div>
        <div>
          <Form form={form} layout="vertical" name="validateOnly">
            <div className="flex">
              <div className="flex-1">
                <Form.Item
                  label="From Network"
                  name="from_network"
                  rules={[{ required: false }]}
                  initialValue="Abelian Testnetwork"
                >
                  <Input readOnly placeholder="input placeholder" />
                </Form.Item>
                <Form.Item
                  name="from_address"
                  label="From Address"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter address" />
                </Form.Item>
              </div>
              <div className="flex flex-col justify-around mx-18px">
                <i className="i-mi-arrow-right font-size-24px"></i>
                <i className="i-mi-arrow-right font-size-24px"></i>
              </div>
              <div className="flex-1">
                <Form.Item
                  name="to_network"
                  label="To Network"
                  initialValue="Qday Testnetwork"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="Input To Network" readOnly />
                </Form.Item>
                <Form.Item
                  name="to_address"
                  label="To Address"
                  rules={[{ required: true }]}
                  initialValue={address}
                >
                  <Input placeholder="Enter address" />
                </Form.Item>
              </div>
            </div>
            <div>
              <Form.Item
                name="amount"
                label="Amount of Abel to deposit"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Enter the amount of ABEL you will deposit for Qday"
                  type="number"
                />
              </Form.Item>
            </div>
            {/* lockupPeriod  rewardRatio */}
            <div className="flex justify-between">
              <div className="w-45%">
                <Form.Item
                  name="lockupPeriod"
                  label="Lock-up period"
                  rules={[
                    {
                      required: true,
                      message: "Please select the lock-up period",
                    },
                  ]}
                >
                  <Select
                    options={lockUpPeriod}
                    onChange={handleChange}
                    placeholder="Select a period"
                  ></Select>
                </Form.Item>
              </div>
              <div className="w-45%">
                <Form.Item
                  name="rewardRatio"
                  label="Reward ratio"
                  rules={[
                    {
                      required: true,
                      message: "Please select the lock-up period",
                    },
                  ]}
                >
                  <Input readOnly></Input>
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-center items-center my-10px">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Generate QR Code for Abelian Pro
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div className="code-box flex justify-center items-center">
            {code ? (
              <div>
                <div className="flex justify-center items-center mb-10px">
                  <div className="border-6px border-solid border-white flex items-center justify-center">
                    <QRCodeSVG value={code} size={140} level="L" />
                  </div>
                </div>
                <div className="font-size-14px w-320px text-center">
                  Please use Abelian Pro to scan this QR Code and submit the
                  transaction.
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
