export default (data)=>{

    const api = (uri = '') => ls('api').get() + uri

    const Icon  = new iconSVG()
    const auth      = ls('auth').data({}).push(true, true)

    const stikerFavorite = ls('stiker-favorite').data({}).push(true, true)
    const isStikerFavorite = stikerFavorite.stiker.find(stiker => stiker == data)

    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2 p-none">
            <div class="div_hS7SImh"></div>
            <div class="div_o5YYc7z element-width">
                <div class="div_nePa18j">
                    <div class="div_0Xy0kH1">
                        <img src="${ api(`/stream/storage/stiker/${ data }`) }"> 
                    </div>
                    <div class="div_87f623c scroll-x">
                        <div class="div_DJuQ0ML">
                            <button class="pointer" data-action="favorite">${ Icon.get(`fi fi-${ isStikerFavorite ? 'sr' : 'rr' }-star`) }</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `) 

    const query = new findElement(ElementComponent)
    const btnFavorite = query.get('button[data-action="favorite"]')

    query.get('.div_hS7SImh').addEventListener('click', ()=> ElementComponent.remove())

    btnFavorite.addEventListener('click', e => {
        const stikerFavorite = ls('stiker-favorite').data([]).push(true, true)
        const index = stikerFavorite.stiker.findIndex(stiker => stiker == data)

        if(index == -1) stikerFavorite.stiker.push(data)
        else stikerFavorite.stiker.splice(index, 1)  
        
        btnFavorite.innerHTML = Icon.get(`fi fi-${ index == -1 ? 'sr' : 'rr' }-star`)

        datapi.patch(api(`/stream/api/stiker?id=${ stikerFavorite.id }&token=${ auth.token }`), { stiker : JSON.stringify(stikerFavorite.stiker) })
            .then(res => {
                if(res) {
                    ls('stiker-favorite').data(stikerFavorite).put(true)
                }
            })
    })
 
    return ElementComponent
}