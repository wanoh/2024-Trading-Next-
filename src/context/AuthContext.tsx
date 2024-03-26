// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Firebase
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from 'src/configs/firebase'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

function splitEmail(email: string | null) {
  if (email) {
    const atIndex = email.indexOf('@') // Find the index of the @ symbol
    if (atIndex === -1) {
      // If no @ symbol is found, return null
      return null
    }
    const username = email.slice(0, atIndex) // Get the substring before the @ symbol

    return username
  }

  return null
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        onAuthStateChanged(auth, user => {
          if (user) {
            setLoading(false)
            console.log('@LoggedIn User', user)
            const { email: authEmail, uid: userId, photoURL } = user

            const { accessToken } = user.stsTokenManager

            window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)

            const username = splitEmail(authEmail)

            const userData = {
              id: userId,
              email: authEmail,
              role: 'admin',
              username,
              avatar: photoURL
            }
            setUser(userData)
          } else {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          }
        })
      } else {
        setLoading(false)
      }

      // if (storedToken) {
      //   setLoading(true)
      //   await axios
      //     .get(authConfig.meEndpoint, {
      //       headers: {
      //         Authorization: storedToken
      //       }
      //     })
      //     .then(async response => {
      //       setLoading(false)
      //       console.log('@Response from storedToken', { response })
      //       setUser({ ...response.data.userData })
      //     })
      //     .catch(() => {
      //       localStorage.removeItem('userData')
      //       localStorage.removeItem('refreshToken')
      //       localStorage.removeItem('accessToken')
      //       setUser(null)
      //       setLoading(false)
      //       if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
      //         router.replace('/login')
      //       }
      //     })
      // } else {
      //   setLoading(false)
      // }
    }
    console.log('@No LoggedIn User')
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const { email, password, rememberMe } = params
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      const userCredential = response.user
      const { email: authEmail, uid: userId, photoURL } = userCredential

      const { accessToken } = userCredential.stsTokenManager
      const username = splitEmail(authEmail)

      const userData = {
        id: userId,
        email: authEmail,
        role: 'admin',
        username,
        avatar: photoURL
      }

      rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken) : null
      const returnUrl = router.query.returnUrl

      setUser(userData)

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
    } catch (error) {
      console.log('Error Logging in', error)
      if (errorCallback) errorCallback(error)
    }

    // axios
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async response => {
    //     params.rememberMe
    // ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
    //       : null
    //     const returnUrl = router.query.returnUrl

    //     setUser({ ...response.data.userData })
    //     params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

    //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

    //     router.replace(redirectURL as string)
    //   })

    //   .catch(err => {
    //     if (errorCallback) errorCallback(err)
    //   })
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.')
        setUser(null)
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem(authConfig.storageTokenKeyName)
        router.push('/login')
      })
      .catch(error => {
        console.log('Error signing out user', error)
      })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
