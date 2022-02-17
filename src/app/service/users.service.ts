import { Injectable } from '@angular/core';
import {UserLdap} from '../model/user-ldap';
import {LDAP_USERS} from '../model/ldap-mock-data';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  static users: UserLdap[] = LDAP_USERS;

  private usersUrl = '';
  private httpOptions = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
    this.usersUrl = environment.usersApiUrl;
  }

  /*
  getUsers(): Observable<UserLdap[]> {
    return of(UsersService.users);
  }

   */


  getUsers(): Observable<UserLdap[]> {
    return this.http.get<UserLdap[]>(this.usersUrl);
  }

  /*
  getUser(login: string): Observable<UserLdap>{
    return of (UsersService.users.find(user => user.login === login));
  }

   */
  getUser(id: number): Observable<UserLdap> {
    return this.http.get<UserLdap>(this.usersUrl + '/' + id );

  }

  /*
  addUser(user: UserLdap): Observable<UserLdap>{
    UsersService.users.push(user);
    return of(user);
  }

   */

  addUser(user: UserLdap): Observable<UserLdap>{
   return this.http.post<UserLdap>(this.usersUrl, user, {
     headers: this.httpOptions
   });
  }

  /*
  updateUser(userToUpdate: UserLdap): Observable<UserLdap>{
    const user = UsersService.users.find( u => u.login === userToUpdate.login );
    if (user) {
      user.nom = userToUpdate.nom;
      user.prenom = userToUpdate.prenom;
      user.nomComplet = userToUpdate.nomComplet;
      user.motDePass = userToUpdate.motDePass;

      return of(userToUpdate);
    }
    return throwError('Utilisateur non trouvé!');
  }

   */
  updateUser(user: UserLdap): Observable<UserLdap> {
    return this.http.put<UserLdap>(this.usersUrl + '/' + user.id, user, {
        headers: this.httpOptions
    });
  }

  deleteUser(id: number): Observable<UserLdap> {
    return this.http.delete<UserLdap>( this.usersUrl + '/' + id, {
      headers: this.httpOptions
    });
  }




}
