import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isAdmin: boolean = false; // Add field for admin checkbox
  isLoading: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async registerUser() {
    if (!this.firstName || !this.lastName || !this.address || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.isLoading = true;

    try {
      // Firebase authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);

      // Save user data in Firestore
      await this.firestore.collection('users').doc(userCredential.user?.uid).set({
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        email: this.email,
        role: this.isAdmin ? 'admin' : 'user', // Save role based on checkbox
        createdAt: new Date(),
      });

      alert('Registration successful!');
      this.router.navigate(['/login']); // Navigate to the login page
    } catch (error) {
      if (error instanceof Error) {
        alert(`Registration failed: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      this.isLoading = false;
    }
  }
}
