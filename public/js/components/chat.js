import socket from "../pwa/socket.js";

import chatStiker from "./chatStiker.js"
import chatOption from "./chatOption.js"
import chatBox from "./chatBox.js"

export default ()=>{

    const api = (uri = '') => ls('api').get() + uri

    const Icon  = new iconSVG()
    const auth = ls('auth').data({}).push(true, true) 
    //const user_data = ls('user_data').data({}).push(true, true) 
    const params = JSON.parse(sessionStorage.getItem('params'))

    const ElementComponent = createHTML(`
        <div class="div_3gfqE">
            <div class="div_ejM2b">
                <div class="div_o4ubh scroll-y">
                    <div class="contenedor_loader"><span class="loader"></span></div>
                    <div class="div_t08NiJz"><h2>~ chat vacio ~</h2></div>
                    <div class="div_3opy8"></div>
                </div>
                <form class="form_68Klg" data-action="add" autocomplete="off">
                    <div class="div_Zk0B9"> 
                        <p class="p_IA4wz text-ellipsis"></p>
                        <button type="button" class="button_E8Vr8" data-action="cancelEdit">${ Icon.get('fi fi-rr-cross') }</button>
                    </div>
                    <div class="div_ZitSRVP">
                        <div><button type="button" class="button_E8Vr8">${ Icon.get('fi fi-rr-cross') }</button></div>
                        <div class="div_jy8E19Y scroll-y"></div>
                    </div>
                    <div class="div_E982Lxj">
                        <div class="div_7QI7r5p">
                            <label class="pointer">
                                ${ Icon.get('fi fi-rr-picture') }
                                <input type="file" name="file-image" accept="image/*" multiple>
                            </label>
                            <label class="pointer">
                                ${ Icon.get('fi fi-rr-video-camera-alt') }
                                <input type="file" name="file-video" accept="video/*" multiple>
                            </label>
                        </div>
                    </div>
                    <div class="div_b3Gh3">
                        <button type="button" class="button_E8Vr8" data-action="openStiker" >${ Icon.get('fi fi-rr-sticker') }</button>
                        <label class="label_Fkf9B">
                            <textarea class="txt_W17W2" name="txt_message" placeholder="mensaje"></textarea>
                        </label> 
                        <div class="div_oYQs61G">
                            <button type="button" class="pointer">${ Icon.get('fi fi-rr-paperclip-vertical') }</button>
                            <button type="submit" class="pointer">${ Icon.get('fi fi-rr-paper-plane') }</button>
                        </div>
                    </div> 
                    <div class="div_Wk1L3WK"></div>
                </form>
            </div>
            <div data-css="contenedor_chat_fullscreen">
                <div data-css="elemento_chat"></div>  
            </div>
            <div class="div_87Csgt3">
                <button class="pointer">${ Icon.get('fi fi-rr-cross') }</button>
                <div class="div_Pc23caa"></div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)

    //const root = document.getElementById('root')
    //const elementChatStiker = chatStiker()

    const formChat      = query.get('.form_68Klg') 
    const btnCancel     = query.get('[data-action=cancelEdit]')
    const btnOpenStiker = query.get('[data-action=openStiker]')

    const elementItem = query.get('.div_o4ubh') //div_o4ubh
    const elementItemLoader = query.get('.contenedor_loader')
    const elementItemEmpty = query.get('.div_t08NiJz')
    const elementItemChat = query.get('.div_3opy8')
    const elementItemButton = query.get('.div_E982Lxj')
    const elementButtonsOpen = query.get('.div_oYQs61G') 

    const elementFile = query.get('.div_ZitSRVP')
    const elementFileShow = query.get('.div_87Csgt3')
    elementFileShow.remove()

    const elementItemFile = query.get('.div_jy8E19Y')

    const elementContentStiker = query.get('.div_Wk1L3WK')
    elementContentStiker.append(chatStiker({ dispatch : 'set_message' })) 

    elementButtonsOpen.addEventListener('click', e => {
        const button = e.target.closest('button')
        if(button) {
            if(button.type == 'button') {
                elementItemButton.classList.toggle('active')
            }
        }
    })

    const File = []
    elementItemFile.addEventListener('click', e => {
        const button = e.target.closest('button')

        if(button) {
            const index = [...elementItemFile.children].findIndex(element => element == button.parentElement)

            if(index != -1) {
                elementItemFile.children[ index ].remove('active')
                if(!elementItemFile.children.length) {
                    elementFile.classList.remove('active')
                    inputEventListener(formChat.txt_message)
                }
                File.splice(index, 1)
            }
        }
    })

    elementItemChat.addEventListener('contextmenu', e => {
        const item  = e.target.closest('.div_T5m0f')
        if(item){
            const element = chatOption(JSON.parse(item.dataset.data)) 
            ElementComponent.append(element) 
        }
    })

    elementItemChat.addEventListener('click', e => {
        const item  = e.target.closest('.div_fR7XE')
        const file  = e.target.closest('img, video')
        // console.log(file);
        if(item){
            const elementMessageReply = elementItemChat.querySelector(`#${ item.dataset.idReply }`)
            if(elementMessageReply) {
                elementMessageReply.scrollIntoView({ behavior: "smooth" });
            }
        }

        if(file) {
            ElementComponent.append(elementFileShow)
            const element = file.cloneNode(true)
            console.log(element.tagName);

            if(element.tagName == 'VIDEO') element.setAttribute('controls', 'true')
            const elementFile = elementFileShow.querySelector('div')
            elementFile.innerHTML = ''
            elementFile.append(element)

            history.pushState(null, null, location.href)
        }
    })

    elementFileShow.addEventListener('click', e => {
        const button = e.target.closest('button')
        if(button) {
            history.back()
        }
    })

    addEventListener('popstate', () => {
        elementFileShow.remove()
    })

    //eventos de formulario
    
    formChat.addEventListener('change', e => {
        if(e.target.type == 'file') {
            File.push(...e.target.files)
            elementFile.classList.add('active')
            elementItemButton.classList.remove('active')
            elementButtonsOpen.classList.add('text')

            for (const file of e.target.files) {

                const fileLoad = new FileLoad(file)

                fileLoad.load(()=> {

                    const element = createHTML(`
                        <div class="div_8X6cbyp"> 
                            <button type="button" class="button_E8Vr8">${ Icon.get('fi fi-rr-trash') }</button>
                        </div>
                    `)

                    if(file.type.includes('image')) {
                        const url = URL.createObjectURL(file)
                        const img = document.createElement('img')
                        img.setAttribute("src", url)
                        element.prepend(img)
                    }
                    else if(file.type.includes('video')) {
                        const url = URL.createObjectURL(file)
                        const video = document.createElement('video')
                        video.setAttribute("src", url)
                        element.prepend(video)
                    } else  return
                    
                    elementItemFile.append(element)
                })

                fileLoad.start() 
            }
        }
    })

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

        elementButtonsOpen.classList[ formChat.txt_message.value.trim() == '' ? 'remove' : 'add' ]('text')
    })

    formChat.txt_message.addEventListener('focus', e => {
        elementContentStiker.classList.remove('active')
    })

    const inputEventListener = target =>{
        target.style.height = '20px'
        const height = target.scrollHeight
        target.style.height = height + 'px'
 
        elementButtonsOpen.classList[ !elementItemFile.children.length && target.value.trim() == '' ? 'remove' : 'add' ]('text')
    }

    formChat.txt_message.addEventListener('input', e => inputEventListener(e.target))

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
        elementContentStiker.classList.toggle('active') 
    })

    //eventos de windows
    addRemoveEventListenerHashchange(window, 'open_update_message', e => {

        const data = e.detail
        formChat.classList.add('active')
        formChat.setAttribute('data-id-message', data.id)
        formChat.setAttribute('data-action', 'update')
        formChat.txt_message.value = data.message
        formChat.txt_message.focus()
        formChat.querySelector('.p_IA4wz').textContent = data.message 
        inputEventListener(formChat.txt_message)
    })

    addRemoveEventListenerHashchange(window, 'open_reply_message', e => {

        const data = e.detail
        formChat.classList.add('active')
        formChat.setAttribute('data-id-message-reply', data.id)
        formChat.setAttribute('data-action', 'reply')
        formChat.txt_message.focus()

        const p = formChat.querySelector('.p_IA4wz')

        if(data.type == 'stiker'){
            p.innerHTML = `<img src="${ api(`/stream/storage/stiker/${ data.message }`) }">`
        } else p.textContent = data.message

    })

    addRemoveEventListenerHashchange(window, 'delete_message', e => {

        const data = e.detail
        const item = elementItemChat.querySelector(`#div-${ data.id }`)
        const items = elementItemChat.querySelectorAll(`div[data-id-reply = div-${ data.id }]`)
        items.forEach(item => item.remove() )
        if(item) item.remove()

        datapi.patch(api(`/stream/api/stream_chat?id=${ data.id }&token=${ auth.token }`), { status : 3 })
        .then(status => {
            if(status) {
                socket.emit('chat', JSON.stringify({
                    action : 'remove',
                    id_message : data.id,
                    id_stream : params.id
                }))
            }
        })

    })

    addRemoveEventListenerHashchange(window, 'hide_message', e => {

        const data = e.detail
        const item = elementItemChat.querySelector(`#div-${ data.id }`)
        if(item) item.style.opacity = '.5'

        datapi.patch(api(`/stream/api/stream_chat?id=${ data.id }&token=${ auth.token }`), {
            datetime_update : Date.now().toString(),
            status : data.status == 4 ? 5 : 4
        })
        .then(data => {
            if(data) {
                dataRender([data])
                socket.emit('chat', JSON.stringify({
                    action : 'hide',
                    id_message : data.id,
                    id_stream : params.id
                }))
            }
        })
    })

    addRemoveEventListenerHashchange(window, 'set_message', e => {

        const Message = e.detail.message

        const data = {
            id_user : auth.uid,
            id_stream : params.id, 
            message : Message.message,
            datetime_add : Date.now().toString(),
            datetime_update : Date.now().toString(),
            type : Message.type
        }

        if(data.message == '' && !elementItemFile.children.length) return

        const action = formChat.dataset.action

        if(['add', 'reply'].includes(action)){
            data.status = 1
            data.id_message_reply = formChat.dataset.idMessageReply || null 

            const setData = new FormData()

            for (const [index, file] of File.entries()) {
                setData.append(`file[${index}]`, file);
            }

            File.splice(0)

            setData.append('data', JSON.stringify(data))
            
            fetch(api(`/stream/api/stream_chat?token=${ auth.token }`), {
                method : 'POST',
                body : setData
            })
                .then(res => res.json())
                .then(data => {
                    dataRender([data])
                    socket.emit('chat', JSON.stringify({ action : 'put', id_message : data.id, id_stream : params.id }))

                    const [element] = [ ...elementItemChat.children ].slice(-1)
                    if(element) element.scrollIntoView({ behavior: "instant" });

                    elementItemFile.innerHTML = ''
                    elementFile.classList.remove('active')
                })

            // datapi.post(api(`?token=${ auth.token }`), data)
            // .then(data => {
            //     if(data) {
            //         dataRender([data])
            //         socket.emit('chat', )

            //         // datapi.post(`http://localhost:3000/push/${ auth.token }`, {
            //         //     page : 'stream',
            //         //     id   : params.id,
            //         //     data : {
            //         //         title : user_data.username,
            //         //         body  : data.message,
            //         //         tag   : `${ params.id }__${ auth.id }`,
            //         //         icon  : 'http://localhost/stream/storage/avatar/' + (user_data.avatar || 'avatar.png'),//'http://localhost:5501/public/img/icons/png/avatar.png',
            //         //         data  : {
            //         //             url : location.pathname + location.hash
            //         //         }
            //         //     }
            //         // })

            //         const [element] = [ ...elementItemChat.children ].slice(-1)
            //         if(element) element.scrollIntoView({ behavior: "instant" });
            //     } 
            // }) 

        }
        else if(action == 'update'){
            data.status = 2
            //data.id = formChat.dataset.idMessage
            delete data.datetime_add 
            const items = elementItemChat.querySelectorAll(`div[data-id-reply = div-${ data.id }]`)
            items.forEach(item => item.children[0].textContent = data.message )

            datapi.patch(api(`/stream/api/stream_chat?id=${ formChat.dataset.idMessage }&token=${ auth.token }`), data)
            .then(data => {
                if(data) {
                    dataRender([data])
                    socket.emit('chat', JSON.stringify({ action : 'put', id_message : data.id, id_stream : params.id, message : data.message }))
                } 
            }) 
        }

        formChat.classList.remove('active')
        formChat.setAttribute('data-action', 'add')
        formChat.removeAttribute('data-id-message-reply')
        formChat.removeAttribute('data-id-message')

    })

    const dataRender =(Chat = [])=>{
        let elementPrevious = null
        elementItemLoader.remove()
        if(!Chat.length){
            elementItemChat.remove()
            elementItem.append(elementItemEmpty)
            return
        }

        if(elementItemChat.children.length) {
            
            Chat.forEach((data, index) => {
                console.log(data);
                const element = elementItemChat.querySelector(`#div-${ data.id }`)
                
                if(index++ == 0){
                    if(Date.now() < (parseInt(data.datetime_add) + 7000)){ 
                        if(data.id_user != auth.uid){ 
                            dispatchEvent(new CustomEvent('send_notification_message'))
                        }
                    }
                }

                if(element){
                    elementPrevious = element
                    const data_data = JSON.parse(element.dataset.data ?? '{}') 
                    if(data.status == 4) { 
                        if(data.id_user != auth.uid) return element.outerHTML = `<div id="div-${ data.id }" style="display:none"></div>`  
                        else return element.replaceWith(chatBox(data, auth)); 
                    } 
                    if(data.status == 5) { 
                        if(data.id_user != auth.uid) {
                            return element.replaceWith(chatBox(data, auth)) 
                        }
                    }
                    if(parseInt(data.datetime_update) > parseInt(data_data.datetime_update)){
                        return element.replaceWith(chatBox(data, auth));
                    }
                } else {
                    if(data.status == 4) { if(data.id_user != auth.uid) return } 

                    const element = chatBox(data, auth) 
                    if(data.status == 5) { if(data.id_user != auth.uid) return elementPrevious.before(element) }
                    elementItemChat.append(element)

                }
            })
            
        } else {

            const contenedor = document.createDocumentFragment()
            Chat.forEach(data => {
                if(data.status == 4) {
                    if(data.id_user != auth.uid)
                        return contenedor.prepend(createHTML(`<div id="div-${ data.id }" style="display:none"></div>`))
                } 
                contenedor.prepend(chatBox(data, auth))
            })
            elementItemEmpty.remove()
            elementItemChat.append(contenedor)
            elementItem.append(elementItemChat)

        }
    }


    const dataLoad =(id = '')=>{  
        if(id == '') {
            datapi.get(api(`/stream/api/stream_chat?id_stream=${ params.id }&token=${ auth.token }`)).then(dataRender) 
        } else {
            datapi.get(api(`/stream/api/stream_chat?id=${ id }&id_stream=${ params.id }&token=${ auth.token }`)).then(dataRender) 
        }
        
    }

    socket.on('chat', data => {
        data = JSON.parse(data)

        if(data.id_stream != params.id) return

        if(['remove'].includes(data.action)) {
            const item = elementItemChat.querySelector(`#div-${ data.id_message }`)
            const items = elementItemChat.querySelectorAll(`div[data-id-reply = div-${ data.id_message }]`)
            items.forEach(item => item.remove() )

            if(item) item.remove()
        }

        if(['hide'].includes(data.action)) {
            dataLoad(data.id_message) 
        }
        
        if(['put'].includes(data.action)){
            const items = elementItemChat.querySelectorAll(`div[data-id-reply = div-${ data.id_message }]`)
            items.forEach(item => item.children[0].textContent = data.message )
            dataLoad(data.id_message)
        }
    })

    elementItemEmpty.remove()
    elementItemChat.remove()
    dataLoad()

    let activeScroll = false
    elementItem.addEventListener('scroll', () => {
        activeScroll = true
    })

    const handleSwipeRight = element =>{
        let startX = 0;
        let isSwiping = false;
        let limit = 0
        let move = 0

        let elementChat = false
        
        function handleSwipeStart(e) {
            activeScroll = false 
            elementChat = e.target.closest('.div_T5m0f')

            if(elementChat) {
                isSwiping = true;
                startX = e.touches[0].clientX;
                elementChat.style.transition = "none";
                limit = 0
                move = 0
            }
          
        }
        
        function handleSwipeMove(e) {
            if(elementChat) {
                if(activeScroll) return
                if (isSwiping) {

                    const currentX = e.touches[0].clientX;
                    const deltaX = currentX - startX; 

                    if(++move == 1) return 
                    if(deltaX < 0) return
                    if(deltaX > 100) return

                    limit = deltaX
                    elementChat.style.transform = `translateX(${deltaX}px)`
                  }
            }
        }
        
        // Función para manejar el final del deslizamiento
        function handleSwipeEnd() {
            if(elementChat) {
                if (isSwiping) {
                    isSwiping = false;
                    elementChat.style.transition = "transform 0.3s"; // Restablecer la transición
                    elementChat.style.transform = "translateX(0)";
                    if(limit >= 60) {
                        dispatchEvent(new CustomEvent('open_reply_message', { detail : JSON.parse(elementChat.dataset.data) }))
                    }
                    limit = 0
                    move = 0

                    elementItem.removeAttribute('style')
                }
            }

        }
        
        // Agregar eventos de escucha para el deslizamiento
        element.addEventListener("touchstart", handleSwipeStart, { passive: true });
        element.addEventListener("touchmove", handleSwipeMove, { passive: true });
        element.addEventListener("touchend", handleSwipeEnd);
    }

    handleSwipeRight(elementItemChat)
  
    return ElementComponent
}