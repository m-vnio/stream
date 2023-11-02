import day15Frase from "../components/day15Frase.js";
import day15 from "../components/day15.js";

export default ()=>{

    if(new Date().toLocaleDateString() == '22/10/2023'){
        day15Frase()
        day15()
    } 

    const imgIcon = icon => `<img src="public/img/icons/png/${ icon }.png" alt="icon-svg">`

    const ElementComponent = createHTML(`
        
        <div class="div_08H2LYs">
            <div class="div_a6Sf7fo scroll-x">
                <div class="div_Q2pvs6P">
                    <a href="#/stream" class="a_N5MMLG4">
                        <div>
                            ${ imgIcon('icon-video') }
                            <span>video</span>
                        </div>
                    </a>
                    <a href="#/photo" class="a_N5MMLG4">
                        <div>
                            ${ imgIcon('icon-photo') }
                            <span>foto</span>
                        </div>
                    </a>
                    <a href="#/draw" class="a_N5MMLG4">
                        <div>
                            ${ imgIcon('icon-dibujo') }
                            <span>dibujo</span>
                        </div>
                    </a>
                    <a href="#/music" class="a_N5MMLG4">
                        <div>
                            ${ imgIcon('icon-music') }
                            <span>musica</span>
                        </div>
                    </a>
                    <a href="#/frase" class="a_N5MMLG4">
                        <div>
                            ${ imgIcon('icon-frase') }
                            <span>frase</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `)
 
    document.getElementById('main').append(ElementComponent) 
}