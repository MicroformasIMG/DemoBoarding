import { Component, Input } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {

  public person !: number;
  @Input() hasAccount !: boolean;

  public typePerson(event : MatButtonToggleChange){
    const{value} = event;
    this.person = value;
  }

}
