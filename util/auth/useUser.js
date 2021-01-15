import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import cookies from 'next-cookies'
import loadDB from '../../firebase.config'

const useUser = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const firebase = loadDB();
  const signout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        cookies.remove('auth')
        router.push({ pathname: '/account-users/information', query: router.query })

      })
      .catch((e) => {
        console.error(e)
      })
  }
  const signin = async user => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        // Sign-out successful.
        //cookies.remove('auth')

        //let data = { email: user.email, token: result.refreshToken, isLoguin: true, id: result.user.uid };

        document.cookie = `UID=${result.user.uid}; path=/`;
        document.cookie = `authsession=1; path=/`;
        router.push({ pathname: '/account-users/information', query: router.query })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const createUser = async user => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        // Sign-out successful.
        //cookies.remove('auth')
        
        router.push({ pathname: '/account-users/information', query: router.query })
        let data = { email: user.email, isLoguin: true, id: result.user.uid, firtname: user.firtname, lastname: user.lastname };
        
        firebase.firestore().collection('dp_users').doc(result.user.uid).set(data).then(snapshot => {
          console.log(snapshot);
          
          document.cookie = `UID=${result.user.uid}; path=/`;
          document.cookie = `authsession=1; path=/`;
          
        });
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const stateChange = user => {
    /*firebase.auth().onAuthStateChanged(function (user) {
      setUser(user);
      cookie.set('auth', { email: user.email, token: user.refreshToken, isLoguin: true }, {
        expires: 1,
        path: '/account-users/login'
      });
    });*/
    setUser(user);
  }



  useEffect(() => {
    /*const cookie = cookies.get('auth')
    console.log(cookie);
    if (!cookie) {
      router.push('/account-users/login')
      return 
    }*/
    //setUser(JSON.parse(cookie))
    //cookies.set('auth', JSON.stringify(user))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return { user, signout, signin, createUser }
}

export { useUser }