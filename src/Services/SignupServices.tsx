import axios from "axios";

function GenerateUser(fullname: string, password: string, email: string): any {
  axios
    .post("https://localhost:7048/User/GenerateUser", {
      userFullName: fullname,
      userPassword: password,
      userEmail: email,
    })
    .then((response) => response.status)
    .catch((err) => alert("connection problem"));
}

export { GenerateUser };
