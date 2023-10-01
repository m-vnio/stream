export default (data = {})=>{

    const user   = json(localStorage.getItem('user'))
    const userid = user.uid == data.id_user
    const isHide = data.status == 4 
    //<i class=""></i>
    const Button = [
        { id : 1, icon : 'icon-copy', action : 'copy', name : 'copiar', type : ['text'], status : true },
        { id : 2, icon : 'icon-reply', action : 'reply', name : 'responder', type : ['text', 'stiker'], status : !isHide },
        { id : 3, icon : 'icon-pen', action : 'update', name : 'editar', type : ['text'], status : (userid && !isHide) },
        { id : 4, icon : 'icon-show', action : 'hide_show', name : 'mostrar', type : ['text', 'stiker'], status : (userid && isHide) },
        { id : 5, icon : 'icon-hide', action : 'hide_show', name : 'ocultar', type : ['text', 'stiker'], status : (userid && !isHide) },
        { id : 6, icon : 'icon-trash', action : 'delete', name : 'eliminar', type : ['text', 'stiker'], status : userid }
    ]

    const ElementComponent = createHTML(`
        <div>
            <div class="scroll-y" data-css="contenedor_option">
                <div data-css="contenedor_texto">
                    <p class="text-ellipsis"></p>
                </div>
                <div data-css="contenido_button">
                    ${ ArrayToString(Button, button => {

                        if(!button.status) return 
                        if(!button.type.includes(data.type)) return
                        
                        return `
                            <button class="icon" data-css="button_option" data-action="${ button.action }">
                                <img src="public/img/icons/svg/${ button.icon }.svg" alt="icon-svg">
                                <span>${ button.name }</span>
                            </button>
                        `

                    }) }
                </div>
            </div>
        </div>
    `)


//
    const style = new createCSS('chat-option', ElementComponent)

    const color_item    = 'var(--color-item)' 
    const color_letter  = 'var(--color-letter)'

    style.css(`
        & { position : fixed; inset : 0; background : rgb(0 0 0 / .3); display: grid; z-index : 999 }
        @media (min-width: 450px){
            & {
                padding : 20px
            }
        }
    `)

    const contenedor_option = style.element('contenedor_option').css(`
        & { 
            width : min(100%, 450px); max-height : min(100%, 450px); 
            background : ${ color_item };
            align-self: end;
            justify-self: center;
            border-radius: 8px 8px 0 0; 
        }

        @media (min-width: 450px){
            & {
                border-radius: 8px; 
            }
        }
    `)

    const contenedor_texto = style.element('contenedor_texto').css(`
        & {
            display: flex;
            padding: 20px; 
            color  : ${ color_letter };
            border-bottom: 1.25px solid rgb(255 255 255 / .1);
        }
    `)

    const contenido_button = style.element('contenido_button').css(`
        & { 
            width : 100%; 
            display: grid; 
            overflow : hidden;
        } 
    `)

    const button_option = style.element('button_option').css(`
        & {  
            overflow : hidden; 
            display: grid; 
            grid-template-columns: 20px 1fr;
            background : none;
            align-items: center;
            padding: 20px;
            gap: 20px;
            color : ${ color_letter };
            cursor: pointer;
            font-size : 15px;
            text-align : center
        } 

        &:hover{
            opacity : .8
        }
        
        & span{
            text-align : left
        }
    `)
    
    getElement( 'p', contenedor_texto.element).textContent = data.message ?? ''
    clickElement(ElementComponent, ()=> ElementComponent.remove())

    if(data.type != 'text') contenedor_texto.element.remove()

    clickElementclosest(contenido_button.element, 'button', target => {
        const action = target.dataset.action

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
    })
 
    return ElementComponent
}
