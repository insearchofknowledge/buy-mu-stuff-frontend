import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CategoryDto } from 'src/app/dto/category-dto';
import { ProducerDto } from 'src/app/dto/producer-dto';
import { ProductDto } from 'src/app/dto/product-dto';
import { ProductType } from 'src/app/enums/product-types';
import { CategoryDtoService } from 'src/app/services/category-dto.service';
import { ProducerDtoService } from 'src/app/services/producer-dto.service';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-product-dto',
  templateUrl: './product-dto.component.html',
  styleUrls: ['./product-dto.component.css']
})
export class ProductDtoComponent implements OnInit {

  public products: ProductDto[];
  public categories: CategoryDto[];
  public producers: ProducerDto[];
  public productType = ProductType;
  addProductForm: FormGroup;
  public deleteProduct: ProductDto;
  selectedFile: File;
  @ViewChild('addProductForm') form: NgForm;
  productFormData = new FormData();
  currentProduct: ProductDto;
  currentProductId: number;
  editMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private productDtoService: ProductDtoService, private categoryDtoService: CategoryDtoService, private producerDtoService: ProducerDtoService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getProducers();
    this.createForm();
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    // event.target.value = null;
  }

  public createForm(): void {
    this.addProductForm = new FormGroup({
      name: new FormControl(''),
      producerDto: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      productType: new FormControl(''),
      categoryDto: new FormControl('')

    })
  }

  public getProducts(): void {
    this.productDtoService.getProducts()
      .subscribe((response: ProductDto[]) => { this.products = response; },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
  }

  public onAddProduct(): void {

    this.productFormData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.productFormData.append('name', this.addProductForm.value.name);
    this.productFormData.append('description', this.addProductForm.value.description);
    this.productFormData.append('price', this.addProductForm.value.price);
    this.productFormData.append('categoryDto', this.addProductForm.value.categoryDto);
    this.productFormData.append('producerDto', this.addProductForm.value.producerDto);
    this.productFormData.append('productType', this.addProductForm.value.productType);

    this.productDtoService.addProduct(this.productFormData).subscribe({
      next: (response: ProductDto) => {
        console.log(response);
        this.getProducts();
        this.createForm();
        this.productFormData = new FormData();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  public getCategories(): void {
    this.categoryDtoService.getCategories()
      .subscribe((response: CategoryDto[]) => { this.categories = response; },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
  }

  public getProducers(): void {
    this.producerDtoService.getProducers()
      .subscribe((response: ProducerDto[]) => { this.producers = response; },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
  }

  public onSubmit(): void {
    if (!this.editMode) {
      this.onAddProduct();
    } else {
      this.onUpdateProduct();
    }
  }

  public onUpdateProduct(): void {
    console.log('pressUpdateButton');
    if (this.selectedFile != null) {
      this.productFormData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    this.productFormData.append('name', this.addProductForm.value.name);
    this.productFormData.append('description', this.addProductForm.value.description);
    this.productFormData.append('price', this.addProductForm.value.price);
    this.productFormData.append('categoryDto', this.addProductForm.value.categoryDto);
    this.productFormData.append('producerDto', this.addProductForm.value.producerDto);
    this.productFormData.append('productType', this.addProductForm.value.productType);

    console.log(this.productFormData);
    this.productDtoService.updateProduct(this.currentProductId, this.productFormData).subscribe({
      next: (response: ProductDto) => {
        console.log(response);
        this.ngOnInit();
        this.editMode = false;
        this.addProductForm.reset;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
    // this.productDtoService.updateProduct(product).subscribe(
    //   (response: ProductDto) => {
    //     console.log(response);
    //     this.getProducts();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
  }

  onEditClicked(productDtoId: number) {
    this.currentProductId = productDtoId;
    // Get the product based on the id
    console.log("fetching product with id: " + productDtoId)
    this.currentProduct = this.products.find((prod) => { return prod.id === productDtoId })
    console.log(this.currentProduct);

    // Populate the form with the product details

    this.addProductForm.setValue({
      name: this.currentProduct.name,
      producerDto: this.currentProduct.producerDto.id,
      description: this.currentProduct.description,
      price: this.currentProduct.price,
      productType: this.currentProduct.productType,
      categoryDto: this.currentProduct.categoryDto.id,
    });

    //Change the button value to Update product:
    this.editMode = true;
    console.log("this editmode changed to: " + this.editMode);
  }

  public onDeleteProduct(productDtoId: number): void {
    this.productDtoService.deleteProduct(productDtoId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProducts();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
