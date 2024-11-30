// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage {
//   email: string = '';
//   password: string = '';
//   isLoading: boolean = false; // To indicate loading state

//   constructor(private router: Router) {}

//   /**
//    * Method to handle the login process
//    */
//   login() {
//     // Basic form validation
//     if (!this.email || !this.password) {
//       alert('Please enter both email and password');
//       return;
//     }

//     this.isLoading = true; // Simulate loading state

//     // Simulate an API call or backend login process
//     setTimeout(() => {
//       this.isLoading = false;

//       // Mock authentication logic
//       if (this.email === 'test@example.com' && this.password === '123456') {
//         // Navigate to the home page or desired route upon successful login
//         // this.router.navigate(['/home']);
//         this.router.navigate(['/storefront']);
//       } else {
//         // Show an error message if login fails
//         alert('Invalid email or password');
//       }
//     }, 1000); // Simulate a delay of 1 second
//   }

//   /**
//    * Method to reset the login form
//    */
//   resetForm() {
//     this.email = '';
//     this.password = '';
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Listen for authentication state changes
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Redirect to storefront if already logged in
        this.router.navigate(['/storefront']);
      }
    });
  }

  login() {
    if (!this.email || !this.password) {
      this.showErrorToast('Incomplete Form', 'Please enter both email and password');
      return;
    }

    this.isLoading = true;

    // Firebase authentication attempt
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        this.isLoading = false;
        this.router.navigate(['/storefront']);
      })
      .catch((error) => {
        this.isLoading = false;
        this.showErrorToast('Invalid Credentials', 'Your username or password is incorrect, please try again.');
      });
  }

  async showErrorToast(header: string, message: string) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      duration: 3000, // Show for 3 seconds
      color: 'dark',
      cssClass: 'custom-toast',
      position: 'top',
    });
    toast.present();
  }

  resetForm() {
    this.email = '';
    this.password = '';
  }
}