import socket from "../pwa/socket.js";

export default ()=>{

    const params = JSON.parse(sessionStorage.getItem('params'))
    const auth      = ls('auth').data({}).push(true, true)

    const ElementComponent = createHTML(`<div class="div_82gU7"><span style="color:#ffffff">❤️</span></div>`)

    const query = new findElement(ElementComponent)

    const child = query.get('span')
    child.remove()

    const dispatchUpdateVideoHistory = new CustomEvent('updateVideoHistory')
    const setVideoHistory =(message = '')=>{
        const videoHistory = ls('video-history').data([]).push(true, true)
        videoHistory.unshift({ message, datetime : Date.now().toString() })
        ls('video-history').data(videoHistory.slice(0, 50)).put(true)
        dispatchEvent(dispatchUpdateVideoHistory)
    }

    const defSetEmoji = message =>{
        setVideoHistory(message)
        const elementoEmoji         = child.cloneNode(true);
        elementoEmoji.textContent   = message
        if(ElementComponent.children.length > 0){
            elementoEmoji.style[ rand(1) ? 'left' : 'right' ] = `${ rand(60) }%`
        } 
        ElementComponent.append(elementoEmoji)
        setTimeout(()=> elementoEmoji.remove(), 2000)

    }

    addRemoveEventListenerHashchange(window, 'custom-event-emojis-mostrar', e => {
        const message = e.detail.message
        defSetEmoji(message)

        const data = {
            id_stream    : params.id,
            id_user      : auth.uid,
            datetime_add : Date.now().toString(),
            message
        }

        socket.emit('emoji', JSON.stringify(data))
    }) 
 

    socket.on('emoji', data => {
        data = JSON.parse(data)
        if(data.id_stream == params.id){
            defSetEmoji(data.message)
        }
    })
    
    return ElementComponent
}