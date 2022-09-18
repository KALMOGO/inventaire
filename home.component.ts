import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  httpOptions = {}

  userLoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  invalid_Hint = false;
  constructor(
    private authService:LoginService,
    private route:Router
    ){}

    ngOnInit() {
      this.logout()
    }

    // methode d'obtention du token (connexion)
    onLoginAction(userData: any) {

      const utilisateur = {
         'username': userData.username,
         'password': userData.password
        }

      this.authService.login(utilisateur);
      this.onConnected()
    }
   // ralentie pour attendre la reponse du backend: (ameliorable avec un subscribe)
    onConnected(){
      setTimeout(()=>{
        if (this.authService.isAuthenticated()){
          this.userLoginForm.reset()
          //this.authService.refreshToken()
          this.route.navigate(['save']) // navigation

        }else{
          this.invalid_Hint = true;
        }
      }, 1000)
    }

    // methodes de rafraichissement et de suppression (deconnexion) du token
    // refreshToken() {
    //   this.authService.refreshToken();
    // }

    logout() {
      this.authService.logout();
    }



}
