import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-fpass',
  templateUrl: './fpass.page.html',
  styleUrls: ['./fpass.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';
  // password: string = '';
  // confirmPassword: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastController: ToastController
  ) {}

  // Method to handle the password reset process
  updatePassword() {
    // Basic validation to ensure the fields are filled
    if (!this.email) {
      this.showErrorToast('Please fill in all fields');
      return;
    }

    // // Check if passwords match
    // if (this.password !== this.confirmPassword) {
    //   this.showErrorToast('Passwords do not match');
    //   return;
    // }

    this.isLoading = true; // Show loading state

    // Reset password using Firebase Authentication
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        this.isLoading = false;
        this.showSuccessToast('Password reset email sent successfully!');
        this.router.navigate(['/login']);
      }) 
      .catch((error) => {
        this.isLoading = false;
        this.showErrorToast(error.message);
      });
  }

  // Custom toast for errors
  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: message,
      duration: 3000,
      color: 'danger',
      cssClass: 'custom-toast',
      position: 'top',
    });
    toast.present();
  }

  // Custom toast for success
  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      header: 'Success',
      message: message,
      duration: 3000,
      color: 'success',
      cssClass: 'custom-toast',
      position: 'top',
    });
    toast.present();
  }
}
