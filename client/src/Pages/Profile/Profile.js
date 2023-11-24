import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import ChangeName from "./ChangeName";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

import "./Profile.css";

export default function () {
    const [isChangeNameOpen, setChangeNameOpen] = useState(false);
    const [isChangeEmailOpen, setChangeEmailOpen] = useState(false);
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);

    return (
        <div className="page">
            <h1 className="page__title">Profiili</h1>
            <div className="profile__buttons">
                <Button type="button" onClick={() => setChangeNameOpen(true)} label="Vaihda nimesi" />
                <Button type="button" onClick={() => setChangeEmailOpen(true)} label="Vaihda sähköpostisi" />
                <Button type="button" onClick={() => setChangePasswordOpen(true)} label="Vaihda salasanasi" />
            </div>

            {isChangeNameOpen && <ChangeName onClose={() => setChangeNameOpen(false)} />}
            {isChangeEmailOpen && <ChangeEmail onClose={() => setChangeEmailOpen(false)} />}
            {isChangePasswordOpen && <ChangePassword onClose={() => setChangePasswordOpen(false)} />}
        </div>
    );
}
