export default (data)=>{

    if(!localStorage.getItem('stiker-favorite'))
        localStorage.setItem('stiker-favorite', JSON.stringify([]))

    const stikerFavorite = JSON.parse(localStorage.getItem('stiker-favorite'))
    const isStikerFavorite = stikerFavorite.find(stiker => stiker.id == data.id)

    const imgIcon = icon => `<img src="public/img/icons/svg/${ icon }.svg" alt="icon-svg">`
    
    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2">
            <div class="div_hS7SImh"></div>
            <div class="div_d788b1q">
                <button data-action="favorite">${ imgIcon('icon-favorite-' + (isStikerFavorite ? 'dark' : 'light')) }</button>
            </div>
        </div>
    `)

    const findChild = query => ElementComponent.querySelector(query)

    findChild('.div_hS7SImh').addEventListener('click', ()=> ElementComponent.remove())
    findChild('button[ data-action = favorite ]').addEventListener('click', ()=> {
        if(isStikerFavorite) 
            localStorage.setItem('stiker-favorite', JSON.stringify(stikerFavorite.filter(stiker => stiker.id != data.id)))
        else {
            stikerFavorite.push(data)
            localStorage.setItem('stiker-favorite', JSON.stringify(stikerFavorite))
        }
        ElementComponent.remove()
    })

    return ElementComponent
}