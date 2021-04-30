import React, { useState } from 'react';
import { PageArea, SeachArea } from './styled';
import { PageContainer } from '../../components/templatecomponents';

//buscando api no serve hook
import useApi from '../../helpers/Api';

const  Page =  () => {
    //chamando a api
    const api = useApi();

    return (
        <PageContainer>
            <PageArea>
                <h1>Teste</h1>
            </PageArea>
        </PageContainer>

    );
}

export default Page;

