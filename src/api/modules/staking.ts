import { service } from "../services";

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
  return service.post("/api/bridge/submitWithMemo", params);
};
