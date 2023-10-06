export default (data, Chat, user)=>{
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

    const ElementComponent = createHTML(`
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

    ElementComponent.setAttribute('data-data', JSON.stringify(data_data))

    const pMessageReplyText = ElementComponent.querySelector('.div_fR7XE p')
    const imgMessageReplyStiker = ElementComponent.querySelector('.div_fR7XE img')

    const pMessageText  = ElementComponent.querySelector('.div_oeFkT p')
    const imgMessageStiker = ElementComponent.querySelector('.div_oeFkT img')

    if(data.status == 4) ElementComponent.style.opacity = '.5'

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

    return ElementComponent 
}