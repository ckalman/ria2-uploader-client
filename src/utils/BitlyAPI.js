import request from 'superagent/lib/client';
import AuthStore from '../stores/AuthStore';

export default {

    getInfo: (shortUrl) => {
        return new Promise((resolve, reject) => {
            request
                .get(shortUrl)
                .set('Authorization', 'Bearer ' + AuthStore.getJwt())
                .end((err, response) => {
                     if(response.status != 200){
                        reject(response.body.message);
                    }
                    resolve(JSON.parse(response.text));
                })
        });
    },
    short: (apiUrl, longUrl) =>{
        return new Promise((resolve, reject) => {
            request
                .post(apiUrl)
                .send({long_url: longUrl})
                .set('Authorization', 'Bearer ' + AuthStore.getJwt())
                .end((err, response) => {
                    if(response.status != 200){
                        reject(response.body.message);
                    }
                    resolve(JSON.parse(response.text));
                })
        });
    }
}