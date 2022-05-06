import axios from "axios";

const getUser = async (email: string, password: string): Promise<boolean> => {
  var res = await axios.get<boolean, any>(
    "https://localhost:7048/User/UserLogin",
    {
      params: { email: email, password: password },
    }
  );
  return res;
};

export { getUser };
