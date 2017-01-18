import AppDispatcher from '../dispatcher/AppDispatcher';
import UploadConstants from '../constants/UploadConstants';
import UploadAPI from '../utils/UploadAPI';
import config from 'config';

export default {
    upload: (file) => {
        UploadAPI
            .upload(`${config.BASE_URL}/upload/file`, file).then(reslut => {
                AppDispatcher.dispatch({
                    actionType: UploadConstants.UPLOAD_FILE,
                    file: file
                });
            }).catch(error =>{
                AppDispatcher.dispatch({
                    actionType: UploadConstants.UPLOAD_FILE_ERROR,
                    message: error
                });
            });
    }
}