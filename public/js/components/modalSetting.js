import style from "../style.js"

export default (openOption = '')=>{
    const ElementComponent = createHTML(`
        <div class="div_IK85t20">
            <div class="div_31mQ4VP"></div>
            <div class="div_2V8ZNzZ"></div>
        </div>
    `)

    const ElementTap = ElementComponent.querySelector('.div_31mQ4VP')
    const ElementContent = ElementComponent.querySelector('.div_2V8ZNzZ')

    ElementTap.addEventListener('click', ()=> {
        ElementComponent.remove()
    })

    const def_optionApariencia =()=>{

        const theme = localStorage.getItem('theme')

        const element = createHTML(`
            <div class="div_UsFKG6Y">
                <label class="label_5kB8k1C">
                    <input type="checkbox" ${ theme == 'dark' ? 'checked' : '' }>
                    <span></span>
                </label>
            </div>
        `)
        
        element.querySelector('input').addEventListener('change', () => {
            const theme = localStorage.getItem('theme')
            localStorage.setItem('theme', theme == 'dark' ? 'light' : 'dark')
            style()
        })

        return element
    }

    const def_optionChat =()=>{

        const themeChat = localStorage.getItem('theme_chat')

        const element = createHTML(`
            <div class="div_UsFKG6Y">
                <label class="label_NWRrl70">
                    <input type="color" value="${ themeChat }" >
                    <span></span>
                </label>
            </div>
        `)
        
        element.querySelector('input').addEventListener('change', e => {
            localStorage.setItem('theme_chat', e.target.value)
            style()
        })

        return element
    }

    if(openOption == 'apariencia') {
        ElementContent.append(def_optionApariencia())
    } else if(openOption == 'chat') {
        ElementContent.append(def_optionChat())
    }
    
    return ElementComponent 
}