import { logoutFirebase } from "../firebase/auth.js"
import modalSetting from "../components/modalSetting.js"

export default ()=>{
    const ElementComponent = createHTML(`
        <div class="div_ue0FY7z">
            <div class="div_kzd5iN4 scroll-y">
                <div class="div_h35b0gG"> 
                    <button class="button_8GBQ4NU" data-action="apariencia">
                        <span class="text-ellipsis">apariencia</span>
                        <i class="fa-solid fa-caret-right"></i>
                    </button>
                    <button class="button_8GBQ4NU" data-action="logout">
                        <span class="text-ellipsis">cerrar sesion</span>
                        <i class="fa-solid fa-caret-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `)

    const elementButton = ElementComponent.querySelector('.div_h35b0gG')

    elementButton.addEventListener('click', e=> {
        const button = e.target.closest('button')

        if(button){
            const action = button.dataset.action
            if(action == 'apariencia') document.getElementById('root').append(modalSetting())
            else if(action == 'logout') logoutFirebase()
        }
    })



    document.getElementById('main').append(ElementComponent)
    
}