import { streamRealtime } from "../firebase/data.js";

export default ()=>{
    //<i class="fa-solid fa-gear"></i>
    const ElementComponent = createHTML(`
        <div>
            <div class="scroll-y" data-css="contenedor_item">
                <div data-css="contenido_item" >
                    <div data-css="lista_item">
                        <a href="#/user" data-css="item">
                            <span data-css="item_name">perfil</span> 
                            <i class="fa-solid fa-caret-right"></i>
                        </a> 
                        <a href="#/config" data-css="item">
                            <span data-css="item_name">configuracion</span> 
                            <i class="fa-solid fa-caret-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div data-css="contenedor_navegacion">
                <div data-css="contenedor_botones">
                    <a href="#/"><img src="public/img/icons/svg/icon-home.svg" alt="icon-svg"></a>
                    <a href="#/setting" class="focus"><img src="public/img/icons/svg/icon-setting.svg" alt="icon-svg"></a>
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
            grid-template-rows: 1fr auto;
        }
    `)

    const contenedor_navegacion = style.element('contenedor_navegacion').css(`
        & {
            margin : 0 auto;
            width  : min(100%, 700px); 
            height : 60px; 
        } 
    `) 


    const contenedor_botones = style.element('contenedor_botones').css(`
        & {
            display : flex;
            height : 60px;
        }

        & a { 
            text-decoration:none;
            flex: 1;

            display: flex;
            justify-content: center;
            align-items: center;
            color: ${ color_letter };
        }

        & a.focus img {
            filter: invert(30%) sepia(100%) saturate(3655%) hue-rotate(234deg) brightness(97%) contrast(91%);
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
   
    document.getElementById('main').append(ElementComponent)
}