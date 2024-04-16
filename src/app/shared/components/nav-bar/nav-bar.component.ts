import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  public userMenu: MenuItem[] = [
    { title: 'Básicos', route: '/reactive/basic' },
    { title: 'Dinámicos', route: '/reactive/dynamic' },
    { title: 'Switches', route: '/reactive/switches' } // guarda q esto me tira error
  ];

  public adminMenu: MenuItem[] = [
    { title: 'Registro', route: './auth' },
  ];

}
