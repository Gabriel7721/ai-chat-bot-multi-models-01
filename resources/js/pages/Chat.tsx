import ChatInputBar from './Chat-Components/ChatInputBar';
import ChatMessages from './Chat-Components/ChatMessages';
import ChatSidebar from './Chat-Components/ChatSidebar';
import { useChat } from './Chat-Components/hooks/useChat';

export default function Chat() {
    const { 
        model, 
        setModel, 
        temperature, 
        setTemperature, 
        input, setInput, 
        history, 
        send, 
        clearAll, 
        boxRef 
    } = useChat();

    return (
        <div className="container">
            <ChatSidebar 
                model={model} 
                setModel={setModel} 
                temperature={temperature} 
                setTemperature={setTemperature} 
                clearAll={clearAll} 
            />
            <main className="main">
                <div className="card chat">
                    <ChatMessages history={history} boxRef={boxRef} />
                    <ChatInputBar input={input} setInput={setInput} send={send} />
                </div>
            </main>
        </div>
    );
}
