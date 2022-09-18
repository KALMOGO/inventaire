export interface Ienregistrement {
  designation:string;
  prix_unitaire:number;
  categorie : number;
  quantite : number;
  montant? : number;
}

export interface Icategorie {

  id : number;
  designation : string;

}
