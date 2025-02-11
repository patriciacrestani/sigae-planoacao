import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelhoriasComponent } from './melhorias.component';

describe('MelhoriasComponent', () => {
  let component: MelhoriasComponent;
  let fixture: ComponentFixture<MelhoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MelhoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MelhoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
