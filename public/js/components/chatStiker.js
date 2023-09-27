import { addStreamChat } from "../firebase/config.js"

export default ()=>{

    const params = json(sessionStorage.getItem('params'))
    const user   = json(localStorage.getItem('user'))

    const ElementComponent = createHTML(`
        <div>
            <div class="scroll-y" data-css="contenedor_stiker">
                <div data-css="contenido_stiker">
                    <div data-css="item_stiker"></div>  
                </div>
            </div>
        </div>
    `)

    const style = new createCSS('chat-stiker', ElementComponent)
    style.css(`& { position : fixed; inset : 0; background : rgb(0 0 0 / .3); display: grid; padding: 10px }`)

    const contenedor_stiker = style.element('contenedor_stiker').css(`
        & { 
            width : min(100%, 500px); height : min(100%, 400px); 
            background : #2C2C2E;
            align-self: end;
            justify-self: center;
            border-radius:8px; 
        }
    `)

    const contenido_stiker = style.element('contenido_stiker').css(`
        & { 
            width : 100%; 
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(min(100%, 70px), 1fr));
            padding : 15px;
            gap : 15px;
            overflow : hidden;
        } 
    `)

    const item_stiker = style.element('item_stiker').css(`
        & { 
            aspect-ratio: 1/1; 
            border-radius:8px;
            overflow : hidden; 
            display: flex;
            cursor : pointer
        } 

        & img{
            margin : auto;
            max-width : 100%;
            max-height: 100%; 
            object-fit: cover;
        }
    `)

    clickElement(ElementComponent, ()=> ElementComponent.remove())

    contenido_stiker.element.addEventListener('click', e => {

    })

    clickElementclosest(contenido_stiker.element, `.${ item_stiker.className }`, target => {
        const data = {
            id_user : user.id,
            id_stream : params.id,
            message : target.dataset.name,
            datetime_add : Date.now().toString(),
            datetime_update : Date.now().toString(),
            type : 'stiker',
            status : 1
        }

        addStreamChat(data)
        ElementComponent.remove()
    })

    fetch('./public/json/chat-stiker.json')
    .then(res => res.json())
    .then(data => contenido_stiker.element.innerHTML = ArrayToString(data, data => {
        return `<div class="${ item_stiker.className }" data-name="${ data.name }" ><img src="public/img/stiker/${ data.name }"></div>`
    }))

    item_stiker.element.remove()
    return ElementComponent
}