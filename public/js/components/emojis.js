import { dbFirebase, dbFirebaseRealtime } from "../firebase/data.js";

export default ()=>{

    const params = JSON.parse(sessionStorage.getItem('params'))
    const user   = ls('user').get(true)
    const db     = new dbFirebase('stream_emoji') 
    const dbRealtime     = new dbFirebaseRealtime('stream_emoji')
    dbRealtime.query({ where : [["id_stream", "==", params.id]], orderBy : ["datetime_add", "desc"], limit : 1 })

    const ElementComponent = createHTML(`<div class="div_82gU7"><span style="color:#ffffff"></span></div>`)

    const query = new findElement(ElementComponent)

    const child = query.get('span')
    child.remove()

    const fisrt_time = {
        render : true
    }

    const dispatchUpdateVideoHistory = new CustomEvent('updateVideoHistory')
    const setVideoHistory =(message = '')=>{
        const videoHistory = ls('video-history').data([]).push(true, true)
        videoHistory.unshift({ message, datetime : Date.now().toString() })
        ls('video-history').data(videoHistory).put(true)
        dispatchEvent(dispatchUpdateVideoHistory)
    }

    const defSetEmoji = message =>{

        const elementoEmoji = child.cloneNode(true);
        elementoEmoji.textContent = message
        
        if(ElementComponent.children.length) {
            const position = rand(100)

            elementoEmoji.style.left = `${ position }%`
        }

        ElementComponent.append(elementoEmoji)

        setVideoHistory(message)

        db.add({
            id_stream    : params.id,
            id_user      : user.uid,
            datetime_add : Date.now().toString(),
            message
        })

        setTimeout(()=> elementoEmoji.remove(), 2000)

    }

    addEventListener('custom-event-emojis-mostrar', e => {
        const message = e.detail.message
        defSetEmoji(message)
    })

    const renderHTML =(onSnapshot)=>{
        onSnapshot.forEach(doc => {
            const data = doc.data()

            if(fisrt_time.render) return
            if(data.id_user == user.uid) return

            if(Date.now() < (parseInt(data.datetime_add) + 7000)){ 

                defSetEmoji(data.message)
            }
        });

        fisrt_time.render = false
    }

    const unsubscribe = dbRealtime.subscribe(renderHTML)
    addRemoveEventListener(window, 'hashchange', unsubscribe) 

    return ElementComponent
}