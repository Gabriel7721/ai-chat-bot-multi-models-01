import { parseThink } from './utils/parseThink';

export default function ChatMessages({ history, boxRef }) {
    return (
        <div className="messages" ref={boxRef}>
            {history.length === 0 && (
                <div className="small" style={{ opacity: 0.8, padding: '1rem' }}>
                    Start chatting — pick a model on the left, type below.
                </div>
            )}
            {history.map((m, i) => {
                const isA = m.role === 'assistant';
                const { think, clean } = parseThink(m.content);
                return (
                    <div key={i} className={`msg ${isA ? 'assistant' : 'user'}`}>
                        <div style={{ whiteSpace: 'pre-wrap' }}>{clean}</div>
                        {think && <div className="think">{think}</div>}
                    </div>
                );
            })}
        </div>
    );
}
