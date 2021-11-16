import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LdapListComponent} from './ldap-list/ldap-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LdapDetailComponent} from './ldap-detail/ldap-detail.component';

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: 'user/:id', component: LdapDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
