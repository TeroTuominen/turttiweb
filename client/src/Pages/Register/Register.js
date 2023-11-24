import React, { useState } from 'react';
import FormErrors from '../../Components/Form/FormErrors/FormErrors';
import validator from 'validator';
import Button from '../../Components/Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HttpClient from '../Services/HttpClient';

export default function () {
    const history = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Tämä on se salasana, jota käyttäjä yrittää kirjautua sisään
    const [passwordAgain, setPasswordAgain] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!name) _errors.push('Nimi on pakollinen');
        if (!validator.isEmail(email)) _errors.push('Sähköposti on pakollinen');
        if (!password) _errors.push('Salasana on pakollinen');
        if (!passwordAgain) _errors.push('Salasana on pakollinen');
        if (password !== passwordAgain) _errors.push('Salasanat eivät täsmää');

        if (_errors.length) return setErrors(_errors);

        const data = {
            name,
            email,
            password
        };

try {
    await HttpClient().post('/api/user/register', data);
    history('/auth/login');
}
catch (e) {
    console.log(e);
    _errors.push(e.response.data.message);
    setErrors(_errors);
}
       
        
        };

    return (
        <div className='page'>
            <h1 className='page__title'>Rekisteröinti</h1>

            <form onSubmit={onSubmit} className='form'>
                {!!errors.length && <FormErrors errors={errors} />}
                <div className='form__group'>
                    <label className='form__label'>Nimi</label>
                    <input type="text" 
                        className='form__input'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='form__group'>
                        <label className='form__label'>Sähköposti</label>
                        <input type="email" 
                        className='form__input'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='form__group'>
                        <label className='form__label'>Salasana</label>
                        <input type="password" 
                        className='form__input'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='form__group'>
                        <label className='form__label'>Salasana uudelleen</label>
                        <input type="password" 
                        className='form__input'
                        value={passwordAgain}
                        onChange={e => setPasswordAgain(e.target.value)} />
                    </div>
                    <button className='form__button' type='submit'>Rekisteröidy</button>

            </form>
        </div>
    );
}