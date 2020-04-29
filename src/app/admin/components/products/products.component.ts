import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Subject } from 'rxjs';
import { Router } from "@angular/router"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        'search': 'חפש',
        lengthMenu: "רשומות _MENU_",
        info:'',
        "paginate": {
          "first": "ראשון",
          "previous":'הקודם',
          "next": "הבא",
          'last':'אחרון'
        }
      }
    };

    this.loadProducts();
  }


  loadProducts() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.dtTrigger.next();
      });
  }

  edit(productId: string) {
    this.router.navigate(['admin/product', productId]);
  }

  delete(product: Product) {
    if (confirm("Are you sure to delete " + product.id)) {

      const index = this.products.indexOf(product, 0);
      if (index > -1) {
        this.products.splice(index, 1);

        this.productService.deleteProduct(product.id.toString()).subscribe(
          (response: number) => {
            console.log(response + 'נמחק בהצלחה');
          }
        )
      }
    }
  }
}
