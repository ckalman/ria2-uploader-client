import request from 'superagent/lib/client';
import AuthStore from '../stores/AuthStore';

export default {

    upload: (apiUrl, file) =>{
        return new Promise((resolve, reject) => {
            request
                .post(apiUrl)
                .attach('file', file)
                .set('Authorization', 'Bearer ' + AuthStore.getJwt())
                .end((err, response) =>{
                    if(err){
                        console.error("Upload error : ", err);
                    }
                    if(response != undefined){
                        if(response.status == 200){
                            resolve(response.body);
                        }else{
                            console.error("uploader : ", response);
                            reject(response.body.message);
                        }                        
                    }else{
                        reject('Please wait 30s before upload or reboot the server !');
                    }
                });
        });
    },
    getAll: (apiUrl) => {
        return new Promise((resolve, reject) =>{
            request
                .get(apiUrl)
                .set('Authorization', 'Bearer ' + AuthStore.getJwt())
                .end((err, response) => {
                    if(err){
                        console.error("Get all upload : ", err);
                        reject(response.body.message);
                    }
                    if(response != undefined){
                        resolve(response.body);  
                    }else{
                        reject("Can't get all your uploads please retry or check the logs");
                    }
                });
        });
    },
    remove: (apiUrl) =>{
        return new Promise((resolve, reject) =>{
            request
                .delete(apiUrl)
                .set('Authorization', 'Bearer ' + AuthStore.getJwt())
                .end((err, response) => {
                    if(err){
                        console.error("Remove upload : ", err);
                        reject(response.body.message);
                    }
                    if(response != undefined){
                        resolve(response.body);  
                    }else{
                        reject("Can't remove your upload !");
                    }
                });
        })
    }
}