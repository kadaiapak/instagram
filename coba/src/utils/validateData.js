const validateData = (data) => {
  const error = {};
  if (!data.fullname) {
    error.fullname = "please insert a fullname";
  } else if (data.fullname.length > 25) {
    error.fullname = "Only below 25 character";
  }
  if (!data.username) {
    error.username = "please add a username";
  } else if (data.username.length > 25) {
    error.username = "only below 25 character";
  }

  if (!data.email) {
    error.email = "please add a email";
  } else if (!validateEmail(data.email)) {
    error.email = "insert a correct email";
  }
  if (!data.password) {
    error.password = "please add a password";
  } else if (data.password.length < 6) {
    error.password = "your password at least 6 character";
  }

  if (!data.cfPass) {
    error.cfPass = "add confirm password";
  } else if (data.password !== data.cfPass) {
    error.cfPass = "confirm password didnt match";
  }
  return { errMsg: error, errLength: Object.keys(error).length };
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export default validateData;
