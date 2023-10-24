import Emoji from "../data/Emoji.js";
export default ()=>{

    const Icon  = new iconSVG()
    
    const ElementComponent = createHTML(`
        <div class="div_WiZV0 scroll-y active">
            <div class="div_4Wz57gr"></div>
            <div class="div_Gtfrb">
                <div class="div_pc6Xr">
                    <div class="div_q2o2E scroll-y">
                        <div class="div_88A39">${ ArrayToString(Emoji, emoji => `<span>${ emoji.trim() }</span>`) }</div>
                    </div>
                    <form class="form_lK4nv" autocomplete="off">
                        <input type="text" placeholder="emoji" name="emoji">
                        <button type="submit" class="pointer">${ Icon.get('fi fi-rr-paper-plane') }</button>
                    </form>
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)

    const elementTap = query.get('.div_4Wz57gr')
    const formEmoji = ElementComponent.querySelector('.form_lK4nv')

    elementTap.addEventListener('click', ()=> ElementComponent.remove())
    
    formEmoji.addEventListener('submit', e => {
        e.preventDefault()
        defEmojiMessage(formEmoji.emoji.value) 
        formEmoji.emoji.value = ''
    })

    ElementComponent.addEventListener('click', e => {
        const span = e.target.closest('span')
        if(span) defEmojiMessage(span.textContent)  
    })

    const defEmojiMessage =(message)=>{
        const data = { message }
        dispatchEvent(new CustomEvent('custom-event-emojis-mostrar', { detail : data }))
    }
 
    return ElementComponent
}