export default ()=>{
    const ElementComponent = createHTML(`
        <div class="div_0sl5di8">
            <form class="form_xnrdR0a">
                <input type="text" name="code" placeholder="codigo" autocomplete="off">
                <div class="div_M5yXKLX">
                    <button type="button" class="pointer" data-action="cancel">cancelar</button>
                    <button type="submit" class="pointer submit">crear</button>
                </div>
            </form>
        </div>
    `)

    const query = new findElement(ElementComponent)

    query.get('.form_xnrdR0a button[data-action="cancel"]').addEventListener('click', e => {
        location.hash = `#/stream` 
    })

    query.get('.form_xnrdR0a').addEventListener('submit', e => {
        e.preventDefault()
        location.hash = `#/stream/link/${ e.target.code.value }`
    })

    document.getElementById('main').append(ElementComponent) 
}