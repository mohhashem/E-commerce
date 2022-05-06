import axios from "axios";

const GetOrderId = async (): Promise<number> => {
  var res = await axios.get<number, any>(
    "https://localhost:7048/Orders/GetCartItems",
    {
      params: { id: localStorage.getItem("id") },
    }
  );
  return res;
};

export { GetOrderId };
