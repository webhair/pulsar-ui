import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class ApiBase {
  protected readonly client: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.client = axios.create({
      ...config,
      paramsSerializer: { indexes: null }
    });
  }

  updateLangugage(language: string) {
    this.client.defaults.headers['Accept-Language'] = language;
  }
}
