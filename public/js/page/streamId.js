import header from "../components/header.js"
import video from "../components/video.js"
import chat from "../components/chat.js"

export default (params)=>{
    const api = (uri = '') => ls('api').get() + '/stream/app/trigger/stream.php' + uri

    const auth = ls('auth').data({}).push(true, true)  

    const ElementComponent = createHTML(`
        <div class="div_M08rV">
            <div class="contenedor_loader"><span class="loader"></span></div>
            <div class="div_jpEIOZm"><div class="div_U09zC"></div></div>
        </div>
    `) 

    const query = new findElement(ElementComponent)

    const elementLoad = query.get('.contenedor_loader')
    const elementItem = query.get('.div_jpEIOZm')
    const elementItemVideoChat = query.get('.div_U09zC')
 
    const dataRender = (Data)=>{ 
        ls('stream').data(Data).put(true)

        if(Data){
            elementLoad.remove()
            elementItem.prepend(header())
            elementItemVideoChat.append(video(elementItemVideoChat), chat()) 
            ElementComponent.append(elementItem)

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.controller.postMessage(JSON.stringify({
                    type : 'stream',
                    pathhash : location.pathname + location.hash
                }))
            }
        } else {
            ElementComponent.innerHTML = `
                <div class="div_13e1BW1">
                    <div class="div_Hu171ix"><h3>~ stream no encontrado ~</h3></div>
                </div>
            ` 
        }
    }

    const dataLoad = ()=>{
        ElementComponent.append(elementLoad)
        elementItem.remove()

        datapi.get(api(`?id=${ params.id }&token=${ auth.token }`)).then(dataRender)
    }
    
    dataLoad()

    document.getElementById('main').append(ElementComponent)
}
