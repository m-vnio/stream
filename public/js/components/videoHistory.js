export default ()=>{

    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2" style="padding:0">
            <div class="div_hS7SImh"></div>
            <div class="div_oy1VxlI scroll-y">
                <div class="div_wcyPU0Y"></div>
            </div>
        </div>    
    `)

    const query = new findElement(ElementComponent)
    const elementList = query.get('.div_wcyPU0Y')

    query.get('.div_hS7SImh').addEventListener('click', () => ElementComponent.remove())

    const renderData =()=>{
        const videoHistory = ls('video-history').data([]).push(true, true)

        elementList.innerHTML = ArrayToString(videoHistory, (history, i) => {

            const Time = new Date(parseInt(history.datetime))
            const timeHour = Time.getHours()
            const timeMinute = Time.getMinutes()
            const timeSecond = Time.getSeconds()
            const timeAM = Time.getHours() < 12
            const setTime = `${timeAM ? timeHour : timeHour - 12}:${ ( '0' + timeMinute).slice(-2) }:${ ( '0' + timeSecond).slice(-2) } ${ timeAM ? 'AM' : 'PM' }`

            return `
                ${ i == 0 ? '' : '<span class="span_line"></span>' }
                <div class="div_0MIE1m1">
                    <p>${ history.message }</p>
                    <span>${ setTime }</span>
                </div>
            `
        })

    }

    renderData()
    addEventListener('updateVideoHistory', renderData)
    addEventListener('hashchange', ()=> ElementComponent.remove())

    return ElementComponent
}
