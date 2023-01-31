import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  private readonly url = 'http://localhost:3000';


  get<T>(route: string) {
    return this.httpClient.get<T>(`${this.url}/${route}`, { withCredentials: true });
  }

  post<T>(route: string, body?: any) {
    // console.log(body);

    return this.httpClient.post<T>(`${this.url}/${route}`, body, { withCredentials: true });
  }

  put<T>(route: string, body?: any) {
    // console.log(body);

    return this.httpClient.put<T>(`${this.url}/${route}`, body, { withCredentials: true });
  }

  delete<T>(route: string) {
    // console.log(body);

    return this.httpClient.delete<T>(`${this.url}/${route}`, { withCredentials: true });
  }
}
