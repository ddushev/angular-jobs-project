import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICredentials } from '../../types/credentials';
import { IUser } from '../../types/user';
import { IRegisterData } from '../../types/registerData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  login(credentials: ICredentials) {
    return this.http.post<IUser>(`${this.apiURL}/users/login`, credentials);
  }

  register(registerData: IRegisterData) {
    return this.http.post<IUser>(`${this.apiURL}/users/register`, registerData);
  }

  logout() {
    return this.http.get<null>(`${this.apiURL}/users/logout`);
  }
}
