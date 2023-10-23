import notification from "../pwa/notification.js"

export default ()=>{

    const theme         = ls('theme').get()
    const themeChat     = ls('theme_chat').get()
    const fontFamily    = ls('fontFamily').get(true)

    const ElementComponent = createHTML(`
        <div class="div_L5jgPxN">
            <header class="header_225VF53">
                <div class="div_lD7mjkb">
                    <a href="#/user"><i class="fi fi-rr-arrow-small-left"></i></a>
                    <h3>Notificacion</h3>
                </div>
                <div class="div_Xs7U5Y6">
                    <label class="label_5kB8k1C">
                        <input data-type="notificacion" type="checkbox" ${ theme == 'dark' ? 'checked' : '' }>
                        <span></span>
                    </label>
                </div>
            </header>
            <div class="div_VV5Wk2L scroll-y"></div>
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

    const elementToggleNotification = query.get('input[data-type = notificacion]')

    const validateNotificacion = async ()=>{
        const [enableNotifications, disableNotifications] = await notification((status)=> {
            elementToggleNotification.checked = status ? true : false
        })

        elementToggleNotification.addEventListener('change', e => {
            if(e.target.checked) enableNotifications()
            else disableNotifications()
        })
    }

    validateNotificacion()

    document.getElementById('main').append(ElementComponent)
    
}
