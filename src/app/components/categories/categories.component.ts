import { Component, OnInit } from '@angular/core';
import { Icategory } from 'src/app/Interfaces/icategory';
import { CategoryService } from '../../services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var window: any;

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Icategory[] =[]
  newCategory:Icategory={} as Icategory;
  _catIdValue:any
  _catname:any

  add:boolean = false
  updateed:boolean = false

  formModal: any;
  searchTerm = '';
  term = '';

  constructor(private _CategoryService:CategoryService) { }

  addCategory = new FormGroup({
    name: new FormControl('',Validators.required)
  })

   

  add_update_NewCat(){
 
    this._catname = this.categories.find(x => x.name == this.addCategory.value.name)
    
    setTimeout(()=>{         
      this.addNewCat();
  }, 1000);

    if(this._catname == undefined){
      console.log("add")
      this.add = true
      this.updateed = false
      return this._CategoryService.addNewCategory(this.addCategory.value);

    }else{
      console.log("udate")
      this.updateed = true
      this.add = false
      return this._CategoryService.updateCategory(this.addCategory.value,this._catname.id);
      
    };
   
    

  }

  deleteCat(id:any,name:string){
    return this._CategoryService.deleteCategory(id,name)
  }

  update(data:any,catIdValue:any){

    this.newCategory = data
    this._catIdValue = catIdValue
    this.formModal.show();
  }

  addNewCat(){
    this.newCategory.name=''
    this.newCategory.id=''
    this.add = false
    this.updateed = false
    this.formModal.show();
  }

  whenClose() {
    this.formModal.hide();
    this.add = false
    this.updateed = false
  }


  ngOnInit(): void {


     this._CategoryService.getAllCategory().subscribe(data => {
      
     this.categories= data.map(element => {
      
       return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        }
      })
      // console.log(this.categories) // data 
    })

    this.formModal = new window.bootstrap.Modal(
    document.getElementById('myModalAU')
    );
    
  }

  
}
