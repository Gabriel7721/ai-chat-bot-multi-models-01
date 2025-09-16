import { useEffect, useRef, useState } from 'react';

import { DEFAULT_MODEL } from '@/Models';
import { parseThink } from '../utils/parseThink';

type Msg = { role: 'user' | 'assistant' | 'system'; content: string };

const sys = `You are a helpful AI assistant. Be concise.`;

export function useChat() {
    const [model, setModel] = useState(localStorage.getItem('model') || DEFAULT_MODEL);
    const [temperature, setTemperature] = useState(parseFloat(localStorage.getItem('temp') || '0.7'));
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Msg[]>(() => JSON.parse(localStorage.getItem('hist') || '[]'));
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        localStorage.setItem('model', model);
        localStorage.setItem('temp', String(temperature));
        localStorage.setItem('hist', JSON.stringify(history));
    }, [model, temperature, history]);

    useEffect(() => {
        boxRef.current?.scrollTo({ top: boxRef.current?.scrollHeight, behavior: 'smooth' });
    }, [history]);

    const send = async () => {
        if (!input.trim()) return;
        const msgs: Msg[] = [...history, { role: 'system', content: sys }, { role: 'user', content: input.trim() }];
        setHistory((h) => [...h, { role: 'user', content: input.trim() }]);
        setInput('');
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model, temperature, messages: msgs }),
        });
        const json = await res.json();
        const { think, clean } = parseThink(json.content || '');
        const final = clean || json.content || '';
        const withThink = think ? `${final}\n\n<think>\n${think}\n</think>` : final;
        setHistory((h) => [...h, { role: 'assistant', content: withThink }]);
    };

    const clearAll = () => {
        setHistory([]);
        localStorage.removeItem('hist');
    };

    return { model, setModel, temperature, setTemperature, input, setInput, history, send, clearAll, boxRef };
}
