import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/templatecomponents';
import { doLogin, doLogout } from '../../helpers/AuthHandler';

//buscando api no serve hook
import useApi from '../../helpers/Api';


const  Page =  () => {
    //chamando a api
    const api = useApi();

    //criando chamadas usestate Cadastro
    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword ] = useState('');
    const [stateList, setStateList] = useState([]);
    
    //btn desabilitado
    const [disabled,setDisabled] = useState(false);
    const [error, setError] = useState('');


    //ATUALIZANDO PAGINA UMA VEZ EFFECT
    useEffect(()=>{
        //requisicao de busca ESTADO
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    },[]);

    //TRATAR FORMULARIO
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setDisabled(true);

       // const json = await api.login(email, password);

        //teve error
        //if(json.error){
          //  setError(json.error);
        //nao teve error
        //}else{
          //  doLogin(json.token, rememberPassword);
          //  window.location.href = '/';
        //}
        //debloqueia
        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Cadastrar</PageTitle>
            <PageArea>
                {/* MONSTRANO ERROR */}
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }    
                <form onSubmit={handleSubmit}>

                    <label className="area">
                        <div className="area--title">Nome Completo</div>
                        <div className="area--input">
                            <input 
                            type="email"
                            disabled={disabled}
                            value={name}
                            onChange={e=>setName(e.target.value)}
                            required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select
                                value={stateLoc}
                                required
                                onChange={e=>setStateLoc(e.target.value)}
                            >
                                <option></option>
                                {/*busca estado no BD */}
                                {stateList.map((i,k)=>
                                    <option key={k} value="i._id">{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input 
                            type="email"
                            disabled={disabled}
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                            type="password"
                            disabled={disabled}
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input 
                            type="password"
                            disabled={disabled}
                            value={confirmPassword}
                            onChange={e=>setConfirmPassword(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button  disabled={disabled} >Cadastrar</button>
                        </div>
                    </label>

                </form>
            </PageArea>
        </PageContainer>

    );
}

export default Page;

