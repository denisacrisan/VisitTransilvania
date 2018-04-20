import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  isLoading = false;
  selectedItem: string;
  registerForm: FormGroup;
  registerFormGH: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createFormIndivid();
    this.createFormGuestHouse();
  }

  ngOnInit() {
  }

  register() {
      this.isLoading = true;
  }


    private createFormIndivid() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });
    }

    private createFormGuestHouse() {
        this.registerFormGH = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            hotelName: ['', Validators.required],
            website: ['', Validators.required],
            county: ['', Validators.required],
            city: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });
    }
}
