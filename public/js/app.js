import style from "./style.js"
import routes from "./src/routes.js"
import navigate from "./components/navigate.js"

export default ()=>{
 
    style()
    routes()

    document.getElementById('root').append(navigate())

    window.addEventListener('contextmenu', e => e.preventDefault())
    addRemoveEventListener(window, 'click', ()=> localStorage.setItem('click', 'true'))

    // window.addEventListener("beforeunload", function (e) {
    //     const confirmationMessage = "¿Deseas volver a cargar el sitio?";
    //     e.returnValue = confirmationMessage;
    //     return confirmationMessage;
    // })
} 