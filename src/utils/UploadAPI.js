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
                            console.log(response);
                            resolve(response);
                        }else{
                            console.error("uploader : ", response);
                            reject(response.body.message);
                        }                        
                    }else{
                        reject('Please wait 30s before upload or reboot the server !');
                    }
                });
        });
    }
}