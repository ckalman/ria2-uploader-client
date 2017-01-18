import AppDispatcher from '../dispatcher/AppDispatcher';
import UploadConstants from '../constants/UploadConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _file = {};

function setFile(file){
    _file = file;
}

class UploadStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    getFile(){
        return _file;
    }

}

const UploadStore = new UploadStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
UploadStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.actionType) {
        case UploadConstants.UPLOAD_FILE:
            setFile(action.file);
            UploadStore.emitChange();
            break
        case UploadConstants.UPLOAD_FILE_ERROR:
            alert(action.message);
            UploadStore.emitChange();
            break

        default:
    }

});

export default UploadStore;