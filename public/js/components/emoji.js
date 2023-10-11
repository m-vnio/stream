 import { dbFirebase, dbFirebaseRealtime } from "../firebase/data.js";
import Emoji from "../data/Emoji.js";
export default ()=>{
    
    
    const params = JSON.parse(sessionStorage.getItem('params'))
    const user   = ls('user').get(true)
    const db     = new dbFirebase('stream_emoji')
    const dbRealtime     = new dbFirebaseRealtime('stream_emoji')
    dbRealtime.query({ where : [["id_stream", "==", params.id]], orderBy : ["datetime_add", "desc"], limit : 1 })

    const ElementComponent = createHTML(`
        <div class="div_WiZV0 scroll-y active">
            <div class="div_4Wz57gr"></div>
            <div class="div_Gtfrb">
                <div class="div_pc6Xr">
                    <div class="div_q2o2E scroll-y">
                        <div class="div_88A39">${ ArrayToString(Emoji, emoji => `<span>${ emoji.trim() }</span>`) }</div>
                    </div>
                    <form class="form_lK4nv" autocomplete="off">
                        <input type="text" placeholder="emoji" name="emoji">
                        <button type="submit"><i class="fa-regular fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)

    const elementTap = query.get('.div_4Wz57gr')

    elementTap.addEventListener('click', ()=> ElementComponent.remove())

    const elementEmojiContent = createHTML(`<div class="div_82gU7"></div>`)

    const root = document.getElementById('root')

    const formEmoji = ElementComponent.querySelector('.form_lK4nv')

    let doEmoji = true

    const fisrt_time = {
        render : true
    }

    formEmoji.addEventListener('submit', e => {
        e.preventDefault()
        defDoEmoji(formEmoji.emoji.value)
        formEmoji.emoji.value = ''
    })

    clickElement(ElementComponent, ()=> ElementComponent.remove())
    clickElementclosest(ElementComponent, 'span', (target) => {
        defDoEmoji(target.innerHTML)
    })

    const defDoEmoji =(emoji = '')=>{
        if(!doEmoji) return
        doEmoji = false

        if(document.fullscreenElement) document.fullscreenElement.append(elementEmojiContent)
        else root.append(elementEmojiContent)
        
        ElementComponent.remove()
        elementEmojiContent.innerHTML = '<span style="color:#ffffff"></span>'
        elementEmojiContent.children[0].textContent = emoji.slice(0, 50)

        ElementComponent.style.opacity = '.5' 
        
        db.add({
            id_stream   : params.id,
            id_user     : user.uid,
            datetime_add : Date.now().toString(),
            emoji       : emoji
        })

        setTimeout(()=> {
            ElementComponent.style.opacity = '1'
            elementEmojiContent.remove() 
            doEmoji = true
        }, 2000)
    }

    const renderHTML =(onSnapshot)=>{
        onSnapshot.forEach(doc => {
            const data = doc.data()

            if(fisrt_time.render) return
            if(data.id_user == user.uid) return

            if(Date.now() < (parseInt(data.datetime_add) + 7000)){
                if(document.fullscreenElement) document.fullscreenElement.append(elementEmojiContent)
                else root.append(elementEmojiContent)

                elementEmojiContent.innerHTML = `<span style="color:#ffffff">${ data.emoji }</span>`
                setTimeout(()=> elementEmojiContent.remove() , 2000)
            }
        });

        fisrt_time.render = false
    }

    const unsubscribe = dbRealtime.subscribe(renderHTML)
    addRemoveEventListener(window, 'hashchange', unsubscribe) 

    return ElementComponent
}