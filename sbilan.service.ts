import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ibilan, IbilanUpdating } from './ibilan';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SbilanService {

 readonly urlBilan ="http://127.0.0.1:8000/inventaire/piece/listCreate/";
 readonly urlBilanUpdating ="http://127.0.0.1:8000/inventaire/piece/";


  public token : any;
  httpOptions = {};

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem("token");
    //console.log(this.token);
    this.httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':"PIECES "+ this.token
      })
    }
  }

  // cette methode ci-dessous permet de recuperer les données

  getAllPieces():Observable<Ibilan>{

    return this.http.get<Ibilan>(this.urlBilan,this.httpOptions)
  }

  // suppression d'un bilan
  deleteBilan(id:number){
    return this.http.delete(this.urlBilanUpdating+`${id}/detail/`,this.httpOptions);
  }

  // mise à jour d'un bilan

  updateBilan(id:number,newData:IbilanUpdating){
    return this.http.put(this.urlBilanUpdating+`${id}/detail/`,newData,this.httpOptions);
  }




}
