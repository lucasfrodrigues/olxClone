import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PageArea, OthersArea, ModalBackground, ModalArea } from './styled';
import useApi from '../../helpers/OlxAPI';
import MakedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import AdItemMyAccount from '../../components/partials/AdItemMyAccount';


const Page = () => {
    const api = useApi();
    const { id } = useParams();
    const fileField = useRef();
    const history = useHistory();


    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');


    const [adInfo, setAdInfo] = useState({});

    const [categories, setCategories] = useState([]);

    const [idProd, setIdProd] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    const [images, setImages] = useState([]);
 
    const [modalVisible, setModalVisible] = useState(false);

    const [classDelete, setClassDelete] = useState('');

    useEffect(()=>{
        const getCategories = async () =>{
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);


    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(()=>{
        const getUser = async ()=>{
            const sUser = await api.getUser();
            
            setAdInfo(sUser);
            setName(sUser.name);
            setStateLoc(sUser.state);
            setEmail(sUser.email);
            
        }
        getUser();
    }, []);

    useEffect(()=>{
        const getAd = async (id) =>{

            const prod = await api.getAd(id);
            setTitle(prod.title);
            setCategory((idProd)?prod.category._id:'');
            setPrice(prod.price);
            setPriceNegotiable(prod.priceNegotiable);
            setDesc(prod.description);
            setImages(prod.images);

            console.log(prod);
        }
        
        getAd(idProd);
    }, [modalVisible])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
    
        const sUser = await api.getUser();

        if(password !== confirmPassword) {
            setError('Senhas não batem');
            setDisabled(false);
            return;
        }
         
        const json = await api.updateUser(name, (email === sUser.email)?'':email , (password === sUser.password)?'':password, stateLoc);

        if(json.error) {
            setError(json.error);
        } else {
            //doLogin(json.token);
            window.location.href = '/my-account';
        }

        setDisabled(false);
    }

    const handleItemSubmit = async (e)=>{
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if(!title.trim()){
            errors.push('Sem título');
        }

        if(!category){
            errors.push('Sem Categoria');
        }

        if(error.length === 0){
            let preco=0;
            if(isNaN(price)){
                preco =  price.replace(/\D+/g, "");
            }else{
                preco = price;
            }
            
            console.log(images);

            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', preco);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            for(let i=0; i < categories.length; i++){
                console.log(category +' '+categories[i]._id )
                if(category === categories[i]._id){
                    fData.append('cat', categories[i].slug);
                }
            }

            if(fileField.current.files.length > 0){
                for(let i=0; i<fileField.current.files.length; i++){
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.updateAd(idProd, fData);

            if(!json.error){
                fecharModal();
                setDisabled(false);
                return;
            } else {
                setError(json.error);
            }

        } else {
            setError(errors.join("\n"));
        }

        setDisabled(false);
    }


    const fecharModal = () =>{
        setModalVisible(false);
    }

    const priceMask = createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    });
    
    return (
        <>        
            <PageContainer>
                <PageTitle>Minha Conta</PageTitle>
                <PageArea>
                    {error &&
                        <ErrorMessage>{error}</ErrorMessage>
                    }

                    <form onSubmit={handleSubmit}>
                        <label className="area">
                            <div className="area--title">Nome Completo</div>
                            <div className="area--input">
                                <input
                                    type="text"
                                    disabled={disabled}
                                    value={name}
                                    onChange={e=>setName(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Estado</div>
                            <div className="area--input">
                                <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required>
                                    <option></option>
                                    {
                                        stateList.map((i,k)=>
                                        <option key={k} value={i.name}>{i.name}</option>
                                    )}
                                </select>
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">E-mail</div>
                            <div className="area--input">
                                <input
                                    type="email"
                                    disabled={disabled}
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Nova Senha</div>
                            <div className="area--input">
                                <input
                                    type="password"
                                    disabled={disabled}
                                    value={password}
                                    onChange={e=>setPassword(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Confirmar nova senha</div>
                            <div className="area--input">
                                <input
                                    type="password"
                                    disabled={disabled}
                                    value={confirmPassword}
                                    onChange={e=>setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button disabled={disabled}>Salvar aterações</button>
                            </div>
                        </label>
                    </form>
                </PageArea>
                
                <OthersArea>
                    {adInfo.ads &&
                            <>
                                <h2> Outras ofertas do vendedor</h2>
                                <div className="list">
                                    
                                    {adInfo.ads.map((i,k)=>
                                        <AdItemMyAccount setVisible={setModalVisible} setId={setIdProd} key={k} data={i} /> 
                                    )}
                                </div>
                            </>
                        }
                </OthersArea>
            
            </PageContainer>

            {modalVisible &&
                <ModalBackground >
                    <ModalArea >
                        <form onSubmit={handleItemSubmit}>
                            <label className="area">
                                <div className="area--title">Título</div>
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
                                        value={category}
                                    >
                                        <option></option>
                                        {categories && categories.map((i,k)=>
                                            <option key={k} value={i._id}>{i.name}</option>
                                        )}
                                    </select>
                                </div>
                            </label>
                            <label className="area">
                                <div className="area--title">Preço</div>
                                <div className="area--input">
                                    <MakedInput 
                                        mask={priceMask}
                                        placeholder="R$ "
                                        disabled={disabled || priceNegotiable}
                                        value={price}
                                        onChange={e=>setPrice(e.target.value)}
                                    />
                                </div>
                            </label>
                            <label className="area">
                                <div className="area--title">Preço Negociável</div>
                                <div className="area--input">
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
                                    ></textarea>
                                </div>
                            </label>
                            <label className="area">
                                <div className="area--title">Deletar imagens do anuncio</div>
                                <div className="area--input images">  
                                    {images && images.map((i,k)=>
                                        <img key={k} src={i} alt="" />
                                    )}
                                </div>
                            </label>
                            
                            <label className="area">
                                <div className="area--title">Imagens (1 ou mais)</div>
                                <div className="area--input">
                                    <input
                                        type="file"
                                        disabled={disabled}
                                        multiple
                                        ref={fileField}
                                    />
                                </div>
                            </label>
                            <label className="area">
                            <button onClick={fecharModal} className="cancelar">Cancelar</button>   
                                    <button disabled={disabled}>Salvar</button>                        
                            </label>
        
                        </form>
          
                    </ModalArea>
                </ModalBackground>
            }
        
        </>
        
    );
}

export default Page;