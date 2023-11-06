export default (data, user)=>{
    const Icon  = new iconSVG()
    const api =(uri = '') => ls('api').get() + uri

    const data_data = {
        id              : data.id,
        datetime_update : data.datetime_update ?? 0,
        message         : data.message,
        status          : data.status,
        type            : data.type ?? 'text',
        id_user         : data.id_user,
        reactions       : JSON.parse(data.reactions ?? '[]')
    }

    const chatReply = data.message_reply ?? {}

    const messageReplyType = chatReply.type ?? ''

    const messageUser = data.id_user == user.uid ? 'user' : ''
    const messageType = data_data.type ?? 'text'

    const Time = new Date(parseInt(data.datetime_add))
    const timeHour = Time.getHours()
    const timeMinute = Time.getMinutes()
    const timeAM = Time.getHours() < 12
    const setTime = `${timeAM ? timeHour : timeHour - 12}:${ ( '0' + timeMinute).slice(-2) } ${ timeAM ? 'AM' : 'PM' }`

    const Files = JSON.parse(data.files)

    const ElementComponent = createHTML(`
        <div class="div_T5m0f ${ messageUser }" id="div-${ data.id }">
            <div class="div_0fPA54j">${ Icon.get('fi fi-rr-undo') }</div>
            <div class="div_5f0m7 ${ messageType }">

                <div class="div_fR7XE" data-id-reply="div-${ chatReply.id }">
                    <p class="text-ellipsis"></p>
                    <img alt="stiker-not-found">
                </div>
                
                <div class="div_dJwcjIT"></div>

                <div class="div_7Rn9q">
                    <div class="div_oeFkT ${ messageType }">
                        <p></p>
                        <img alt="stiker-not-found">
                    </div>
                    <div class="div_qsJ0y"> 
                        <span>${ setTime }</span>
                        <div class="div_Cm6sikX"></div>
                    </div>
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    
    const urlRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;
    ElementComponent.setAttribute('data-data', JSON.stringify(data_data))

    const elementMessageReply = query.get('.div_fR7XE')
    const elementFiles = query.get('.div_dJwcjIT')

    const pMessageReplyText = query.get('.div_fR7XE p')
    const imgMessageReplyStiker = query.get('.div_fR7XE img')

    const pMessageText  = query.get('.div_oeFkT p')
    const imgMessageStiker = query.get('.div_oeFkT img')

    if(!chatReply.id) elementMessageReply.remove()
    if(Files.length) {
        elementFiles.innerHTML = ArrayToString(Files, file => {
            if(file.type.includes('image')) return `<img src="${ api(`/stream/storage/chat/${ file.name }`) }">`
            if(file.type.includes('video')) return `<video src="${ api(`/stream/storage/chat/${ file.name }`) }"></video>`
        })
    } 
    else {
        elementFiles.remove()
    }

    if(data.status == 4) ElementComponent.style.opacity = '.5'

    if(messageReplyType == 'text'){
        pMessageReplyText.textContent = chatReply.message ?? ''
        imgMessageReplyStiker.remove()
    } else if(messageReplyType == 'stiker'){
        imgMessageReplyStiker.src = api('/stream/storage/stiker/' + chatReply.message)  
        pMessageReplyText.remove()
    } else {
        pMessageReplyText.remove()
        imgMessageReplyStiker.remove()
    }

    if(messageType == 'text'){
        pMessageText.textContent = data.message ?? ''

        if((data.message ?? '') == '') {
            query.get('.div_oeFkT').remove()
        }

        if (urlRegex.test(data.message)) {
            pMessageText.innerHTML = pMessageText.innerHTML.replace(urlRegex, url => `<a href="${url}" target="_blank" rel="noopener">${url}</a>`); 
        }

        imgMessageStiker.remove()
    } else if(messageType == 'stiker'){
        imgMessageStiker.src = api('/stream/storage/stiker/' + data.message) 
        pMessageText.remove()
    }


    //reacciones 

    const elementReaction = query.get('.div_Cm6sikX')

    if(data_data.reactions.length) {
        let reactionHTML = ''
        const Reactions = data_data.reactions.reduce((cantidad, emoji)=> {
            console.log(emoji);
            cantidad[emoji.reaction] = (cantidad[emoji.reaction] || 0) + 1;
            return cantidad;
        }, {})

        console.log(Reactions);

        for (const key in Reactions) {
            reactionHTML += `<span class="emoji ${ messageUser }">${ key }<h5>${ Reactions[key] }</h5></span>`
        }

        reactionHTML += `<span class="emoji ${ messageUser }">${ Icon.get('fi fi-rr-bars-sort') }</span>`

        elementReaction.innerHTML = reactionHTML
    } else elementReaction.remove()


    return ElementComponent 
}

