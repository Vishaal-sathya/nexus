import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:8800/api/"
    : ["172.16.59.85", "172.16.59.30"].includes(window.location.hostname)
    ? `http://${window.location.hostname}:8800/api/`
    : "http://172.16.59.85:8800/api/";


const newRequest = axios.create({
  baseURL,
  withCredentials: true,
});


export default newRequest;
