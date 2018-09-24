import firebase from 'firebase';
import { store } from '../utilities/store';

const config = {
    databaseURL: 'https://hacker-news.firebaseio.com'
};

const app = firebase.initializeApp(config);
export const db = app.database().ref('v0');

export function fetchingIds(name) {
    let isOld = false;
    const now = Date.now();
    const cacheIds = JSON.parse(sessionStorage.getItem('cacheIds'));
    if(cacheIds && cacheIds[`${name} timeStamp`] && Math.round((now - cacheIds[`${name} timeStamp`])/1000 > 59)){
        isOld = true;
    }

    if(cacheIds && !isOld){
        if(cacheIds === null) return undefined;
        if(cacheIds[name]){
            return Promise.resolve(cacheIds[name]);
        }
    }

    return new Promise(resolve=>{
        db.child(name).once('value').then(snapshot => {
            const ids = snapshot.val();
            store.saveIds(name, ids);
            resolve(ids);
        });
    });

    // const URL = `https://hacker-news.firebaseio.com/v0/${name}.json`;
    //
    // return fetch(URL).then(response => {
    //     return response.json();
    // }).then(ids=>{
    //     saveIds(name,ids);
    //     return ids;
    // });
}

export function fetchItem(type, id) {
    // let url = `https://hacker-news.firebaseio.com/v0/${type}/${id}.json`;
    let isOld = false;
    const now = Date.now();
    const cacheItems = JSON.parse(sessionStorage.getItem('cacheItems'));
    if(cacheItems && cacheItems[id] && Math.round((now - cacheItems[id].timeStamp)/1000) > 59){
        isOld = true;
    }

    if(cacheItems && cacheItems[id] && !isOld){
        return Promise.resolve(cacheItems[id]);
    }else{
        // return fetch(url).then(response => response.json()).then(item=>{
        //     return Object.assign({}, item, {visible: true, timeStamp: Date.now()});
        // });
        return new Promise(resolve=>{
            db.child(`${type}/${id}`)
                .once('value')
                .then(snapshot => {
                    let item = Object.assign({}, snapshot.val(), {visible: true, timeStamp: Date.now()});
                    resolve(item);
                });
        });
    }
}

export function fetchItems(ids) {
    return Promise.all(ids.map(id => fetchItem('item', id)));
}

export function fetchItemsFromTypes(name, page, itemsPerPage) {
    return fetchingIds(name)
        .then(ids => fetchItems(ids.slice(itemsPerPage*(page-1),itemsPerPage*page)));
}

export function watchList (type, cb) {
    let first = true;
    const ref = db.child(type);
    const handler = snapshot => {
        if (first) {
            first = false;
        } else {
            cb(snapshot.val());
        }
    };
    ref.on('value', handler);
    return () => {
        ref.off('value', handler);
    };
}
