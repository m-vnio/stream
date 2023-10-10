import { checkLoginFirebase, logoutFirebase } from "../firebase/auth.js";
import inicio from "../page/inicio.js";
import stream from "../page/stream.js";
import login from "../page/login.js";
import register from "../page/register.js";

import setting from "../page/setting.js";
import user from "../page/user.js";
import stiker from "../page/stiker.js";
import stikerIndex from "../page/stikerIndex.js";

export default ()=>{

    const main  = createHTML(`<main id="main"></main>`) 
    document.getElementById('root').append(main)

    const pageWithLogin     = ['', 'stream', 'setting', 'config', 'user']
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
            const userLocal = json(localStorage.getItem('user') ?? 'false')
            const data      = { uid : user.uid, email : user.email }

            if(userLocal){
                if(user.uid != userLocal.uid){
                    logoutFirebase()
                    localStorage.removeItem('user')
                    location.hash = '#/login'
                }
            } else {
                localStorage.setItem('user', json(data, false))
                location.hash = '#/'
            }
        } else {
            localStorage.removeItem('user')
            location.hash = '#/login'
        }
    })

    const Routes = new Hash()

    Routes.param('/', inicio) 
    Routes.param('/login', login) 
    Routes.param('/register', register) 
    Routes.param('/stream/:id', stream)
    Routes.param('/setting', setting)
    Routes.param('/user', user)
    Routes.param('/stiker', stiker)
    Routes.param('/stiker/:index', stikerIndex)
    
    Routes.dispatch(()=> {
        main.innerHTML = ''

        const namePage  = location.hash.split('/')[1] ?? ''
        const session   = json(localStorage.getItem('user') ?? 'false')

        withLogin(session, namePage)
        withoutLogin(session, namePage)
    })
}