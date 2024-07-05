import { service } from "../services";
const API_PATH =
  import.meta.env.VITE_ENV === "DEV"
    ? "/api"
    : "https://deposit-test.qday.ninja:9002";
export type SubmitWithMemoParams = {
  from_network: string;
  to_network: string;
  from_address: string;
  to_address: string;
  amount: string;
};
export type SubmitWithMemoResponse = {
  redirect: string;
};
export const submitWithMemo = (
  params: SubmitWithMemoParams
): Promise<SubmitWithMemoResponse> => {
  return service.post(`${API_PATH}/bridge/submitWithMemo`, params);
};
