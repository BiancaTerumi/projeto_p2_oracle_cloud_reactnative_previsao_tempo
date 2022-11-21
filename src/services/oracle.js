import axios from "axios";

export const oracle = axios.create({
    baseURL: "https://ge632f5cf74f03d-mylittletime.adb.sa-saopaulo-1.oraclecloudapps.com/"
});
