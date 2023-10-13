export default ()=>{
    
    const stikerCollection = ls('stiker-collection').data([]).push(true, true)
    
    const imgIcon = icon => `<img src="public/img/icons/svg/${ icon }.svg" alt="icon-svg">`

    let Stiker = []

    const ElementComponent = createHTML(`
        <div class="div_L5jgPxN">
            <header class="header_225VF53">
                <div class="div_lD7mjkb">
                    <a href="#/user"><i class="fi fi-rr-arrow-small-left"></i></a>
                    <h3>Stiker</h3>
                </div>
            </header>
            <div class="div_VV5Wk2L scroll-y">
                <div class="contenedor_loader"><span class="loader"></span></div>
                <div class="div_jr45I15">
                    <div class="div_80VEr3d full">
                        <a href="#/stiker/0" class="div_79Hcs8q">
                            <h4>favoritos</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)

    const elementContentItem = query.get('.div_VV5Wk2L')
    const elementLoad = query.get('.contenedor_loader')
    const elementItem = query.get('.div_jr45I15')

    elementItem.addEventListener('click', e => {
        const button = e.target.closest('button')
        if(button){
            const data = json(button.parentElement.dataset.data)
            const indexStiker = stikerCollection.findIndex(stiker => stiker.id == (data.id ?? -1))
            if(indexStiker != -1) {
                stikerCollection[indexStiker].datetimeUpdate = Date.now().toString()
                stikerCollection[indexStiker].status = !stikerCollection[indexStiker].status
            } else {
                stikerCollection.push({
                    id : data.id,
                    datetimeUpdate : Date.now().toString(),
                    status : true
                })
            }

            ls('stiker-collection').data(stikerCollection).put(true)
            renderData(Stiker)
            
        }
    })

    const renderHTML =(index)=>{
        index += 1
        const collection = stikerCollection.find(stiker => stiker.id == index) ?? { id : index }

        const element = createHTML(`
            <div class="div_80VEr3d" id="div-${ index }">
                <a href="#/stiker/${ index }" class="div_79Hcs8q">
                    <h4>PACK ${ index }</h4>
                </a>
                <button>${ imgIcon(collection.status ? 'icon-mark-dark' : 'icon-mark-light') }</button>
            </div>
        `)

        element.setAttribute('data-data', json(collection , false))
        return element
    }

    const renderData =(Data)=>{
        const ArrayData = [ ...Array(Math.round(Data.stiker.length / 25)).keys() ]

        if(elementItem.children.length > 1){
            ArrayData.forEach(i => {
                const element = elementItem.querySelector(`#div-${ i + 1 }`)
                
                if(element) {
                    const elementNew =renderHTML(i)
                    if(element.outerHTML != elementNew.outerHTML)
                        element.replaceWith(elementNew)
                }
            });

        } else {
            const elementTemp = document.createDocumentFragment()
            ArrayData.forEach(i => elementTemp.append(renderHTML(i)));
            elementLoad.remove()
            elementItem.append(elementTemp)
            elementContentItem.append(elementItem)
        }

    }

    const loadData = async ()=>{
        const Data = await fetch('./public/json/stiker.json')
        const DataJSON = {
            stiker : await Data.json()
        }

        Stiker = DataJSON

        renderData(DataJSON);
    }

    elementItem.remove()
    loadData()
    document.getElementById('main').append(ElementComponent)
}