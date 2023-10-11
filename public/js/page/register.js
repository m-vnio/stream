import { registerFirebase } from "../firebase/auth.js"

export default ()=>{

    const ElementComponent = createHTML(`
        <div class="div_4a73aBM">
            <form class="form_botZH81" autocomplete="off">
                <div class="div_6I1oX0I">
                    <a href="#/login">Login</a>
                    <a href="#/register" class="focus">Register</a>
                </div>
                <div class="div_N0HmgbL">
                    <input type="email" name="email" placeholder="email" autocomplete="off">
                    <input type="password" name="password" placeholder="password" autocomplete="off">
                </div>
                <div class="div_6t5C30Y">
                    <button type="submit"><span>Crear Cuenta</span></button>
                </div>
            </form>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const formRegister = query.get('.form_botZH81')
  
    formRegister.addEventListener('submit', e => {
        e.preventDefault()

        const data = {
            email : formRegister.email.value.trim(),
            password : formRegister.password.value.trim()
        }

        if(data.email == '' || data.password == '') return
        registerFirebase(data)
    })

    document.getElementById('main').append(ElementComponent)
}