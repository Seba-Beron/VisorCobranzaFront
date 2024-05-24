import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpUserService } from './services/http-user.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
   HttpUserService
  ]
})
export class UserModule { }
