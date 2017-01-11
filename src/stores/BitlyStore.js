import AppDispatcher from '../dispatcher/AppDispatcher';
import BitlyConstants from '../constants/BitlyConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _links = [];
let _link = {};
let _info = {};

function setLinks(links) {
    _links = links;
}

function setLink(link) {
    _link = link;
}

function setInfo(info) {
    _info = info;
}

class BitlyStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    getLinks() {
        return _links;
    }

    getLink() {
        return _link;
    }

    getInfo() {
        return _info;
    }

}

const BitlyStore = new BitlyStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
BitlyStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.actionType) {
        case BitlyConstants.BITLY_INFO:
            setInfo(action.info);
            BitlyStore.emitChange();
            break
        case BitlyConstants.BITLY_INFO_ERROR:
            alert(action.message);
            BitlyStore.emitChange();
            break
        case BitlyConstants.BITLY_SHORTEN:
            setLink(action.link);
            BitlyStore.emitChange();
            break
        case BitlyConstants.BITLY_SHORTEN_ERROR:
            alert(action.message);
            BitlyStore.emitChange();
            break

        default:
    }

});

export default BitlyStore;