import style from "../style.js"
import { dbFirebase } from "../firebase/data.js";

export default ()=>{

    const hostURL  = uri => 'https://apimanagestorage.000webhostapp.com' + uri
    const user_data = ls('user_data').data({}).push(true, true)
    const db = new dbFirebase('user_data')

    const ElementComponent = createHTML(`
        <div class="div_L5jgPxN">
            <header class="header_225VF53">
                <div class="div_lD7mjkb">
                    <a href="#/user"><i class="fi fi-rr-arrow-small-left"></i></a>
                    <h3>Cuenta</h3>
                </div>
            </header>
            <div class="div_VV5Wk2L scroll-y">
                <div class="div_DCTrK3U">
                    <div class="div_FRs55rt">
                        <div class="div_98E12uW"><h4>Perfil</h4></div>
                        <form class="form_9L6695u" autocomplete="off"> 
                            <div class="div_WGwF07F">
                                <label class="label_XzVf530">
                                    <input type="file" name="wallpaper">
                                    <img src="${ hostURL(`/upload-files/storage/wallpaper/${ user_data.wallpaper }`) }">
                                </label>
                                <label class="label_96QeWL5">
                                    <input type="file" name="avatar">
                                    
                                    <img src="${ hostURL(`/upload-files/storage/avatar/${ user_data.avatar }`) }">
                                </label>
                            </div>
                            
                            <label class="label_eE2nEE4">
                                <input type="text" value="${ user_data.name ?? '' }" name="name" placeholder="nombre">
                            </label>
                            <label class="label_eE2nEE4">
                                <input type="text" value="${ user_data.descripcion ?? '' }" name="descripcion" placeholder="descripcion">
                            </label>
                            <label class="label_A6w2qK5">
                                <input type="date" data-value="${ user_data.birthday ?? '' }" name="birthday">
                                <span>cumpleaños</span>
                            </label>
                            <div class="div_ZL6A3xH">
                                <button type="submit" class="pointer">guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `) 

    const query = new findElement(ElementComponent)

    const elementFormPerfil = query.get('.form_9L6695u')
    const elementImgWallpaper  = query.get('.label_XzVf530 img')
    const elementImgAvatar  = query.get('.label_96QeWL5 img')

    const setBirthday =(birthday)=>{
        const Month = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
        const Birthday = new Date(birthday)
        query.get('.label_A6w2qK5 span').textContent = `${ Birthday.getDate() } ${ Month[Birthday.getMonth()] } ${ Birthday.getFullYear() }`
    }

    elementFormPerfil.wallpaper.addEventListener('change', e => {
        const file_file = e.target.files[0]
        if(!file_file) return

        const reader = new FileReader();
        reader.readAsDataURL(file_file)
        reader.addEventListener("load", () => {
            let url = URL.createObjectURL(file_file) 
            elementImgWallpaper.setAttribute("src", url)
        })
    })
    
    elementFormPerfil.avatar.addEventListener('change', e => {
        const file_file = e.target.files[0]
        if(!file_file) return

        const reader = new FileReader();
        reader.readAsDataURL(file_file)
        reader.addEventListener("load", () => {
            let url = URL.createObjectURL(file_file) 
            elementImgAvatar.setAttribute("src", url)
        })
    })

    elementFormPerfil.birthday.addEventListener('change', e => {
        if(e.target.value == '') return
        e.target.dataset.value = new Date(`${ e.target.value } 00:00:00`).getTime()
        setBirthday(parseInt(e.target.dataset.value))
    })

    elementFormPerfil.addEventListener('submit', e => {
        e.preventDefault()

        const data = {
            name : elementFormPerfil.name.value,
            descripcion : elementFormPerfil.descripcion.value,
            birthday : elementFormPerfil.birthday.dataset.value
        }

        const data_file = new FormData()
        const fileAvatar = elementFormPerfil.avatar.value
        const fileWallpaper = elementFormPerfil.wallpaper.value

        const idFile = Date.now().toString()

        data_file.append('data', JSON.stringify({ id_file : idFile }))

        if(fileAvatar != ''){ 
            data_file.append('file_avatar', elementFormPerfil.avatar.files[0])
        }

        if(fileWallpaper != ''){ 
            data_file.append('file_wallpaper', elementFormPerfil.wallpaper.files[0])
        }

        if(fileAvatar != '' || fileWallpaper != ''){
            fetch(hostURL('/upload-files/app/uploadFile.php'), {
                method : 'POST',
                body : data_file
            })
            .then(res => res.json())
            .then((resData)=> {
                db.edit(user_data.id, {...data, ...resData}).then(console.log)
            })
        } else {
            db.edit(user_data.id, data).then(console.log)
        }
    })
 
    setBirthday(parseInt(user_data.birthday))
    document.getElementById('main').append(ElementComponent)
}
