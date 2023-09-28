import { dbFirebase, chatRealtime } from "../firebase/data.js"
import chatStiker from "./chatStiker.js"
import chatOption from "./chatOption.js"
export default ()=>{

    const db     = new dbFirebase('stream_chat')
    const params = json(sessionStorage.getItem('params'))
    const user   = json(localStorage.getItem('user'))
    
    const ElementComponent = createHTML(`
        <div class="div_3gfqE">
            <div class="div_ejM2b">
                <div class="div_o4ubh scroll-y">
                    <div class="div_1d4o4"><img src="./public/img/icons/text-message.png" alt=""></div>
                    <div class="div_3opy8"></div>
                </div>
                <form class="form_68Klg" autocomplete="off">
                    <div class="div_Zk0B9"> 
                        <p class="p_IA4wz text-ellipsis"></p>
                        <button class="button_E8Vr8" data-action="cancelEdit"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="div_b3Gh3">
                        <button class="button_E8Vr8" data-action="openStiker" ><i class="fa-regular fa-note-sticky"></i></button>
                        <label class="label_Fkf9B">
                            <textarea class="txt_W17W2" name="txt_message" placeholder="text..."></textarea>
                        </label>
                        <button class="button_E8Vr8"><i class="fa-regular fa-paper-plane"></i></button>
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
            padding     : 15px;
        }
    `)

    const elemento_chat = style.element('elemento_chat').css(`
        & {
            margin  : auto;
            width   : min(100%, 400px);
            height  : min(100%, 400px);
            background : var(--color-item);
            overflow : hidden;
            border-radius:8px; 
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
        const item  = e.target.closest('.div_T5m0f.user')

        if(item){
            const element = chatOption(json(item.dataset.data))

            if(document.fullscreenElement) document.fullscreenElement.append(element)
            else root.append(element)
        }
    })

    

    //eventos de formulario
    form_chat.addEventListener('submit', e => {
        e.preventDefault()
        
        const data = {
            id_user : user.uid,
            id_stream : params.id,
            message : form_chat.txt_message.value.trim(),
            datetime_add : Date.now().toString(),
            datetime_update : Date.now().toString(),
            type : 'text',
        }

        if(data.message == '') return

        if(form_chat.classList.contains('edit')){
            data.status = 2
            db.edit(e.target.dataset.idMessage, data)
            form_chat.classList.remove('edit')
            form_chat.removeAttribute('data-id-message')
        } else { 
            data.status = 1
            db.add(data) 
        }
        
        form_chat.txt_message.value = ''
        form_chat.txt_message.style.height = '20px'
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
        form_chat.classList.remove('edit')
        form_chat.removeAttribute('data-id-message')
    })

    btn_open_element_stiker.addEventListener('click', ()=> {
        if(document.fullscreenElement)
            document.fullscreenElement.append(elementChatStiker)
        else root.append(elementChatStiker)
        
    })

    const def_createHTML =(data, doc)=>{
        const data_data = {
            id              : doc.id,
            datetime_update : data.datetime_update ?? 0,
            message         : data.message,
            status          : data.status,
            type            : data.type ?? 'text'
        }

        const user_class = data.id_user == user.uid ? 'user' : ''

        const element = createHTML(`
            <div class="div_T5m0f ${ user_class }" id="div-${ doc.id }">
                ${ data_data.type == 'text' ? '<div class="div_5f0m7"></div>' : ''}
                ${ data_data.type == 'stiker' ? `<div class="div_fR7XE"><img alt="stiker not found"></div>` : ''}
            </div>
        `)

        if(data.status == 4) element.style.opacity = '.5'

        element.setAttribute('data-data', JSON.stringify(data_data))

        if(data_data.type == 'text' ) element.querySelector('.div_5f0m7').textContent = data.message
        if(data_data.type == 'stiker' ) element.querySelector('.div_fR7XE img').src = 'public/img/stiker/' + data.message

        return element
    }
    
    let render_fisrt_time = true

    const renderHTML =(onSnapshot)=>{
        let index = 0
        let elementPrevious = null
        onSnapshot.forEach(doc => {
            const data = doc.data()
            const element = contenido_chat.querySelector(`#div-${ doc.id }`)

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
                    return element.replaceWith(def_createHTML(data, doc));
                }
            } else {
                if(data.status == 3) return
                if(data.status == 4) { if(data.id_user != user.uid) return } 
                if(render_fisrt_time) contenido_chat.prepend(def_createHTML(data, doc))
                else {
                    if(data.status == 5) { if(data.id_user != user.uid) return elementPrevious.before(def_createHTML(data, doc)) }
                    contenido_chat.append(def_createHTML(data, doc))
                }
            }
        })

        render_fisrt_time = false
    }

    const unsubscribe = chatRealtime(renderHTML, params.id)
    addRemoveEventListener(window, 'hashchange', unsubscribe)
    
    addRemoveEventListenerHashchange(window, 'open_update_message', e => {

        const data = e.detail
        form_chat.classList.add('edit')
        form_chat.setAttribute('data-id-message', data.id)
        form_chat.txt_message.value = data.message
        getElement('.p_IA4wz', form_chat).textContent = data.message

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

    contenedor_chat_fullscreen.element.remove() 
    return ElementComponent
}