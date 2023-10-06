import { dbFirebase, dbFirebaseRealtime } from "../firebase/data.js"
import emoji from "./emoji.js"
import form_link from "./form_link.js"

export default (ElementComponentFullScreen)=>{
    
    const params = json(sessionStorage.getItem('params'))
    const user   = json(localStorage.getItem('user'))

    const db     = new dbFirebase('stream')
    const dbRealtime = new dbFirebaseRealtime('stream')
    dbRealtime.query({ where : [["id", "==", params.id]], limit : 1 })
 
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
        <div class="div_v05FO active">
            <div class="div_al065">
                <div class="div_Gj3xZ">
                    <video class="video_01Mr1" name="media"></video>
                </div>
                <div class="div_Mbdqf">
                    <div class="div_6u0fO">
                        <div class="div_BXzT1">
                            <button class="button_hdZNr active" data-action="open_form_link"><img src="public/img/icons/svg/icon-plus.svg" alt="icon-svg"></button>
                        </div> 
                    </div> 
                    <div class="div_XjdZ8">
                        <div class="div_3hBg2">
                            <div class="div_HGz61">
                                <button class="button_KXchF" data-action="btnPlay"><img src="public/img/icons/svg/icon-play.svg" alt="icon-svg"></button>
                                <button class="button_KXchF" data-action="seeked_back_10"><img src="public/img/icons/svg/icon-clock-rotate-left.svg" alt="icon-svg"></button>
                            </div>
                            <span class="span_4E0dR">00:00:00</span>
                            <div class="div_HGz61">
                                <button class="button_KXchF" data-action="open_emoji"><img src="public/img/icons/svg/icon-emoji.svg" alt="icon-svg"></button>
                                <button class="button_KXchF" data-action="active_fullscreen"><img src="public/img/icons/svg/icon-screen-max.svg" alt="icon-svg"></button>
                            </div>
                        </div>
                        <div class="div_uN72K">
                            <div class="div_Ve01l">
                                <div class="div_38qNj">
                                    <hr class="hr_A6t1K">
                                </div>
                                <input type="range" class="input_908X1" data-value="0" value="0" min="0" max="100">
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

    const findChild = query => ElementComponent.querySelector(query) 

    const root = document.getElementById('root')
    const elementEmoji = emoji()
    const elementFormLink = form_link()

    const btnPlay = findChild('button[data-action=btnPlay]')
    const btnSeekedBack10 = findChild('button[data-action=seeked_back_10]')
    const btnOpenChat = findChild('button[data-action=open_chat]')
    const btnOpenEmoji = findChild('button[data-action=open_emoji]')
    const btnOpenFormLink = findChild('button[data-action=open_form_link]')
    const btnActiveFullscreen = findChild('button[data-action=active_fullscreen]')

    //div_al065
    const elementVideoContainer =   findChild('.div_al065')
    const elementVideoContent   =   findChild('.div_Gj3xZ')
    const elementVideoControl   =   findChild('.div_Mbdqf')
    const elementVideo          = findChild('.video_01Mr1')

    const ipt_duration      = findChild('.input_908X1')
    const hr_progreso       = findChild('.hr_A6t1K')
    const span_duraction    = findChild('.span_4E0dR')

    elementVideoContent.addEventListener('click', () => {
        elementVideoContent.classList.toggle('active')
    })

    btnPlay.addEventListener("click", ()=> {
        if(elementVideo.paused) elementVideo.play()
        else elementVideo.pause()

        const progress = elementVideo.currentTime.toFixed(0)
        
        db.edit(params.id, {
            play    : !elementVideo.paused,
            id_user : user.uid,
            datetime_update : Date.now().toString(),
            time_progress   : progress,
            change : 'play'
        })

        btnPlay.style.pointerEvents = 'none'
        setTimeout(()=> btnPlay.style.pointerEvents = 'initial', 1500)
    })

    btnSeekedBack10.addEventListener("click", ()=> {
        elementVideo.currentTime = elementVideo.currentTime.toFixed(0) - 10  
        
        const progress = elementVideo.currentTime.toFixed(0)

        db.edit(params.id, {
            id_user : user.uid,
            datetime_update : Date.now().toString(),
            time_progress   : progress,
            change : 'seeked'
        })

        seeked_back_10.style.pointerEvents = 'none'
        setTimeout(()=> seeked_back_10.style.pointerEvents = 'initial', 1500)
    })
    
    btnOpenChat.addEventListener('click', ()=> {
        elementVideoContent.classList.remove('active')
        ElementComponent.classList.toggle('active')
    })

    btnOpenEmoji.addEventListener('click', ()=> {
        elementVideoContent.classList.remove('active')
        if(document.fullscreenElement) document.fullscreenElement.append(elementEmoji) 
        else root.append(elementEmoji)
    })

    btnOpenFormLink.addEventListener('click', ()=> {
        elementVideoContent.classList.remove('active')
        if(document.fullscreenElement) document.fullscreenElement.append(elementFormLink) 
        else root.append(elementFormLink)
    })

    btnActiveFullscreen.addEventListener('click', ()=> {
        elementVideoContent.classList.remove('active')
        def_fullscreen(true)
    })

    addRemoveEventListenerHashchange(document, 'fullscreenchange', ()=> def_fullscreen(false))

    const def_fullscreen =(status)=>{
        if(document.fullscreenElement){     
            if(status) return document.exitFullscreen() 
            ElementComponentFullScreen.classList.add('active')
            btnActiveFullscreen.innerHTML = '<img src="public/img/icons/svg/icon-screen-min.svg" alt="icon-svg">'
            btnOpenChat.classList.add('active')
            ElementComponent.classList.remove('active')

            if(/Mobi|Android/i.test(navigator.userAgent)){
                if(window.screen.orientation && window.screen.orientation.lock){
                    window.screen.orientation.lock("landscape");
                }
            }
        } else {
            if(status) return ElementComponentFullScreen.requestFullscreen()
            ElementComponentFullScreen.classList.remove('active')
            btnActiveFullscreen.innerHTML = '<img src="public/img/icons/svg/icon-screen-max.svg" alt="icon-svg">'
            btnOpenChat.classList.remove('active')
            ElementComponent.classList.add('active')

            if(/Mobi|Android/i.test(navigator.userAgent)){
                if(window.screen.orientation && window.screen.orientation.unlock){
                    window.screen.orientation.unlock();
                } 
            }
        }
    } 

    //elementVideo
    elementVideo.addEventListener("play", ()=> btnPlay.innerHTML = '<img src="public/img/icons/svg/icon-pause.svg" alt="icon-svg">');
    elementVideo.addEventListener("pause", ()=> btnPlay.innerHTML = '<img src="public/img/icons/svg/icon-play.svg" alt="icon-svg">');

    // elementVideo.addEventListener("loadedmetadata", ()=> {
    //     ipt_duration.setAttribute('max', elementVideo.duration.toFixed(0))
    //     const segundos_diferencia = Math.round((Date.now() - data_update.data_update) / 1000) 
    //     elementVideo.currentTime = parseInt(data_update.time_progress) + segundos_diferencia
    // })

    // elementVideo.addEventListener("timeupdate", ()=> {
    //     if(change_input) return 
    //     ipt_duration.value = elementVideo.currentTime.toFixed(0)

    //     if(ipt_duration.value != ipt_duration.dataset.value){
    //         ipt_duration.dataset.value = ipt_duration.value
    //         hr_progreso.style.width = ((parseInt(ipt_duration.value) / parseInt(ipt_duration.max)) * 100).toFixed(0) + '%'
    //         const Time = getTimeBySecond(parseInt(ipt_duration.max) - parseInt(ipt_duration.value))
    //         span_duraction.textContent = `${ ('0'+ Time.hours).slice(-2) }:${ ('0'+ Time.minutes).slice(-2) }:${ ('0'+ Time.seconds).slice(-2) }`
    //     }
    // })

    //elementInput
    let change_input = false
    // ipt_duration.addEventListener('input', () => {
    //     change_input = true
    //     hr_progreso.style.width = ((parseInt(ipt_duration.value) / parseInt(ipt_duration.max)) * 100).toFixed(0) + '%'
    // })

    // ipt_duration.addEventListener('change', () => {
    //     change_input = false
    //     elementVideo.currentTime = parseInt(ipt_duration.value) 
    //     const progress = elementVideo.currentTime.toFixed(0)

    //     db.edit(params.id, {
    //         id_user : user.uid,
    //         datetime_update : Date.now().toString(),
    //         time_progress   : progress,
    //         change : 'seeked'
    //     }) 
    // })

    //eventos de windows
    addRemoveEventListenerHashchange(window, 'open_link', e => {
        // elementVideo.setAttribute('src', e.detail.link)
        // elementVideo.setAttribute('autoplay', '')
        // elementVideo.currentTime = 0

        if(e.detail.submit) {
            // db.edit(params.id, {
            //     link : e.detail.link,
            //     datetime_update : Date.now().toString(),
            //     play : 'true',
            //     change : 'link',
            //     id_user : user.uid,
            //     time_progress   : '0',
            // })
        } else {
            //elementVideoContent
            elementVideoContent.innerHTML = ''
            //elementVideo.remove()

            const testVideo = createHTML('<video class="video_01Mr1" name="media"></video>')
            console.log(testVideo);

            const videoURL = e.detail.link
            const source = document.createElement("source");
            source.src = videoURL;

            if (videoURL.endsWith(".mp4")) source.type = "video/mp4"
            else if (videoURL.endsWith(".webm")) source.type = "video/webm";
            else if (videoURL.endsWith(".ogv")) source.type = "video/ogg"
            else if (videoURL.endsWith(".avi")) source.type = "video/x-msvideo"
            else if (videoURL.endsWith(".m3u8")) source.type = "application/x-mpegURL"
            else source.type = "video/mp4";

            testVideo.append(source)

            elementVideoContent.append(testVideo)
            testVideo.setAttribute('autoplay', '') 

            testVideo.addEventListener("timeupdate", ()=> {
                ipt_duration.setAttribute('max', testVideo.duration.toFixed(0))
                if(change_input) return 
                ipt_duration.value = testVideo.currentTime.toFixed(0)
        
                if(ipt_duration.value != ipt_duration.dataset.value){
                    ipt_duration.dataset.value = ipt_duration.value
                    hr_progreso.style.width = ((parseInt(ipt_duration.value) / parseInt(ipt_duration.max)) * 100).toFixed(0) + '%'
                    const Time = getTimeBySecond(parseInt(ipt_duration.max) - parseInt(ipt_duration.value))
                    span_duraction.textContent = `${ ('0'+ Time.hours).slice(-2) }:${ ('0'+ Time.minutes).slice(-2) }:${ ('0'+ Time.seconds).slice(-2) }`
                }
            })

            ipt_duration.addEventListener('input', () => {
                change_input = true
                hr_progreso.style.width = ((parseInt(ipt_duration.value) / parseInt(ipt_duration.max)) * 100).toFixed(0) + '%'
            })
        
            ipt_duration.addEventListener('change', () => {
                change_input = false
                testVideo.currentTime = parseInt(ipt_duration.value)  
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
            if(e.deltaY > 0) { if (volumen > 0) elementVideo.volume = (--volumen / 10) } 
            else {  if (volumen < 10) elementVideo.volume = (++volumen / 10) }
        }
    })

    //rendervideo
    const renderVideo =(querySnapshot)=>{
        querySnapshot.forEach(doc => {
            const data = data_update = doc.data()
            data_update.data_update  = Date.now()

            if(fisrt_time.render){
                elementVideo.setAttribute('src', data.link)
                return
            }
            
            if(data.id_user == user.uid) return

            if(parseInt(data.datetime_update) > data_local.datetime_update){
                data_local.datetime_update = parseInt(data.datetime_update)

                if(data.change == 'play'){
                    if(JSON.parse(localStorage.getItem('click'))){
                        if(JSON.parse(data_update.play)) elementVideo.play()
                        else elementVideo.pause()
                    }
                } 
                else if(data.change == 'seeked'){
                    data_local.data_db_update = true
                    elementVideo.currentTime = parseInt(data.time_progress) 
                } 
                else if(data.change == 'link'){
                    data_local.data_db_update = true
                    elementVideo.currentTime = 0
                    elementVideo.setAttribute('src', data.link)
                }
            }
        });

        fisrt_time.render = false
    }

    const validate_click = JSON.parse(localStorage.getItem('click')) 

    if(validate_click){
        const unsubscribe = dbRealtime.subscribe(renderVideo)
        addRemoveEventListener(window, 'hashchange', unsubscribe)
    } else {
        addRemoveEventListener(window, 'click', ()=> {
            const unsubscribe = dbRealtime.subscribe(renderVideo)
            addRemoveEventListener(window, 'hashchange', unsubscribe)
        })
    }

    return ElementComponent
}
  