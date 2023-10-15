export default ()=>{
    const Icon = new iconSVG()

    const validate15 = ls('validate-15').data(false).push(true, true)
    if(validate15) return 

    const ElementComponent = createHTML(`
        <div class="div_FPeq2on">
            <button class="button_albJJ1k pointer">${ Icon.get('icon-cross') }</button>
            <div class="div_f83a60G"><img src="public/img/use/photo.jpg"></div>
        </div>
    `)
    
    const query = new findElement(ElementComponent)

    query.get('.button_albJJ1k').addEventListener('click', ()=> ElementComponent.remove())

    document.getElementById('root').append(ElementComponent)
}