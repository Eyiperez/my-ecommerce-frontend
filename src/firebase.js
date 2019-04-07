import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAIOD6hdepb0cmSPtCdSrHe47ZTgcVGZ6w",
    authDomain: "my-ecommerce-app-ep.firebaseapp.com",
    databaseURL: "https://my-ecommerce-app-ep.firebaseio.com",
    projectId: "my-ecommerce-app-ep",
    storageBucket: "my-ecommerce-app-ep.appspot.com",
    messagingSenderId: "683837768479"
  };

app.initializeApp(config);

export default app;