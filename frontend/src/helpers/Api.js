import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';


// **************** API ENVIAR ARQUIVO ***********************
const apiFetchFile = async ( endpoint, body) => {
    
    //verificao de token
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.append('token', token);
        }
    }
    const res = await fetch(BASEAPI+endpoint,{
        method:'POST',
        body
    });

    const json = await res.json();

    //autorizacao do usuario
    if(json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json;

}

// **************** API ENVIAR  POST ***********************
const apiFetchPost = async (endpoint, body) => {
    //verificao de token
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI+endpoint,{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    //autorizacao do usuario
    if(json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json;
}

//************API BUSCAR INFO GET **********************
 const apiFetchGet = async (endpoint, body = []) => {
    //verificao de token
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }
    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    //autorizacao do usuario
    if(json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json;
}

// REQUISICAO
const api = {

    //Login
    login: async (email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );
        return json;
    },

    //Cadastrar
    register: async ( name, email, password, stateLoc ) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },

    //Buscar Estados
    getStates:async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },

     //categorias   
    getCategories:async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },

    //Pega lista de produtos    
    getAds:async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    //Pegar itens
    getAd:async  (id, other = false) =>{
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        );
        return json;
    },

    //enviar Arquivo 
    addAd:async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    }

};


export default  () => api;

//server http://alunos.b7web.com.br:501/ping

//teste1111@gmail.com
//senha: 1515

//INSTALAÇÃO
//npm install react-slideshow-image --save