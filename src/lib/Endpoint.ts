import { AxiosInstance } from "axios";

export class Endpoint {
  get url() { return '' };

  constructor( protected readonly client: AxiosInstance ) {}

  get fullUrl() {
    return `${this.client.defaults.baseURL}/${this.url}`;
  }

  at(path: string) {
    return `${this.url}/${path}`;
  }
}