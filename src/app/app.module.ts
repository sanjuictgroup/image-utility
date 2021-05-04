import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ImageCropperComponent } from './image-cropper/image-cropper.component';
// import { AngularCropperjsModule } from 'angular-cropperjs';
// import { ImageCropperModule } from 'ngx-image-cropper';
// import { FormsModule } from '@angular/forms';
// import { ImageDrawingModule } from 'ngx-image-drawing';
// import {HttpClientModule} from '@angular/common/http';

import { ImageProcessingModule } from 'image-processing';

@NgModule({
  declarations: [
    AppComponent,
    // ImageCropperComponent
  ],
  imports: [
    ImageProcessingModule
    // BrowserModule,
    // AppRoutingModule,
    // AngularCropperjsModule,
    // ImageCropperModule,
    // FormsModule,
    // ImageDrawingModule,
    // HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
