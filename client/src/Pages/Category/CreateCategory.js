import React from "react";
import FormErrors from "../../Components/Form/FormErrors/FormErrors";
import { useState } from "react";
import Button from "../../Components/Button/Button";
import HttpClient from "../Services/HttpClient";
import { useNavigate } from "react-router-dom";

export default function () {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const navigate = useNavigate(); // Get the navigate function

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];
        if (!name) setErrors(["Nimi on pakollinen"]);

        const data = {
            name,
        };

        try {
            const response = await HttpClient().post("/api/category/create", data);
            navigate(`/category/${response.data._id}`);
        } catch (error) {
            // Handle error, e.g., setErrors(["Failed to create category"]);
            console.error("Error creating category:", error);
        }
    };

    return (
        <div className="page">
            <h1 className="page__title">Luo Kategoria</h1>
            <form className="form" onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors} />}
                <div className="form__group">
                    <label className="form__label">Nimi</label>
                    <input
                        className="form__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                    />
                </div>
                <Button type="submit" label="Luo" />
            </form>
        </div>
    );
}
