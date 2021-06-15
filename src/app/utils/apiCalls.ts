/* eslint-disable no-console */
import axios, { AxiosResponse, AxiosError } from "axios";
import {
  stageApiKey,
  stageApiUrl,
  localDevURL,
  prodApiUrl,
  prodApiKey,
} from "./constants";
import { Logger } from "./logger";

type ApiResponse = {
  code: number;
  data: any;
};

async function GetStackDetails(
  requestId: string,
  uuid: string,
): Promise<ApiResponse> {
  const result: ApiResponse = { code: 0, data: {} };
  const url = `${prodApiUrl}/api/v2/stack-analyses/${requestId}?user_key=${prodApiKey}`;
  Logger.log(url);
  await getStatus(uuid).then(async (value) => {
    const config = value;
    console.log(config);
    const devUrl = localDevURL;
    await axios
      .get(url, config)
      .then((res: AxiosResponse) => {
        result.code = res.status;
        result.data = res.data;
      })
      .catch((err) => {
        Logger.log(err);
        result.code = err.response.status;
        result.data = err.response.data;
      });
  });
  return result;
}

async function getStatus(uuid: string) {
  const url = `${prodApiUrl}/user/${uuid}?user_key=${prodApiKey}`;
  localStorage.setItem("UUID", uuid);
  let result = {};
  await axios
    .get(url)
    .then((res: AxiosResponse) => {
      console.log("hello ".concat(res.status.toString()));
      const statusCode = res.status;
      const data = res.data.status;
      if (statusCode === 200 && data === "REGISTERED") {
        result = {
          headers: {
            UUID: uuid,
          },
        };
      }
    })
    .catch((err: AxiosError) => {
      console.log(err.response);
    });
  return result;
}

type Register = {
  code: number;
  data: any;
};

async function RegisterUser(
  snykToken: string,
  uuid: string,
): Promise<Register> {
  const data = {
    snyk_api_token: snykToken,
    user_id: uuid,
  };
  let result: Register = { code: 0, data: {} };
  const url = `${prodApiUrl}/user?user_key=${prodApiKey}`;
  await axios
    .put(url, data)
    .then((res: AxiosResponse) => {
      result = {
        code: res.status,
        data: res.data,
      };
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        result = {
          code: error.response.status,
          data: error.response.data,
        };
        console.log(error.response.data);
        console.log(error.response.status);
      }
    });
  return result;
}

async function submitFeedback(data: any, feedback: boolean, name: string) {
  const urlFeedback = `${stageApiUrl}/api/v1/submit-feedback?user_key=${stageApiKey}`;
  axios({
    method: "post",
    url: urlFeedback,
    headers: { "Content-Type": "application/json" },
    data: {
      stack_id: localStorage.getItem("requestId"),
      recommendation_type: "companion",
      package_name: name,
      feedback_type: feedback,
      ecosystem: data.ecosystem,
    },
  }).then((response) => {
    console.log(response);
  });
}

export { GetStackDetails, RegisterUser, submitFeedback };
