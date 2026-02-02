import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-recover',
  templateUrl: './nav-recover.component.html',
  styleUrls: ['./nav-recover.component.scss']
})
export class NavRecoverComponent {

  @Input() title !: string;
  constructor() { }

}
