import { logoutFirebase } from "../firebase/auth.js"

export default ()=>{
    const ElementComponent = createHTML(`
        <div class="div_ue0FY7z">
            <div class="div_Yt1Jtre">
                <div class="div_cPN16D0">
                    <button class="button_e674k6w logout"><img src="public/img/icons/svg/icon-exit.svg"></button>
                    <a href="#/setting" class="a_e674k6w"><img src="public/img/icons/svg/icon-setting.svg"></a>
                </div>
                <div class="div_y86pvEn" style="display:none">
                    <img src="public/img/icons/png/user-profile.png">
                </div>
                <div class="div_cDaXU12" style="display:none">
                    <h4>NOMBRE APELLIDO1 APELLIDO2</h4>
                </div>
            </div>
        </div>
    `)

    const findChild = query => ElementComponent.querySelector(query)

    findChild('.logout').addEventListener('click', logoutFirebase)
 
    document.getElementById('main').append(ElementComponent)
}