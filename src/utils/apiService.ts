import axios from 'axios';

const $http = axios.create({
  timeout: 30000,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
});

$http.interceptors.request.use(async config => {
  config.baseURL = `https://naturetrail.mcgm.gov.in/api/visitor/scan`;
  debugger;
  if (config.headers) {
    config.headers['X-Scan-Key'] = 'NT#scan$2024@mcgm#9x8p4k2m';

    return config;
    // debugger;
  }
  return config;
});

const successCodes = [200, 201];
debugger;
export const POST_API_CALL = (
  endPoint: string,
  params: object,
  callback: Function,
) => {
  console.log('params', params);
  $http
    .post(endPoint, params)
    .then((response: any) => {
      debugger;
      console.log('response', response);
      if (
        //success code handling
        response &&
        response?.status &&
        successCodes.includes(response?.status)
      ) {
        callback({
          isSuccess: true,
          data: response?.data?.data || response?.data,
        });
      } else {
        callback({isSuccess: false, data: response?.data});
      }
    })
    .catch((error: any) => {
      debugger;
      if (error?.message?.includes('401')) {
        callback({isSuccess: false, data: {}});
      }
      if (
        error?.message?.includes('403') //Session expire
      ) {
        callback({isSuccess: false, data: {}});
      } else {
        callback({isSuccess: false, data: {}});
      }
    });
};

export const GET_API_CALL = (endPoint: string, callback: Function) => {
  $http
    .get(endPoint)
    .then((response: any) => {
      if (
        response &&
        response?.status &&
        successCodes.includes(response?.status)
      ) {
        callback({
          isSuccess: true,
          data: response?.data?.data || response?.data,
        });
      } else {
        callback({isSuccess: false, data: response?.data});
      }
    })
    .catch((error: any) => {
      if (error?.message?.includes('401')) {
        callback({isSuccess: false, data: {}});
      }
      if (
        error?.message?.includes('403') //Session expire
      ) {
        callback({isSuccess: false, data: {}});
      } else {
        callback({isSuccess: false, data: {}});
      }
    });
};
