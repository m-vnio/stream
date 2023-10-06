import app from "./config.js";
import { getFirestore, collection, doc, addDoc, getDoc, getDocs,  deleteDoc, updateDoc, onSnapshot, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const db    = getFirestore(); 

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

    get (id = false ){
        if(id) return getDoc(doc(db, this.db_name, id))
        else return getDocs(collection(db, this.db_name))
    }
 
    getAll (filter = {}){
        const Query = [collection(db, this.db_name)]

        if(filter.where)    Query.push(...filter.where.map(filterWhere => where(...filterWhere)))
        if(filter.orderBy)  Query.push(orderBy(...filter.orderBy))
        if(filter.limit)    Query.push(limit(filter.limit)) 

        return getDocs(query(...Query))
    }
}

class dbFirebaseRealtime {
    constructor(db_name){
        this._query = [collection(db, db_name)]
        this._unsubscribe = null
    }

    query(filter = {}){
        if(filter.where)    this._query.push(...filter.where.map(filterWhere => where(...filterWhere)))
        if(filter.orderBy)  this._query.push(orderBy(...filter.orderBy))
        if(filter.limit)    this._query.push(limit(filter.limit))
    }

    subscribe(callback){
        if (typeof callback === "function") {
            this._unsubscribe   = onSnapshot(query(...this._query), callback)
            return this._unsubscribe
        }
    }

    unsubscribe(){
        //console.log(this._unsubscribe);
        if(this._unsubscribe) this._unsubscribe()
    }
}

export { dbFirebase, dbFirebaseRealtime }
