// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, getDocs, query, doc, updateDoc, deleteDoc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMt6WbEUq55Z7jYAqta6v6sdzT5_nlWb4",
  authDomain: "blogging-app-44ac7.firebaseapp.com",
  projectId: "blogging-app-44ac7",
  storageBucket: "blogging-app-44ac7.appspot.com",
  messagingSenderId: "258118550881",
  appId: "1:258118550881:web:d5e9a782b5e3f8553fb120",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log("Firebase app initialized:", app);
console.log("Firebase auth initialized:", auth);
console.log("Firebase Firestore initialized:", db);
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);
    await addDoc(collection(db, "users"),{
      uid:user.uid,
      name,
      email,
      authProvider:"local"
    })
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const signin = async(email, password)=>{
  try {
  await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

const logout = async()=>{
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

// Cart CRUD functions
//import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const addToCart = async (userId, item) => {
  try {
    const productId = item.productId.toString(); // Ensure productId is a string

    const cartItemRef = doc(db, `carts/${userId}/items`, productId);

    const cartItemSnapshot = await getDoc(cartItemRef); // Use getDoc() to retrieve document snapshot

    if (cartItemSnapshot.exists()) {
      // Item already exists in cart, update quantity
      const existingData = cartItemSnapshot.data();
      const existingQuantity = existingData.quantity || 0;
      await updateDoc(cartItemRef, {
        quantity: existingQuantity + item.quantity
      });
    } else {
      // Item doesn't exist in cart, add new item
      await setDoc(cartItemRef, {
        ...item,
        quantity: item.quantity
      });
    }

    console.log("Item added to cart:", item);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    alert("Error adding item to cart. Please try again.");
  }
};



const getCartItems = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, `carts/${userId}/items`));
    const cartItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Cart items:", cartItems);
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    alert("Error fetching cart items. Please try again.");
    return [];
  }
};

const updateCartItemQuantity = async (userId, itemId, newQuantity) => {
  try {
    const cartItemRef = doc(db, `carts/${userId}/items/${itemId}`); // Corrected path to include itemId
    await updateDoc(cartItemRef, {
      quantity: newQuantity
    });
    console.log("Cart item quantity updated:", itemId);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    alert("Error updating cart item quantity. Please try again.");
  }
};

const removeFromCart = async (userId, itemId) => {
  try {
    // Ensure itemId is a string and correctly forms the path with userId
    const cartItemRef = doc(db, `carts/${userId}/items/${itemId}`);
    await deleteDoc(cartItemRef);
    console.log("Item removed from cart:", itemId);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    alert("Error removing item from cart. Please try again.");
  }
};

const clearCart = async (userId) => {
  try {
    const cartItemsCollection = collection(db, `carts/${userId}/items`);
    const querySnapshot = await getDocs(cartItemsCollection);
    const batch = writeBatch(db); // Use writeBatch to create a batch operation

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log("Cart cleared for user:", userId);
  } catch (error) {
    console.error("Error clearing cart: ", error);
    alert("Error clearing cart. Please try again.");
  }
};

const addOrder = async (userId, orderDetails) => {
  try {
    const orderRef = await addDoc(collection(db, `orders`), {
      userId,
      ...orderDetails,
      timestamp: new Date(),
    });
    console.log("Order stored with ID:", orderRef.id);
    return orderRef.id;
  } catch (error) {
    console.error("Error adding order: ", error);
    alert("Error adding order. Please try again.");
  }
};


// Export functions
export { auth, db, signin, signup, logout, addToCart, getCartItems, updateCartItemQuantity, removeFromCart, addOrder, clearCart };
