import style from "../style.js"

export default ()=>{

    const Icon = new iconSVG()
    const api = (uri = '') => ls('api').get() + uri

    const auth      = ls('auth').data({}).push(true, true)
    const user_data = ls('user_data').data({}).push(true, true)

    const ElementComponent = createHTML(`
        <div class="div_L5jgPxN">
            <header class="header_225VF53">
                <div class="div_lD7mjkb">
                    <a href="#/user">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
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
                                    <input type="file" name="wallpaper" accept="image/*">
                                    <img src="${ api(`/stream/storage/wallpaper/${ user_data.wallpaper }`) }" style="opacity:${ user_data.wallpaper ? 1 : 0 }">
                                </label>
                                <label class="label_96QeWL5">
                                    <input type="file" name="avatar" accept="image/*">
                                    <img src="${ api(`/stream/storage/avatar/${ user_data.avatar || 'avatar.png' }`) }">
                                </label>
                            </div>
                            
                            <label class="label_eE2nEE4">
                                <input type="text" value="${ user_data.fullname ?? '' }" name="fullname" placeholder="nombre">
                            </label>
                            <label class="label_eE2nEE4">
                                <input type="text" value="${ user_data.lastname ?? '' }" name="lastname" placeholder="nombre">
                            </label>
                            <label class="label_eE2nEE4">
                                <input type="text" value="${ user_data.username ?? '' }" name="username" placeholder="username">
                            </label>
                            <label class="label_eE2nEE4">
                                <input type="text" value="${ user_data.biography ?? '' }" name="biography" placeholder="biography">
                            </label>
                            <label class="label_A6w2qK5">
                                <input type="date" data-value="${ user_data.birthday ?? '' }" name="birthday">
                                <span>cumpleaños</span>
                            </label>
                            <div class="div_A6w2qK5">
                                <label class="pointer">
                                    <input type="radio" name="gender" value="male" ${ (user_data.gender ?? '') == 'male' ? 'checked' : '' }>
                                    masculino
                                </label>
                                <label class="pointer">
                                    <input type="radio" name="gender" value="female" ${ (user_data.gender ?? '') == 'female' ? 'checked' : '' }>
                                    femenino
                                </label>
                            </div>
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
            elementImgWallpaper.style.opacity = '1'
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
            fullname : elementFormPerfil.fullname.value,
            lastname : elementFormPerfil.lastname.value,
            username : elementFormPerfil.username.value,
            biography : elementFormPerfil.biography.value,
            birthday : elementFormPerfil.birthday.dataset.value,
            gender : elementFormPerfil.gender.value
        }

        const data_file = new FormData()
        const fileAvatar = elementFormPerfil.avatar.value
        const fileWallpaper = elementFormPerfil.wallpaper.value

        data_file.append('data', JSON.stringify(data))

        if(fileAvatar != '' || fileWallpaper != ''){
            if(fileAvatar != ''){ 
                data_file.append('avatar', elementFormPerfil.avatar.files[0])
            }
    
            if(fileWallpaper != ''){ 
                data_file.append('wallpaper', elementFormPerfil.wallpaper.files[0])
            } 

            fetch(api(`/stream/app/trigger/user.php?uid=${ auth.uid }&file=true`), {
                method : 'POST',
                body : data_file
            }).then(loadData) 

        } else {

            // datapi.patch(api(`/stream/app/trigger/user.php?uid=${ auth.uid }`), data)
            //     .then(loadData)

        }
    })

    const loadData = () => {
        datapi.get(api(`/stream/app/trigger/user.php?uid=${ auth.uid }`))
        .then( data => {
            ls('user_data').data(data).put(true)
        } )
 
    }
    
    setBirthday(parseInt(user_data.birthday))
    document.getElementById('main').append(ElementComponent)
}
