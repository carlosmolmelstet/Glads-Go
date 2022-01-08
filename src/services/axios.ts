import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { 'glads-token': token } = parseCookies(ctx)
  let development = process.env.NODE_ENV !== 'production';

  const api = axios.create({
    baseURL: development ? "https://localhost:44395/api" : "http://ecrnetcore-env.eba-utfxpyh2.us-east-1.elasticbeanstalk.com/api"
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}