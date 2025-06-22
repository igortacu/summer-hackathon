// src/components/Student/Resources.tsx
import React, { useState } from 'react';
import { Book, Search, Loader2, XCircle } from 'lucide-react';

interface Resource {
  title: string;
  link: string;
  description: string;
}

const Resources: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = async () => {
    setError(null);
    setLoading(true);
    setResources([]); // Clear previous resources

    try {
      console.log('Attempting to fetch resources for topic:', topic);
      const response = await fetch('http://localhost:5500/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: topic }),
      });
      console.log('Response status:', response.status);
      console.log('Response OK:', response.ok);

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json(); // Try to parse error JSON
        } catch (e) {
          console.error("Failed to parse error response as JSON:", e);
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        throw new Error((errorData as any).message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data from backend:', data);

      if (data.resources && Array.isArray(data.resources)) {
        setResources(data.resources);
      } else {
        setError('Unexpected response format from API. Expected { "resources": [...] }');
        console.error('Unexpected response format:', data);
      }
    } catch (e: any) {
      console.error("Failed to fetch resources (frontend error):", e);
      setError(`Failed to fetch resources: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-6">
        {/* Changed icon color */}
        <Book className="h-6 w-6 text-amber-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Literature Recommendations</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Enter a topic below to get recommendations for literature to study.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 shadow-sm text-gray-700"
          placeholder="e.g., Quantum Computing, Machine Learning, Data Structures"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchResources();
            }
          }}
        />
        <button
          onClick={fetchResources}
          disabled={loading || !topic.trim()}
          // Changed button colors to amber
          className="flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-md shadow-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <Search className="h-5 w-5 mr-2" />
          )}
          {loading ? 'Fetching...' : 'Get Resources'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center mb-6" role="alert">
          <XCircle className="h-5 w-5 mr-2" />
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {resources.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommendations:</h3>
          <ul className="space-y-4">
            {resources.map((resource, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-lg font-medium text-amber-700 mb-1"> {/* Changed link title color */}
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {resource.title}
                  </a>
                </h4>
                <p className="text-gray-600 text-sm">{resource.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && resources.length === 0 && topic.trim() && (
        <p className="text-center text-gray-500 mt-8">No resources found for "{topic}". Try a different topic.</p>
      )}
       {!loading && !error && resources.length === 0 && !topic.trim() && (
        <p className="text-center text-gray-500 mt-8">Enter a topic to find recommendations.</p>
      )}
    </div>
  );
};

export default Resources;
