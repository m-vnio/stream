import { dbFirebase, dbFirebaseRealtime } from "../firebase/data.js"
import chatStiker from "./chatStiker.js"
import chatOption from "./chatOption.js"
import chatBox from "./chatBox.js"

export default ()=>{
    
    const params = json(sessionStorage.getItem('params'))
    const user   = json(localStorage.getItem('user'))

    const db     = new dbFirebase('stream_chat')
    const dbRealtime = new dbFirebaseRealtime('stream_chat')
    dbRealtime.query({ where : [["id_stream", "==", params.id]], orderBy : ["datetime_add", "desc"], limit : 50 })

    const ElementComponent = createHTML(`
        <div class="div_3gfqE">
            <div class="div_ejM2b">
                <div class="div_o4ubh scroll-y">
                    <div class="div_1d4o4"><span class="loader"></span></div>
                    <div class="div_3opy8"></div>
                </div>
                <form class="form_68Klg" data-action="add" autocomplete="off">
                    <div class="div_Zk0B9"> 
                        <p class="p_IA4wz text-ellipsis"></p>
                        <button type="button" class="button_E8Vr8" data-action="cancelEdit"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="div_b3Gh3">
                        <button type="button" class="button_E8Vr8 icon" data-action="openStiker" ><img src="public/img/icons/svg/icon-stiker.svg" alt="icon-svg"></button>
                        <label class="label_Fkf9B">
                            <textarea class="txt_W17W2" name="txt_message" placeholder="text..."></textarea>
                        </label>
                        <button type="submit" class="button_E8Vr8 icon"><img src="public/img/icons/svg/icon-paper-plane.svg" alt="icon-svg"></button>
                    </div> 
                    <div class="div_Wk1L3WK"></div>
                </form>
            </div>
            <div data-css="contenedor_chat_fullscreen">
                <div data-css="elemento_chat"></div>  
            </div>
        </div>
    `)

    const findChild = query => ElementComponent.querySelector(query)

    //const root = document.getElementById('root')
    //const elementChatStiker = chatStiker()

    const formChat      = findChild('.form_68Klg') 
    const btnCancel     = findChild('[data-action=cancelEdit]')
    const btnOpenStiker = findChild('[data-action=openStiker]')

    const elementItemChat = findChild('.div_3opy8')
    const elementContentStiker = findChild('.div_Wk1L3WK')
    elementContentStiker.append(chatStiker({ dispatch : 'set_message' })) 

    elementItemChat.addEventListener('contextmenu', e => {
        const item  = e.target.closest('.div_T5m0f')
        if(item){
            const element = chatOption(json(item.dataset.data)) 
            ElementComponent.append(element)
        }
    })

    elementItemChat.addEventListener('click', e => {
        const item  = e.target.closest('.div_fR7XE')
        if(item){
            const elementMessageReply = elementItemChat.querySelector(`#${ item.dataset.idReply }`)
            if(elementMessageReply) {
                elementMessageReply.scrollIntoView({ behavior: "smooth" });
            }
        }
    })

    //

    //eventos de formulario
    formChat.addEventListener('submit', e => {
        e.preventDefault()

        dispatchEvent(new CustomEvent('set_message', { detail : {
            message : {
                message : formChat.txt_message.value.trim(),
                type    : 'text'
            }
        } }))

        formChat.txt_message.value = ''
        formChat.txt_message.style.height = '20px'
        formChat.txt_message.focus()
    })

    formChat.txt_message.addEventListener('focus', e => {
        if(elementContentStiker.classList.contains('active')) history.back()
    })

    formChat.txt_message.addEventListener('input', e => {
        const target = e.target
        target.style.height = '20px'
        const height = target.scrollHeight
        target.style.height = height + 'px'
    })

    //cancelar edicion
    btnCancel.addEventListener('click', ()=> {
        formChat.txt_message.value = ''
        formChat.txt_message.style.height = '20px'
        formChat.classList.remove('active')
        formChat.removeAttribute('data-id-message')
        formChat.removeAttribute('data-id-message-reply')
        formChat.setAttribute('data-action', 'add')
    })

    btnOpenStiker.addEventListener('click', ()=> { 
        //ElementComponent.append(elementChatStiker)
        if(elementContentStiker.classList.contains('active')){
            history.back()
        } else {
            elementContentStiker.classList.add('active')
            history.pushState(null, null, location.href)
        }

        
    })

    //eventos de windows
    addRemoveEventListenerHashchange(window, 'open_update_message', e => {

        const data = e.detail
        formChat.classList.add('active')
        formChat.setAttribute('data-id-message', data.id)
        formChat.setAttribute('data-action', 'update')
        formChat.txt_message.value = data.message
        formChat.txt_message.focus()
        getElement('.p_IA4wz', formChat).textContent = data.message

    })

    addRemoveEventListenerHashchange(window, 'open_reply_message', e => {

        const data = e.detail
        formChat.classList.add('active')
        formChat.setAttribute('data-id-message-reply', data.id)
        formChat.setAttribute('data-action', 'reply')
        formChat.txt_message.focus()


        const p = getElement('.p_IA4wz', formChat)

        if(data.type === 'stiker'){
            p.innerHTML = `<img src="public/img/stiker/${ data.message }">`
        } else p.textContent = data.message

    })

    addRemoveEventListenerHashchange(window, 'delete_message', e => {

        const data = e.detail
        const item = elementItemChat.querySelector(`#div-${ data.id }`)
        if(item) item.remove()

        db.edit(data.id, {
            datetime_update : Date.now().toString(),
            status : 3
        })

    })

    addRemoveEventListenerHashchange(window, 'hide_message', e => {

        const data = e.detail
        const item = elementItemChat.querySelector(`#div-${ data.id }`)
        if(item) item.style.opacity = '.5'

        db.edit(data.id, {
            datetime_update : Date.now().toString(),
            status : data.status == 4 ? 5 : 4
        })

    })

    addRemoveEventListenerHashchange(window, 'set_message', e => {

        const Message = e.detail.message

        const data = {
            id_user : user.uid,
            id_stream : params.id, 
            message : Message.message,
            datetime_add : Date.now().toString(),
            datetime_update : Date.now().toString(),
            type : Message.type
        }

        if(data.message == '') return

        const action = formChat.dataset.action

        if(action == 'add'){
            data.status = 1
            data.id_message_reply = '-1' 
            db.add(data) 
        } else if(action == 'reply'){
            data.status = 1
            data.id_message_reply = formChat.dataset.idMessageReply
            db.add(data) 
        } else if(action == 'update'){
            data.status = 2
            delete data.datetime_add
            db.edit(formChat.dataset.idMessage, data)
        }

        formChat.classList.remove('active')
        formChat.setAttribute('data-action', 'add')
        formChat.removeAttribute('data-id-message-reply')
        formChat.removeAttribute('data-id-message')

    })

    addEventListener('popstate', e => {
        if(elementContentStiker.classList.contains('active'))
            elementContentStiker.classList.remove('active')
    })

    const renderHTML =(onSnapshot)=>{
        let index = 0
        let elementPrevious = null

        const Chat = []
        onSnapshot.forEach(doc => Chat.push({ id : doc.id, ...doc.data() }))

        if(elementItemChat.children.length == 0) {
            const contenedor = document.createDocumentFragment()
            Chat.forEach(data => {
                if(data.status == 3) return
                if(data.status == 4) { if(data.id_user != user.uid) return } 
                contenedor.prepend(chatBox(data, Chat, user))
            })
            elementItemChat.append(contenedor)
        } else {
            Chat.forEach(data => {
                const element = elementItemChat.querySelector(`#div-${ data.id }`)

                if(index++ == 0){
                    if(Date.now() < (parseInt(data.datetime_add) + 7000)){ 
                        if(data.id_user != user.uid){ 
                            dispatchEvent(new CustomEvent('send_notification_message'))
                        }
                    }
                }

                if(element){
                    elementPrevious = element
                    const data_data = JSON.parse(element.dataset.data)
                    if(data.status == 3) return element.remove()
                    if(data.status == 4) { if(data.id_user != user.uid) return element.remove() } 
                    if(parseInt(data.datetime_update) > parseInt(data_data.datetime_update)){
                        return element.replaceWith(chatBox(data, Chat, user));
                    }
                } else {
                    if(data.status == 3) return
                    if(data.status == 4) { if(data.id_user != user.uid) return } 

                    if(data.status == 5) { if(data.id_user != user.uid) return elementPrevious.before(chatBox(data, Chat, user)) }
                    elementItemChat.append(chatBox(data, Chat, user))
                }
            })
        }
    }

    const unsubscribe = dbRealtime.subscribe(renderHTML)
    addRemoveEventListener(window, 'hashchange', unsubscribe)

    return ElementComponent
}