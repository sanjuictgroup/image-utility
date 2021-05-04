
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageProcessingUnitComponent } from './image-processing-unit/image-processing-unit.component';

const routes: Routes = [
  { path:'',component:ImageProcessingUnitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ImageProcessingRoutingModule { }

