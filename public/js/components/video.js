import { dbFirebase, dbFirebaseRealtime } from "../firebase/data.js"
import emoji from "./emoji.js"
import formLink from "./formLink.js"
import videoHistory from "./videoHistory.js"

export default (ElementComponentFullScreen)=>{
    //div_v05FO
    const params = JSON.parse(sessionStorage.getItem('params'))
    const user      = ls('user').data({}).push(true, true)
    const user_data = ls('user_data').data({}).push(true, true) 

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
                        <div class="div_BXzT1">
                            <button class="button_KXchF" data-action="open_history"><img src="public/img/icons/svg/icon-paper-clock-back.svg" alt="icon-svg"></button>
                            <button class="button_KXchF" data-action="open_emoji"><img src="public/img/icons/svg/icon-emoji.svg" alt="icon-svg"></button>
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
                                <button class="button_KXchF lock-unlock" style="visibility: hidden" data-action="lock_unlock"><img src="public/img/icons/svg/icon-lock.svg" alt="icon-svg"></button>
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

    const query = new findElement(ElementComponent)
    
    const root = document.getElementById('root')
    const elementEmoji = emoji()
    const elementFormLink = formLink()
    const elementVideoHistory = videoHistory()

    const btnPlay = query.get('button[data-action=btnPlay]')
    const btnSeekedBack10 = query.get('button[data-action=seeked_back_10]')
    const btnOpenChat = query.get('button[data-action=open_chat]')
    const btnpenHistory = query.get('button[data-action=open_history]')
    const btnOpenEmoji = query.get('button[data-action=open_emoji]')
    const btnOpenFormLink = query.get('button[data-action=open_form_link]')
    const btnActiveFullscreen = query.get('button[data-action=active_fullscreen]')
    const btnLockUnlock = query.get('button[data-action=lock_unlock]')

    //div_al065
    const elementVideoContainer =   query.get('.div_al065')
    const elementVideoContent   =   query.get('.div_Gj3xZ')
    const elementVideoControl   =   query.get('.div_Mbdqf')
    const elementVideoControlBotttom = query.get('.div_XjdZ8')
    const elementVideo          =   query.get('.video_01Mr1')

    const elementButtonTop      =   query.get('.div_6u0fO')

    const ipt_duration      = query.get('.input_908X1')
    const hr_progreso       = query.get('.hr_A6t1K')
    const span_duration    = query.get('.span_4E0dR')

    const setVideoHistory =(message = '')=>{
        const videoHistory = ls('video-history').data([]).push(true, true)
        videoHistory.unshift({ message, datetime : Date.now().toString() })
        ls('video-history').data(videoHistory).put(true)
    }

    elementVideoContent.addEventListener('click', () => {
        elementVideoContent.classList.toggle('active')

        if(document.fullscreenElement) {
            if(elementVideoContent.classList.contains('active')) btnOpenChat.classList.add('active')
            else btnOpenChat.classList.remove('active')
        }
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

        btnSeekedBack10.style.pointerEvents = 'none'
        setTimeout(()=> btnSeekedBack10.style.pointerEvents = 'initial', 1500)
    })

    span_duration.addEventListener("click", ()=> {
        const progress = elementVideo.currentTime.toFixed(0)
        db.edit(params.id, {
            id_user : user.uid,
            datetime_update : Date.now().toString(),
            time_progress   : progress,
            change : 'seeked'
        })

        span_duration.style.pointerEvents = 'none'
        setTimeout(()=> span_duration.style.pointerEvents = 'initial', 1500)
    })
    
    btnOpenChat.addEventListener('click', ()=> {
        btnOpenChat.classList.remove('notification')
        elementVideoContent.classList.remove('active')
        ElementComponent.classList.toggle('active')
    })

    btnOpenEmoji.addEventListener('click', ()=> {
        elementVideoContent.classList.remove('active')
        if(document.fullscreenElement) document.fullscreenElement.append(elementEmoji) 
        else root.append(elementEmoji)
    })

    btnpenHistory.addEventListener('click', ()=> {
        if(document.fullscreenElement) document.fullscreenElement.append(elementVideoHistory) 
        else root.append(elementVideoHistory)
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

    btnLockUnlock.addEventListener('click', ()=> {
        elementVideoControlBotttom.classList.toggle('unlock')

        const isElementUnlock = elementVideoControlBotttom.classList.contains('unlock')
        btnLockUnlock.innerHTML = `<img src="public/img/icons/svg/icon-${ isElementUnlock ? 'unlock' : 'lock' }.svg" alt="icon-svg">` 
    })

    addRemoveEventListenerHashchange(document, 'fullscreenchange', ()=> def_fullscreen(false))

    const def_fullscreen =(status)=>{
        if(document.fullscreenElement){     
            if(status) return document.exitFullscreen() 
            ElementComponentFullScreen.classList.add('active')
            btnActiveFullscreen.innerHTML = '<img src="public/img/icons/svg/icon-screen-min.svg" alt="icon-svg">'
            btnOpenChat.classList.add('active')
            ElementComponent.classList.remove('active')
            elementButtonTop.classList.add('active')
            btnLockUnlock.style.visibility = 'initial' 

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
            elementButtonTop.classList.remove('active')
            btnLockUnlock.style.visibility = 'hidden'
            btnLockUnlock.innerHTML = `<img src="public/img/icons/svg/icon-lock.svg" alt="icon-svg">`

            elementVideoControlBotttom.classList.remove('unlock')

            if(/Mobi|Android/i.test(navigator.userAgent)){
                if(window.screen.orientation && window.screen.orientation.unlock){
                    window.screen.orientation.unlock();
                } 
            }
        }
    } 
    
    //elementVideo
    elementVideo.addEventListener("play", ()=> {
        btnPlay.innerHTML = '<img src="public/img/icons/svg/icon-pause.svg" alt="icon-svg">'
        setVideoHistory(`se reanudo el video`)
    })
    elementVideo.addEventListener("pause", ()=> {
        btnPlay.innerHTML = '<img src="public/img/icons/svg/icon-play.svg" alt="icon-svg">'
        setVideoHistory(`se pauso el video`)
    });

    elementVideo.addEventListener("loadedmetadata", ()=> {
        ipt_duration.setAttribute('max', elementVideo.duration.toFixed(0))
        const segundos_diferencia = Math.round((Date.now() - data_update.data_update) / 1000) 
        elementVideo.currentTime = parseInt(data_update.time_progress) + segundos_diferencia

        setTimeout(()=> {
            ipt_duration.setAttribute('max', elementVideo.duration.toFixed(0))
            const Time = getTimeBySecond(parseInt(ipt_duration.max))
            span_duration.textContent = `${ ('0'+ Time.hours).slice(-2) }:${ ('0'+ Time.minutes).slice(-2) }:${ ('0'+ Time.seconds).slice(-2) }`
        }, 1250)
    })


    elementVideo.addEventListener("timeupdate", ()=> {

        if(parseInt(ipt_duration.max) == 0){
            ipt_duration.setAttribute('max', elementVideo.duration.toFixed(0))
            const Time = getTimeBySecond(parseInt(ipt_duration.max))
            span_duration.textContent = `${ ('0'+ Time.hours).slice(-2) }:${ ('0'+ Time.minutes).slice(-2) }:${ ('0'+ Time.seconds).slice(-2) }`
        }

        if(change_input) return 
        ipt_duration.value = elementVideo.currentTime.toFixed(0)

        if(ipt_duration.value != ipt_duration.dataset.value){
            ipt_duration.dataset.value = ipt_duration.value
            hr_progreso.style.width = ((parseInt(ipt_duration.value) / parseInt(ipt_duration.max)) * 100).toFixed(0) + '%'
            const Time = getTimeBySecond(parseInt(ipt_duration.max) - parseInt(ipt_duration.value))
            span_duration.textContent = `${ ('0'+ Time.hours).slice(-2) }:${ ('0'+ Time.minutes).slice(-2) }:${ ('0'+ Time.seconds).slice(-2) }`
        }
    })

    //elementInput
    let change_input = false
    ipt_duration.addEventListener('input', () => {
        change_input = true
        hr_progreso.style.width = ((parseInt(ipt_duration.value) / parseInt(ipt_duration.max)) * 100).toFixed(0) + '%'
    })

    ipt_duration.addEventListener('change', () => {
        change_input = false
        elementVideo.currentTime = parseInt(ipt_duration.value) 
        const progress = elementVideo.currentTime.toFixed(0)

        db.edit(params.id, {
            id_user : user.uid,
            datetime_update : Date.now().toString(),
            time_progress   : progress,
            change : 'seeked'
        })

        setVideoHistory('se cambio la posicion del video')
    })

    addRemoveEventListenerHashchange(window, 'open_link', e => {
        // elementVideo.setAttribute('src', e.detail.link)
        // elementVideo.setAttribute('autoplay', '')
        // elementVideo.currentTime = 0
        renderVideoURL(e.detail.link)
        if(e.detail.submit) {
            db.edit(params.id, {
                link : e.detail.link,
                datetime_update : Date.now().toString(),
                play : 'true',
                change : 'link',
                id_user : user.uid,
                time_progress   : '0',
            })
            setVideoHistory('se cambio de video')
        }
    })

    addRemoveEventListenerHashchange(window, 'send_notification_message', ()=> {
        if(document.fullscreenElement){
            //element_mensaje_notificacion.style.display = 'flex'
            if(!ElementComponent.classList.contains('active'))
                btnOpenChat.classList.add('notification')
        }
    })

    let volumen = 1
    addRemoveEventListenerHashchange(window, 'wheel', e => {
        if(document.fullscreenElement){
            if(e.deltaY > 0) { if (volumen > 0) elementVideo.volume = (--volumen / 10) } 
            else {  if (volumen < 10) elementVideo.volume = (++volumen / 10) }
        }
    })

    //rendervideoURL
    const renderVideoURL = url =>{
        if(url == '') return

        const typeVideo = url =>{
            const urlObject = new URL(url)
            const newURK = urlObject.origin + urlObject.pathname

            if (newURK.endsWith(".mp4")) return "video/mp4"
            else if (newURK.endsWith(".webm")) return "video/webm";
            else if (newURK.endsWith(".ogv")) return "video/ogg"
            else if (newURK.endsWith(".avi")) return "video/x-msvideo"
            else if (newURK.endsWith(".m3u8")) return "application/x-mpegURL"
            else return "video/mp4";
        }

        const videoURL  = url 
        const source    = document.createElement("source"); 

        source.setAttribute('src', videoURL)
        source.setAttribute('type', typeVideo(videoURL))

        elementVideo.innerHTML = ''
        elementVideo.append(source)
        elementVideo.load()

    }

    //rendervideo
    const renderVideo =(querySnapshot)=>{
        querySnapshot.forEach(doc => {
            const data = data_update = doc.data()
            data_update.data_update  = Date.now()

            if(fisrt_time.render){
                fisrt_time.render = false
                renderVideoURL(data.link)
                return
            }
            
            if(data.id_user == user.uid) return

            if(parseInt(data.datetime_update) > data_local.datetime_update){
                data_local.datetime_update = parseInt(data.datetime_update)

                if(data.change == 'play'){
                    if(JSON.parse(localStorage.getItem('click'))){
                        const play = JSON.parse(data_update.play)
                        if(play) elementVideo.play()
                        else elementVideo.pause()
                        setVideoHistory(`se ${ play ? 'reanudo' : 'pauso' } el video`) 
                    }
                } 
                else if(data.change == 'seeked'){
                    data_local.data_db_update = true
                    elementVideo.currentTime = parseInt(data.time_progress)
                    setVideoHistory('se cambio la posicion del video') 
                } 
                else if(data.change == 'link'){
                    data_local.data_db_update = true
                    elementVideo.currentTime = 0
                    renderVideoURL(data.link)
                    setVideoHistory('se cambio de video')
                }
            }
        }); 
    }

    const validate_click = JSON.parse(localStorage.getItem('click')) 

    // if(validate_click){
    //     const unsubscribe = dbRealtime.subscribe(renderVideo)
    //     addRemoveEventListener(window, 'hashchange', unsubscribe)
    // } else {
    //     addRemoveEventListener(window, 'click', ()=> {
    //         const unsubscribe = dbRealtime.subscribe(renderVideo)
    //         addRemoveEventListener(window, 'hashchange', unsubscribe)
    //     })
    // }

    videoHistory()

    return ElementComponent
}
  