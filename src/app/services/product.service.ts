import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Iproduct } from './../Interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _AngularFirestore:AngularFirestore) { }

  
  getAllProduct(id:any,name:string):Observable<any[]>{
    return this._AngularFirestore.collection(`/Category/${id}/${name}`).snapshotChanges();
  }

  deleteProduct(catId:string,catname:string,id:any){
    return this._AngularFirestore.doc(`Category/${catId}/${catname}/${id}`).delete()
  }

  addNewProduct(catid:any,catname:any,data:any){
    return this._AngularFirestore.collection(`/Category/${catid}/${catname}`).add(data);
  }


  updateProduct(catId:string,catname:string,prdid:any,data:Iproduct){
    return this._AngularFirestore.doc(`/Category/${catId}/${catname}/${prdid}`).update(data)
  }

}
