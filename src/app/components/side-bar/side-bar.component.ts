import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isUserLoggedIn:boolean=false;
  constructor(private _AuthService:AuthService) {}

  logout(){
    this._AuthService.SignOut()
    this.isUserLoggedIn= this._AuthService.isUserLoggedIn;

  }

  ngOnInit(): void {
    
  }

}
