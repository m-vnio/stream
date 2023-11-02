import style from "../style.js"

export default ()=>{
    const Icon  = new iconSVG()
    const theme         = ls('theme').get()
    const themeChat     = ls('theme_chat').get()
    const fontFamily    = ls('fontFamily').get(true)

    const ElementComponent = createHTML(`
        <div class="div_L5jgPxN">
            <header class="header_225VF53">
                <div class="div_lD7mjkb">
                    <a href="#/user">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>Apariencia</h3>
                </div>
                <div class="div_Xs7U5Y6">
                    <label class="label_5kB8k1C">
                        <input data-type="apariencia" type="checkbox" ${ theme == 'dark' ? 'checked' : '' }>
                        <span></span>
                    </label>
                </div>
            </header>
            <div class="div_VV5Wk2L scroll-y">
                <div class="div_DCTrK3U">
                    <div class="div_FRs55rt">
                        <div class="div_98E12uW"><h4>chat</h4></div>
                        <div class="div_AYs8msi"> 
                            <div class="div_w1AIy8F">
                                <label class="label_NWRrl70">
                                    <input type="color" value="#ffffff">
                                    <span>Hola?</span>
                                </label>
                                <label class="label_NWRrl70 right">
                                    <input type="color" data-type="chat" value="${ themeChat }">
                                    <span>Adiós?</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="div_FRs55rt">
                        <div class="div_98E12uW"><h4>fuente</h4></div>
                        <div class="div_xAJ4fl5 scroll-x">
                            <div class="div_j5G8e0D"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)
 
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

    const query = new findElement(ElementComponent)

    const elementFont = query.get('.div_j5G8e0D')
    const elementTemp = document.createDocumentFragment()

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

    query.get('input[data-type = apariencia]').addEventListener('change', e => {
        const theme = localStorage.getItem('theme')
        localStorage.setItem('theme', theme == 'dark' ? 'light' : 'dark')
        style()
    })

    query.get('input[data-type = chat]').addEventListener('change', e => {
        localStorage.setItem('theme_chat', e.target.value)
        style()
    })
 
    Font.forEach(font => {
        const elementFont = document.createElement('span')
        elementFont.style = 'font-family:' + font.font
        elementFont.textContent      = font.name
        elementFont.setAttribute('data-font', JSON.stringify(font))
        elementFont.classList.add('pointer')
        elementTemp.append(elementFont)

        if(fontFamily.name == font.name) {
            elementFont.classList.add('focus')
            elementTemp.prepend(elementFont)
        } else elementTemp.append(elementFont)
    });

    elementFont.append(elementTemp) 

    document.getElementById('main').append(ElementComponent)
    
}
