
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

const routes: Routes = [
  { path:'',component:ImageCropperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

