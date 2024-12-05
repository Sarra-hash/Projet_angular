import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService:AuthentificationService,private fb: FormBuilder, private http: HttpClient,private router:Router) {
    // Initialize the form with controls and validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Method to handle form submission
  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
  this.http.post('http://localhost:3000/auth/login', loginData).subscribe(
    (response: any) => {
      console.log('Login successful:', response);



      localStorage.setItem('userId', response.userId); // Ensure this line is present and userId is returned from the backend


      
      localStorage.setItem('token', response.token); // Save token in localStorage
      localStorage.setItem('userName', response.userName); // Store username
 

      this.authService.setLoginStatus(true); // Update login status
      this.router.navigate(['/']); // Navigate to home component
    },
    (error) => {
      console.error('Login failed', error);
    }
  );
      
    } else {
      console.error('Form is invalid');
    }
  }
}
