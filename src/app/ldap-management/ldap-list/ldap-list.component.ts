import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {UserLdap} from '../../model/user-ldap';
// import {LDAP_USERS} from '../model/ldap-mock-data';
import {MatPaginator} from '@angular/material/paginator';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {UsersService} from '../../service/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.scss']
})
export class LdapListComponent implements OnInit {


  constructor(private usersService: UsersService, private router: Router) { }

  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);
  unactiveSelected = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  filterPredicate(data, filter): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    console.log('Values on ngAfterViewInit():');
    console.log('Mat paginator', this.paginator);
  }

  private getUsers(): void {
    this.usersService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected){
          this.dataSource.data = users.filter(user => user.active === false);
        } else {
          this.dataSource.data = users;
        }
      }
    );
  }

  unactiveChanged($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }


  // tslint:disable-next-line:typedef
  edit(id: number) {
    this.router.navigate(['/user', id]).then( e => {
      if (! e) {
        console.log('Navigation has failed');
      }
    });
  }

  // tslint:disable-next-line:typedef
  addUser() {
    this.router.navigate(['user/add']).then( (e) => {
      if (!e) {
        console.log('Navigation has failed!');
      }
    } );
  }
}
