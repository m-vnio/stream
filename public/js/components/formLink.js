export default ()=>{
    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2">
            <div class="div_hS7SImh"></div>
            <form class="form_slr4j" id="form_link" autocomplete="off">
                <input type="text" name="link" class="input_V94sL" placeholder="link">
                <div class="div_oH3Hj">
                    <button class="pointer button-play" type="button">yo</button>
                    <button class="pointer dark" type="submit">todos</button>
                </div>
            </form>
        </div>
    `)

    const query = new findElement(ElementComponent)

    const elementTap = query.get('.div_hS7SImh')
    const form_link  = query.get('.form_slr4j')
    const buttonPlay = query.get('.button-play')
     
    elementTap.addEventListener('click', ()=> ElementComponent.remove())

    buttonPlay.addEventListener('click', () => {
        ElementComponent.remove()
        dispatchEvent(new CustomEvent('open_link', { detail: { link : form_link.link.value, submit : false } }))
        form_link.link.value = ''
    })

    form_link.addEventListener('submit', e => {
        e.preventDefault()
        ElementComponent.remove()
        dispatchEvent(new CustomEvent('open_link', { detail: { link : form_link.link.value, submit : true } }))
        form_link.link.value = ''
    })

    

    return ElementComponent
}

