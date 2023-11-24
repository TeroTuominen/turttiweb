import React, { useContext, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";
import { useState } from "react";
import FormErrors from "../../Components/Form/FormErrors/FormErrors";
import Button from "../../Components/Button/Button";
import axios from "axios";
import AppContext from "../../Contexts/AppContext";
import validator from "validator";

export default function ({isOpen, onClose}) {
    const {user, setUser} = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
    
        if (!validator.isEmail(email)) return setErrors(["Sähköposti on pakollinen"]);
        else if (email === user.email) return setErrors(["Sähköposti on sama kuin aiemmin"]);

        const data = {
            email,
            userId: user._id
        };

        try {
            await axios.post("/api/user/change-email", data);

            setUser({
                ...user,
                email
            });
            onClose();
        } catch (e) {
            console.error("Error changing email:", e);
            if (e.response && e.response.data) {
                setErrors([e.response.data.message]);
            } else {
                setErrors(["An error occurred. Please try again later."]);
            }
        }
    }


    const closeModal = () => {
        onClose();
    }

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={"Vaihda sähköposti"}>
            <form className="form" onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors} />}
                <label className="form__label" htmlFor="email">Sähköposti</label>
                <input className="form__input" value={email} onChange={e => setEmail(e.target.value)} />
                {/* Move the Button component inside the form */}
                <Button type="submit">Vaihda</Button>
            </form>
        </Modal>
    );
    
}