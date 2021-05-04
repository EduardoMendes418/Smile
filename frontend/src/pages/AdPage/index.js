import React, { useState } from 'react';
import useApi from '../../helpers/Api';
import { PageArea, Fake }  from './styled';
import { useParams } from 'react-router-dom';

import { PageContainer } from '../../components/templatecomponents';
import ReactDOM from "react-dom";


const  Page = () => {
    
    const api = useApi();
    const { id } = useParams();

    const  [ loading, setLoading ] = useState(true);
    const  [adInfo , setAdInfo ] = useState([]);

    //Pagina Fake
    return (
        
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300}/>}
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20}/>}
                            </div>
                            <div className="adDescrition">
                                {loading && <Fake height={100}/>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rightSide">
                    <div className="box box--padding">
                        {loading && <Fake height={20}/>}
                    </div>
                    <div className="box box--padding">
                        {loading && <Fake height={20}/>}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    )
}

export default Page;
