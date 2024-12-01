import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

// Define the interface for the user document
interface User {
  role: string | null;
}

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
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) {}

  // Fetch user role from Firestore
  private async getUserRole(userId: string | undefined): Promise<string | null> {
    if (!userId) return null;

    try {
      const userDoc = await this.firestore.collection('users').doc(userId).ref.get();
      const userData = userDoc.exists ? (userDoc.data() as User) : null;
      return userData?.role || null;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        const role = await this.getUserRole(user.uid);
        this.navigateBasedOnRole(role);
      }
    });
  }

  async login() {
    if (!this.email || !this.password) {
      this.showToast('Incomplete Form', 'Please enter both email and password');
      return;
    }

    this.isLoading = true;

    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      const role = await this.getUserRole(userCredential.user?.uid);
      this.navigateBasedOnRole(role);
    } catch (error) {
      console.error('Login Error:', error);
      this.showToast('Invalid Credentials', 'Your email or password is incorrect.');
    } finally {
      this.isLoading = false;
    }
  }

  // Navigate user based on their role
  private navigateBasedOnRole(role: string | null) {
    if (role === 'admin') {
      this.router.navigate(['/admin-landing']);
    } else {
      this.router.navigate(['/storefront']);
    }
  }

  // Show toast notifications
  private async showToast(header: string, message: string) {
    const toast = await this.toastController.create({
      header,
      message,
      duration: 3000,
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
