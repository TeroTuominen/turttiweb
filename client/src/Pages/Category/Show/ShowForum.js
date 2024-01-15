import React, { useContext, useEffect, useState } from 'react';
import HttpClient from '../../Services/HttpClient';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../../../Components/Button/Button';
import AppContext from '../../../Contexts/AppContext';

export default function ShowForum() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const { id } = useParams();
    const [forum, setForum] = useState(null);
    const [threads, setThreads] = useState(null);

    useEffect(() => {
        setForum(null);
        setThreads([]);
        getForum();
    }, [id]);

    const getForum = async () => {
        const { data } = await HttpClient().get('/api/forum/' + id);
        setForum(data);
        getThreads();
    };

    const getThreads = async () => {
        const { data } = await HttpClient().get('/api/thread?forumId=' + id);
        setThreads(data);
    };

    return (
        <div className="page">
            {forum && <h1 className="page__title">{forum.name}</h1>}
            
            {user && <Button className="mb-1" onClick={() => navigate(`/forum/${id}/create-thread`)} label="Create Thread" />}
            
            <div className="list">
                {threads !== null && threads.map((thread, index) => (
                    <div className="list__item" key={thread._id}>
                        <Link to={`/thread/${thread._id}`} className="list__link">{thread.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}