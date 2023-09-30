import { streamRealtime } from "../firebase/data.js";

export default ()=>{
    //<i class="fa-solid fa-gear"></i>
    const ElementComponent = createHTML(`
        <div>
            <div data-css="contenedor_navegacion">
                <a href="#/setting"><img src="public/img/icons/svg/icon-setting.svg" alt="icon-svg"></a>
            </div>
            <div class="scroll-y" data-css="contenedor_item">
                <div data-css="contenedor_loader"><span class="loader"></span></div>
                <div data-css="contenido_item" >
                    <div data-css="lista_item">
                        <a href="" data-css="item">
                            <span data-css="item_name">nombre</span> 
                            <i class="fa-solid fa-caret-right"></i>
                        </a> 
                    </div>
                </div>
            </div>
        </div>
    `)
    //<span class="loader"></span>
    const style = new createCSS('inicio', ElementComponent)

    const color_item    = 'var(--color-item)' 
    const color_letter  = 'var(--color-letter)' 

    style.css(`
        & {
            position : fixed;
            inset: 0; 

            display : grid;
            grid-template-rows: auto 1fr;
        }
    `)

    const contenedor_navegacion = style.element('contenedor_navegacion').css(`
        & {
            margin : 0 auto;
            width  : min(100%, 700px); 
            height : 50px; 
        }

        & a { 
            width : 50px;
            height : 50px;
            text-decoration:none;

            display: flex;
            justify-content: center;
            align-items: center;
            color: ${ color_letter };
        }

        & img { 
            filter : var(--filter-img);
            width : 20px;
            height : 20px;
        }
    `) 
 
    const contenedor_item = style.element('contenedor_item').css(`
        & {
            padding: 15px;  
            display: flex; 
        }
    `)

    const contenedor_loader = style.element('contenedor_loader').css(`
        & {
            margin: auto; 
        }
    `)

    const contenido_item = style.element('contenido_item').css(`
        & {
            margin : 0 auto;
            width  : min(100%, 700px); 
        }
    `)

    const lista_item =  style.element('lista_item').css(`
        & {
            width  : 100%;  
            border-radius : 8px;
            overflow: hidden;
            display:grid;
            
            gap: 3px;
        }
    `)

    const Item =  style.element('item').css(`
        & {
            width   : 100%; 
            height  : 60px; 
            background : ${ color_item };
            color: ${ color_letter };

            overflow: hidden; 

            display : grid;
            grid-template-columns : 1fr auto;
            align-items: center;

            padding : 0 20px;
            text-decoration:none;
        }

        & span {
            font-weight: bold;
        }
    `)
        
    Item.element.remove()

    const firstTime = {
        render : true
    }

    const def_createHTML =(data)=>{
        const data_data = {
            datetime_update : data.datetime_update
        }

        return createHTML(`
            <a class="${ Item.className }" id="div-${ data.id }" href="#/stream/${ data.id }" data-data='${ JSON.stringify(data_data) }' data-css="item">
                <span data-css="item_name">${ data.name }</span>
                <i class="fa-solid fa-caret-right"></i>
            </a>
        `)
    }
        
    const renderHTML =(onSnapshot)=>{ 

        const Data = []
        onSnapshot.forEach(doc => Data.push({ id : doc.id, ...doc.data() }));

        if(Data.length > 0) { 

            if(firstTime.render) {
                const containerTemp = document.createDocumentFragment()
                contenedor_loader.element.remove()

                Data.map(data => {
                    containerTemp.append(def_createHTML(data))
                })

                lista_item.element.append(containerTemp)
                contenedor_item.element.append(contenido_item.element)
            } else {
                Data.map(data => {
                    const element = lista_item.element.querySelector(`#div-${ data.id }`)

                    if(element) {
                        const data_data = JSON.parse(element.dataset.data)
                        if(parseInt(data.datetime_update) > parseInt(data_data.datetime_update)){
                            element.replaceWith(def_createHTML(data));
                        }
                        return
                    }

                    lista_item.element.append(def_createHTML(data))
                }) 
            }

        }

        firstTime.render = false
    }
    
    const unsubscribe = streamRealtime(renderHTML)
    addRemoveEventListener(window, 'hashchange', unsubscribe)
    
    contenido_item.element.remove()
    document.getElementById('main').append(ElementComponent)
}