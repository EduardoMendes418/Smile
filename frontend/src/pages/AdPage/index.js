import React, { useState, useEffect } from 'react';
import useApi from '../../helpers/Api';
import { PageArea, Fake }  from './styled';
import { useParams } from 'react-router-dom';
//Slide
import { Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { PageContainer } from '../../components/templatecomponents';
import ReactDOM from "react-dom";


const  Page = () => {
    
    const api = useApi();
    const { id } = useParams();

    const  [ loading, setLoading ] = useState(true);
    const  [adInfo , setAdInfo ] = useState({});

    useEffect(() => {
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);

            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    }, []);

    // FORMATAÇÃO DE DATA
    const formatDate = (date) => {
        let cDate = new Date(date);

        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho','agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return ` ${cDay} de ${months[cMonth]} de ${cYear}`;
    }

    //Pagina Fake
    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                              {/*Pagina antes de carregar */}
                            {loading && <Fake height={300} />}

                            {/*SLIDE */}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map(( img, k) => 
                                        <div key={k} className="each-slide">
                                            <img src={img} alt="" />
                                        </div>
                                    )} 
                                </Slide>
                            }
                        </div>

                        <div className="adInfo">
                            <div className="adName">
                                  {/*Pagina antes de carregar */}
                                {loading && <Fake height={20} />}

                                  {/*Pagina titulos/ descricao */}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDescrition">
                                {/*Pagina antes de carregar */}
                                {loading && <Fake height={100} />}
                                {adInfo.description}
                                <hr/>
                                {adInfo.views &&
                                    <small>Visualizações:{adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>


                <div className="rightSide">
                    <div className="box box--padding">
                        {/*Pagina antes de carregar */}
                        {loading && <Fake height={20}/>}

                        {/*PRECO DA DIRETA*/}
                        {adInfo.priceNegotiable &&
                            "Preço Negocivel"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">Preço:<span>R$ {adInfo.price}</span> </div>
                        }
                    </div>

                    {/*Pagina antes de carregar */}
                    {loading && <Fake height={50} />} 

                    {/*INFORMAÇÕES DO VENDEDOR*/}
                    { adInfo.userInfo &&
                        <>
                            <a href={`mailto: ${adInfo.userInfo.email}`} target="_black" className="contactSellerLink"> Fale com o vendedor </a>
                            {/*NOME DO VENDEDOR */}
                            <div className=" createdBy box box--padding">
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail:{adInfo.userInfo.email}</small>
                                <small>Estado:{adInfo.stateName}</small>
                            </div>
                        </>    
                    }
                  
                </div>
            </PageArea>
        </PageContainer>
    )
}

export default Page;
