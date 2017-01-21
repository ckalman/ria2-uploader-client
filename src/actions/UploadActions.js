import AppDispatcher from '../dispatcher/AppDispatcher';
import UploadConstants from '../constants/UploadConstants';
import UploadAPI from '../utils/UploadAPI';
import config from 'config';

export default {
    upload: (file) => {
        UploadAPI
            .upload(`${config.BASE_URL}/uploads`, file).then(result => {
                AppDispatcher.dispatch({
                    actionType: UploadConstants.UPLOAD_FILE,
                    file: result
                });
            }).catch(error => {
                AppDispatcher.dispatch({
                    actionType: UploadConstants.UPLOAD_FILE_ERROR,
                    message: error
                });
            });
    },
    getAll: () => {
        UploadAPI
            .getAll(`${config.BASE_URL}/uploads`).then(result => {
                AppDispatcher.dispatch({
                    actionType: UploadConstants.FILES,
                    files: result
                });
            }).catch(error => {
                console.error(error);
                AppDispatcher.dispatch({
                    actionType: UploadConstants.FILES_ERROR,
                    message: error
                });
            });
    },
    remove: (uuid) => {
        UploadAPI
            .remove(`${config.BASE_URL}/uploads/${uuid}`).then(result => {
                AppDispatcher.dispatch({
                    actionType: UploadConstants.FILES_REMOVE,
                    files: result
                });
            }).catch(error => {
                AppDispatcher.dispatch({
                    actionType: UploadConstants.FILES_REMOVE_ERROR,
                    message: error
                });
            });
    }

}