import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Import Firestore

// Define the interface for user data
interface User {
  firstName: string;
  lastName: string;
  email: string;
  displayName?: string;  // Optional field for Firebase Auth displayName
}

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.page.html',
  styleUrls: ['./storefront.page.scss'],
})
export class StorefrontPage implements OnInit {
  currentUser: string | null = null; // To hold the user's name
  isLoading = true; // To track loading state

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
        // First, check if displayName exists in the user object
        if (user.displayName) {
          // If displayName exists, use it directly
          this.currentUser = user.displayName;
        } else {
          // If no displayName, attempt to use firstName + lastName from Firestore
          this.firestore.collection('users').doc(user.uid).get().subscribe(doc => {
            if (doc.exists) {
              const userData = doc.data() as User;  // Cast to the User interface
              const firstName = userData.firstName || '';
              const lastName = userData.lastName || '';
              this.currentUser = `${firstName} ${lastName}`.trim() || user.email || 'User';
            } else {
              this.currentUser = user.email || 'User'; // Fallback to email if no name in Firestore
            }
            console.log('Current User:', this.currentUser);
          });
        }

        console.log('User Object:', user);
      } else { 
        // If no user is logged in, set currentUser to null and redirect
        this.currentUser = null;
        console.log('No user logged in');
        this.router.navigate(['/login']);
      }

      this.isLoading = false;  // Set loading to false after auth state is set
      this.cdr.detectChanges();  // Trigger change detection manually
    });
  }

  // Log out function
  logOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error during sign-out:', error);
    });
  }
}
