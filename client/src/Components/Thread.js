// Thread.js
import React from 'react';

function Thread({ thread }) {
    if (!thread || !thread.author) {
        return <div>Loading...</div>; // Or some other placeholder content
    }
    return (
        <div className="thread">
            <h2>{thread.title}</h2>
            <p>{thread.content}</p>
            <p>Started by: {thread.author.name}</p>
        </div>
    );
}

export default Thread;