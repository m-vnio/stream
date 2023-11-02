export default ()=>{

    const api = (uri = '') => ls('api').get() + uri

    const ElementComponent = createHTML(`
        <div class="div_4a73aBM">
            <div class="div_hS7SImh"></div>
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
                    <button type="submit" class="pointer"><span>Ingresar</span></button>
                </div>
            </form>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const formLogin = query.get('.form_botZH81') 

    formLogin.addEventListener('submit', e => {
        e.preventDefault()

        const data = {
            auth : {
                method : 'email',
                method_key : formLogin.email.value.trim(),
                password   : formLogin.password.value.trim()
            }
        }

        if(data.auth.email == '' || data.auth.password == '') return
        
        datapi.post(api('/servidor-4/stream/app/trigger/auth.php?action=login'), data)
        .then(data => {
            if(data.status){
                ls('auth').data(data.data).put(true)
                location.hash = '#/'
            }
        })
    })

    document.getElementById('main').append(ElementComponent)
}
