import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { min } from 'rxjs';
import { Ibilan } from '../bilan/ibilan';
import { SbilanService } from '../bilan/sbilan.service';
import { Icategorie, Ienregistrement } from './ienregistrement';
import { SenregristremlentService } from './senregristremlent.service';

@Component({
  selector: 'app-enregistrement',
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.css']
})
export class EnregistrementComponent implements OnInit {
  listes_pieces:Icategorie[] = []

  liste_categories :Icategorie[] = []
  listePiece:Ibilan  [] = [];

  nombrePiece! : number;
  montant! : number;

  quantite  : number = 0;
  cout :  number =0;

  formAjoutPiece! :FormGroup;


  constructor(
    private fb : FormBuilder,
    private enregistrementService : SenregristremlentService,
    private bilanService : SbilanService) { }



  ngOnInit(): void {
    this.formAjoutPiece =  this.fb.group({
      designation:this.fb.control('', Validators.required),
      cout_unitaire:this.fb.control('',[Validators.required,Validators.min(1) ]),
      quantite:this.fb.control('',[Validators.required, Validators.min(1)]),
      categorie:this.fb.control('',Validators.required),
    })
    this.getCategoriePieces();
    //this.enregistrementPieces();
    this.getListePiece();

    this.getListeNomPieces();
  }

  openToast(){
    // const toast = new bootstrap.Toast(toastLiveExample)
    this.enregistrementPieces();
   }

   // recuperation des categories pièces
  getCategoriePieces(){
    this.enregistrementService.getAllCategorie().subscribe(
      (data:any)=>{
        this.liste_categories =  data;
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log("données complètement recuperee" );

      }
    );
  }

  getTotal(){
    let somme = 0;
    for(let data of this.listePiece){
      somme  += Number(data.montant);
    }

    return somme;
  }

  // recuperation des données
  getListePiece(){

    this.bilanService.getAllPieces().subscribe(
      (data:any)=>{
        console.log(data);
        this.listePiece = data;
        this.nombrePiece = this.listePiece.length;
        this.montant = this.getTotal();

        console.info(this.montant)
        //alert(this.listePiece.length)
      }
    );

  }

  // Enregistrement d'une pièce
  enregistrementPieces(){
    const piece :Ienregistrement ={
      designation: this.formAjoutPiece.get('designation')?.value,
      categorie: Number(this.formAjoutPiece.get('categorie')?.value),
      prix_unitaire: this.formAjoutPiece.get('cout_unitaire')?.value,
      quantite: this.formAjoutPiece.get('quantite')?.value,
     // montant : Number(this.formAjoutPiece.get('cout_unitaire')?.value) * Number(this.formAjoutPiece.get('quantite')?.value)

    }

    console.log(piece);
    this.enregistrementService.savePiece(piece).subscribe(
      ()=>{
        console.info("données envoyées avec succès");
        this.getListePiece();
        this.formAjoutPiece.reset();

      },
      (error)=>{
        console.log(error);

      }
    );
  }

  getListeNomPieces():void{
    this.enregistrementService.getListePieces().subscribe(
      (data:Icategorie[])=>{
          this.listes_pieces = data;
      }
    )
  }
}
