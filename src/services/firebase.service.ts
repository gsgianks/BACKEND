import { Injectable } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from '../config/serviceAccountKey';
import { Claims, Privilegios } from 'src/interfaces';

@Injectable()
export class FirebaseService {

    constructor(){
        var admin = require("firebase-admin");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    async getUser(uid:string){
        let userRecord = await getAuth().getUser(uid);
        return userRecord;
    }

    async getUserClaims(token:string){
        let { uid } = await getAuth().verifyIdToken(token);
        let { customClaims } = await getAuth().getUser(uid);
        return customClaims?.privilegios;
    }

    async setUserClaims(uid:string, claims:Claims){
        let resultado:boolean = false;
        await getAuth().setCustomUserClaims(uid, claims)
        .then((userRecord) => {          
            console.log('Successfully setCustomUserClaims');
            resultado = true;
          })
          .catch((error) => {
            console.log('Error setCustomUserClaims:', error);
            resultado =  false;
          });   
        return resultado;
    }

    async createUser(userid:string, email:string){
        let resultado:boolean = false;
        var randomstring   = require('randomstring');
        var pass = randomstring.generate(12);
        console.log('RANDOM: ' + pass);
        await getAuth().createUser({
            uid: userid,
            email: email,
            password: pass,
          })
          .then((userRecord) => {          
            console.log('Successfully created new user:', userRecord.uid);
            resultado = true;
          })
          .catch((error) => {
            console.log('Error creating new user:', error);
            resultado =  false;
          });
        return resultado;
    }

    async deleteUser(userid:string){
      let resultado:boolean = false;           
      await getAuth().deleteUser(userid).then(() => {          
          console.log('Successfully delete user:', userid);
          resultado = true;
        })
        .catch((error) => {
          console.log('Error deleting user:', error);
          resultado =  false;
        });
      return resultado;
  }
}
