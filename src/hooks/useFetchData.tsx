import { AxiosResponse } from "axios";

const useFetchData = (
  service:
    | (() => Promise<AxiosResponse<any, any>>)
    | ((id: number, data: any) => Promise<AxiosResponse<any, any>>)
    | ((data: any) => Promise<AxiosResponse<any, any>>)
    | any
) => {
  let data: any[] = [],
    error = null;
  (async () => {
    data = await service().catch((e: Error) => (error = e));
  })();
  return [data, error];
};

export default useFetchData;
