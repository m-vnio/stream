import { checkLoginFirebase, logoutFirebase } from "../firebase/auth.js";
import { dbFirebase } from "../firebase/data.js";

import inicio from "../page/inicio.js";
import stream from "../page/stream.js";
import streamId from "../page/streamId.js";
import login from "../page/login.js";
import register from "../page/register.js";

// import setting from "../page/setting.js";
import apariencia from "../page/apariencia.js";
import user from "../page/user.js";
import stiker from "../page/stiker.js";
import stikerIndex from "../page/stikerIndex.js";
import count from "../page/count.js";

import pageNotFound from "../page/pageNotFound.js";

export default ()=>{

    const db = new dbFirebase('user_data')

    const main  = createHTML(`<main id="main"></main>`) 
    document.getElementById('root').append(main)

    const pageWithLogin     = ['', 'stream', 'config', 'user']
    const pageWithoutLogin  = ['login', 'register']
 
    const withLogin = (session, namePage) =>{
        if(pageWithLogin.includes(namePage)){
            if(!session) location.hash = '#/login'
        }
    }

    const withoutLogin = (session, namePage) =>{
        if(pageWithoutLogin.includes(namePage)){
            if(session) location.hash = '#/'
        } 
    }

    checkLoginFirebase((user)=> {
        if(user) {
            //
            const userLocal = ls('user').data(false).push(true, true)
            const data      = { uid : user.uid, email : user.email }

            if(userLocal){
                if(user.uid != userLocal.uid){
                    logoutFirebase()
                    ls('user').drop()
                    location.hash = '#/login'
                } else {
                    (async ()=> {
                        const data_user = await db.getAll({ where  : [[ "uid", "==", user.uid ]], limit : 1})
                        data_user.forEach(doc => ls('user_data').data({ id : doc.id, ...doc.data() }).put(true));
                    })()
                }
            } else {
                ls('user').data(data).put(true)
                location.hash = '#/'
            }
        } else {
            ls('user').drop()
            location.hash = '#/login'
        }
    })

    const Routes = new Hash()

    Routes.param('/', inicio) 
    Routes.param('/login', login) 
    Routes.param('/register', register) 
    Routes.param('/stream', stream)
    Routes.param('/stream/:id', streamId)
    // Routes.param('/setting', setting)
    Routes.param('/apariencia', apariencia)
    Routes.param('/user', user)
    Routes.param('/stiker', stiker)
    Routes.param('/stiker/:index', stikerIndex)
    Routes.param('/count', count)
    Routes.param('*', pageNotFound)
    
    Routes.dispatch(()=> {
        main.innerHTML = ''

        const namePage  = location.hash.split('/')[1] ?? ''
        const session   = json(localStorage.getItem('user') ?? 'false')

        withLogin(session, namePage)
        withoutLogin(session, namePage)
    })
}