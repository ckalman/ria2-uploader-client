import AppDispatcher from '../dispatcher/AppDispatcher';
import BitlyConstants from '../constants/BitlyConstants';
import BitlyAPI from '../utils/BitlyAPI';
import config from 'config';

export default {

    getInfo: (url) => {
        BitlyAPI
        .getInfo(`${config.BASE_URL}/bitly/info?url=${url}`)
        .then(linkInfo =>{
            AppDispatcher.dispatch({
                actionType: BitlyConstants.BITLY_INFO,
                info: linkInfo
            })
        }).catch(message => {
            AppDispatcher.dispatch({
                actionType: BitlyConstants.BITLY_INFO_ERROR,
                message: message
            })
        })
    },
    short: (longUrl) => {
        BitlyAPI
        .short(`${config.BASE_URL}/bitly/shorten`, longUrl)
        .then(shortLink =>{
            AppDispatcher.dispatch({
                actionType: BitlyConstants.BITLY_SHORTEN,
                link: shortLink
            })
        }).catch(message => {
            console.log(message);
            AppDispatcher.dispatch({
                actionType: BitlyConstants.BITLY_SHORTEN_ERROR,
                message: message
            })
        })
    },
    getAll: () =>{
        BitlyAPI
            .getAll(`${config.BASE_URL}/bitly`).then(result =>{
            AppDispatcher.dispatch({
                    actionType: BitlyConstants.BITLY_LIST,
                    files: result
                });
            }).catch(error =>{
                console.error(error);
                AppDispatcher.dispatch({
                    actionType: BitlyConstants.BITLY_LIST_ERROR,
                    message: error
                });
            });
    }
   

}