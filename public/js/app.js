import style from "./style.js"
//import style from "./setting/style.js"
import routes from "./src/routes.js"
import navigate from "./components/navigate.js"

import { dbFirebase } from "./firebase/data.js"

import serverWorker from "./pwa/serverWorker.js"

export default ()=>{

    //serverWorker()
    
    const contextmenuIncludeTarget = ['INPUT', 'TEXTAREA']
    const db = new dbFirebase('user_data')

    style()

    routes()
    navigate() 

    window.addEventListener('contextmenu', e => {
        if(!contextmenuIncludeTarget.includes(e.target.tagName)){
            e.preventDefault()
        }
    })

    addRemoveEventListener(window, 'click', ()=> localStorage.setItem('click', 'true'))
    window.addEventListener("beforeunload", ()=> {
        db.edit('RDx3CQFnwU4mPxqkMRVD', {
            descripcion : 'adios'
        })
    })
} 

