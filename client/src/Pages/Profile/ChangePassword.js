import React, { useContext, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";
import { useState } from "react";
import FormErrors from "../../Components/Form/FormErrors/FormErrors";
import Button from "../../Components/Button/Button";
import axios from "axios";
import AppContext from "../../Contexts/AppContext";

export default function ({ isOpen, onClose }) {
    const { user, setUser } = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!currentPassword) _errors.push("Nykyinen salasana on pakollinen");
        if (!password) _errors.push("Uusi salasana on pakollinen");
        if (!passwordAgain) _errors.push("Uusi salasana uudelleen on pakollinen");
        if (password !== passwordAgain) _errors.push("Uudet salasanat eivät täsmää");

        if (_errors.length) return setErrors(_errors);

            const data = { //tämä on se data, joka lähetetään backendiin
                userId: user._id,
                password,
                currentPassword,
            };
//Axios on JavaScript-kirjasto, joka mahdollistaa HTTP-pyyntöjen tekemisen selain- ja Node.js-sovelluksissa.
            try {
                await axios.post("/api/user/change-password", data); //tämä lähettää tiedot backendiin
                onClose();
                setCurrentPassword("");
                setPassword("");
                setPasswordAgain("");
            } catch (e) {
                setErrors([e.response.data.message]);
            }
        };

    const closeModal = () => {
        onClose();
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    return ( //tämä on se mitä näytetään
        <Modal isOpen={isModalOpen} onClose={closeModal} title={"Vaihda salasana"}>
            <form className="form" onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors} />}
                <div className="form__group">
                    <label className="form__label">Nykyinen Salasana</label>
                    <input
                        className="form__input"
                        type="password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}/>
                </div>
                <div className="form__group">
                    <label className="form__label">Uusi Salasana</label>
                    <input
                        className="form__input"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form__group">
                    <label className="form__label">Uusi Salasana uudelleen</label>
                    <input
                        className="form__input"
                        type="password"
                        value={passwordAgain}
                        onChange={e => setPasswordAgain(e.target.value)}/>
                </div>

                <Button type="submit">Vaihda</Button>
            </form>
        </Modal>
    );
}
