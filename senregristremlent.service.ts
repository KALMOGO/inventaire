import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibilan } from '../bilan/ibilan';
import { Icategorie, Ienregistrement } from './ienregistrement';

@Injectable({
  providedIn: 'root'
})
export class SenregristremlentService {

  // declaration des urls

 readonly urlCategorie ="http://127.0.0.1:8000/inventaire/categorie/listCreate";
 readonly urlBilan     ="http://127.0.0.1:8000/inventaire/piece/listCreate/";


 public token : any;
 httpOptions = {};

 constructor(private http:HttpClient) {
   this.token = localStorage.getItem("token");
   console.log(this.token);
   this.httpOptions = {
     headers : new HttpHeaders({
       'Content-Type':'application/json',
       'Authorization':"PIECES "+ this.token
     })
   }
 }

   // cette methode ci-dessous permet de recuperer les données

   getAllCategorie():Observable<Icategorie>{

    return this.http.get<Icategorie>(this.urlCategorie,this.httpOptions)
  }

  // methode d'enregistrement des données

  savePiece(data:Ienregistrement):Observable<Ienregistrement>{

    return this.http.post<Ienregistrement>(this.urlBilan,data,this.httpOptions);
  }


  getListePieces():Observable<Icategorie[]>{

    const endpoint = "http://127.0.0.1:8000/inventaire/nomPiece/listCreate/"

    return this.http.get<Icategorie[]>(endpoint,this.httpOptions)
  }
}
