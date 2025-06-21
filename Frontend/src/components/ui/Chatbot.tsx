// src/components/ui/Chatbot.tsx
import React, {
  FC,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import codyVideoSrc from '../../data/cody_face-idle.mp4';

type Message = {
  from: 'bot' | 'user';
  text: string;
};

const PRESET_QUESTIONS: string[] = [
  'How do I start an experiment?',
  'What are your pricing plans?',
  'Can teachers track progress?',
];

const Chatbot: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hi! I’m Cody — how can I help you today?' },
  ]);
  const [input, setInput] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text: string): void => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: "Sorry, I'm a demo chatbot — but you could hook this up to your API!",
        },
      ]);
    }, 500);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') send(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="flex flex-col w-80 h-96 bg-white rounded-xl shadow-lg overflow-hidden">
          {/* header */}
          <div className="flex items-center px-3 py-2 bg-virtlab-blue text-white">
            
            <span className="font-medium">Cody</span>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-2xl leading-none hover:opacity-80"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* message area */}
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-1 rounded-lg ${
                    m.from === 'user'
                      ? 'bg-virtlab-blue text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          {/* preset buttons */}
          <div className="px-2 space-x-1 border-t">
            {PRESET_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => send(q)}
                className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                {q}
              </button>
            ))}
          </div>

          {/* input */}
          <div className="flex items-center px-2 py-2 border-t">
            <input
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              className="flex-1 border rounded px-2 py-1 mr-2 text-sm"
            />
            <button
              onClick={() => send(input)}
              className="bg-virtlab-blue text-white px-3 py-1 rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-32 h-32 overflow-hidden"
          aria-label="Open chat"
        >
          <video
            src={codyVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
          />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
