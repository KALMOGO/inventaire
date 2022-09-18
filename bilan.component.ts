import { Component, OnInit } from '@angular/core';
import { Ibilan, IbilanUpdating } from './ibilan';
import { SbilanService } from './sbilan.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Icategorie } from '../enregistrement/ienregistrement';
import { SenregristremlentService } from '../enregistrement/senregristremlent.service';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.css']
})
export class BilanComponent implements OnInit {
  listes_pieces:Icategorie[] = []
  liste_categories :Icategorie[] = []
  listePiece:Ibilan  [] = [];
  listeBilan : Ibilan[] = [];
  closeResult: string = '';
  formAjoutPiece! :FormGroup;
  quantite  : number = 0;
  nombrePiece! : number;
  montant! : number;
  cout :  number =0;
  isPrinting : boolean = false;

  today : Date = new Date();

  constructor(private bilanService : SbilanService,
    private modalService: NgbModal, private fb : FormBuilder,
    private enregistrementService:SenregristremlentService) { }

  ngOnInit(): void {
    this.formAjoutPiece =  this.fb.group({
      designation:this.fb.control('', Validators.required),
      cout_unitaire:this.fb.control('',[Validators.required,Validators.min(100) ]),
      quantite:this.fb.control('',[Validators.required, Validators.min(1)]),
      categorie:this.fb.control('',Validators.required),
    })

    this.getListeBilan();
  }

  getListeBilan(){

    this.bilanService.getAllPieces().subscribe(
      (data:any)=>{
        console.log(data);
        this.listeBilan = data;
      }
    );
  }

// modal
  getListeNomPieces():void{
    this.enregistrementService.getListePieces().subscribe(
      (data:Icategorie[])=>{
          this.listes_pieces = data;
      }
    )
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
      somme = somme + data.montant;
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

  opendleConfirmModal(content: any, id:number) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    .result.then((result) => {
      // action quand ok
      this.closeResult = `Closed with: ${result}`;
      this.performDelete(id);
    }, (reason) => {
      // action annulation
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  setQuantite(){
    this.quantite = this.formAjoutPiece.get('quantite')?.value
  }

  setCout(){
    this.cout = this.formAjoutPiece.get('cout_unitaire')?.value
  }
  selected:{piece_id:number, categorie_id:number}={
    piece_id: 0,
    categorie_id: 0
  };

  setDefaultValues(data:Ibilan){

    this.selected.piece_id = data.id;
    this.selected.categorie_id = data.id;

    this.quantite = data.quantite
    this.cout = data.prix_unitaire

    this.formAjoutPiece.get('quantite')?.setValue(data.quantite)
    this.formAjoutPiece.get('designation')?.setValue(data.designation)
    this.formAjoutPiece.get('cout_unitaire')?.setValue(data.prix_unitaire);
    this.formAjoutPiece.get('categorie')?.setValue(data.categorie);
  }

  changeValues(){
    this.isPrinting = true;
  }

  openEdtConfirmModal(content: any, data:Ibilan) {

    this.setDefaultValues(data);

    this.getCategoriePieces();
    //this.enregistrementPieces();
    this.getListePiece();

    this.getListeNomPieces();

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    .result.then((result) => {
      // action quand ok
      this.closeResult = `Closed with: ${result}`;
      this.performUpdate(data.id);
    }, (reason) => {
      // action annulation
      this.closeResult = `Dismissed ${this.getDismissReasonEdition(reason)}`;

    });
  }

  private getDismissReasonEdition(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  performDelete(id:number):void{
    //alert(id)
    this.bilanService.deleteBilan(id).subscribe(
      ()=>{
        this.getListeBilan();
        alert("suppression effectué");
      },
      (error)=>{
        console.log(error);
      }
    )

  }
  performUpdate(id:number):void{
    //alert(id);
    const piece :IbilanUpdating ={
      designation: this.formAjoutPiece.get('designation')?.value,
      categorie: Number(this.formAjoutPiece.get('categorie')?.value),
      prix_unitaire: this.formAjoutPiece.get('cout_unitaire')?.value,
      quantite: this.formAjoutPiece.get('quantite')?.value,
      id: id
    }
    this.bilanService.updateBilan(id,piece).subscribe(
      ()=>{
        this.getListeBilan();
        //alert("mise à jour effectué");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}

