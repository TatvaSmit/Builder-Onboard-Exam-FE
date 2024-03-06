import axios, { AxiosError } from "axios";
import _ from "lodash";

const apiCall = async (service: any) => {
  try {
    const response = await service();
    return { response: response, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      console.log(error);
      return {
        response: null,
        error: {
          data: _.get(axiosError, "response.data", "unknown error occured"),
          code: _.get(axiosError, "response.status", 500),
          statusText: _.get(axiosError, "response.statusText", "unknown error"),
        },
      };
    }
    return { response: null, error: error };
  }
};

export default apiCall;
