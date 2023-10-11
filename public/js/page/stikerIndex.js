import stikerOption from "../components/stikerOption.js"
export default (params)=>{

    const ElementComponent = createHTML(`
        <div class="div_vXa5q94">
            <div class="contenedor_loader" ><span class="loader"></span></div>
            <div class="div_GHk93TF scroll-y">
                <div class="div_C0rVsHh"></div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)

    const elementLoad = query.get('.contenedor_loader')
    const elementItem = query.get('.div_GHk93TF')
    
    elementItem.addEventListener('click', e => {
        const item = e.target.closest('.div_SlY3iuU')
        if(item){
            const data = json(item.dataset.data) 
            if(data){
                document.getElementById('root').append(stikerOption(data))
            }
        }
    })

    const renderHTML =(data)=>{
        const element = createHTML(`
            <div class="div_SlY3iuU" ><img src="public/img/stiker/${ data.name }" alt="icon-stiker"></div>
        `)

        element.setAttribute('data-data', json(data, false))

        return element
    }  

    const renderData =(Data)=>{
        const final = 25 * (parseInt(params.index) || 1)
        const inicio = final - 25

        const ArrayData = Data.stiker.slice(inicio, final)

        if(elementItem.children[0].children.length == 0){
            const elementTemp = document.createDocumentFragment()
            ArrayData.forEach(data => elementTemp.append(renderHTML(data))); 
            elementLoad.remove()
            elementItem.children[0].append(elementTemp)
            ElementComponent.append(elementItem)
        }
    }

    const loadData = async ()=>{
        elementItem.remove()

        if(params.index == 0) { 
            renderData({ stiker : ls('stiker-favorite').get(true) });
        } else {
            const Data = await fetch('./public/json/stiker.json')
            const DataJSON = {
                stiker : await Data.json()
            }
    
            renderData(DataJSON);
        }
        
    }

    loadData() 
    
    document.getElementById('main').append(ElementComponent) 
}