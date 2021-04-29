import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';

// ****************  POST ***********************
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

//************ GET **********************
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
    }
};


export default  () => api;

//server http://alunos.b7web.com.br:501/ping

//suporte@b7web.com.br
//senha: 1234