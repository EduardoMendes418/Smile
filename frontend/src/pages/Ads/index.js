import React, { useState , useEffect } from 'react';
import { PageArea } from './styled';
import { PageContainer } from '../../components/templatecomponents';
import AdItem from '../../components/partials/AdItem';

import { useHistory, useLocation } from 'react-router-dom';

//buscando api no serve hook
import useApi from '../../helpers/Api';

const  Page =  () => {
    //chamando a api
    const api = useApi();
    const history = useHistory();

    //buscar o parametro  exemplo:cat
    const useQueryString = () =>{
        return new URLSearchParams(useLocation().search);
    }
    const query = useQueryString();

    //state puxando a informação    
    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
    const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');


    const [stateList, setStateList] = useState([]);
    const [categories,setCategories] = useState([]);
    const[adList, setAdList] = useState([]);


    //MONITORA cat/q/state
    useEffect(()=> {
        //codicao de verificao de states
        let queryString = [];
        if(q){
            queryString.push(`q=${q}`);
        }
        if(cat){
            queryString.push(`cat=${cat}`);
        }
        if(state){
            queryString.push(`state=${state}`);
        }

        //junta todos com join  e separa & comercial
        history.replace({
            search:`?${queryString.join('&')}`
        });
    },[q,cat,state]);


    //listade estados
    useEffect(() =>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    },[]);

    //Categoria
    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    //Produtos
    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:4
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);
    

    return (
        <PageContainer>
             <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        
                        <input 
                         type="text" 
                         name="q" 
                         placeholder="O que você procura?" 
                         value={q}
                         onChange={e=>setQ(e.target.value)}

                         />
                        
                        {/*LISTA ESTADOS */}
                        <div className="filterName">Estado: </div>
                        <select 
                        name="state" 
                        value={state}
                        onChange={e=>setState(e.target.value)}    
                        >
                            <option></option> 
                               {stateList.map((i,k) =>
                                    <option key={k} value={i.name}>{i.name}</option>
                               )}
                        </select>

                        {/*LISTA CATEGORIA*/}       
                        <div className="filterName">Categoria:</div>
                        <ul>
        
                            {categories.map((i,k) => 

                                //CATEGORIAS ASSIMQ BUSCAR ATIVADAS/ITEM
                                <li 
                                key={k} 
                                className={cat==i.slug?'categoryItem active':'categoryItem'}
                                onClick={()=>setCat(i.slug)}
                                >
                                      <img src={i.img} alt="" /> 
                                      <span>{i.name}</span> 
                                </li>
                            )}

                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    ...
                </div>
             </PageArea>
        </PageContainer>
       
    );
}

export default Page;

