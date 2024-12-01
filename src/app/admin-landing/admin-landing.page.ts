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
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.page.html',
  styleUrls: ['./admin-landing.page.scss'],
})

export class AdminLandingPage implements OnInit {
  currentUser: string | null = null; // To hold the user's name
  isLoading = true; // To track loading state

  // Properties for product form
  productName: string = '';
  price: number | null = null;
  imageFile: File | null = null;

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

  // Handle form submission for adding a product
  onSubmit() {
    if (this.productName && this.price && this.imageFile) {
      // Prepare product object
      const newProduct = {
        name: this.productName,
        price: this.price,
        image: this.imageFile ? this.imageFile.name : '',  // Save file name or image URL if uploaded to Firebase Storage
        createdAt: new Date(),  // Optionally, add a timestamp
      };
  
      // Add product to Firestore collection (Firestore will automatically create the 'products' collection if it doesn't exist)
      this.firestore.collection('products').add(newProduct).then(() => {
        console.log('Product added successfully!');
        // Optionally, reset the form or give feedback to the user
        this.productName = '';
        this.price = null;
        this.imageFile = null;
      }).catch((error) => {
        console.error('Error adding product: ', error);
      });
    } else {
      console.error('Form is incomplete');
    }
  }

  // Handle file change for product image
  onFileChange(event: any) {
    this.imageFile = event.target.files[0];  // Set imageFile to the selected file
    console.log('File selected:', this.imageFile);
  }
}