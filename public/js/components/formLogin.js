export default (login = true)=>{

    const api = (uri = '') => ls('api').get() + uri

    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2 p-none">
            <div class="div_hS7SImh"></div>
            <div class="div_z08HdDa scroll-y">
                <form class="form_50roGPo" autocomplete="off">
                    <input type="hidden" name="method" data-type="auth" value="email">
                    <input type="hidden" name="phone" data-type="user" value="">
                    <h2>${ login ? 'Login' : 'Register' }</h2>
                    ${ login ? '' : `
                        <input type="text" name="fullname" data-type="user" placeholder="nombre" autocomplete="off">
                        <input type="text" name="lastname" data-type="user" placeholder="apellido" autocomplete="off">
                        <input type="text" name="username" data-type="user" placeholder="usuario" autocomplete="off">
                    ` }
                    <input type="email" name="email" data-type="user" placeholder="correo" autocomplete="off">
                    <input type="password" data-type="auth" name="password" placeholder="contraseña" autocomplete="off">
                    <div class="div_i9lYRnC">
                        <button type="submit" class="pointer">${ login ? 'Ingresar' : 'Crear Cuenta' }</button>
                    </div>
                </form>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)

    const elementTap = query.get('.div_hS7SImh')
    const form = query.get('.form_50roGPo')

    const Input = query.getAll('.form_50roGPo input') 

    elementTap.addEventListener('click', ()=> ElementComponent.remove() )

    form.addEventListener('submit', e => {
        e.preventDefault()

        const data = { auth : {}, user : {} }
 
        Input.forEach(input => {
            data[input.dataset.type][ input.name ] = input.value
        });
        //https://apimanagestream.000webhostapp.com/stream/api/auth?action=register

        datapi.post(api(`/stream/api/auth?action=${ login ? 'login' : 'register' }`), data)
        .then(data => {
            console.log(data);
            if(data.status){
                ls('auth').data(data.data).put(true)
                location.hash = '#/'
            }
        })
 
    })

    const hashchangeEventListener =()=>{
        ElementComponent.remove()
        removeEventListener('hashchange', hashchangeEventListener)
    }

    addEventListener('hashchange', hashchangeEventListener)

    return ElementComponent
}