import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APP_CONFIG, AppConfig } from 'src/app/app-config.module';
import { MinLengthValidator } from 'src/app/shared/directives/validators/min-length-validator';
import { AgeValidator } from 'src/app/shared/directives/validators/age-validator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  product: Product = new Product();
  currentTitle: string = null;
  submitted = false;
  productId: number = null;
  editMode: boolean = false;
  pageTitle: string = null;
  btnText: string = null;
  productForm: FormGroup;
  isAllreadyExsist: boolean = false;

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private productService: ProductService,
    public fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      code: ['', [Validators.required]],
      count: ['', [Validators.required, MinLengthValidator]],
      unitPrice: ['', [Validators.required, MinLengthValidator]]
    })

    // Route parameters
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];

      if (this.productId != null) {
        this.productService.getProduct(this.productId).subscribe(
          (response: Product) => {
            this.product = response;
            this.currentTitle = response.title;
            this.editMode = true;
            this.pageTitle = config.editProductText;
            this.btnText = config.edit;
          }
        )
      }
    });

    this.pageTitle = config.addProductText;
    this.btnText = config.add;
  }

  get f() { return this.productForm.controls; }

  // Submit Add New Product
  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    if (this.editMode == true) {
      this.productService.updateProduct(this.product).subscribe(
        (response: Product) => {
          this.product = response;
        }
      )
    }

    this.productService.addProduct(this.product).subscribe(
      (response: Product) => {
        this.router.navigate(['/admin/products']);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onKeyUp($event, type) {
    if (this.currentTitle != $event.target.value) {
      this.productService.search(type, ($event.target.value == '' ? 'empty' : $event.target.value)).subscribe(
        (response: number) => {
          if (response == -1) {
            this.isAllreadyExsist = true;
          } else
            this.isAllreadyExsist = false;
        }
      )
    }
    else {
      this.isAllreadyExsist = false;
    }
  }
}
