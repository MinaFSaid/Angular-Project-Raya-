import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Icategory } from 'src/app/Interfaces/icategory';
import { Iproduct } from './../../Interfaces/iproduct';
// import $ from 'jquery';

// declare const $:any

declare var window: any;

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  searchTerm = '';
  term = '';

  categories: Icategory[] = []
  Products: Iproduct[] = []
  allProduct: Iproduct[] = []
  catSelectedId: string = ""
  catSelectedName: any = ""
  _catIdValue: any
  _cat: any

  test: boolean = false

  add: boolean = false
  updateed: boolean = false

  newProduct: Iproduct = {} as Iproduct;

  searchText = ''

  formModal: any;
  updateModal:any;
  productDetails: Iproduct[] = []


  constructor(private _ProductService: ProductService, private _CategoryService: CategoryService) {


  }



  prdById(Catval: any) {

    this.catSelectedId = Catval
    this.catSelectedName = this.categories.find(x => x.id == Catval)


    this._ProductService.getAllProduct(this.catSelectedId, this.catSelectedName.name).subscribe(data => {
      // console.log(data) // legnth

      this.Products = data.map(element => {

        return {
          id: element.payload.doc.id,
          catId: this.catSelectedId,
          ...element.payload.doc.data(),
        }
      })
    })

  }

  addnewPrd(){
    this.updateModal.show();

    this.add = false
    this.updateed = false
    this.newProduct.name="",
    this.newProduct.quantity= 0
    this.newProduct.price = 0
    this.newProduct.details=''
    this._catIdValue=''
    this.catSelectedId = ""
    this.catSelectedName = ""
  }

  update(data: any) {

    this.newProduct = data
    this._catIdValue = data.catId
    this.updateModal.show();
    
    this.add = false
    this.updateed = false

    // $('#myTab #contact-tab').tab('show')

  }

  add_update_Product(cat: string) {

    let addproduct: any = {}
    addproduct['name'] = this.newProduct.name
    addproduct['quantity'] = this.newProduct.quantity
    addproduct['price'] = this.newProduct.price
    addproduct['details'] = this.newProduct.details

    this._cat = this.categories.find(x => x.id == cat)

    console.log(cat)


    if (this.newProduct.id == undefined || this.newProduct.id == null || this.newProduct.id == "") {

      this._ProductService.addNewProduct(this._cat.id, this._cat.name, addproduct)
      console.log('add')
      this.add = true
      this.updateed = false
      
    } else {

      this._ProductService.updateProduct(this.newProduct.catId, this._cat.name, this.newProduct.id, addproduct)
      console.log('update')
      this.updateed = true
      this.add = false
    }

    this.newProduct.id = ''
    this.newProduct.name="",
    this.newProduct.quantity= 0
    this.newProduct.price = 0
    this.newProduct.details =''
    this._catIdValue=''

    
    setTimeout(()=>{         
      this.addnewPrd();
  }, 500);

  }

  myFunction() {
    this.formModal.hide();
    this.updateModal.hide()
  }

  deleteproduct(prd: any) {
    this._cat = this.categories.find(x => x.id == prd.catId)
    this._ProductService.deleteProduct(prd.catId, this._cat.name, prd.id)
  }



  ngOnInit() {
    this.Products = []
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );

    this.updateModal = new window.bootstrap.Modal(
      document.getElementById('myModalAU')
    );

    this._CategoryService.getAllCategory().subscribe(data => {
      this.categories = data.map(element => {
  
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        }

      })
      
      this.categories.map(x => {
        this._ProductService.getAllProduct(x.id, x.name).subscribe(data => {
          
          this.Products.push(...data.map(element => {
            
            return {
              id: element.payload.doc.id,
              catId: x.id,
              ...element.payload.doc.data(),
            }
          }))


          ///////////////////////////////////////////////////////////////////////
          
          // const isFound = this.x.some(element => {
          //   if (this.Products.indexOf(element) !== -1) {
          //     this.Products.push(element)
          //   }
          
          //   return false;
          // });
          
          // console.log(isFound);

          /////////////////////////////////////////////////////////////////////

          // for (const element of this.x) {
          //   if ((this.Products).indexOf(element) !== -1) {
          //     this.Products.push(element);
          //     console.log(this.Products)
          //     console.log(element)
          //   }
          // }
        })
      })

    })

  }

  openProductDetails(prd: Iproduct) {
    this.productDetails.push(prd)
    this.formModal.show();
  }

  whenClose() {

    this.productDetails.pop()
    this.formModal.hide();
    this.updateModal.hide()
  }

}
