import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageProcessingComponent } from './image-processing.component';
import { ImageProcessingUnitComponent } from './image-processing-unit/image-processing-unit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageProcessingRoutingModule } from './image-processing-routing.module';

@NgModule({
  declarations: [
    ImageProcessingComponent,
    ImageProcessingUnitComponent
  ],
  imports: [
    BrowserModule,  
    AngularCropperjsModule,
    ImageCropperModule,
    FormsModule,
    HttpClientModule,
    ImageProcessingRoutingModule
  ],
  exports: [
    ImageProcessingComponent,
    ImageProcessingUnitComponent
  ]
})
export class ImageProcessingModule { }
