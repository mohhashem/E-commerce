import axios from "axios";

async function GenerateUser(fullname: string, password: string, email: string): Promise<any> {
  var result: any = false;
   await axios
    .post("https://localhost:7048/User/GenerateUser", {
      userFullName: fullname,
      userPassword: password,
      userEmail: email,
    })
    .then((response) => result = response.data)
    .catch((err) => {return false;});
    return result;
}

export { GenerateUser };
