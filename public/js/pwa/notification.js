export default async ( callback ) =>{
    if( !navigator.serviceWorker ) return
    const auth  = ls('auth').data({}).push(true, true)

    const api = uri => 'https://53jcwvc3-3000.brs.devtunnels.ms' + uri

    const Register = await (new Promise((resolve) => resolve(navigator.serviceWorker.register( './sw.js' ))))

    Register.pushManager.getSubscription().then( callback )

    const getPublicKey = async ()=>{
        return fetch( api(`/key`) )
            .then( res => res.arrayBuffer() )
            .then( key => new Uint8Array(key) )
    }
    
    const enableNotifications =()=>{
        getPublicKey().then( key => {
            Register.pushManager.subscribe({
                userVisibleOnly : true,
                applicationServerKey : key
            })
            .then( res => res.toJSON() )
            .then( subscription => {
                const options = {
                    method  : 'POST',
                    headers : { 'Content-Type' : 'application/json' },
                    body    : JSON.stringify( subscription )
                }

                fetch( api(`/subscribe/${ auth.token }`), options )
                .then( callback )
                .catch( disableNotifications )

                callback(subscription)
            })

        })
    }

    const disableNotifications =()=>{
        Register.pushManager.getSubscription().then( subs => {
            if(subs)
            subs.unsubscribe().then(()=> callback(false))
        })
    }

    return [enableNotifications, disableNotifications]
}