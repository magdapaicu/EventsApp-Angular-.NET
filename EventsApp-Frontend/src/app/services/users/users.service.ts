import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + '/api/Users');
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/api/Users', user);
  }

  searchUser(username: string): Observable<User[]> {
    const params = new HttpParams().set('searching', username);
    return this.http.get<User[]>(this.baseApiUrl + '/api/Search', { params });
  }
}
