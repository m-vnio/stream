import { dbFirebase, chatRealtime } from "../firebase/data.js"
import chatStiker from "./chatStiker.js"
import chatOption from "./chatOption.js"
export default ()=>{

    const db     = new dbFirebase('stream_chat')
    const params = json(sessionStorage.getItem('params'))
    const user   = json(localStorage.getItem('user'))
    //<img src="./public/img/icons/text-message.png" alt="">
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
                        <button class="button_E8Vr8" data-action="cancelEdit"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="div_b3Gh3">
                        <button class="button_E8Vr8" data-action="openStiker" ><i class="fa-regular fa-note-sticky"></i></button>
                        <label class="label_Fkf9B">
                            <textarea class="txt_W17W2" name="txt_message" placeholder="text..."></textarea>
                        </label>
                        <button type="submit" class="button_E8Vr8"><i class="fa-regular fa-paper-plane"></i></button>
                    </div>
                </form>
            </div>
            <div data-css="contenedor_chat_fullscreen">
                <div data-css="elemento_chat"></div>  
            </div>
        </div>
    `)
    
    const root = document.getElementById('root')
    const contenedor_chat = ElementComponent.querySelector('.div_ejM2b')
    const contenido_chat = ElementComponent.querySelector('.div_3opy8')

    const elementChatStiker = chatStiker()

    const form_chat = ElementComponent.querySelector('.form_68Klg') 
    const btn_cancelar_edicion  = getElement('[data-action=cancelEdit]', form_chat)
    const btn_open_element_stiker     = getElement('[data-action=openStiker]', form_chat)

    const style = new createCSS('chat', ElementComponent)
    
    const contenedor_chat_fullscreen = style.element('contenedor_chat_fullscreen').css(`
        & {
            position    : fixed;
            inset       : 0;
            background  : rgb(0 0 0 / .1);
            display     : flex;   
        }
    `)

    const elemento_chat = style.element('elemento_chat').css(`
        & {
            aspect-ratio: 1/1;
            width   : 100%; 
            background : var(--color-background);
            overflow : hidden;
            border-radius: 8px 8px 0 0; 
            align-self: flex-end;
        }

        @media (min-width: 600px) {
            & {
              aspect-ratio: initial;
              height: 100%;
              width: min(100%, 375px); 
              border-radius: 0 8px 8px 0;
            } 
        }
    `)

    clickElement(contenedor_chat_fullscreen.element, ()=> contenedor_chat_fullscreen.element.remove())
     
    addRemoveEventListenerHashchange(document, 'fullscreenchange', ()=> {
        if(document.fullscreenElement){ 
            elemento_chat.element.append(contenedor_chat) 
        } else {
            contenedor_chat_fullscreen.element.remove()
            ElementComponent.append(contenedor_chat)
        } 
    }) 

    addEventListener('open_message', ()=> {
        if(document.fullscreenElement)
            document.fullscreenElement.append(contenedor_chat_fullscreen.element)
    });

    //eventos al dar click al mensaje
    contenido_chat.addEventListener('contextmenu', e => {
        const item  = e.target.closest('.div_T5m0f')

        if(item){
            const element = chatOption(json(item.dataset.data))

            // if(document.fullscreenElement) document.fullscreenElement.append(element)
            // else ElementComponent.append(element)

            contenedor_chat.append(element)
        }
    })

    

    //eventos de formulario
    form_chat.addEventListener('submit', e => {
        e.preventDefault()

        dispatchEvent(new CustomEvent('set_message', { detail : {
            message : {
                message : form_chat.txt_message.value.trim(),
                type    : 'text'
            }
        } }))

        form_chat.txt_message.value = ''
        form_chat.txt_message.style.height = '20px'
        form_chat.txt_message.focus()
    })

    form_chat.txt_message.addEventListener('input', e => {
        const target = e.target
        target.style.height = '20px'
        const height = target.scrollHeight
        target.style.height = height + 'px'
    })

    //cancelar edicion
    btn_cancelar_edicion.addEventListener('click', ()=> {
        form_chat.txt_message.value = ''
        form_chat.txt_message.style.height = '20px'
        form_chat.classList.remove('active')
        form_chat.removeAttribute('data-id-message')
        form_chat.removeAttribute('data-id-message-reply')
        form_chat.setAttribute('data-action', 'add')
    })

    btn_open_element_stiker.addEventListener('click', ()=> {
        // if(document.fullscreenElement)
        //     document.fullscreenElement.append(elementChatStiker)
        // else ElementComponent.append(elementChatStiker)
        contenedor_chat.append(elementChatStiker)
    })

    let Chat = []
    const def_createHTML =(data)=>{
        const data_data = {
            id              : data.id,
            datetime_update : data.datetime_update ?? 0,
            message         : data.message,
            status          : data.status,
            type            : data.type ?? 'text',
            id_user         : data.id_user
        }

        const chatReply = Chat.find(chat => chat.id == data.id_message_reply) ?? {}

        const messageReplyType = chatReply.type ?? ''

        const messageUser = data.id_user == user.uid ? 'user' : ''
        const messageType = data_data.type ?? 'text'

        const Time = new Date(parseInt(data.datetime_add))
        const timeHour = Time.getHours()
        const timeMinute = Time.getMinutes()
        const timeAM = Time.getHours() < 12

        const setTime = `${timeAM ? timeHour : timeHour - 12}:${ ( '0' + timeMinute).slice(-2) } ${ timeAM ? 'AM' : 'PM' }`

        const element = createHTML(`
            <div class="div_T5m0f ${ messageUser }" id="div-${ data.id }">
                <div class="div_5f0m7 ${ messageType }">
                    <div class="div_fR7XE">
                        <p class="text-ellipsis"></p>
                        <img alt="img">
                    </div>
                    <div class="div_7Rn9q">
                        <div class="div_oeFkT ${ messageType }">
                            <p></p>
                            <img alt="img">
                        </div>
                        <div class="div_qsJ0y"><span>${ setTime }</span></div>
                    </div>
                </div>
            </div>
        `)

        element.setAttribute('data-data', JSON.stringify(data_data))

        const pMessageReplyText = element.querySelector('.div_fR7XE p')
        const imgMessageReplyStiker = element.querySelector('.div_fR7XE img')

        const pMessageText  = element.querySelector('.div_oeFkT p')
        const imgMessageStiker = element.querySelector('.div_oeFkT img')

        if(data.status == 4) element.style.opacity = '.5'
 
        if(messageReplyType == 'text'){
            pMessageReplyText.textContent = chatReply.message ?? ''
            imgMessageReplyStiker.remove()
        } else if(messageReplyType == 'stiker'){
            imgMessageReplyStiker.src = 'public/img/stiker/' + chatReply.message 
            pMessageReplyText.remove()
        } else {
            pMessageReplyText.remove()
            imgMessageReplyStiker.remove()
        }

        if(messageType == 'text'){
            pMessageText.textContent = data.message ?? ''
            imgMessageStiker.remove()
        } else if(messageType == 'stiker'){
            imgMessageStiker.src = 'public/img/stiker/' + data.message
            pMessageText.remove()
        }

        return element 
    }
    
    let render_fisrt_time = true

    const renderHTML =(onSnapshot)=>{
        let index = 0
        let elementPrevious = null

        Chat = []
        onSnapshot.forEach(doc => Chat.push({ id : doc.id, ...doc.data() }))
        if(render_fisrt_time) {
            const contenedor = document.createDocumentFragment()
            Chat.forEach(data => {
                if(data.status == 3) return
                if(data.status == 4) { if(data.id_user != user.uid) return } 
                contenedor.prepend(def_createHTML(data))
            })
            contenido_chat.append(contenedor)  
            
        } else {
            Chat.forEach(data => {
                // const data = doc.data()
                const element = contenido_chat.querySelector(`#div-${ data.id }`)

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
                        return element.replaceWith(def_createHTML(data));
                    }
                } else {
                    if(data.status == 3) return
                    if(data.status == 4) { if(data.id_user != user.uid) return } 
                    if(render_fisrt_time) contenido_chat.prepend(def_createHTML(data))
                    else {
                        if(data.status == 5) { if(data.id_user != user.uid) return elementPrevious.before(def_createHTML(data)) }
                        contenido_chat.append(def_createHTML(data))
                    }
                }
            })
        }

        render_fisrt_time = false
    }

    const unsubscribe = chatRealtime(renderHTML, params.id)
    addRemoveEventListener(window, 'hashchange', unsubscribe)

    addRemoveEventListenerHashchange(window, 'open_update_message', e => {

        const data = e.detail
        form_chat.classList.add('active')
        form_chat.setAttribute('data-id-message', data.id)
        form_chat.setAttribute('data-action', 'update')
        form_chat.txt_message.value = data.message
        form_chat.txt_message.focus()
        getElement('.p_IA4wz', form_chat).textContent = data.message

    })

    addRemoveEventListenerHashchange(window, 'open_reply_message', e => {

        const data = e.detail
        form_chat.classList.add('active')
        form_chat.setAttribute('data-id-message-reply', data.id)
        form_chat.setAttribute('data-action', 'reply')
        form_chat.txt_message.focus()


        const p = getElement('.p_IA4wz', form_chat)

        if(data.type === 'stiker'){
            p.innerHTML = `<img src="public/img/stiker/${ data.message }">`
        } else p.textContent = data.message

    })

    addRemoveEventListenerHashchange(window, 'delete_message', e => {

        const data = e.detail
        const item = contenido_chat.querySelector(`#div-${ data.id }`)
        if(item) item.remove()

        db.edit(data.id, {
            datetime_update : Date.now().toString(),
            status : 3
        })

    })

    addRemoveEventListenerHashchange(window, 'hide_message', e => {

        const data = e.detail
        const item = contenido_chat.querySelector(`#div-${ data.id }`)
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

        const action = form_chat.dataset.action

        if(action == 'add'){
            data.status = 1
            data.id_message_reply = '-1' 
            db.add(data) 
        } else if(action == 'reply'){
            data.status = 1
            data.id_message_reply = form_chat.dataset.idMessageReply
            db.add(data) 
        } else if(action == 'update'){
            data.status = 2
            db.edit(e.target.dataset.idMessage, data)
        }

        form_chat.classList.remove('active')
        form_chat.setAttribute('data-action', 'add')
        form_chat.removeAttribute('data-id-message-reply')
        form_chat.removeAttribute('data-id-message')

    })

    contenedor_chat_fullscreen.element.remove() 
    return ElementComponent
}