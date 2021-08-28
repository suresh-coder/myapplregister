import axios from "axios";
import { apiURL } from "../constant/constant.js"


function errorHandler(reject, error) {
  // eslint-disable-next-line
  console.dir(error);
  reject("operation failed");
}

function getDashBoard(
) {
  return new Promise(function onThen(resolve, reject) {
    axios
      .get(
        `${apiURL}users.json`,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded", },
        }
      )
      .then(function (response) {
        if (response != null) {
          return resolve(response.data);
        }
      })
      .catch(function (error) {
        errorHandler(reject, error);
        return null;
      });
  });
}


function getUserProfile() {
  return new Promise(function onThen(resolve, reject) {
    axios
      .get(
        `${apiURL}user-profile.json`,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded", },
        }
      )
      .then(function (response) {
        if (response != null) {
          return resolve(response.data);
        }
      })
      .catch(function (error) {
        errorHandler(reject, error);
        return null;
      });
  });
}

const dataService = {
  getDashBoard,
  getUserProfile
};


export default dataService;
