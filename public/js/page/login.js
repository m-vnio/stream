import { loginFirebase } from "../firebase/auth.js"

export default ()=>{

    const ElementComponent = createHTML(`
        <div class="div_4a73aBM">
            <form class="form_botZH81" autocomplete="off">
                <div class="div_6I1oX0I">
                    <a href="#/login" class="focus">Login</a>
                    <a href="#/register">Register</a>
                </div>
                <div class="div_N0HmgbL">
                    <input type="email" name="email" placeholder="email" autocomplete="off">
                    <input type="password" name="password" placeholder="password" autocomplete="off">
                </div>
                <div class="div_6t5C30Y">
                    <button type="submit"><span>Ingresar</span></button>
                </div>
            </form>
        </div>
    `)

    const formLogin = ElementComponent.querySelector('.form_botZH81')
 
    formLogin.addEventListener('submit', e => {
        e.preventDefault()

        const data = {
            email : formLogin.email.value.trim(),
            password : formLogin.password.value.trim()
        }

        if(data.email == '' || data.password == '') return
        loginFirebase(data)
    })

    document.getElementById('main').append(ElementComponent)
}
