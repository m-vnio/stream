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
                    <a href="#/stiker" class="button_8GBQ4NU" data-action="apariencia">
                        <span class="text-ellipsis">stiker</span>
                        <i class="fa-solid fa-caret-right"></i>
                    </a> 
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const root  = document.getElementById('root') 
    const elementButton = query.get('.div_h35b0gG')

    elementButton.addEventListener('click', e=> {
        const button = e.target.closest('button')
        if(button){
            const action = button.dataset.action
            if(action == 'apariencia') root.append(modalSetting())
        }
    })



    document.getElementById('main').append(ElementComponent)
    
}