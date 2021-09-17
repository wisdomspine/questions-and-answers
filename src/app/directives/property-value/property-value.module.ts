import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PropertyValueComponent } from './property-value/property-value.component';
import { PropertyComponent } from './property/property.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PropertyValueComponent, PropertyComponent],
  exports: [PropertyValueComponent, PropertyComponent],
})
export class PropertyValueModule {}
