import form_link from "./form_link.js"

export default ()=>{

    const stream = {
        id : '1',
        id_user : '1695101156748',
        name : 'VN ♥'
    }

    //const user = JSON.parse(localStorage.getItem('user'))

    const ElementComponent = createHTML(`
        <header class="header_zyfS8">
            <div class="div_9vVlk">
                <div class="div_6y9bH">
                    <a href="#/" class="a_Ma0S6"><i class="fa-solid fa-caret-left"></i></a>
                    <h3 class="h3_X0B6J text-ellipsis">${ stream.name ?? 'hola' }</h3>
                </div>
                <div class="div_6y9bH">
                    <button class="button_Ma0S6 icon"><img src="public/img/icons/svg/icon-user-group.svg" alt="icon-svg"></button>
                </div>
            </div>
        </header>
    `)

    return ElementComponent
}