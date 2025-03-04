import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router : Router , private http : HttpClient)  { }
  login (){
    
  }
  changeToCreate_Account() :void {
    this.router.navigate(["/login/createAccount"]); 
}
  

}
