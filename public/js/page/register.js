import { registerFirebase } from "../firebase/auth.js"

export default ()=>{

    const ElementComponent = createHTML(`
        <div class="scroll-y">
            <form data-css="form_login" autocomplete="off">
                <h4>REGISTER</h4>
                <div data-css="contenedor_input">
                    <input type="text" placeholder="email" data-css="input_form" autocomplete="off">
                    <input type="password" placeholder="password" data-css="input_form" autocomplete="off">
                </div>
                <div data-css="contenedor_boton_link">
                    <button type="submit" data-css="button_form"><i class="fa-solid fa-arrow-right"></i></button>
                    <a href="#/login" data-css="link_form">login</a>
                </div>
            </form>
        </div>
    `)
    
    const style = new createCSS('login', ElementComponent) 
    style.css(`
        & { position : fixed; inset : 0; background : #2C2C2E; display : flex; padding : 15px; }
    `)

    const form_login = style.element('form_login').css(`
        & { 
            margin : auto; width : min(100%, 400px);
            display : grid; padding : 15px; gap : 20px;
            color : #ffffff;
            text-align : center;
        }
    `)

    const contenedor_input = style.element('contenedor_input').css(`
        & {
            display : grid; 
        }
    `)

    const [ inputEmail, inputPassword ] = style.element('input_form').css(`
        & { 
            height : 60px;
            color : inherit;
            text-align : center;
            font-size : 15px;
            padding : 15px;
            border-bottom: 1.25px solid #ffffff;
            opacity : .5
        }

        &:focus {
            opacity : 1
        }
    `)

    const contenedor_boton_link = style.element('contenedor_boton_link').css(`
        & {
            display: grid; 
            justify-items:center;
            gap: 15px;
        }

        & a {
            color : #ffffff;
            text-decoration:none;
        }

        & a:hover {
            opacity : .7
        }
    `)

    const button_form = style.element('button_form').css(`
        & {  
            background : #ffffff;
            width : 50%;
            height : 60px;
            border-radius : 60px;
            color : 2C2C2E;
            cursor:pointer;
        }

        &:hover {
            opacity : .7
        }
    `)
 
    form_login.element.addEventListener('submit', e => {
        e.preventDefault()

        const data = {
            email : inputEmail.element.value,
            password : inputPassword.element.value
        }

        registerFirebase(data)
    })

    document.getElementById('main').append(ElementComponent)
}



// const User = [
    //     { id      : '1695101156748', name    : 'victor', code : '0119' },
    //     { id      : '1695101337892', name    : 'nickol', code : '0715' }
    // ]

    // if(localStorage.getItem('user')){
    //     location.hash = '/'
    // } else {
    //     const code = prompt('ingrese el codigo')
    //     const validar = User.find(user => user.code == code)
    //     if(validar){
    //         localStorage.setItem('user', JSON.stringify(validar))
    //         location.hash = '/'
    //     }
    // }