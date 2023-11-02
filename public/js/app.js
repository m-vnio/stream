import style from "./style.js"
//import style from "./setting/style.js"
import routes from "./src/routes.js"
import navigate from "./components/navigate.js"

import serverWorker from "./pwa/serverWorker.js"

export default ()=>{
 

    //serverWorker() 
    const contextmenuIncludeTarget = ['INPUT', 'TEXTAREA']
    
    style()

    routes()
    navigate() 

    window.addEventListener('contextmenu', e => {
        if(!contextmenuIncludeTarget.includes(e.target.tagName)){
            e.preventDefault()
        }
    })

    addRemoveEventListener(window, 'click', ()=> localStorage.setItem('click', 'true'))
} 

