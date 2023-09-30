export default ()=>{
    const ElementComponent = createHTML(`
        <div class="div_PGtVi" id="contenedor_form_link">
            <form class="form_slr4j" id="form_link" autocomplete="off">
                <input type="text" name="link" class="input_V94sL" placeholder="link">
                <div class="div_oH3Hj">
                    <button class="button_0JQ7M button-play" type="button"><i class="fa-solid fa-play"></i></button>
                    <button class="button_0JQ7M" type="submit"><i class="fa-solid fa-circle-play"></i></button>
                </div>
            </form>
        </div>
    `)

    const form_link  = ElementComponent.querySelector('.form_slr4j')
    const buttonPlay = form_link.querySelector('.button-play')
     
    clickElement(ElementComponent, ()=> ElementComponent.remove())

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

