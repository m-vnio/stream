import style from "../style.js"

export default ()=>{

    const theme = localStorage.getItem('theme')
    const themeChat = localStorage.getItem('theme_chat')
    const fontFamily = json(localStorage.getItem('fontFamily'))

    const ElementComponent = createHTML(`
        <div class="div_IK85t20">
            <div class="div_31mQ4VP"></div>
            <div class="div_2V8ZNzZ">
                <div class="div_kc3bagF">
                    <div class="div_UsFKG6Y">
                        <label class="label_5kB8k1C">
                            <input data-type="apariencia" type="checkbox" ${ theme == 'dark' ? 'checked' : '' }>
                            <span></span>
                        </label>
                    </div>
                    <div class="div_AYs8msi scroll-y"> 
                        <div class="div_w1AIy8F">
                            <label class="label_NWRrl70">
                                <input type="color" value="#ffffff">
                                <span>Hola?</span>
                            </label>
                            <label class="label_NWRrl70 right">
                                <input type="color" data-type="chat" value="${ themeChat }" >
                                <span>Adiós?</span>
                            </label>
                        </div>
                    </div>
                    <div class="div_xAJ4fl5 scroll-x">
                        <div class="div_j5G8e0D"></div>
                    </div>
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)

    const ElementTap = query.get('.div_31mQ4VP')

    const Font = [ 
        { name : "predeterminado", font : "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'"},
        { name : "Montserrat", font : "'Montserrat', sans-serif"},
        { name : "Roboto", font : "'Roboto', sans-serif"},
        { name : "Lato", font : "'Lato', sans-serif"},
        { name : "Open Sans", font : "'Open Sans', sans-serif"},
        { name : "Poppins", font : "'Poppins', sans-serif"},
        { name : "Playfair Display", font : "'Playfair Display', serif"},
        { name : "Raleway", font : "'Raleway', sans-serif"}
    ]

    const elementFont = query.get('.div_j5G8e0D')
    const elementTemp = document.createDocumentFragment()

    Font.forEach(font => {
        const elementFont = document.createElement('span')
        elementFont.style = 'font-family:' + font.font
        elementFont.textContent      = font.name
        elementFont.setAttribute('data-font', json(font, false))
        elementTemp.append(elementFont)

        if(fontFamily.name == font.name) {
            elementFont.classList.add('focus')
            elementTemp.prepend(elementFont)
        } else elementTemp.append(elementFont)
    });

    elementFont.addEventListener('click', e => {
        const span = e.target.closest('span')

        if(span){
            
            const spanPrevious = elementFont.querySelector('span.focus')
            if(spanPrevious) spanPrevious.classList.remove('focus')
            if(span == spanPrevious) return

            span.classList.add('focus')
            localStorage.setItem('fontFamily', span.dataset.font)
            style() 
        }
    })

    elementFont.append(elementTemp)

    query.get('input[data-type = apariencia]').addEventListener('change', e => {
        const theme = localStorage.getItem('theme')
        localStorage.setItem('theme', theme == 'dark' ? 'light' : 'dark')
        style()
    })

    query.get('input[data-type = chat]').addEventListener('change', e => {
        localStorage.setItem('theme_chat', e.target.value)
        style()
    })

    ElementTap.addEventListener('click', ()=> {
        ElementComponent.remove()
    })

    return ElementComponent 
}