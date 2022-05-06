import IProducts from "../Model/IProduct";
import axios from "axios";
import UserDTO from "../Model/UserDTO";
import { string, number } from "yup/lib/locale";

function getResults(): any {
  const results = axios.get<IProducts[]>(
    "https://localhost:7048/Product/getProducts"
  );
  return results;
}

const GetId = async (): Promise<UserDTO> => {
  var res = await axios.get<UserDTO, any>("https://localhost:7048/User/getId", {
    params: { email: localStorage.getItem("user") },
  });
  return res;
};

const CreateOrder = async () => {
  return await axios
    .post("https://localhost:7048/Orders/CreateOrder", {
      city: string,
      address: string,
      building: string,
      UserSID: number,
    })
    .then((response) => response.status)
    .catch((err) => console.warn(err));
};

export { getResults, GetId, CreateOrder };
