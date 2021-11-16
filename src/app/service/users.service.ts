import { Injectable } from '@angular/core';
import {UserLdap} from '../model/user-ldap';
import {LDAP_USERS} from '../model/ldap-mock-data';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  static users: UserLdap[] = LDAP_USERS;

  constructor() { }

  getUsers(): Observable<UserLdap[]> {
    return of(UsersService.users);
  }

  getUser(login: string): Observable<UserLdap>{
    return of (UsersService.users.find(user => user.login === login));
  }

  addUser(user: UserLdap): Observable<UserLdap>{
    UsersService.users.push(user);
    return of(user);
  }

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
}
