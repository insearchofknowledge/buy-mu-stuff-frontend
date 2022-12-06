import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  // public productTypes = ProductType[ProductType.COARSE, ProductType.FLAKES, ProductType.GRANULES, ProductType.POWDER, ProductType.WHOLE];
  public addProductForm: FormGroup;
  public addProducerForm: FormGroup;
  public addCategoryForm: FormGroup;
  public deleteProduct: ProductDto;
  public selectedFile: File;
  // @ViewChild('addProductForm') form: NgForm;
  public productFormData = new FormData();
  public currentProduct: ProductDto;
  public currentProductId: number;
  public currentProducer: ProducerDto;
  public currentProducerId: number;
  public currentCategory: CategoryDto;
  public currentCategoryId: number;
  public editProductMode: boolean = false;
  public editProducerMode: boolean = false;
  public editCategoryMode: boolean = false;
  public getPriority: any;

  constructor(private formBuilder: FormBuilder, private productDtoService: ProductDtoService, private categoryDtoService: CategoryDtoService, private producerDtoService: ProducerDtoService) { }

  ngOnInit() {
    this.getAllProducts();
    this.getCategories();
    this.getProducers();
    this.createForm();
    this.createProducerForm();
    this.createCategoryForm();
    this.getPriority = this.getENUM(ProductType);

  }

  // Split the types dropdown list in 2 
  getENUM(ENUM: any): string[] {
    let myEnum = [];
    let objectEnum = Object.keys(ENUM);
    const values = objectEnum.slice(0, objectEnum.length / 2);
    const keys = objectEnum.slice(objectEnum.length / 2);

    for (let i = 0; i < objectEnum.length / 2; i++) {
      myEnum.push({ key: keys[i], value: values[i] });
    }
    return myEnum;
  }


  // ========== PRODUCTS ==========

  // For adding images
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
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

  public getAllProducts(): void {
    this.productDtoService.getAllProducts().subscribe({
      next: (response: ProductDto[]) => {
        this.products = response
      },
      error: (errorResponse: HttpErrorResponse) => {
        alert(errorResponse.message);
      }
    })
  }

  public onSubmit(): void {
    if (!this.editProductMode) {
      this.onAddProduct();
    } else {
      this.onUpdateProduct();
    }
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
        this.getAllProducts();
        this.createForm();
        this.productFormData = new FormData();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  public onUpdateProduct(): void {
    if (this.selectedFile != null) {
      this.productFormData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    this.productFormData.append('name', this.addProductForm.value.name);
    this.productFormData.append('description', this.addProductForm.value.description);
    this.productFormData.append('price', this.addProductForm.value.price);
    this.productFormData.append('categoryDto', this.addProductForm.value.categoryDto);
    this.productFormData.append('producerDto', this.addProductForm.value.producerDto);
    this.productFormData.append('productType', this.addProductForm.value.productType);

    this.productDtoService.updateProduct(this.currentProductId, this.productFormData).subscribe({
      next: (response: ProductDto) => {
        console.log(response);
        this.ngOnInit();
        this.editProductMode = false;
        this.addProductForm.reset;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  public onEditClicked(productDtoId: number) {
    this.currentProductId = productDtoId;        // ----> this will be needed in the onUpdateProduct()
    // Get the product based on the Id
    this.currentProduct = this.products.find((prod) => { return prod.id === productDtoId });
    console.log(this.currentProduct);
    // Populate the form with the product details
    this.addProductForm.setValue({
      name: this.currentProduct.name,
      producerDto: this.currentProduct.producerDto.id,
      description: this.currentProduct.description,
      price: this.currentProduct.price,
      productType: this.currentProduct.productType,
      categoryDto: this.currentProduct.categoryDto.id
    });

    // Jump to the edit form
    document.getElementById("addForm").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });


    //Change the button value to Update product:
    this.editProductMode = true;
  }

  public onDeleteProduct(productDtoId: number): void {
    if (confirm('Delete product ?')) {
      this.productDtoService.deleteProduct(productDtoId).subscribe(
        (response: void) => {
          console.log(response);
          this.getAllProducts();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
  // ========== END OF PRODUCTS ==========

  // ========== CATEGORIES ==========
  public createCategoryForm(): void {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('')
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

  public onSubmitCategory(): void {
    if (!this.editCategoryMode) {
      this.onAddCategory();
    } else {
      this.onUpdateCategory();
    }
  }

  public onAddCategory(): void {
    console.log("onaddCategory called....." + this.addCategoryForm.value);
    this.categoryDtoService.addCategory(this.addCategoryForm.value).subscribe({
      next: (response: CategoryDto) => {
        console.log(response);
        this.getCategories();
        this.createCategoryForm();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  public editCategoryClicked(categoryDtoId: number) {
    this.currentCategoryId = categoryDtoId;   // ----> this will be needed in the onUpdateCategory()
    // Get the category based on the Id:
    this.currentCategory = this.categories.find((cat) => { return cat.id === categoryDtoId })

    // Populate the form with the product details:
    this.addCategoryForm.setValue({
      name: this.currentCategory.name
    });

    // Change the button value tp Update category:
    this.editCategoryMode = true;
  }

  public onUpdateCategory(): void {
    this.categoryDtoService.updateCategory(this.currentCategoryId, this.addCategoryForm.value).subscribe({
      next: (response: CategoryDto) => {
        console.log(response);
        this.ngOnInit();
        this.editCategoryMode = false;
        this.addCategoryForm.reset;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }
  // ========== END OF CATEGORIES ==========

  // ========== PRODUCERS ==========

  public createProducerForm(): void {
    this.addProducerForm = new FormGroup({
      name: new FormControl('')
    })
  }

  public getProducers(): void {
    this.producerDtoService.getProducers()
      .subscribe((response: ProducerDto[]) => { this.producers = response; },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
  }

  public onSubmitProducer(): void {
    if (!this.editProducerMode) {
      this.onAddProducer();
    }
    else {
      this.onUpdateProducer();
    }
  }

  public onAddProducer(): void {
    this.producerDtoService.addProducer(this.addProducerForm.value).subscribe({
      next: (response: ProducerDto) => {
        console.log(response);
        this.getProducers();
        this.createProducerForm();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        alert(errorResponse.message);
      }
    })
  }

  public editProducerClicked(producerDtoId: number) {
    this.currentProducerId = producerDtoId;  // ----> this will be needed in the onUpdateProduer()
    // Get the producer based on the Id:
    this.currentProducer = this.producers.find((prdcr) => { return prdcr.id === producerDtoId })

    // Populate the form with the producer details:
    this.addProducerForm.setValue({
      name: this.currentProducer.name
    });

    // Change the button value tp Update producer:
    this.editProducerMode = true;
  }

  public onUpdateProducer(): void {
    this.producerDtoService.updateProducer(this.currentProducerId, this.addProducerForm.value).subscribe({
      next: (response: ProductDto) => {
        console.log(response);
        this.ngOnInit();
        this.editProducerMode = false;
        this.addProducerForm.reset;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }
  // ========== END OF PRODUCERS ==========
}
