import React, { useState , useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/templatecomponents';

//buscando api no serve hook
import useApi from '../../helpers/Api';


const  Page =  () => {
    //chamando a api
    const api = useApi();
    const fileField = useRef();
    const history = useHistory();

    const [categories, setCategories] = useState([]);

    //criando chamadas usestate LOGIN
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable ] = useState(false);
    const [desc , setDesc] = useState('');

    //btn desabilitado
    const [disabled,setDisabled] = useState(false);
    const [error, setError] = useState('');

    //busca categorias
    useEffect(() => {
        const getCategories = async ()=> {
            const cats = await api.getCategories(); 
            setCategories(cats);
        }    
        getCategories();
    }, []);


    //TRATAR FORMULARIO
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        let errors = [];
        //CONDICAO PARA ENVIO 
        if(!title.trim()) {
            errors.push('Sem titulo');
        }
        if(!category){
            errors.push('Sem categoria');
        }

        //Deu certo Formulario se nao  va para join
        if(errors.length === 0) {
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            fData.append('cat', category);

            //condicao para imagens
            if(fileField.current.files.length > 0){
                for(let i=0;i<fileField.current.files.length;i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }

            //Requisicao
            const json = await api.addAd(fData);
            if(!json.error) {
                history.push(`/ad/${json.id}`);
                return;
            }else {
                setError(json.error);
            }
        }else{
            setError(errors.join("\n"));
        }
        setDisabled(false)
    }

    //PADRAO REAIS MASK
    const priceMask = createNumberMask({
        prefix:'R$',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    });

    return (
        <PageContainer>
            <PageTitle> Postar um Anúncio </PageTitle>
            <PageArea>
                {/* MONSTRANO ERROR */}
                 {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                 }    
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Titulo</div>
                        <div className="area--input">
                            <input 
                            type="text"
                            disabled={disabled}
                            value={title}
                            onChange={e=>setTitle(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                           <select
                               disabled={disabled}
                               onChange={e=>setCategory(e.target.value)}
                               required
                            >
                                <option></option>
                                {categories && categories.map(i=>
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                )}
                           </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                           <MaskedInput
                            mask={priceMask}
                             placeholder="R$"
                            disabled={ disabled || priceNegotiable }  
                            onChange={e=>setPrice(e.target.value)}      
                           />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="">
                            <input 
                            type="checkbox"
                            disabled={disabled}
                            checked={priceNegotiable}
                            onChange={e=>setPriceNegotiable(!priceNegotiable)}    
                          
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                           <textarea
                            disabled={disabled}
                            value={desc}
                            onChange={e=>setDesc(e.target.value)}
                            required
                           ></textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Imagens</div>
                        <div className="area--input">
                          <input 
                            type="file"
                            disabled={disabled}
                            ref={fileField}
                            multiple
                            required
                          />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button  disabled={disabled}> Adicionar Anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>

    );
}

export default Page;

