import { Component, Input } from '@angular/core';
import { tabLink } from '@interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  @Input() state !: number;
  constructor(){}

}
