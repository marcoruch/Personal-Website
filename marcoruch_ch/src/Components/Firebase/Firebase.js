
import firebase from 'firebase';
import db_config from './db_config';


firebase.initializeApp(db_config);

export default firebase;