import React, { useState, useRef, useEffect } from 'react';

// --- ICONS (unchanged) ---
const ChatIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /> </svg> );
const CloseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> </svg> );
const SendIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"> <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /> </svg> );

interface Message { id: number; text: string; sender: 'user' | 'ai'; }


const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

// --- MESSAGE TYPE DEFINITION ---
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

/**
 * AI Assistant chat component fetching responses from backend
 */

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! How can I help you today?", sender: 'ai' }
    ]);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        const text = inputValue.trim();
        if (!text) return;

        // Add user message
        const userMessage: Message = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5500/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();
            // Expecting { reply: string }
            const aiReplyText = data.reply || 'Ne pare rău, nu am un răspuns acum.';
            const aiMessage: Message = { id: Date.now() + 1, text: aiReplyText, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Fetch error:', error);
            const errorMessage: Message = {
                id: Date.now() + 2,
                text: 'Eroare la server. Încearcă din nou mai târziu.',
                sender: 'ai'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);

        }
    };

    if (!isOpen) {

        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 right-5 bg-amber-800 text-white p-4 rounded-full shadow-lg hover:bg-amber-900 transition-transform duration-300 ease-in-out z-50 flex items-center justify-center"
                aria-label="Open AI Assistant"
            >
                <ChatIcon />
            </button>
        );

    }

    return (
        <div className="fixed bottom-5 right-5 w-full max-w-sm h-[60vh] bg-white rounded-xl shadow-2xl z-50 flex flex-col animate-fade-in-up">
            <header className="flex items-center justify-between p-3 border-b bg-gray-50 rounded-t-xl">

                <h3 className="text-lg font-semibold text-gray-800">AI Assistant</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                    aria-label="Close chat"
                >
                    <CloseIcon />
                </button>
            </header>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-white space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-white ${
                            msg.sender === 'user'
                                ? 'bg-amber-700 rounded-br-lg'
                                : 'bg-gray-500 rounded-bl-lg'
                        }`}>
                            {msg.text}

                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-300 text-white animate-pulse">
                            Se încarcă...
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>


            {/* Input */}
            <footer className="p-3 border-t bg-gray-50 rounded-b-xl">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Scrie un mesaj..."
                        className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                        type="submit"
                        className="p-2 rounded-full text-amber-700 hover:text-amber-800 disabled:text-gray-300"
                        disabled={!inputValue.trim() || isLoading}
                        aria-label="Send message"
                    >
                        <SendIcon />
                    </button>

                </form>
            </footer>
        </div>
    );
};

export default AIAssistant;
