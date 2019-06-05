import {ErrorInterface, Error, Headers} from './responseInterface';

export class ErrorModel implements ErrorInterface {
  error: Error;
  headers: Headers;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;

}
