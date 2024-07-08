import axios from "axios";
import { ROUTES } from "../../constants";

export async function getMessage() {
  const { data } = await axios.get(`${ROUTES.baseUrl}${ROUTES.getMessage}`);

  return data.message;
}
