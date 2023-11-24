import React, { useEffect, useState } from "react";
import HttpClient from "./Services/HttpClient";
import Button from "../Components/Button/Button";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
            const response = await HttpClient().get("/api/category");
            setCategories(response.data);
        };
            

    return (
        <div className="page">
            <h1 className="page__title">Turttiweb</h1>
            <Button
                className="mb-1"
                onClick={() => navigate("/category/create")}
                label="Luo kategoria"
            />
    <div className="list">
            {categories.map((category, index) => (
    <div className="list__item" key={index} >
        <Link to={`/category/${category._id}`} className="list__link">
            {category.name}
        </Link>
    </div>
))}


        </div>
        </div>);
}