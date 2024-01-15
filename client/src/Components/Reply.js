import React from 'react';

function Reply({ reply }) {
    return (
        <div>
            <p>{reply.content}</p>
        </div>
    );
}

export default Reply;