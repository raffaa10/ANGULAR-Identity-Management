import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {UserLdap} from '../model/user-ldap';
import {UsersService} from '../service/users.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmValidParentMatcher, passwordValidator} from './passwords-validator.directive';


/* @Component({
  selector: 'app-ldap-detail',
  templateUrl: './ldap-detail.component.html',
  styleUrls: ['./ldap-detail.component.scss']
})
 */
export abstract class LdapDetailComponent {

  protected constructor( public addForm: boolean,
                         // private route: ActivatedRoute,
                         // private usersService: UsersService,
                         private fb: FormBuilder,
                         private router: Router
  ) { this.passwordPlaceHolder = 'Mot de pass' + (this.addForm ? '' : ' (vide si inchangé) '); }

  confirmValidParentMatcher: ConfirmValidParentMatcher;
  errorMessage = '';
  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;
  passwordPlaceHolder: string;

  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, {validators: passwordValidator}),
    mail: {value: '', disabled: true},
    employeNumero: [''],
    employeNiveau: [''],
    dateEmbauche: [''],
    publisherId: [''],
    active: [''],
    motDePass: [''],
    role: ['']
  });

  protected onInit(): void {
    // this.getUser();
  }

  private formGetValue(name: string): any {
      return this.userForm.get(name).value;
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']);
  }

  onSubmitForm(): void {
    this.validateForm();
  }

  updateLogin(): void {
    this.userForm.get('login').setValue(this.formGetValue('prenom') + '.'
      + this.formGetValue('nom').toLowerCase());
    this.updateMail();
  }

  updateMail(): void {
    this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan');
  }

  isFormValide(): boolean {
    return this.userForm.valid
      && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  abstract validateForm(): void;

  protected copyUserToFormControl(): void {
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);
    /*
    this.userForm.get('employeNumero').setValue(this.user.employeNumero);
    this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
    this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    this.userForm.get('publisherId').setValue(this.user.publisherId);
    this.userForm.get('active').setValue(this.user.active);
     */
  }
  protected getUserFromFormControl(): UserLdap {
    return {
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2021-11-16',
      publisherId: 1,
      active: true,
      motDePass: '',
      role: 'ROLE_USER',
    };


  }

}
