export default ()=>{

    if(!localStorage.getItem('stiker-collection'))
        localStorage.setItem('stiker-collection', json([], false))

    const stikerCollection = json(localStorage.getItem('stiker-collection'))

    const imgIcon = icon => `<img src="public/img/icons/svg/${ icon }.svg" alt="icon-svg">`

    const ElementComponent = createHTML(`
        <div class="div_vXa5q94">
            <div class="contenedor_loader" ><span class="loader"></span></div>
            <div class="div_GHk93TF scroll-y">
                <div class="div_jr45I15">
                    <div class="div_80VEr3d">
                        <a href="#/stiker/0" class="div_79Hcs8q">
                            <h4>favoritos</h4>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `)

    const findChild = query => ElementComponent.querySelector(query)

    const elementLoad = findChild('.contenedor_loader')
    const elementItem = findChild('.div_GHk93TF')

    elementItem.addEventListener('click', e => {
        const button = e.target.closest('button')
        if(button){
            const data = json(button.parentElement.dataset.data) 
            const indexStiker = stikerCollection.findIndex(stiker => stiker.id == (data.id ?? -1))
            console.log(indexStiker);
            if(indexStiker != -1) {
                stikerCollection[indexStiker].datetimeUpdate = Date.now().toString()
                stikerCollection[indexStiker].status = !stikerCollection[indexStiker].status
            } else {
                console.log('aqui');
                stikerCollection.push({
                    id : data.id,
                    datetimeUpdate : Date.now().toString(),
                    status : true
                }) 
            }
            localStorage.setItem('stiker-collection', json(stikerCollection, false)) 
            location.reload()
        }
    })

    const renderHTML =(index)=>{
        index += 1
        const collection = stikerCollection.find(stiker => stiker.id == index) ?? { id : index }

        const element = createHTML(`
            <div class="div_80VEr3d">
                <a href="#/stiker/${ index }" class="div_79Hcs8q">
                    <h4>PACK ${ index }</h4>
                </a>
                <button>${ imgIcon(collection.status ? 'icon-minus' : 'icon-plus') }</button>
            </div> 
        `)

        element.setAttribute('data-data', json(collection , false))
        return element
    }  

    const renderData =(Data)=>{

        const ArrayData = [ ...Array(Math.round(Data.stiker.length / 25)).keys() ]
        if(elementItem.children[0].children.length == 1){
            const elementTemp = document.createDocumentFragment()
            ArrayData.forEach(i => elementTemp.append(renderHTML(i))); 
            elementLoad.remove()
            elementItem.children[0].append(elementTemp)
            ElementComponent.append(elementItem)
        }
    }

    const loadData = async ()=>{
        elementItem.remove()

        const Data = await fetch('./public/json/stiker.json')
        const DataJSON = {
            stiker : await Data.json()
        }
        renderData(DataJSON);
    }

    loadData() 
    document.getElementById('main').append(ElementComponent)
}