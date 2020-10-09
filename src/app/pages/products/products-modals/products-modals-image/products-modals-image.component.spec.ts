import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsModalsImageComponent } from './products-modals-image.component';

describe('ProductsModalsImageComponent', () => {
  let component: ProductsModalsImageComponent;
  let fixture: ComponentFixture<ProductsModalsImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsModalsImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsModalsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
