import React from 'react';

function Reply({ reply }) {
    console.log('reply:', reply);
    console.log('reply.author:', reply.author);

    if (!reply || !reply.author) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
            <p style={{ margin: 0 }}>{reply.content}</p>
            <p style={{ margin: 0, fontSize: '0.8em', color: '#888' }}>Posted by: {reply.author.name}</p>
        </div>
    );
}

export default Reply;