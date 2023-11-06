import socket from "../pwa/socket.js";

export default (data = {})=>{
    const api  = uri => ls('api').get() + uri

    const auth = ls('auth').data({}).push(true, true) 

    const params = JSON.parse(sessionStorage.getItem('params'))
    const stream_user = JSON.parse(sessionStorage.getItem('stream_user'))

    

    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2 absolute">
            <div class="div_hS7SImh"></div>
            <div class="div_EK5nU66 scroll-y"></div>
        </div>    
    `)
    
    const query = new findElement(ElementComponent)
    const elementList = query.get('.div_EK5nU66')

    query.get('.div_hS7SImh').addEventListener('click', () => ElementComponent.remove())

    elementList.addEventListener('click', e => {
        const item = e.target.closest('.div_cUHJ13k')
        if(item) {

            datapi.patch(api(`/stream/api/stream_chat?id=${ data.id }&token=${ auth.token }&reactions=true`), { reaction: item.dataset.reaction, datetime_update : Date.now() })
                    .then(data => {

                        ElementComponent.remove() 

                        socket.emit('chat', JSON.stringify({
                            action : 'put',
                            id_message : data.id,
                            id_stream : params.id
                        }))

                        dispatchEvent(new CustomEvent('chat_update_message', { detail : data }))

                    })
        }
    })

    elementList.innerHTML = ArrayToString(data.reactions, reaction => {

        const user = stream_user.find(user => user.uid == reaction.id_user)

        return `
            <div class="div_cUHJ13k pointer ${ auth.uid == user.uid ? 'active' : '' }" data-reaction="${ reaction.reaction }">
                <img src="${ api(`/stream/storage/avatar/${ user.avatar || 'avatar.png' }`) }">
                <div class="div_mJ5P38m">
                    <div>${ user.username }</div>
                    <span>${ reaction.reaction }</span>
                </div>
            </div>
        `
    })

    return ElementComponent
}
