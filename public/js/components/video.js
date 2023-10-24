import { dbFirebase, dbFirebaseRealtime } from "../firebase/data.js"
import emoji from "./emoji.js"
import emojis from "./emojis.js"
import formLink from "./formLink.js"
import videoHistory from "./videoHistory.js"

export default (ElementComponentFullScreen)=>{
    //div_v05FO
    const Icon  = new iconSVG()

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
                            <button class="button_KXchF" data-action="open_form_link">${ Icon.get('fi fi-rr-plus') }</button>
                        </div>
                        <div class="div_BXzT1">
                            <button class="button_KXchF" data-action="open_history">${ Icon.get('fi fi-rr-time-fast') }</button>
                            <button class="button_KXchF" data-action="open_emoji">${ Icon.get('fi fi-rr-smile') }</button>
                        </div> 
                    </div> 
                    <div class="div_ETUVd9w">
                        <button class="button_4P1Dopv" data-action="seeked_back_10">${ Icon.get('fi fi-rr-time-past') }</button>
                        <button class="button_4P1Dopv" data-action="btnPlay">${ Icon.get('fi fi-rr-play') }</button>
                        <button class="button_4P1Dopv lock-unlock" data-action="lock_unlock">${ Icon.get('fi fi-rr-lock') }</button>
                    </div>
                    <div class="div_XjdZ8">
                        <div class="div_3hBg2">
                            <span class="span_4E0dR">00:00:00</span>
                            <div class="div_HGz61">
                                <button class="button_KXchF lock-unlock" style="visibility: hidden" data-action="lock_unlock">${ Icon.get('fi fi-rr-lock') }</button>
                                <button class="button_KXchF" data-action="active_fullscreen">${ Icon.get('fi fi-rr-expand') }</button>
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
                    <button class="button_hdZNr" data-action="open_chat">${ Icon.get('fi fi-rr-messages') }</button>
                </div>
                <div class="div_82gU7" id="contenedor_emoji_mostrar"></div>
                <div class="div_F6FFR" id="contenedor_chat_2">
                    <div class="div_3b7ZM background"></div>
                </div>
            </div> 
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

    ElementComponent.append(emojis())

    const dispatchUpdateVideoHistory = new CustomEvent('updateVideoHistory')
    const setVideoHistory =(message = '')=>{
        const videoHistory = ls('video-history').data([]).push(true, true)
        videoHistory.unshift({ message, datetime : Date.now().toString() })
        ls('video-history').data(videoHistory).put(true)
        dispatchEvent(dispatchUpdateVideoHistory)
    }

    elementVideoContent.addEventListener('click', () => {
        elementVideoContent.classList.toggle('active')

        if(document.fullscreenElement) {
            if(elementVideoContent.classList.contains('active')) btnOpenChat.classList.add('active')
            else btnOpenChat.classList.remove('active')
        }
    })

    let activeVideoPlay = false
    btnPlay.addEventListener("click", ()=> {
        if(activeVideoPlay) {
            elementVideo[ elementVideo.paused ? 'play' : 'pause' ]() 
        }
    })

    btnSeekedBack10.addEventListener("click", ()=> {
        elementVideo.currentTime = elementVideo.currentTime.toFixed(0) - 10
    })

    span_duration.addEventListener("click", ()=> {
        defVideoSeeked()
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
        btnLockUnlock.innerHTML = Icon.get(`fi fi-rr-${ isElementUnlock ? 'unlock' : 'lock' }`)
    })

    addRemoveEventListenerHashchange(document, 'fullscreenchange', ()=> def_fullscreen(false))

    const def_fullscreen =(status)=>{
        if(document.fullscreenElement){     
            if(status) return document.exitFullscreen() 
            ElementComponentFullScreen.classList.add('active')
            btnActiveFullscreen.innerHTML = Icon.get('fi fi-rr-compress')
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
            btnActiveFullscreen.innerHTML = Icon.get('fi fi-rr-expand')
            btnOpenChat.classList.remove('active')
            ElementComponent.classList.add('active')
            elementButtonTop.classList.remove('active')
            btnLockUnlock.style.visibility = 'hidden'
            btnLockUnlock.innerHTML = Icon.get('icon-lock')

            elementVideoControlBotttom.classList.remove('unlock')

            if(/Mobi|Android/i.test(navigator.userAgent)){
                if(window.screen.orientation && window.screen.orientation.unlock){
                    window.screen.orientation.unlock();
                } 
            }
        }
    } 
    
    //elementVideo

    const renderTimeProgress =(time)=>{
        const Time = getTimeBySecond(time)
        const arrayTime = []

        if(Time.hours > 0 ) arrayTime.push(Time.hours)
        arrayTime.push(('0'+ Time.minutes).slice(-2))
        arrayTime.push(('0'+ Time.seconds).slice(-2))

        return arrayTime.map(time => time).join(':')
    }

    const defVideoPlayPause =()=>{
        const play = !elementVideo.paused
        const progress = elementVideo.currentTime.toFixed(0)

        db.edit(params.id, {
            play    : !elementVideo.paused,
            id_user : user.uid,
            datetime_update : Date.now().toString(),
            time_progress   : progress,
            change : 'play',
            message : `${ user_data.username } ha ${ play ? 'reanudado' : 'pausado' } el video`
        })

        btnPlay.innerHTML = Icon.get(play ? 'fi fi-rr-pause' : 'fi fi-rr-play')
        setVideoHistory(`has ${ play ? 'reanudado' : 'pausado' } el video`)
    }

    const defVideoLoadedmetadata = e =>{
        setTimeout(()=> {
            ipt_duration.setAttribute('max', elementVideo.duration.toFixed(0)) 
            span_duration.textContent = renderTimeProgress(parseInt(ipt_duration.max))
        })
    }

    const defVideoSeeked =()=>{
        const progress = elementVideo.currentTime.toFixed(0)

        db.edit(params.id, {
            id_user : user.uid,
            datetime_update : Date.now().toString(),
            time_progress   : progress,
            change : 'seeked',
            message : `${ user_data.username } ha cambiado posicion del video`
        })

        setVideoHistory('has cambiado posicion del video') 

        activeVideoPlay = true
        btnPlay.innerHTML = Icon.get(elementVideo.paused ? 'fi fi-rr-play' : 'fi fi-rr-pause')
    }

    const defVideoTimeupdate =(e)=>{
        if(parseInt(ipt_duration.max) == 0){
            ipt_duration.setAttribute('max', elementVideo.duration.toFixed(0))
            span_duration.textContent = renderTimeProgress(parseInt(ipt_duration.max))
        }

        if(change_input) return 
        ipt_duration.value = elementVideo.currentTime.toFixed(0)

        if(ipt_duration.value != ipt_duration.dataset.value){
            ipt_duration.dataset.value = ipt_duration.value
            hr_progreso.style.width = ((parseInt(ipt_duration.value) / parseInt(ipt_duration.max)) * 100).toFixed(0) + '%'
            span_duration.textContent = renderTimeProgress(parseInt(ipt_duration.max) - parseInt(ipt_duration.value))
        }
    }
    
    const activeAddEventListenerVideoSeeked =()=> elementVideo.addEventListener("seeked", defVideoSeeked)
    const desactiveAddEventListenerVideoSeeked =()=> elementVideo.removeEventListener("seeked", defVideoSeeked)

    const activeAddEventListenerVideoPlayPause =()=>{
        btnPlay.innerHTML = Icon.get(elementVideo.paused ? 'fi fi-rr-play' : 'fi fi-rr-pause')
        setTimeout(()=> {
            elementVideo.addEventListener("play", defVideoPlayPause)
            elementVideo.addEventListener("pause", defVideoPlayPause)
        })
    }; activeAddEventListenerVideoPlayPause()

    const desactiveAddEventListenerVideoPlayPause =()=>{
        elementVideo.removeEventListener("play", defVideoPlayPause)
        elementVideo.removeEventListener("pause", defVideoPlayPause)
    }

    const activeDesactiveAddEventListenerVideoSeeked =()=>{
 
        activeVideoPlay = false
        btnPlay.innerHTML = '<span class="loader" style="--color:#ffffff"></span>'

        const defEventListener = () => { 
            if(JSON.parse(localStorage.getItem('click'))){
                desactiveAddEventListenerVideoPlayPause()
                elementVideo[ JSON.parse(data_update.play) ? 'play' : 'pause' ]()
                activeAddEventListenerVideoPlayPause()
            }

            activeVideoPlay = true

            btnPlay.innerHTML = Icon.get(elementVideo.paused ? 'fi fi-rr-play' : 'fi fi-rr-pause')
            elementVideo.removeEventListener('seeked', defEventListener)
            activeAddEventListenerVideoSeeked()
        }

        elementVideo.addEventListener('seeked', defEventListener)

    }; activeDesactiveAddEventListenerVideoSeeked()
    
    elementVideo.addEventListener("loadedmetadata", defVideoLoadedmetadata)
    elementVideo.addEventListener("timeupdate", defVideoTimeupdate)

    //elementInput
    let change_input = false
    ipt_duration.addEventListener('input', () => {
        change_input = true
        hr_progreso.style.width = ((parseInt(ipt_duration.value) / parseInt(ipt_duration.max)) * 100).toFixed(0) + '%'
    })

    ipt_duration.addEventListener('change', () => {
        change_input = false
        activeVideoPlay = false
        btnPlay.innerHTML = '<span class="loader" style="--color:#ffffff"></span>'
        
        elementVideo.currentTime = parseInt(ipt_duration.value) 
    })

    addRemoveEventListenerHashchange(window, 'open_link', e => { 
        renderVideoURL(e.detail.link)
        if(e.detail.submit) {
            db.edit(params.id, {
                link : e.detail.link,
                datetime_update : Date.now().toString(),
                play : 'true',
                change : 'link',
                id_user : user.uid,
                time_progress   : '0',
                message : `${ user_data.username } ha cambiado el video`
            })
            setVideoHistory('has cambiado el video')
        }
    })

    addRemoveEventListenerHashchange(window, 'send_notification_message', ()=> {
        if(document.fullscreenElement){
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

            if(fisrt_time.render){   
                fisrt_time.render = false

                renderVideoURL(data.link)
                desactiveAddEventListenerVideoSeeked()
                elementVideo.currentTime = parseInt(data.time_progress) + Math.round((Date.now() - parseInt(data.datetime_update)) / 1000)
                activeDesactiveAddEventListenerVideoSeeked()
                return
            }
            
            if(data.id_user == user.uid) return

            if(parseInt(data.datetime_update) > data_local.datetime_update){
                data_local.datetime_update = parseInt(data.datetime_update)

                if(data.change == 'play'){
                    if(JSON.parse(localStorage.getItem('click')))
                    {
                        const play = JSON.parse(data_update.play)
                        desactiveAddEventListenerVideoPlayPause()
                        elementVideo[ play ? 'play' : 'pause' ]()
                        activeAddEventListenerVideoPlayPause()
                        setVideoHistory(data.message ?? '') 
                    }
                } 
                else if(data.change == 'seeked'){

                    desactiveAddEventListenerVideoSeeked()
                    elementVideo.currentTime = parseInt(data.time_progress) + Math.round((Date.now() - parseInt(data.datetime_update)) / 1000)
                    activeDesactiveAddEventListenerVideoSeeked()
                    setVideoHistory(data.message ?? '') 
                    
                } 
                else if(data.change == 'link'){
                    renderVideoURL(data.link)
                    setVideoHistory(data.message ?? '')
                }
            }
        }); 
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
  
