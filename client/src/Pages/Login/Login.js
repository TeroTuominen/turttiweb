import React, { useState } from 'react';
import FormErrors from '../../Components/Form/FormErrors/FormErrors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';
import { useContext } from 'react';
import HttpClient from '../Services/HttpClient';

export default function () {
    const history = useNavigate();
    const {setUser} = useContext(AppContext); // Tämä on se user, joka on kirjautunut sisään
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Tämä on se salasana, jolla käyttäjä yrittää kirjautua sisään
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!email) _errors.push('Sähköposti on pakollinen');
        if (!password) _errors.push('Salasana on pakollinen');
        if (_errors.length) return setErrors(_errors);

      

try {
    const data = {
        email,
        password
    };

    const response = await HttpClient().post('/api/user/login', data);
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
    window.location = '/' // Tämä on se polku, johon käyttäjä ohjataan kun hän on kirjautunut sisään
}
catch (e) {
    console.log(e);

    if (e.response && e.response.data) {
        _errors.push(e.response.data.message);
    } else {
        _errors.push('An error occurred. Please try again later.');
    }

    setErrors(_errors);
}
       
        
        };

    return (
        <div className='page'>
            <h1 className='page__title'>Sisäänkirjautuminen</h1>

            <form onSubmit={onSubmit} className='form'>
    {!!errors.length && <FormErrors errors={errors} />}
    <div className='form__group'>
        <label className='form__label'>Sähköposti</label>
        <input
            type="email"
            className='form__input'
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
    </div>
    <div className='form__group'>
        <label className='form__label'>Salasana</label>
        <input
            type="password"
            className='form__input'
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
    </div>
    <button className='form__button' type='submit'>Kirjaudu</button>
</form>

        </div>
    );
}