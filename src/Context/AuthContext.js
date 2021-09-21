import React, { useContext, useState, useEffect } from "react"
import { auth } from "../Firebase"
import { db } from "../Firebase"
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  var [staff, setstaff] = useState([])
  
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  function stafflogin(phone,password){
    db.collection('Roles').where('phonenumber', '==', phone).get().then((value)=>{
      var data= value.docs;
      data.forEach(item=>{
        console.log("item.data",item.data());
        if(item.data().password===password){
          staff= item.data();
        }
      })
      console.log(staff);
    })
  }

  function logout() {
    console.log("user:",currentUser);
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    staff,
    stafflogin,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
