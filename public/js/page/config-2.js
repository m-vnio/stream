import { logoutFirebase } from "../firebase/auth.js"
import styleSetting from "../style.js"

export default ()=>{

    const theme = localStorage.getItem('theme')

    const ElementComponent = createHTML(`
        <div>
            <div class="scroll-y" data-css="contenedor_setting">
                <div data-css="contenido_setting">
                    <div data-css="contenedor_item">
                        <h4>Aspecto</h4>
                        <label data-css="item">
                            <input type="checkbox" data-css="item_checkbox" ${ theme == 'dark' ? 'checked' : '' }>
                            <span></span>
                        </label>
                    </div>
                    <span data-css="line"></span>
                    <button data-css="boton_logout">cerrar sesion</button>
                </div>
            </div>
            <div data-css="contenedor_navegacion">
                <div data-css="contenedor_botones">
                    <a href="#/"><img src="public/img/icons/svg/icon-home.svg" alt="icon-svg"></a>
                    <a class="focus" href="#/setting"><img src="public/img/icons/svg/icon-setting.svg" alt="icon-svg"></a>
                </div>
            </div>
        </div>
    `)

    const style = new createCSS('setting', ElementComponent)

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

    const contenedor_setting = style.element('contenedor_setting').css(`
        & {
            margin: 0 auto; 
            width : min(100%, 600px);
            height:100%;  
            padding: 10px;
        }
    `)

    const contenido_setting = style.element('contenido_setting').css(`
        & {
            display : grid;
            gap: 10px;
        }
    `)

    const contenedor_item = style.element('contenedor_item').css(`
        & {
            display:flex;
            background : ${ color_item };
            color : ${ color_letter };
            justify-content: space-between;
            align-items:center;
            padding: 20px;
            padding-right: 15px;
            gap: 20px;

            height : 60px;
            border-radius: 8px;
        }
    `)

    const item = style.element('item').css(`
        & {
            display:flex;
            cursor:pointer;
        }
 
        & span {
            background : ${ color_letter };
            height : 30px;
            width : 60px;
            position:relative;
            border-radius: 30px;
            opacity : .6;
            transition: opacity .25s ease-in-out;
        }

        & span::before {
            content: '';
            position:absolute; top : 5px; left : 5px;
            background : ${ color_item };
            height : 20px;
            width : 20px;
            border-radius: 50%;
            transition: left .25s ease-in-out;
        }
    `)

    const item_checkbox = style.element('item_checkbox').css(`
        & { display : none }
        &:checked + span { opacity : 1 }
        &:checked + span::before { left : 35px }
    `)

    const line = style.element('line').css(`
        & { 
            margin : 0 auto;
            background : ${ color_letter };
            opacity : .1;
            width: 50%;
            height:1.25px;
            cursor:pointer;
        }
    `)

    const boton_logout = style.element('boton_logout').css(`
        & {
            margin:auto; 
            padding: 10px; 
            cursor:pointer;
            color: ${ color_letter }
        }
    `)

    boton_logout.element.addEventListener('click', logoutFirebase)

    item_checkbox.element.addEventListener('change', () => {
        const theme = localStorage.getItem('theme')
        localStorage.setItem('theme', theme == 'dark' ? 'light' : 'dark')

        styleSetting()
    })

    document.getElementById('main').append(ElementComponent) 
}