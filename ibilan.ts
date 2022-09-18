export interface Ibilan {

  id : number;
  designation:string;
  prix_unitaire:number;
  list_categorie : {designation:string};
  quantite : number;
  montant : number;
  categorie : number;
}

export interface IbilanUpdating {

  id : number;
  designation:string;
  prix_unitaire:number;
  quantite : number;
  categorie : number;
}
