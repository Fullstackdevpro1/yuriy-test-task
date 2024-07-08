import axios from "axios";
import { ROUTES } from "../../constants";
import { LoginFormProps } from "../../types";

export async function login(creds: LoginFormProps) {
  const { data } = await axios.post<string>(
    `${ROUTES.baseUrl}${ROUTES.login}`,
    {
      ...creds,
    }
  );
  return data;
}
