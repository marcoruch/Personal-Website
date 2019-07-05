const API_HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000/"
    : process.env.NODE_ENV === "production"
    ? "https://marcoruchch-backend.firebaseapp.com/"
    : "http://localhost:9000/";


    // API
    console.log("API HOST SET AS" + API_HOST);
export default API_HOST;
