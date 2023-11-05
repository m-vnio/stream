import inicio from "../page/inicio.js";
import stream from "../page/stream.js";
import streamLink from "../page/streamLink.js";
import streamLinkId from "../page/streamLinkId.js";
import streamId from "../page/streamId.js";
import login from "../page/login.js";

// import setting from "../page/setting.js";
import apariencia from "../page/apariencia.js";
import user from "../page/user.js";
import stiker from "../page/stiker.js";
import count from "../page/count.js";

import notification from "../page/notification.js";

import pageNotFound from "../page/pageNotFound.js";

import test from "../page/test.js";

export default ()=>{

    const api = (uri = '') => ls('api').get() + uri
     
    const main  = createHTML(`<main id="main"></main>`) 
    document.getElementById('root').append(main)

    const defAuth = auth =>{
        
        const namePage  = location.hash.split('/')[1] ?? ''
        ls('auth').data(auth).put(true)

        if(auth) {
            if(['login', 'register'].includes(namePage)) location.hash = '#/' 
        } else {
            if(['', 'stream', 'config', 'user', 'apariencia', 'count', 'stiker'].includes(namePage)) location.hash = '#/register' 
        }

    } 

    const Routes = new Hash()

    Routes.param('/', inicio) 

    Routes.param('/test', test)

    Routes.param('/login', login) 
    Routes.param('/register', login) 
    Routes.param('/stream', stream)
    Routes.param('/stream/link', streamLink)
    Routes.param('/stream/link/:id', streamLinkId)
    Routes.param('/stream/:id', streamId)
    // Routes.param('/setting', setting)
    Routes.param('/apariencia', apariencia)
    Routes.param('/user', user)
    Routes.param('/stiker', stiker)
    Routes.param('/count', count)
    Routes.param('/notification', notification)
    Routes.param('*', pageNotFound)
    
    Routes.dispatch(()=> {
        const auth = ls('auth').data(null).push(true, true)

        main.innerHTML = ''
        defAuth(auth)

        datapi.get(api(`/stream/api/token?token=${ auth ? auth.token : 'null' }`)).then(data => {
            if(JSON.stringify(data) == JSON.stringify(auth)) return
            defAuth(data)
        })
    })
}