import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isLoading: boolean = false; // To indicate loading state

  constructor(private router: Router) {}

  /**
   * Method to handle the login process
   */
  login() {
    // Basic form validation
    if (!this.email || !this.password) {
      alert('Please enter both email and password');
      return;
    }

    this.isLoading = true; // Simulate loading state

    // Simulate an API call or backend login process
    setTimeout(() => {
      this.isLoading = false;

      // Mock authentication logic
      if (this.email === 'test@example.com' && this.password === '123456') {
        // Navigate to the home page or desired route upon successful login
        // this.router.navigate(['/home']);
        this.router.navigate(['/storefront']);
      } else {
        // Show an error message if login fails
        alert('Invalid email or password');
      }
    }, 1000); // Simulate a delay of 1 second
  }

  /**
   * Method to reset the login form
   */
  resetForm() {
    this.email = '';
    this.password = '';
  }
}
