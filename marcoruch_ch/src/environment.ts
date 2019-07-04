const API_HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/"
    : process.env.NODE_ENV === "production"
    ? "https://marcoruch.ch:5000/"
    : "http://localhost:5000/";


    // API
    console.log("API HOST SET AS" + API_HOST);
export default API_HOST;
