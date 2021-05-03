import React, { useState } from 'react';
import useApi from '../../helpers/Api';
import { PageArea }  from './styled';
import { useParams } from 'react-router-dom';

import { PageContainer } from '../../components/templatecomponents';


const  Page = () => {
    
    const api = useApi();
    const { id } = useParams();

    const  [ locading, setLoading ] = useState(true);
    const  [adInfo , setAdInfo ] = useState([]);

    //Pagina Fake
    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            ...
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                               ...
                            </div>
                            <div className="adDescrition">
                                ...
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="box"> ... </div>
                    <div className="box"> ... </div>
                </div>
            </PageArea>
        </PageContainer>
    )
}

export default Page;
