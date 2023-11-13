import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  @Input() receivedString: string;

  constructor() { this.receivedString = '';}

  ngOnInit(): void {
  }

}
