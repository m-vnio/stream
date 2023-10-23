export default ()=>{
    const Icon = new iconSVG()

    const validate15 = ls('validate-0715').data(false).push(true, true)

    if(validate15) return

    const ElementComponent = createHTML(`
        <div class="div_FPeq2on scroll-y" style="padding-top:60px">
            <button class="button_albJJ1k pointer">${ Icon.get('fi fi-rr-cross') }</button>
            <div class="div_pV2AZGL">Al inicio el nombre de una persona, no tiene sentido para nosotros pero a medida que construyes una relacion con ella y surgen sentimientos su nombre adquiere un nuevo significado. El nombre de alguien, significa los sentimientos que evocan en ti. Hay nombres en nuestra vida, que en un inicio fueron extraños, pero despues de una conexion profunda, hoy significan el mundo entero para nosotros... ¿tu nombre es?, <h2>~Nickol~</h2></div>
        </div>
    `)
    
    const query = new findElement(ElementComponent)

    query.get('.button_albJJ1k').addEventListener('click', ()=> {
        ElementComponent.remove()
        ls('validate-15').data(true).put(true)
    })

    document.getElementById('root').append(ElementComponent)
}