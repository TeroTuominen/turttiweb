import React, { useState } from "react";
import FormErrors from "../../../Components/Form/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import HttpClient from "../../Services/HttpClient";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateThread() {
    const { forumId } = useParams();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        if (!title) setErrors(["Title is required"]);
        if (!content) setErrors([...errors, "Content is required"]);

        const data = {
            title,
            content,
            forumId,
        };

        try {
            const response = await HttpClient().post("/api/thread/create", data);
            navigate(`/thread/${response.data._id}`);
        } catch (error) {
            console.error("Error creating thread:", error);
        }
    };

    return (
        <div className="page">
            <h1 className="page__title">Create Thread</h1>
            <form className="form" onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors} />}
                <div className="form__group mb-1">
                    <label className="form__label">Title</label>
                    <input
                        className="form__input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                    />
                </div>
                <div className="form__group mb-1">
                    <label className="form__label">Content</label>
                    <textarea
                        className="form__input"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <Button type="submit" label="Create" />
            </form>
        </div>
    );
}