import React, { useContext, useEffect } from "react";
import Modal from "../../Components/Modal/Modal";
import { useState } from "react";
import FormErrors from "../../Components/Form/FormErrors/FormErrors";
import Button from "../../Components/Button/Button";
import axios from "axios";
import AppContext from "../../Contexts/AppContext";

// ... (other imports)

export default function ({ isOpen, onClose }) {
    const { user, setUser } = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [errors, setErrors] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);

        if (!name) return setErrors(["Nimi on pakollinen"]);
        else if (name === user.name) return setErrors(["Nimi on sama kuin aiemmin"]);

        const data = {
            name,
            userId: user._id,
        };

        try {
            await axios.post("/api/user/change-name", data);

            setUser({
                ...user,
                name,
            });
            onClose();
        } catch (error) {
            // Handle error, maybe setErrors or display a message to the user
            console.error("Error changing name:", error);
            console.log("Error response:", error.response); // Log the response for more details
        }
    };

    const closeModal = () => {
        onClose();
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={"Vaihda Nimi"}>
            <form className="form" onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors} />}
                <label className="form__label" htmlFor="name">
                    Nimi
                </label>
                <input
                    className="form__input"
                    type="text"
                    value={name}
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <Button type="submit">Vaihda</Button>
            </form>
        </Modal>
    );
}
