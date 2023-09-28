import app from "./config.js"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"

const auth = getAuth();

const registerFirebase =(data = {})=>{

    if(data.email === '') return
    if(data.password === '') return
    createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

}

const loginFirebase =(data = {})=>{

    if(data.email === '') return
    if(data.password === '') return 
  
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

} 

const checkLoginFirebase = async (callback) =>{
    if(typeof callback == 'function'){
      onAuthStateChanged(auth, callback)
    }
}

const logoutFirebase =()=>{
    signOut(auth)
}
 
export { registerFirebase, loginFirebase, checkLoginFirebase, logoutFirebase }