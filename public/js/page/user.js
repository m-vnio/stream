import { logoutFirebase } from "../firebase/auth.js"
import modalSetting from "../components/modalSetting.js"

export default ()=>{

    const user = ls('user').data({}).push(true, true)
    const user_data = ls('user_data').data({}).push(true, true)

    const ElementComponent = createHTML(`
        <div class="div_5Zz84Ni">
            <div class="div_9d2AH62"><img src="https://i.pinimg.com/originals/6f/70/50/6f70500ba35591a8fef23d4115ffd952.jpg" alt=""></div>
            <div class="div_pB6zzvH">
                <a href="#/"><i class="fi fi-rr-arrow-small-left"></i></a>
            </div>
            <div class="div_e6dR5Cp">
                <div class="div_g90gE7g"> 
                    <div class="div_7exS891">
                        <div class="div_Y6670k2">
                            <div class="div_rwsKT2P"><img src="./public/img/user/${ user_data.avatar }" alt=""></div>
                            <button class="button_57zh9xb" style="display:none"><i class="fi fi-rr-pencil"></i></button>
                        </div>
                        <div class="div_w23w1hQ">
                            <div class="div_q9SpFZJ"></div>
                            <div class="div_751XNwm">
                                <div class="div_LSlRYXR">
                                    <h4>${ user_data.name.toUpperCase() }</h4>
                                    <span>${ user_data.descripcion }</span>
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
                                    <i class="fi fi-rr-cake-birthday"></i>
                                    <div>
                                        <span>Cumpleaños</span>
                                        <h4 class="text-ellipsis birthday">${ user_data.birthday }</h4>
                                    </div>
                                </button>
                                <div class="button_4tqA7O4">
                                    <i class="fi fi-rr-venus-mars"></i>
                                    <div>
                                        <span>Genero</span>
                                        <h5 class="text-ellipsis">${ user_data.genero }</h5>
                                    </div>
                                </div>
                                <div class="button_4tqA7O4">
                                    <i class="fi fi-rr-envelope"></i>
                                    <div>
                                        <span>Correo</span>
                                        <h5 class="text-ellipsis">${ user.email }</h5>
                                    </div>
                                </div>
                                <div class="button_4tqA7O4">
                                    <i class="fi fi-rr-phone-flip"></i>
                                    <div>
                                        <span>Telefono</span>
                                        <h5 class="text-ellipsis">${ user_data.telefono }</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 class="h4_8jdxYE0">Configuracion</h4>
                    <div class="div_FW1pCy1">
                        <a href="#/cuenta" class="a_K6KH1Ba">
                            <i class="fi fi-rr-user"></i>
                            <div>
                                <span>Cuenta</span>
                            </div>
                        </a>
                        <a href="#/apariencia" class="a_K6KH1Ba">
                            <i class="fi fi-rr-pencil"></i>
                            <div>
                                <span>Apariencia</span>
                            </div>
                        </a>
                        <a href="#/stiker" class="a_K6KH1Ba">
                            <i class="fi fi-rr-sticker"></i>
                            <div>
                                <span>Stiker</span>
                            </div>
                        </a>
                    </div> 
                    <div class="div_FW1pCy1">
                        <a href="#/stiker" class="a_K6KH1Ba">
                            <i class="fi fi-rr-exit"></i>
                            <div>
                                <span>Cerrar Sesion</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)

    const setBirthday =(birthday)=>{
        const Month = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
        const Birthday = new Date(birthday)
        query.get('h4.birthday').textContent = `${ Birthday.getDate() } ${ Month[Birthday.getMonth()] } ${ Birthday.getFullYear() }`
    }

    setBirthday(parseInt(user_data.birthday) * 1000)
 
    document.getElementById('main').append(ElementComponent)
}