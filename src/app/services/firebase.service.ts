import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(private firestore: AngularFirestore) {}

    // Create a new document
    addData(collection: string, data: any) {
        return this.firestore.collection(collection).add(data);
    }

    // Read data
    getData(collection: string) {
        return this.firestore.collection(collection).snapshotChanges();
    }

    // Update a document
    updateData(collection: string, docId: string, data: any) {
        return this.firestore.collection(collection).doc(docId).update(data);
    }

    // Delete a document
    deleteData(collection: string, docId: string) {
        return this.firestore.collection(collection).doc(docId).delete();
    }
}
