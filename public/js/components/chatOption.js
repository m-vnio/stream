export default (data = {})=>{

    const Icon  = new iconSVG()

    const user   = ls('user').get(true)
    const userid = user.uid == data.id_user
    const isHide = data.status == 4 
    
    const Button = [
        { id : 1, icon : 'fi fi-rr-copy', action : 'copy', name : 'copiar', type : ['text'], status : true },
        { id : 2, icon : 'fi fi-rr-undo', action : 'reply', name : 'responder', type : ['text', 'stiker'], status : !isHide },
        { id : 3, icon : 'fi fi-rr-pencil', action : 'update', name : 'editar', type : ['text'], status : (userid && !isHide) },
        { id : 4, icon : 'fi fi-rr-eye', action : 'hide_show', name : 'mostrar', type : ['text', 'stiker'], status : (userid && isHide) },
        { id : 5, icon : 'fi fi-rr-eye-crossed', action : 'hide_show', name : 'ocultar', type : ['text', 'stiker'], status : (userid && !isHide) },
        { id : 6, icon : 'fi fi-rr-trash', action : 'delete', name : 'eliminar', type : ['text', 'stiker'], status : userid }
    ]

    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2 absolute">
            <div class="div_hS7SImh"></div>
            <div class="div_1Z6ZCkT">
                <div class="div_gZ94AC8">
                    <div class="div_SsaBtj6">
                        <span>❤️</span>
                        <span>💔</span>
                        <span>🫣</span>
                        <span>🥺</span>
                        <span>🫢</span>
                        <span>😩</span>
                    </div>
                </div>
                <div class="div_M1q0hm2">
                    <div class="div_A3yLovl">
                        <div class="div_w22fa26"></div>
                        <div class="div_iFL8U75"></div>
                    </div>
                    <div class="div_ygkc8bB scroll-y">
                        <div class="div_S4til5e">

                            ${ ArrayToString(Button, button => {

                                if(!button.status) return 
                                if(!button.type.includes(data.type)) return
                                
                                return `<button class="icon pointer" data-action="${ button.action }">
                                    ${ Icon.get(button.icon) }
                                    <span>${ button.name }</span>
                                </button>`

                            }) }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)

    
    const query = new findElement(ElementComponent)

    const elementTap = query.get('.div_hS7SImh')
    const elementButtons = query.get('.div_S4til5e')

    const elementMessageContent = query.get('.div_w22fa26')
    const elementMessageButton  = query.get('.div_iFL8U75')

    const stikerFavorite = ls('stiker-favorite').data([]).push(true, true)

    if(data.type == 'text') {
        elementMessageContent.innerHTML = '<p class="text-ellipsis"></p>'
        elementMessageContent.children[0].textContent = data.message
    }

    if(data.type == 'stiker') {
        const id    = data.message.replace(/\D/g, "");
        const name  = data.message
        const isStikerFavorite = stikerFavorite.find(stiker => stiker.id == id)
        elementMessageContent.innerHTML = `<img src="public/img/stiker/${ data.message }" alt="icon-stiker">` 
        elementMessageButton.innerHTML = `
            <button class="icon pointer" data-data='${ JSON.stringify({ id, name }) }' data-action="stiker-favorite">${ Icon.get(`fi fi-${ isStikerFavorite ? 'sr' : 'rr' }-star`) }</button>
        `
    }

                            


    elementTap.addEventListener('click', ()=> ElementComponent.remove())

    elementMessageButton.addEventListener('click', e => {
        const button = e.target.closest('button')

        if(button) {
            const action = button.dataset.action

            if(action == 'stiker-favorite'){
                const data = JSON.parse(button.dataset.data)
                const isStikerFavorite = stikerFavorite.findIndex(stiker => stiker.id == data.id)

                if(isStikerFavorite == -1) {
                    stikerFavorite.push(data)
                    button.innerHTML = Icon.get('fi fi-sr-star')
                    
                } else {
                    stikerFavorite.splice(isStikerFavorite, 1)
                    button.innerHTML = Icon.get('fi fi-rr-star')
                }    
                
                ls('stiker-favorite').data(stikerFavorite).put(true)
            } 
        }
    })

    elementButtons.addEventListener('click', e => {
        const button = e.target.closest('button')

        if(button) {
            const action = button.dataset.action

            if(action == 'update'){
                dispatchEvent(new CustomEvent('open_update_message', { detail : data }))
            } else if(action == 'reply'){
                dispatchEvent(new CustomEvent('open_reply_message', { detail : data }))
            } else if(action == 'delete'){
                dispatchEvent(new CustomEvent('delete_message', { detail : data }))
            } else if(action == 'hide_show'){
                dispatchEvent(new CustomEvent('hide_message', { detail : data }))
            } else if(action == 'copy'){
                const clipboard = navigator.clipboard
                if(clipboard) clipboard.writeText(data.message)
            }

            ElementComponent.remove()
        }
    })
 
    return ElementComponent
}