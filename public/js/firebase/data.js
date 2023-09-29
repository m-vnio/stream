import app from "./config.js";
import { getFirestore, collection, doc, addDoc, getDoc, getDocs,  deleteDoc, updateDoc, onSnapshot, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const db    = getFirestore(); 

const makeOnSnapshot =(callback, queries)=>{
    if (typeof callback === "function") {
        const unsubscribe   = onSnapshot(queries, callback)
        return unsubscribe
    }
    return false
}

const streamRealtime =(callback, id = false)=>{
    const db_name = 'stream'
    const queries = id ? query(collection(db, db_name), where("id", "==", id), limit(1)) : query(collection(db, db_name), limit(5))
    return makeOnSnapshot(callback, queries)
}

const emojiRealtime = (callback, id) =>{
    const db_name = 'stream_emoji'
    const queries = query(collection(db, db_name), where("id_stream", "==", id), orderBy("datetime_add", "desc"), limit(1));

    return makeOnSnapshot(callback, queries)
}
 
const chatRealtime = (callback, id_stream) => {
    const db_name = 'stream_chat'
    const queries = query(collection(db, db_name), where("id_stream", "==", id_stream), orderBy("datetime_add", "desc"), limit(50));
    return makeOnSnapshot(callback, queries)  
}

class dbFirebase {
    constructor(db_name){
        this.db_name = db_name
    }

    add(data = {}){
        addDoc(collection(db, this.db_name), data)
    }

    edit(id = false, data = {}){
        if(id) updateDoc(doc(db, this.db_name, id), data)
    }

    drop(id = false){
        if (id) deleteDoc(doc(db, this.db_name, id))
    }

    get (id = false){
        if(id) return getDoc(doc(db, this.db_name, id))
        else return getDocs(collection(db, this.db_name))
    }
}

export { dbFirebase, streamRealtime, chatRealtime, emojiRealtime }
   