// Thread.js
import React from 'react';

function Thread({ thread }) {
    return (
        <div className="thread">
            <h2>{thread.title}</h2>
            <p>{thread.content}</p>
            <p>Started by: {thread.authorName}</p>
        </div>
    );
}

export default Thread;