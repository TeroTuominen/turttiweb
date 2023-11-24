import React, { useContext, useEffect } from 'react';
import HttpClient from '../../Services/HttpClient';
import {useParams} from 'react-router-dom';
import { Link, navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../../Components/Button/Button';
import AppContext from '../../../Contexts/AppContext';

export default function ShowCategory() {
    const navigate = useNavigate();
    const {user} = useContext(AppContext);
    const {id} = useParams();
    const [category, setCategory] = useState(null);
    const [fora, setFora] = useState(null);

    useEffect(() => {
        setCategory(null);
        setFora([]);
        getCategory();
    }, [id]);

    const getCategory = async () => {
        const {data} = await HttpClient().get('/api/category/' + id);
        setCategory(data);
        getFora();
    };

    const getFora = async () => {
        const {data} = await HttpClient().get('/api/forum?categoryId=' + id);
        setFora(data);
    };


    return (
        <div className="page">
            {category && <h1 className="page__title">{category.name}</h1>}
            
            {user && <Button className="mb-1" onClick={() => navigate(`/forum/create/${id}`)} label="Luo foorumi" />}
            
            <div className="list">
    {fora !== null && fora.map((forum, index) => (
        <div className="list__item" key={forum._id}>
            <Link to={`/forum/${forum._id}`} className="list__link">{forum.name}</Link>
        </div>
    ))}
</div>
        </div>
    );
}