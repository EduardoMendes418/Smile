import React, { useState , useEffect } from 'react';
import { PageArea } from './styled';
import { PageContainer } from '../../components/templatecomponents';
import AdItem from '../../components/partials/AdItem';

import { useHistory, useLocation } from 'react-router-dom';

//buscando api no serve hook
import useApi from '../../helpers/Api';

//timer busca
let timer;

const  Page =  () => {
    //chamando a api
    const api = useApi();
    const history = useHistory();
  

    //buscar o parametro  exemplo:cat
    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQueryString();

    //state puxando a informação    
    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
    const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');

    //precisa de paginacao ou nao
    const [adsTotal, setAdsTotal] = useState(0);  
    //quantidade de paginas
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [stateList, setStateList] = useState([]);
    const [categories,setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    //opacidade na imagem
    const [resultOpacity, setResultOpacity] = useState(0.4);

    //carregamento na pagina
    const [loading, setLoading] = useState(true);


    //Funcao criada faz a consulta do 3 filtros primeiro ai ele exibi 
    const getAdsList = async () => {
        //Loading carregamento das iamgens 
        setLoading(true);

        //Resultados das proxi imagens 1,2,3,4
        let offset = (currentPage-1) * 2;

        const json = await api.getAds({
            sort:'desc',
            limit:9,
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads);
        setResultOpacity(1);
        setAdsTotal(json.total);
        setLoading(false);
    }

    //MONITORADO GETADSLIST
    useEffect(() => {
        setResultOpacity(0.3);
        getAdsList();
    }, [currentPage]);

    //MONITORAR QUANTIDADE DE PAGINAS
    useEffect(() => {
         if(adList.length > 0){
            setPageCount(Math.ceil(adsTotal / adList.length ));
        } else{
            setPageCount(0);
        }  
    }, [adsTotal]);

    //MONITORA CAT/Q/STATE
    useEffect(() => {
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

        //caso exista uma busca ele vai executar depois de dois segundo 
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 2000);
        //Opacidade na Imagem 
        setResultOpacity(0.3);

        //Zerar a pagina assim q selecionado
        setCurrentPage(1);
    }, [q, cat, state]);


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

    //contador de paginacao
    let pagination = [];
    for(let i=1;i<=pageCount;i++){
        pagination.push(i);
    }

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
                   <h2>Resultados</h2>

                    {/* CARREGAMENTO DA PAGINA */}
                    {loading && adList.length === 0 &&             
                        <div className="listWarning"> Carregando.. </div> 
                    }

                    {!loading && adList.length === 0 &&
                        <div className="listWarning"> Não encontramos resultados. </div> 
                    }
                    {/*LISTA */}
                   <div className="list" style={{opacity:resultOpacity}}>
                    {adList.map((i,k)=>
                        <AdItem  key={k} data={i} />
                    )}  
                   </div>

                    {/*PAGINACAO*/}
                    <div className="pagination">
                            {pagination.map((i,k)=>
                                <div 
                                onClick={() => setCurrentPage(i)}
                                className={ i===currentPage?'pagItem active':'pagItem'}
                                > {i} </div>
                            )}
                    </div>   

                </div>
             </PageArea>
        </PageContainer>
       
    );
}

export default Page;

