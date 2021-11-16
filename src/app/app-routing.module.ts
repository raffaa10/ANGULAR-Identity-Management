import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LdapListComponent} from './ldap-list/ldap-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LdapEditComponent} from './ldap-edit/ldap-edit.component';
import {LdapAddComponent} from './ldap-add/ldap-add.component';

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: 'users/add', component: LdapAddComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: 'user/:id', component: LdapEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
