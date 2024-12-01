import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Import Firestore

interface Product {
  name: string;
  price: number;
  image: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  displayName?: string;
}

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.page.html',
  styleUrls: ['./storefront.page.scss'],
})
export class StorefrontPage implements OnInit {
  currentUser: string | null = null; // To hold the user's name
  isLoading = true; // To track loading state
  products: Product[] = []; // Array to hold products fetched from Firestore

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private cdr: ChangeDetectorRef,
    private firestore: AngularFirestore // Inject Firestore
  ) {}

  ngOnInit() {
    // Listen to authentication state changes
    this.afAuth.authState.subscribe(user => {
      console.log('User object from Firebase:', user);

      if (user) {
        // User authentication logic
        if (user.displayName) {
          this.currentUser = user.displayName;
        } else {
          this.firestore.collection('users').doc(user.uid).get().subscribe(doc => {
            if (doc.exists) {
              const userData = doc.data() as User;  // Cast doc.data() to the User interface
              const firstName = userData.firstName || '';
              const lastName = userData.lastName || '';
              this.currentUser = `${firstName} ${lastName}`.trim() || user.email || 'User';
            } else {
              this.currentUser = user.email || 'User';
            }
          });
        }
      } else {
        this.currentUser = null;
        this.router.navigate(['/login']);
      }

      // Fetch products from Firestore
      this.firestore.collection<Product>('products').get().subscribe(snapshot => {
        this.products = snapshot.docs.map(doc => doc.data());
        this.isLoading = false;
        this.cdr.detectChanges();  // Trigger change detection manually after fetching data
      });
    });
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error during sign-out:', error);
    });
  }
}
