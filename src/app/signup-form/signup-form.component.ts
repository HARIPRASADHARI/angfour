import { Component } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { UserNameValidtors } from './userName.validators';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new FormGroup({
    account:new FormGroup({

      username:new FormControl('',
        Validators.required,
      UserNameValidtors.shoulBeUnique
    ),
      password:new FormControl('',Validators.required)
    })
    })
    
  login(){
    this.form.setErrors({
      invalidLogin:true
    });
  }
  get userName(){
    console.log(this.form.get('account.username'));
    return this.form.get('account.username');
  }
}
