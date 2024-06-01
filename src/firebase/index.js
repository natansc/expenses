import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const storage = getStorage(firebaseApp)
const database = getDatabase(firebaseApp)

export { firebaseApp, auth, storage, database }

// Função de instalação para Vue
export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$firebase', {
    get () {
      return {
        app: firebaseApp,
        auth,
        storage,
        database
      }
    }
  })
}
