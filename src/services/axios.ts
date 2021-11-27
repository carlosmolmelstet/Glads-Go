import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { 'glads-token': token } = parseCookies(ctx)
  let development = process.env.NODE_ENV !== 'production';

  const api = axios.create({
    baseURL: "https://api-glads-go.herokuapp.com/api"
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}