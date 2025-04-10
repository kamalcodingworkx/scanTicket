// import axios from "axios";

// const BASE_URL = "https://naturetrail.mcgm.gov.in/api/visitor/scan";

// interface ScanParams {
//     type: "entry" | "exit";
//     barcode: string;
// }

// export function scanVisitor({ type, barcode }: ScanParams) {

//     axios.post(`${BASE_URL}/${type}/${barcode}`, null, {
//         headers: {
//             "X-Scan-Key": "NT#scan$2024@mcgm#9x8p4k2m",
//         },
//     })
// }


// import axios from "axios";

// const BASE_URL = "https://naturetrail.mcgm.gov.in/api/visitor/scan";

// interface ScanParams {
//     type: "entry" | "exit";
//     barcode: string;
// }

// export async function scanVisitor({ type, barcode }: ScanParams) {
//     try {
//         console.log("Scanning:", `${BASE_URL}/${type}/${barcode}`);

//         const response = await axios.post(`${BASE_URL}/${type}/${barcode}`, null, {
//             headers: {
//                 "X-Scan-Key": "NT#scan$2024@mcgm#9x8p4k2m",
//             },
//         });

//         console.log("API Response:", response.data);
//         return response.data;
//     } catch (error: any) {
//         console.error("API Error:", error.response?.data || error.message);
//         throw error;
//     }
// }

import axios from "axios";

const BASE_URL = "https://naturetrail.mcgm.gov.in/api/visitor/scan";

interface ScanPayload {
    type: "entry" | "exit";
    barcode: string;
}

export async function scanVisitor({ type, barcode }: ScanPayload) {
    try {
        const response = await axios.post(`${BASE_URL}/${type}/${barcode}`, null, {
            headers: {
                "X-Scan-Key": "NT#scan$2024@mcgm#9x8p4k2m",
            },
        });

        console.log("Scan Success:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("Scan Failed:", error.response?.data || error.message);
        throw error;
    }
    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         console.log("response text of api", this.responseText);
    //     }
    // });
    // xhr.open("POST", "https://naturetrail.mcgm.gov.in/api/visitor/scan/entry/12345");
    // xhr.setRequestHeader("X-Scan-Key", "NT#scan$2024@mcgm#9x8p4k2m");
    // xhr.send();
}
