export default (data = {})=>{
    const ElementComponent = createHTML(`
        <div>
            <div class="scroll-y" data-css="contenedor_option">
                <div data-css="contenedor_texto">
                    <p class="text-ellipsis"></p>
                </div>
                <div data-css="contenido_button">
                    ${ data.status == 4 ? `
                        <button data-css="button_option" data-action="hide">
                            <i class="fa-solid fa-eye"></i>
                            <span>mostrar</span>
                        </button>
                    ` : `
                        ${ data.type == 'text' ? `
                            <button data-css="button_option" data-action="update">
                                <i class="fa-solid fa-pen"></i>
                                <span>editar</span>
                            </button> 
                        ` : '' }
                        <button data-css="button_option" data-action="hide">
                            <i class="fa-solid fa-eye-slash"></i>
                            <span>ocultar</span>
                        </button>
                        <button data-css="button_option" data-action="delete">
                            <i class="fa-solid fa-ban"></i>
                            <span>eliminar</span>
                        </button> 
                    ` }
                </div>
            </div>
        </div>
    `)

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
        } else if(action == 'delete'){
            dispatchEvent(new CustomEvent('delete_message', { detail : data }))
        } else if(action == 'hide'){
            dispatchEvent(new CustomEvent('hide_message', { detail : data }))
        }

        ElementComponent.remove()
    })
 
    return ElementComponent
}