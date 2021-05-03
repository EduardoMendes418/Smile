import React, { useState } from 'react';
import useApi from '../../helpers/Api';
import { PageArea }  from './styled';
import { useParams } from 'react-router-dom';

import { PageContainer } from '../../components/templatecomponents';


const  Page = () => {

    const api = useApi();
    const { id } = useParams();

    return (
        <PageContainer>
            <PageArea>
                ...
            </PageArea>
        </PageContainer>
    )
}

export default Page;
