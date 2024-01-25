import React, { useEffect, useState } from 'react';
import HttpClient from '../../Services/HttpClient';
import { useParams } from 'react-router-dom';
import Reply from '../../../Components/Reply';
import Thread from '../../../Components/Thread'; // Update this path if needed

export default function ShowThread() {
    const { id } = useParams();
    const [thread, setThread] = useState(null);
    const [replies, setReplies] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        setThread(null);
        setReplies([]);
        getThread();
    }, [id]);

    const getThread = async () => {
        const { data } = await HttpClient().get('/api/thread/' + id);
        console.log(data);
        setThread(data);
        getReplies();
    };

    const getReplies = async () => {
        const { data } = await HttpClient().get('/api/reply?threadId=' + id);
        setReplies(data);
    };

    const createReply = async (event) => {
        event.preventDefault();
        const { data } = await HttpClient().post('/api/reply', { content: replyContent, threadId: id });
        setReplies([...replies, data]);
        setReplyContent('');
    };

    return (
        <div className="page">
            {thread && <Thread thread={thread} />
            }

            <form onSubmit={createReply}>
                <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)} required />
                <button type="submit">Post Reply</button>
            </form>

            <div className="list">
                {Array.isArray(replies) && replies.map(reply => (
                    <Reply key={reply._id} reply={reply} />
                ))}
            </div>
        </div>
    );
}