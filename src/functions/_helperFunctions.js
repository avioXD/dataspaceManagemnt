import * as CryptoJS from "crypto-js";
export const oF = (obj) => {
  let formData = new FormData();
  Object.keys(obj).map((item) => formData.append(item, obj[item]));
  return formData;
};

export const getEncryptString = (message) => {
  // return message
  if (message) {
    return CryptoJS.AES.encrypt(message, process.env.WEB_SALT).toString();
  } else {
    return "";
  }
};
export const getDecryptString = (message) => {
  if (message) {
    const bytes = CryptoJS.AES.decrypt(message, process.env.WEB_SALT);
    const res = bytes.toString(CryptoJS.enc.Utf8);
    console.log(res);
    return res;
  } else {
    return "";
  }
};

export const addHours = (numOfHours, date = new Date()) => {
  const dateCopy = new Date(date.getTime());
  dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);
  return dateCopy;
};

export const validateEncryptedToken = (token) => {
  let preToken = JSON.parse(getDecryptString(token));
  if (new Date().getTime() > new Date(preToken.exp)) return preToken.token;
  else return "";
};
export const createEncryptToken = (token, exp) => {
  return getEncryptString(
    JSON.stringify({
      token: token,
      exp: addHours(exp),
    })
  );
};
export const collectionCount = (arr, param, qur) => {
  // console.log("pre", arr);
  let newArr = [];
  arr.forEach((ele) => {
    if (ele[param] == qur) newArr.push(ele);
  });
  // console.log("new", newArr);
  return newArr.length;
};
