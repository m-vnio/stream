
export default ()=>{

    const Icon  = new iconSVG() 
    const auth      = ls('auth').data({}).push(true, true)

    const api = (uri = '') => ls('api').get() + uri 

    const ElementComponent = createHTML(`
        <div class="div_5Zz84Ni">
            <div class="div_9d2AH62"><img src="" alt="" data-render="img" data-name="wallpaper"></div>
            <div class="div_pB6zzvH">
                <a href="#/">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
            </div>
            <div class="div_e6dR5Cp">
                <div class="div_g90gE7g"> 
                    <div class="div_7exS891">
                        <div class="div_Y6670k2">
                            <div class="div_rwsKT2P"><img src="" alt="" data-render="img" data-name="avatar"></div>
                            <button class="button_57zh9xb" style="display:none"><i class="fi fi-rr-pencil"></i></button>
                        </div>
                        <div class="div_w23w1hQ">
                            <div class="div_q9SpFZJ"></div>
                            <div class="div_751XNwm">
                                <div class="div_LSlRYXR">
                                    <h4 data-render="text" data-name="fullname">-</h4>
                                    <span data-render="text" data-name="biography">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div_MV6T05n">
                    <div class="div_FW1pCy1">
                        <div class="div_7soD7Ah">
                            <h4 class="h4_8jdxYE0">Informacion Personal</h4>
                            <div class="div_43dhiC8">
                                <button class="button_4tqA7O4">
                                    ${ Icon.get('fi fi-rr-gift') }
                                    <div>
                                        <span>Cumpleaños</span>
                                        <h4 class="text-ellipsis" data-render="text" data-name="birthday">-</h4>
                                    </div>
                                </button>
                                <div class="button_4tqA7O4">
                                    ${ Icon.get('fi fi-rr-venus-mars') }
                                    <div>
                                        <span>Genero</span>
                                        <h5 class="text-ellipsis" data-render="text" data-name="gender">-</h5>
                                    </div>
                                </div>
                                <div class="button_4tqA7O4">
                                    ${ Icon.get('fi fi-rr-envelope') }
                                    <div>
                                        <span>Correo</span>
                                        <h5 class="text-ellipsis" data-render="text" data-name="email">-</h5>
                                    </div>
                                </div>
                                <div class="button_4tqA7O4">
                                    ${ Icon.get('fi fi-rr-phone-flip') }
                                    <div>
                                        <span>Telefono</span>
                                        <h5 class="text-ellipsis" data-render="text" data-name="telefono">-</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 class="h4_8jdxYE0">Configuracion</h4>
                    <div class="div_FW1pCy1">
                        <a href="#/count" class="a_K6KH1Ba">
                            ${ Icon.get('fi fi-rr-user') }
                            <div>
                                <span>Cuenta</span>
                            </div>
                        </a>
                        <a href="#/apariencia" class="a_K6KH1Ba">
                            ${ Icon.get('fi fi-rr-palette') }
                            <div>
                                <span>Apariencia</span>
                            </div>
                        </a>
                        <a href="#/notification" class="a_K6KH1Ba">
                            ${ Icon.get('fi fi-rr-bell') }
                            <div>
                                <span>Notificaciones</span>
                            </div>
                        </a>
                        <a href="#/stiker" class="a_K6KH1Ba">
                            ${ Icon.get('fi fi-rr-sticker') }
                            <div>
                                <span>Stiker</span>
                            </div>
                        </a>
                    </div> 
                    <div class="div_FW1pCy1">
                        <button href="#/stiker" class="a_K6KH1Ba logout pointer">
                            ${ Icon.get('fi fi-rr-exit') }
                            <div>
                                <span>Cerrar Sesion</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
 
    const ElementRenderText = query.getAll('[data-render = text]')
    const ElementRenderIMG = query.getAll('[data-render = img]')

    query.get('button.logout').addEventListener('click', ()=> {
        ls('auth').drop()
        location.hash = '#/login'
    })

    const renderData = () =>{
        const user_data = ls('user_data').data({}).push(true, true)

        ElementRenderText.forEach(element => {
            const key   = element.dataset.name
            const value = user_data[key] ?? ''
            if(key == 'name'){
                element.textContent = value.toUpperCase()
            } else if(key == 'birthday') {
                element.textContent = setBirthday(parseInt(value))
            }
            else element.textContent = value
        })

        ElementRenderIMG.forEach(element => {
            const key   = element.dataset.name
            const value = user_data[key] ?? ''

            if(key == 'avatar'){
                element.src = api(`/stream/storage/${ key }/${ value || 'avatar.png' }`)
            } 
            else if(key == 'wallpaper') {
                if(value == '') element.remove()
                else element.src = api(`/stream/storage/${ key }/${ value }`)
            }
            else element.src = api(`/stream/storage/${ key }/${ value }`)
        })
    }

    const setBirthday =(birthday)=>{
        const Month = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
        const Birthday = new Date(birthday)
        return `${ Birthday.getDate() } ${ Month[Birthday.getMonth()] } ${ Birthday.getFullYear() }`
    }
 
    datapi.get(api(`/stream/app/trigger/user.php?uid=${ auth.uid }`))
    .then( data => {
        ls('user_data').data(data).put(true)
        renderData()
    } ) 

    addEventListener('custom-event-user-data', renderData)

    document.getElementById('main').append(ElementComponent)
}