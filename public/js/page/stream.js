import { dbFirebase } from "../firebase/data.js"

import header from "../components/header.js"
import video from "../components/video.js"
import chat from "../components/chat.js"

export default (params)=>{

    const db    = new dbFirebase('stream_user')
    const user  = json(localStorage.getItem('user'))

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
 
    const loadVerify = async ()=>{
        elementItem.remove()
        const DataVerify = await db.getAll({ where : [['id_user', '==', user.uid], ['id_stream', '==', params.id]],limit : 1 })

        const Data = []
        DataVerify.forEach( doc => Data.push(doc.data()));

        if(Data.length != 0){
            elementLoad.remove()
            elementItem.prepend(header())
            elementItemVideoChat.append(video(elementItemVideoChat), chat()) 
            
            ElementComponent.append(elementItem)
        } else {
            ElementComponent.innerHTML = `
                <div class="div_13e1BW1">
                    <div class="div_Hu171ix"><h3>~ stream no encontrado ~</h3></div>
                </div>
            ` 
        }
    }

    //loadVerify()
    
    elementLoad.remove()
    elementItem.prepend(header())
    elementItemVideoChat.append(video(elementItemVideoChat), chat()) 
    
    document.getElementById('main').append(ElementComponent)
}
