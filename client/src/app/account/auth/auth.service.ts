import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICredentials } from '../../types/credentials';
import { IUser } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  login(credentials: ICredentials) {
    return this.http.post<IUser>(`${this.apiURL}/users/login`, credentials);
  }

  logout() {
    return this.http.get<any>(`${this.apiURL}/users/logout`);
  }
}
