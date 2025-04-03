// export function getScanValidate(
//   payload: {type: string; ticketNumber: string},
//   //   token: string,
//   successCallback: (data: any) => void,
//   failureCallback: (error: any) => void,
// ) {
//   console.log('payload**** scan api called ', payload);
//   //   curl --location --request POST 'https://naturetrail.mcgm.gov.in/api/visitor/scan/entry/12345' \
//   // --header 'X-Scan-Key: NT#scan$2024@mcgm#9x8p4k2m'

import {ResponseType} from 'axios';
import {POST_API_CALL} from '../../utils/apiService';

//   // Here For Entry in API send “entry” or send “exit”
//   // Here “12345” is the code behind the barcode

//   return fetch(
//     `https://naturetrail.mcgm.gov.in/api/visitor/scan/${payload.type}/${payload.ticketNumber}`,
//     {
//       method: 'POST',
//       headers: {
//         // 'Content-type': 'application/json',
//         // 'www-authenticate': `BASIC ${token}`,
//         'X-Scan-Key': 'NT#scan$2024@mcgm#9x8p4k2mNT#scan$2024@mcgm#9x8p4k2m',
//       },
//     },
//   )
//     .then(response => response.json())
//     .then(json => {
//       console.log('response of scanIdentifier hasError', json);
//       if (json?.data?.hasError) {
//         failureCallback(json?.data);
//       } else {
//         successCallback({data: json} ?? []);
//       }
//     })
//     .catch(error => {
//       debugger;
//       console.log('error of scanIdentifier list', error);
//       failureCallback(error?.data);
//     });
// }

// import axios from 'axios';

// const BASE_URL = 'https://naturetrail.mcgm.gov.in/api/visitor/scan';

// interface ScanPayload {
//   type: 'entry' | 'exit';
//   barcode: string;
// }

// export async function scanVisitor({type, barcode}: ScanPayload) {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/${type}/${barcode}`,
//       {},
//       {
//         headers: {
//           'X-Scan-Key': 'NT#scan$2024@mcgm#9x8p4k2m',
//         },
//       },
//     );

//     console.log('Scan Success:', response.data);
//     return response.data;
//   } catch (error: any) {
//     debugger;
//     console.error('Scan Failed:', error.response?.data || error.message);
//     throw error;
//   }
// }

export const getScanData = (dataToSend: any) => {
  return new Promise<ResponseType>(resolve => {
    console.log('dataToSend@@@@', dataToSend);
    POST_API_CALL('entry', dataToSend, (response: ResponseType) => {
      resolve(response);
    });
  });
};
