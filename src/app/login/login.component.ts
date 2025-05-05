import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [AppModule]
})
export class LoginComponent {
  loginForm!: FormGroup<any>;
  errorMessage = '';
  constructor(private fb: FormBuilder,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Perform login logic here
      console.log('Login successful:', username, password);
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Please fill in all required fields.';
      console.log('Form is invalid');
    }
  }
}
