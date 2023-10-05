export default ()=>{
    const ElementComponent = createHTML(`
        <div class="div_ue0FY7z">
            <div class="div_Yt1Jtre">
                <div class="div_cPN16D0">
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
 
    document.getElementById('main').append(ElementComponent)
}