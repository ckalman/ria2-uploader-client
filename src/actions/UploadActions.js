import AppDispatcher from '../dispatcher/AppDispatcher';
import UploadConstants from '../constants/UploadConstants';
import UploadAPI from '../utils/UploadAPI';
import config from 'config';

export default {
    upload: (file) => {
        UploadAPI
            .upload(`${config.BASE_URL}/upload`, file).then(result => {
                AppDispatcher.dispatch({
                    actionType: UploadConstants.UPLOAD_FILE,
                    file: result.body
                });
            }).catch(error =>{
                AppDispatcher.dispatch({
                    actionType: UploadConstants.UPLOAD_FILE_ERROR,
                    message: error
                });
            });
    }
}