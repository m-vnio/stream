import style from "./style.js"
import routes from "./src/routes.js"

export default ()=>{
 
    style()
    routes()

    window.addEventListener('contextmenu', e => e.preventDefault())
    addRemoveEventListener(window, 'click', ()=> localStorage.setItem('click', 'true'))

    // window.addEventListener("beforeunload", function (e) {
    //     const confirmationMessage = "¿Deseas volver a cargar el sitio?";
    //     e.returnValue = confirmationMessage;
    //     return confirmationMessage;
    // })
} 