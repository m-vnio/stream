import { dbFirebase, streamRealtime } from "../firebase/data.js"
import emoji from "./emoji.js"
import form_link from "./form_link.js"

export default ()=>{

    const db     = new dbFirebase('stream')
    const params = json(sessionStorage.getItem('params'))
    const user   = json(localStorage.getItem('user'))
 
    let data_update = {
        play : 'false',
        time_progress   : '0',
        datetime_update : Date.now(),
        data_update : Date.now()
    }

    const fisrt_time = {
        render : true,
        seeker : true
    }

    const data_local = {
        datetime_update : 0,
        data_db_update : false
    }

    const ElementComponent = createHTML(`
        <div class="div_v05FO">
            <div class="div_al065">
                <div class="div_Gj3xZ">
                    <video class="video_01Mr1" name="media">
                        <source type="video/mp4">
                    </video>
                </div>
                <div class="div_Mbdqf">
                    <div class="div_6u0fO">
                        <div class="div_BXzT1">
                            <button class="button_hdZNr" data-action="open_form_link"><img src="public/img/icons/svg/icon-plus.svg" alt="icon-svg"></button>
                        </div> 
                    </div>
                    <div class="div_7JM92">
                        <div class="div_AdvXt"><input type="range" value="10" min="0" max="10"></div>                    
                    </div>
                    <div class="div_XjdZ8">
                        <div class="div_uN72K">
                            <div class="div_Ve01l">
                                <div class="div_38qNj">
                                    <hr class="hr_A6t1K">
                                </div>
                                <input type="range" class="input_908X1" data-value="0" value="0" min="0" max="100">
                            </div>
                        </div>
                        <div class="div_3hBg2">
                            <div class="div_HGz61">
                                <button class="button_KXchF" data-action="play_pause"><img src="public/img/icons/svg/icon-play.svg" alt="icon-svg"></button>
                                <button class="button_KXchF" data-action="seeked_back_10"><img src="public/img/icons/svg/icon-clock-rotate-left.svg" alt="icon-svg"></button>
                            </div>
                            <span class="span_4E0dR">00:00:00</span>
                            <div class="div_HGz61">
                                <button class="button_KXchF" data-action="open_emoji"><img src="public/img/icons/svg/icon-emoji.svg" alt="icon-svg"></button>
                                <button class="button_KXchF" data-action="fullscreen"><img src="public/img/icons/svg/icon-screen-max.svg" alt="icon-svg"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div_1qCY1">
                    <button class="button_hdZNr" data-action="open_chat"><img src="public/img/icons/svg/icon-message.svg" alt="icon-svg"></button>
                </div>
                <div class="div_82gU7" id="contenedor_emoji_mostrar"></div>
                <div class="div_F6FFR" id="contenedor_chat_2">
                    <div class="div_3b7ZM background"></div>
                </div>
            </div>
            <div data-css="contenedor_video_fullscreen"></div>
        </div>
    `)

    const style = new createCSS('video-player', ElementComponent)

    const contenedor_video_fullscreen = style.element('contenedor_video_fullscreen').css(`
        & { position : fixed; inset : 0; display : flex; }
        & .div_al065{ padding : 0 }
    `)

    const root = document.getElementById('root')
    const contenedor_emoji  = emoji()
    const contenedor_form_link  = form_link()

    const contenedor_botones = ElementComponent.querySelector('.div_Mbdqf')
    const contenido_video = ElementComponent.querySelector('.video_01Mr1')

    const btn_fullscreen = ElementComponent.querySelector('button[ data-action = fullscreen]')
    const open_emoji = ElementComponent.querySelector('button[ data-action = open_emoji ]')
    const open_chat = ElementComponent.querySelector('button[ data-action = open_chat ]')
    const open_form_link = ElementComponent.querySelector('button[ data-action = open_form_link ]')

    const element_mensaje_notificacion =  ElementComponent.querySelector('.div_1qCY1')

    // const btn_pip = ElementComponent.querySelector('button[ data-action = pip ]')

    const play_pause = ElementComponent.querySelector('button[ data-action = play_pause ]')
    const seeked_back_10 = ElementComponent.querySelector('button[ data-action = seeked_back_10 ]')

    const ipt_duration = ElementComponent.querySelector('.input_908X1')
    const hr_progreso = ElementComponent.querySelector('.hr_A6t1K')
    const span_duraction = ElementComponent.querySelector('.span_4E0dR')
    
    const event_open_message = new CustomEvent('open_message')
 
    ElementComponent.querySelector('.div_Gj3xZ').addEventListener("click", ()=> {
        contenedor_botones.classList.add('active')
        if(document.fullscreenElement)
            element_mensaje_notificacion.style.display = 'flex'
    })

    clickElement(contenedor_botones, ()=> {
        contenedor_botones.classList.remove('active')
        element_mensaje_notificacion.style.display = 'none'
    })

    play_pause.addEventListener("click", ()=> {
        if(contenido_video.paused) contenido_video.play()
        else contenido_video.pause()

        const progress = contenido_video.currentTime.toFixed(0)
        
        db.edit(params.id, {
            play    : !contenido_video.paused,
            id_user : user.uid,
            datetime_update : Date.now().toString(),
            time_progress   : progress,
            change : 'play'
        })

        play_pause.style.pointerEvents = 'none'
        setTimeout(()=> play_pause.style.pointerEvents = 'initial', 1500)
    })

    seeked_back_10.addEventListener("click", ()=> {
        contenido_video.currentTime = contenido_video.currentTime.toFixed(0) - 10  
        
        const progress = contenido_video.currentTime.toFixed(0)

        db.edit(params.id, {
            id_user : user.uid,
            datetime_update : Date.now().toString(),
            time_progress   : progress,
            change : 'seeked'
        })

        seeked_back_10.style.pointerEvents = 'none'
        setTimeout(()=> seeked_back_10.style.pointerEvents = 'initial', 1500)
    })

    open_emoji.addEventListener("click", ()=> {
        contenedor_botones.classList.remove('active')
        if(document.fullscreenElement) document.fullscreenElement.append(contenedor_emoji)
        else root.append(contenedor_emoji)
    })

    open_chat.addEventListener("click", ()=> {
        contenedor_botones.classList.remove('active')
        open_chat.classList.remove('notification')
        dispatchEvent(event_open_message)
    })

    open_form_link.addEventListener("click", ()=> {
        contenedor_botones.classList.remove('active')
        if(document.fullscreenElement) document.fullscreenElement.append(contenedor_form_link)
        else root.append(contenedor_form_link)
    })

    const contenedor_video = ElementComponent.querySelector('.div_al065') 
 
    const def_fullscreen =(status)=>{
        if(document.fullscreenElement){     
            if(status) return document.exitFullscreen();
            if(/Mobi|Android/i.test(navigator.userAgent)){
                if(window.screen.orientation && window.screen.orientation.lock){
                    window.screen.orientation.lock("landscape");
                }
            }
            contenedor_video_fullscreen.element.append(contenedor_video)
            btn_fullscreen.innerHTML = '<img src="public/img/icons/svg/icon-screen-min.svg" alt="icon-svg">'
            element_mensaje_notificacion.style.display = 'flex' 
        } else {
            if(status) {
                root.append(contenedor_video_fullscreen.element) 
                return contenedor_video_fullscreen.element.requestFullscreen();
            }

            if(/Mobi|Android/i.test(navigator.userAgent)){
                if(window.screen.orientation && window.screen.orientation.unlock){
                    window.screen.orientation.unlock();
                }
            }

            contenedor_video_fullscreen.element.remove()
            ElementComponent.append(contenedor_video)
            btn_fullscreen.innerHTML = '<img src="public/img/icons/svg/icon-screen-max.svg" alt="icon-svg">'
            element_mensaje_notificacion.style.display = 'none'
        }
    }

    btn_fullscreen.addEventListener('click', ()=> {
        def_fullscreen(true)
    })

    addRemoveEventListenerHashchange(document, 'fullscreenchange', ()=> def_fullscreen(false))
    /* eventos del input */

    let change_input = false
    ipt_duration.addEventListener('input', () => {
        change_input = true
        hr_progreso.style.width = ((parseInt(ipt_duration.value) / parseInt(ipt_duration.max)) * 100).toFixed(0) + '%'
    })

    ipt_duration.addEventListener('change', () => {
        change_input = false
        contenido_video.currentTime = parseInt(ipt_duration.value) 
        const progress = contenido_video.currentTime.toFixed(0)

        db.edit(params.id, {
            id_user : user.uid,
            datetime_update : Date.now().toString(),
            time_progress   : progress,
            change : 'seeked'
        }) 
    })

    /* eventos del contenido */
    contenido_video.addEventListener("play", ()=> play_pause.innerHTML = '<img src="public/img/icons/svg/icon-pause.svg" alt="icon-svg">');
    contenido_video.addEventListener("pause", ()=> play_pause.innerHTML = '<img src="public/img/icons/svg/icon-play.svg" alt="icon-svg">');
    contenido_video.addEventListener("loadedmetadata", ()=> {
        ipt_duration.setAttribute('max', contenido_video.duration.toFixed(0))
        const segundos_diferencia = Math.round((Date.now() - data_update.data_update) / 1000) 
        contenido_video.currentTime = parseInt(data_update.time_progress) + segundos_diferencia
    })

    contenido_video.addEventListener("timeupdate", ()=> {
        if(change_input) return 
        ipt_duration.value = contenido_video.currentTime.toFixed(0)

        if(ipt_duration.value != ipt_duration.dataset.value){
            ipt_duration.dataset.value = ipt_duration.value
            hr_progreso.style.width = ((parseInt(ipt_duration.value) / parseInt(ipt_duration.max)) * 100).toFixed(0) + '%'
            const Time = getTimeBySecond(parseInt(ipt_duration.max) - parseInt(ipt_duration.value))
            span_duraction.textContent = `${ ('0'+ Time.hours).slice(-2) }:${ ('0'+ Time.minutes).slice(-2) }:${ ('0'+ Time.seconds).slice(-2) }`
        }
    });

    contenido_video.addEventListener("seeked", ()=> {
        if(fisrt_time.seeker) fisrt_time.seeker = false
        else if(data_update.id_user == user.uid) return 

        if(data_local.data_db_update){
            const segundos_diferencia = Math.round((Date.now() - data_update.data_update) / 1000)
            contenido_video.currentTime = parseInt(data_update.time_progress) + segundos_diferencia
            data_local.data_db_update = false
        } else {
            if(JSON.parse(localStorage.getItem('click'))){
                if(JSON.parse(data_update.play)) contenido_video.play()
                else contenido_video.pause()
            }
        }
    })

    //eventos de windows

    addRemoveEventListenerHashchange(window, 'open_link', e => {
        contenido_video.setAttribute('src', e.detail.link)
        contenido_video.setAttribute('autoplay', '')
        contenido_video.currentTime = 0

        if(e.detail.submit) {
            db.edit(params.id, {
                link : e.detail.link,
                datetime_update : Date.now().toString(),
                play : 'true',
                change : 'link',
                id_user : user.uid,
                time_progress   : '0',
            })
        }
    })

    addRemoveEventListenerHashchange(window, 'send_notification_message', ()=> {
        if(document.fullscreenElement){
            element_mensaje_notificacion.style.display = 'flex'
            element_mensaje_notificacion.children[0].classList.add('notification')
        }
    })

    let volumen = 1
    addRemoveEventListenerHashchange(window, 'wheel', e => {
        if(document.fullscreenElement){
            if(e.deltaY > 0) { if (volumen > 0) contenido_video.volume = (--volumen / 10) } 
            else {  if (volumen < 10) contenido_video.volume = (++volumen / 10) }
        }
    })

    const renderVideo =(querySnapshot)=>{
        querySnapshot.forEach(doc => {
            const data = data_update = doc.data()
            data_update.data_update  = Date.now()

            if(fisrt_time.render){
                contenido_video.setAttribute('src', data.link)
                return
            }
            
            if(data.id_user == user.uid) return

            if(parseInt(data.datetime_update) > data_local.datetime_update){
                data_local.datetime_update = parseInt(data.datetime_update)

                if(data.change == 'play'){
                    if(JSON.parse(localStorage.getItem('click'))){
                        if(JSON.parse(data_update.play)) contenido_video.play()
                        else contenido_video.pause()
                    }
                } 
                else if(data.change == 'seeked'){
                    data_local.data_db_update = true
                    contenido_video.currentTime = parseInt(data.time_progress) 
                } 
                else if(data.change == 'link'){
                    data_local.data_db_update = true
                    contenido_video.currentTime = 0
                    contenido_video.setAttribute('src', data.link)
                }
            }
        });

        fisrt_time.render = false
    }

    const validate_click = JSON.parse(localStorage.getItem('click')) 

    // if(validate_click){
    //     const unsubscribe = streamRealtime(renderVideo, params.id)
    //     addRemoveEventListener(window, 'hashchange', unsubscribe)
    // } else {
    //     addRemoveEventListener(window, 'click', ()=> {
    //         const unsubscribe = streamRealtime(renderVideo, params.id)
    //         addRemoveEventListener(window, 'hashchange', unsubscribe)
    //     })
    // }
    
    contenedor_video_fullscreen.element.remove()
    return ElementComponent
}
 
//fullscreen