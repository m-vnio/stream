export default ()=>{

    const api = (uri = '') => ls('api').get() + uri
    const auth  = ls('auth').data({}).push(true, true)

    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2">
            <div class="div_hS7SImh"></div>
            <form class="form_xwfHpEY" autocomplete="off">
                <input type="text" name="name" placeholder="nombre" autocomplete="off">
                <div class="div_M5yXKLX">
                    <button type="button" class="pointer" data-action="cancel">cancelar</button>
                    <button type="submit" class="pointer submit">crear</button>
                </div>
            </form>
        </div>
    `)

    const query = new findElement(ElementComponent)

    const elementTap = query.get('.div_hS7SImh')
    const form = query.get('.form_xwfHpEY')
    const btnCancel = query.get('.div_M5yXKLX button[data-action=cancel]')

    elementTap.addEventListener('click', ()=> ElementComponent.remove())
    btnCancel.addEventListener('click', ()=> ElementComponent.remove())

    form.addEventListener('submit', e => {
        e.preventDefault()

        const data = {
            id_user : auth.uid,
            name    : form.name.value.trim()
        }

        datapi.post(api('/stream/app/trigger/stream.php'), data)
        .then(() => {
            dispatchEvent(new CustomEvent('dispatchEventLoadStrem'))
            ElementComponent.remove()
        })

    })

    return ElementComponent
}