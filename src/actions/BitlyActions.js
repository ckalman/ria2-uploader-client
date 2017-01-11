import AppDispatcher from '../dispatcher/AppDispatcher';
import BitlyConstants from '../constants/BitlyConstants';
import BitlyAPI from '../utils/BitlyAPI';

export default {

    getInfo: (id) => {
        BitlyAPI
        .getInfo('http://localhost:3001/api/v1/bitly/info/' + id)
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
        .short('http://localhost:3001/api/v1/bitly/shorten', longUrl)
        .then(shortLink =>{
            AppDispatcher.dispatch({
                actionType: BitlyConstants.BITLY_SHORTEN,
                link: shortLink
            })
        }).catch(message => {
            AppDispatcher.dispatch({
                actionType: BitlyConstants.BITLY_SHORTEN_ERROR,
                message: message
            })
        })
    }
}