import style from "./style.js"
//import style from "./setting/style.js"
import routes from "./src/routes.js"
import navigate from "./components/navigate.js"

export default ()=>{

    
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
    // window.addEventListener("beforeunload", function (e) {
    //     const confirmationMessage = "¿Deseas volver a cargar el sitio?";
    //     e.returnValue = confirmationMessage;
    //     return confirmationMessage;
    // })
} 

