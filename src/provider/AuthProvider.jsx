import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import axios from 'axios'
import { app } from '../firebase/firebase.config'

export const AuthContext = createContext(null)

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (user,name,imageUrl,phonenumber) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: imageUrl,
      phoneNumber: phonenumber
    })
  }
  const updateUserProfile1 = (user,name,phonenumber) => {
    return updateProfile(user, {
      displayName: name,
      phoneNumber: phonenumber
    })
  }

  const DeleteUser = ()=>{
    return deleteUser(auth.currentUser)
  }


  const verifyEmail = ()=>{
    return sendEmailVerification(auth.currentUser)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      if(currentUser){
        setLoading(true)
        axios.post('http://localhost:5000/jwt',{email:createUser?.email})
        .then(data=>{
          const token = data.data.token;
          localStorage.setItem('access-token',token)
          setLoading(false)
      })
        
  }else{
      localStorage.removeItem('access-token')
      }
    })
    return () => {
      return unsubscribe()
    }
  }, [])
  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    verifyEmail,
    updateUserProfile1,
    DeleteUser
  }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;