import React, { useState } from 'react';
import { GitBranch, GitCommit, GitPullRequest, FileText, Eye, MessageSquare, CheckCircle, Clock } from 'lucide-react';

export default function CodeReview() {
  const [selectedRepo, setSelectedRepo] = useState('studybuddy-app');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Mock data for repositories and commits
  const repositories = [
    { id: 'studybuddy-app', name: 'StudyBuddy Mobile App', group: 'StudyBuddy Team' },
    { id: 'ecotracker-web', name: 'EcoTracker Web Platform', group: 'EcoTracker Team' },
    { id: 'campus-navigator', name: 'Campus Navigator AR', group: 'Navigator Team' }
  ];

  const commits = [
    {
      id: '1',
      hash: 'a1b2c3d',
      message: 'Implement user authentication system',
      author: 'John Doe',
      date: '2024-12-14 10:30',
      branch: 'feature/auth',
      status: 'pending',
      filesChanged: 5,
      additions: 120,
      deletions: 15
    },
    {
      id: '2',
      hash: 'e4f5g6h',
      message: 'Add responsive navigation component',
      author: 'Jane Smith',
      date: '2024-12-14 09:15',
      branch: 'feature/navigation',
      status: 'approved',
      filesChanged: 3,
      additions: 85,
      deletions: 8
    },
    {
      id: '3',
      hash: 'i7j8k9l',
      message: 'Fix database connection issues',
      author: 'Mike Johnson',
      date: '2024-12-13 16:45',
      branch: 'bugfix/db-connection',
      status: 'changes-requested',
      filesChanged: 2,
      additions: 25,
      deletions: 30
    }
  ];

  const pullRequests = [
    {
      id: 1,
      title: 'Feature: User Authentication System',
      author: 'John Doe',
      branch: 'feature/auth → main',
      status: 'open',
      commits: 3,
      filesChanged: 8,
      reviewers: ['mentor@example.com'],
      createdAt: '2024-12-14'
    },
    {
      id: 2,
      title: 'Fix: Database Connection Pool',
      author: 'Jane Smith',
      branch: 'bugfix/db-pool → main',
      status: 'merged',
      commits: 2,
      filesChanged: 4,
      reviewers: ['mentor@example.com'],
      createdAt: '2024-12-13'
    }
  ];

  const fileStructure = [
    { name: 'src/', type: 'folder', children: [
      { name: 'components/', type: 'folder', children: [
        { name: 'Auth/', type: 'folder', children: [
          { name: 'LoginForm.tsx', type: 'file', status: 'modified' },
          { name: 'SignupForm.tsx', type: 'file', status: 'added' }
        ]},
        { name: 'Navigation/', type: 'folder', children: [
          { name: 'Navbar.tsx', type: 'file', status: 'modified' }
        ]}
      ]},
      { name: 'utils/', type: 'folder', children: [
        { name: 'auth.ts', type: 'file', status: 'modified' },
        { name: 'api.ts', type: 'file', status: 'modified' }
      ]}
    ]},
    { name: 'package.json', type: 'file', status: 'modified' }
  ];

  const codeExample = `// LoginForm.tsx - Recent changes
import React, { useState } from 'react';
import { validateEmail, hashPassword } from '../utils/auth';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

+ // Added input validation
+ const validateForm = () => {
+   const newErrors: string[] = [];
+   if (!validateEmail(email)) {
+     newErrors.push('Invalid email format');
+   }
+   if (password.length < 8) {
+     newErrors.push('Password must be at least 8 characters');
+   }
+   setErrors(newErrors);
+   return newErrors.length === 0;
+ };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
+   if (!validateForm()) return;
    
    onSubmit({
      email,
-     password
+     password: hashPassword(password)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border rounded-lg"
        />
      </div>
+     {errors.length > 0 && (
+       <div className="text-red-600 text-sm">
+         {errors.map((error, index) => (
+           <p key={index}>{error}</p>
+         ))}
+       </div>
+     )}
      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg">
        Login
      </button>
    </form>
  );
}`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success-100 text-success-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'changes-requested':
        return 'bg-error-100 text-error-800';
      case 'merged':
        return 'bg-primary-100 text-primary-800';
      case 'open':
        return 'bg-secondary-100 text-secondary-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'merged':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
      case 'open':
        return <Clock className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const renderFileTree = (files: any[], level = 0) => {
    return files.map((file, index) => (
      <div key={index} style={{ marginLeft: `${level * 20}px` }}>
        <div 
          className={`flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer ${
            selectedFile === file.name ? 'bg-primary-50 text-primary-700' : ''
          }`}
          onClick={() => file.type === 'file' && setSelectedFile(file.name)}
        >
          {file.type === 'folder' ? (
            <FileText className="h-4 w-4 mr-2 text-gray-400" />
          ) : (
            <FileText className="h-4 w-4 mr-2 text-gray-600" />
          )}
          <span className="text-sm">{file.name}</span>
          {file.status && (
            <span className={`ml-2 px-1 text-xs rounded ${
              file.status === 'added' ? 'bg-success-100 text-success-800' :
              file.status === 'modified' ? 'bg-warning-100 text-warning-800' :
              'bg-error-100 text-error-800'
            }`}>
              {file.status}
            </span>
          )}
        </div>
        {file.children && renderFileTree(file.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Code Review</h1>
        <p className="text-gray-600 mt-1">Review commits, pull requests, and code changes</p>
      </div>

      {/* Repository Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Repository</label>
        <select
          value={selectedRepo}
          onChange={(e) => setSelectedRepo(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {repositories.map(repo => (
            <option key={repo.id} value={repo.id}>
              {repo.name} ({repo.group})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Commits & PRs */}
        <div className="lg:col-span-1 space-y-6">
          {/* Recent Commits */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GitCommit className="h-5 w-5 mr-2" />
              Recent Commits
            </h3>
            <div className="space-y-3">
              {commits.map(commit => (
                <div key={commit.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{commit.hash}</code>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(commit.status)}`}>
                        {getStatusIcon(commit.status)}
                        <span className="ml-1">{commit.status}</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">{commit.message}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>By {commit.author} • {commit.date}</p>
                    <p>Branch: {commit.branch}</p>
                    <p>{commit.filesChanged} files • +{commit.additions} -{commit.deletions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pull Requests */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GitPullRequest className="h-5 w-5 mr-2" />
              Pull Requests
            </h3>
            <div className="space-y-3">
              {pullRequests.map(pr => (
                <div key={pr.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(pr.status)}`}>
                      {getStatusIcon(pr.status)}
                      <span className="ml-1">{pr.status}</span>
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">{pr.title}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>By {pr.author} • {pr.createdAt}</p>
                    <p>{pr.branch}</p>
                    <p>{pr.commits} commits • {pr.filesChanged} files changed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - File Explorer & Code */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Explorer */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GitBranch className="h-5 w-5 mr-2" />
              File Changes
            </h3>
            <div className="border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
              {renderFileTree(fileStructure)}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Code Changes
                {selectedFile && <span className="ml-2 text-sm text-gray-500">({selectedFile})</span>}
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-success-100 text-success-700 rounded-lg hover:bg-success-200 transition-colors text-sm">
                  Approve
                </button>
                <button className="px-3 py-1 bg-error-100 text-error-700 rounded-lg hover:bg-error-200 transition-colors text-sm">
                  Request Changes
                </button>
                <button className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm">
                  Comment
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <pre className="bg-gray-50 p-4 text-sm overflow-x-auto">
                <code className="language-typescript">{codeExample}</code>
              </pre>
            </div>
          </div>

          {/* Review Comments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Review Comments
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Mentor Review</span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-700">Great work on implementing input validation! The error handling looks solid. Consider adding unit tests for the validation functions.</p>
              </div>
              <div className="border-l-4 border-warning-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Security Review</span>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <p className="text-sm text-gray-700">Please ensure the password hashing is using a secure algorithm like bcrypt with proper salt rounds.</p>
              </div>
            </div>
            
            {/* Add Comment */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <textarea
                placeholder="Add a review comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}