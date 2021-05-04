import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageProcessingUnitComponent } from './image-processing-unit.component';

describe('ImageProcessingUnitComponent', () => {
  let component: ImageProcessingUnitComponent;
  let fixture: ComponentFixture<ImageProcessingUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageProcessingUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageProcessingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
