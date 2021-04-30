import React, { useState , useEffect } from 'react';
import { PageArea, SeachArea } from './styled';
import { PageContainer } from '../../components/templatecomponents';

import { Link } from 'react-router-dom';

//buscando api no serve hook
import useApi from '../../helpers/Api';

const  Page =  () => {
    //chamando a api
    const api = useApi();

    const [stateList, setStateList] = useState([]);
    const [categories,setCategories] = useState([]);
    
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
                    <h1>..Teste</h1>
                </PageArea>
            </PageContainer>
           </> 
    );
}

export default Page;

