import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {



  constructor(public _AuthService: AuthService) { }

  

  ngOnInit(): void {
    this._AuthService.getAllUser()

  }


}
