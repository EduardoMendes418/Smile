import React, { useState , useEffect } from 'react';
import { PageArea, SeachArea } from './styled';
import { PageContainer } from '../../components/templatecomponents';
import AdItem from '../../components/partials/AdItem';

import { Link } from 'react-router-dom';

//buscando api no serve hook
import useApi from '../../helpers/Api';

const  Page =  () => {
    //chamando a api
    const api = useApi();

    const [stateList, setStateList] = useState([]);
    const [categories,setCategories] = useState([]);
    const[adList, setAdList] = useState([]);
    
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
           <>
            <SeachArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="O que voce procura ?" />
                            <select name="state">
                                {stateList.map((i,k)=>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((i,k)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SeachArea>

            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i,k)=>
                            <AdItem key={k} data={i}/>
                        )}
                    </div>
                    <Link to="/ads" className="seeAllLink">Ver todos</Link>
                    <hr/>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </PageArea>
            </PageContainer>
           </> 
    );
}

export default Page;

