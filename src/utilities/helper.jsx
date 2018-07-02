import firebase from 'firebase';

export function get_host(url){
    return url.replace(/(\w+:\/\/(w{3}.)?)?([^/]+).*$/,'$3');
}

export const arrayToObject = (arr, keyField) =>
    Object.assign({}, ...arr.map(item => item && !item.deleted && !item.dead && ({[item[keyField]]: item})));

const config = {
    databaseURL: 'https://hacker-news.firebaseio.com'
};

const app = firebase.initializeApp(config);
export const db = app.database().ref('v0');


export function setTitle(home, page){
    home!==undefined ?
        document.title = 'Hacker News - ' + page :
        document.title = 'Hacker News';
}

let cacheIds = JSON.parse(sessionStorage.getItem('cacheIds')) || {};

export const saveIds = (name, ids) => {
    cacheIds = {...cacheIds, [name]:ids, [`${name} timeStamp`]: Date.now()};
    sessionStorage.setItem('cacheIds', JSON.stringify(cacheIds));
};

export function fetchingIds(name) {
    let isOld = false;
    const now = Date.now();
    let cache = sessionStorage.getItem('cacheIds');

    if(cacheIds[`${name} timeStamp`] && Math.round((now - cacheIds[`${name} timeStamp`])/1000 > 59)){
        isOld = true;
    }

    if(cache && !isOld){
        let data = JSON.parse(cache);
        if(data === null) return undefined;
        if(data[name]){
            return Promise.resolve(data[name]);
        }
    }

    return new Promise(resolve=>{
        db.child(name).once('value').then(snapshot => {
            const ids = snapshot.val();
            saveIds(name,ids);
            resolve(ids);
        });
    });
}

let cacheItems = JSON.parse(sessionStorage.getItem('cacheItems')) || {};

export const saveItems = (item) => {
    // cacheItems = {...cacheItems, ...item};
    item.map(i=> cacheItems[i.id] = i);
    // cacheItems = {...cacheItems, [item.id]: item};
    sessionStorage.setItem('cacheItems', JSON.stringify(cacheItems));
};

export function fetchItem(type, id) {
    let isOld = false;
    const now = Date.now();
    if(cacheItems[id] && Math.round((now - cacheItems[id].timeStamp)/1000) > 59){
        isOld = true;
    }

    if(cacheItems[id] && !isOld){
        return Promise.resolve(cacheItems[id]);
    }else{
        return new Promise(resolve=>{
            db.child(`${type}/${id}`).once('value').then(snapshot => {
                let item = Object.assign({}, snapshot.val(), {visible: true, timeStamp: Date.now()});
                resolve(item);
            });
        });
    }
}

export function fetchItems(ids) {
    return Promise.all(ids.map(id => fetchItem('item', id)));
}

export function fetchItemsFromTypes(name, page) {
    return fetchingIds(name).then(ids=>fetchItems(ids.slice(30*(page-1),30*page)));
}
