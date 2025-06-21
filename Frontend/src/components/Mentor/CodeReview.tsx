import React, { useState, useEffect } from 'react';
import {
  GitBranch, GitCommit, GitPullRequest, FileText, MessageSquare, CheckCircle, Clock, PlusCircle, MinusCircle, ArrowRight,
  XCircle
} from 'lucide-react';

// --- TYPESCRIPT TYPES ---
type ChangedFile = { path: string; additions: number; deletions: number };
type Commit = {
  id: string;
  repoId: string;
  hash: string;
  message: string;
  author: string;
  date: string;
  changedFiles: ChangedFile[];
};
type PullRequest = {
  id: number;
  repoId: string;
  title: string;
  author: string;
  status: string;
  branch: string;
};
type Comment = {
  id: number;
  commitId: string;
  author: string;
  text: string;
};

export default function CodeReview() {
  // --- STATE MANAGEMENT ---
  const [selectedRepo, setSelectedRepo] = useState('studybuddy-app');
  const [activeCommit, setActiveCommit] = useState<Commit | null>(null);
  const [selectedFile, setSelectedFile] = useState<ChangedFile | null>(null);
  const [activePullRequest, setActivePullRequest] = useState<PullRequest | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');

  // --- MOCK DATA ---
  const repositories = [
    { id: 'studybuddy-app', name: 'StudyBuddy Mobile App', group: 'StudyBuddy Team' },
    { id: 'ecotracker-web', name: 'EcoTracker Web Platform', group: 'EcoTracker Team' },
    { id: 'empty-project', name: 'Empty Project', group: 'Test Group' }
  ];
  
  const commits: Commit[] = [
    { id: '1', repoId: 'studybuddy-app', hash: 'a1b2c3d', message: 'Implement user authentication system', author: 'John Doe', date: 'June 21, 2025', changedFiles: [{ path: 'src/components/LoginForm.tsx', additions: 88, deletions: 5 }, { path: 'src/services/auth.ts', additions: 32, deletions: 10 }] },
    { id: '2', repoId: 'studybuddy-app', hash: 'e4f5g6h', message: 'Add responsive navigation component', author: 'Jane Smith', date: 'June 20, 2025', changedFiles: [{ path: 'src/components/Navbar.tsx', additions: 45, deletions: 12 }] },
    { id: '3', repoId: 'ecotracker-web', hash: 'c9d8e7f', message: 'Integrate mapping API for location tracking', author: 'Emily White', date: 'June 19, 2025', changedFiles: [{ path: 'src/components/Map.tsx', additions: 150, deletions: 20 }] }
  ];
  
  const pullRequests: PullRequest[] = [
    { id: 1, repoId: 'studybuddy-app', title: 'Feature: User Authentication', author: 'John Doe', status: 'open', branch: 'feature/auth' },
    { id: 2, repoId: 'studybuddy-app', title: 'Feature: Add responsive navigation', author: 'Jane Smith', status: 'merged', branch: 'feature/navigation' },
    { id: 3, repoId: 'ecotracker-web', title: 'Feature: Location Tracking Map', author: 'Emily White', status: 'open', branch: 'feature/maps' },
  ];

  // --- COMPONENT LOGIC ---
  useEffect(() => {
    const commitsForRepo = commits.filter(c => c.repoId === selectedRepo);
    const prsForRepo = pullRequests.filter(pr => pr.repoId === selectedRepo);

    setActiveCommit(commitsForRepo[0] || null);
    setSelectedFile(commitsForRepo[0]?.changedFiles[0] || null);
    setActivePullRequest(prsForRepo[0] || null);
  }, [selectedRepo]);

  const filteredCommits = commits.filter(c => c.repoId === selectedRepo);
  const filteredPullRequests = pullRequests.filter(pr => pr.repoId === selectedRepo);
  const filteredComments = comments.filter(c => c.commitId === activeCommit?.id);

  const handleAddComment = () => {
    if (commentText.trim() && activeCommit) {
      const newComment: Comment = {
        id: Date.now(),
        commitId: activeCommit.id,
        author: 'You',
        text: commentText.trim(),
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const AuthorAvatar: React.FC<{ name: string }> = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    return <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">{initial}</div>;
  };

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const isMerged = status === 'merged', isClosed = status === 'closed', isOpen = status === 'open';
    return (
      <span className={ `px-2 py-1 text-xs font-medium rounded-full flex items-center ` + (isOpen ? 'bg-blue-100 text-blue-700 ' : '') + (isMerged ? 'bg-purple-100 text-purple-700 ' : '') + (isClosed ? 'bg-red-100 text-red-700 ' : '') }>
        {isOpen && <Clock className="h-3 w-3 mr-1" />}
        {isMerged && <CheckCircle className="h-3 w-3 mr-1" />}
        {isClosed && <XCircle className="h-3 w-3 mr-1" />}
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="pb-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Code Review</h1>
          <div className="mt-4">
            <select id="repo-select" value={selectedRepo} onChange={(e) => setSelectedRepo(e.target.value)}
              className="block w-full max-w-xs pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
            >
              {repositories.map(repo => <option key={repo.id} value={repo.id}>{repo.name} ({repo.group})</option>)}
            </select>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-8">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-gray-800 flex items-center mb-4"><GitCommit className="h-5 w-5 mr-2 text-gray-400" />Recent Commits</h3>
              <div className="space-y-3">
                {filteredCommits.length > 0 ? filteredCommits.map(commit => (
                  <div key={commit.id} onClick={() => setActiveCommit(commit)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${activeCommit?.id === commit.id ? 'bg-[#FFEDB8] border border-[#8B5E34] text-[#8B5E34]' : 'hover:bg-gray-100'}`}>
                    <div className="flex items-center mb-2"><AuthorAvatar name={commit.author} /><div className="ml-3"><p className="text-sm font-semibold text-gray-800">{commit.author}</p><p className="text-xs text-gray-500">{commit.date}</p></div></div>
                    <p className="text-sm text-gray-700 leading-snug">{commit.message}</p>
                  </div>
                )) : <p className="text-sm text-gray-500">No commits found.</p>}
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-base font-semibold text-gray-800 flex items-center mb-4"><GitPullRequest className="h-5 w-5 mr-2 text-gray-400" />Pull Requests</h3>
              <div className="space-y-2">
                {filteredPullRequests.length > 0 ? filteredPullRequests.map(pr => (
                  <div key={pr.id} onClick={() => setActivePullRequest(pr)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${activePullRequest?.id === pr.id ? 'bg-[#FFEDB8] border border-[#8B5E34] text-[#8B5E34]' : 'hover:bg-gray-100'}`}>
                    <div className="flex items-center justify-between"><p className="text-sm font-semibold text-gray-800">{pr.title}</p><StatusBadge status={pr.status}/></div>
                    <div className="mt-2 flex items-center text-xs text-gray-500"><span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md">{pr.branch}</span></div>
                  </div>
                )) : <p className="text-sm text-gray-500">No pull requests found.</p>}
              </div>
            </div>
          </aside>

          {/* Right Panel */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            {activeCommit ? (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-5 border-b border-gray-200"><h3 className="text-base font-semibold text-gray-800 flex items-center"><GitBranch className="h-5 w-5 mr-2 text-gray-400" />File Changes in <code className="ml-2 text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-md">{activeCommit?.hash}</code></h3></div>
                  <div className="divide-y divide-gray-200">
                    {activeCommit?.changedFiles.map((file, index) => (
                      <div key={index} onClick={() => setSelectedFile(file)}
                        className={`flex items-center justify-between p-4 cursor-pointer transition-colors duration-200 ${selectedFile?.path === file.path ? 'bg-[#FFEDB8] border border-[#8B5E34] text-[#8B5E34]' : 'hover:bg-gray-50'}`}>
                        <div className="flex items-center min-w-0"><FileText className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0"/><span className={`text-sm font-medium truncate ${selectedFile?.path === file.path ? 'text-[#8B5E34]' : 'text-gray-800'}`}>{file.path}</span></div>
                        <div className="flex items-center space-x-2 text-sm flex-shrink-0 ml-4"><span className="font-bold text-green-600 flex items-center"><PlusCircle className="h-4 w-4 mr-1"/>{file.additions}</span><span className="font-bold text-red-600 flex items-center"><MinusCircle className="h-4 w-4 mr-1"/>{file.deletions}</span></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-5 border-b border-gray-200"><h3 className="text-base font-semibold text-gray-800 flex items-center"><MessageSquare className="h-5 w-5 mr-2 text-gray-400" />Comments</h3></div>
                  <div className="p-5 space-y-5">
                    {filteredComments.map(comment => (
                      <div key={comment.id} className="flex items-start">
                        <AuthorAvatar name={comment.author} />
                        <div className="ml-4"><p className="text-sm font-semibold">{comment.author}</p><p className="text-sm text-gray-700">{comment.text}</p></div>
                      </div>
                    ))}
                    <div className="flex items-start pt-5 border-t border-gray-200">
                      <AuthorAvatar name="You"/>
                      <div className="ml-4 w-full">
                        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)}
                          placeholder={activeCommit ? `Comment on commit ${activeCommit.hash}...` : 'Select a commit to comment on'}
                          rows={3} className="w-full p-3 text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                        <button onClick={handleAddComment} className="mt-2 float-right px-4 py-2 bg-[#8B5E34] text-white text-sm font-semibold rounded-lg hover:bg-[#A47148] transition-colors disabled:bg-gray-400" disabled={!commentText.trim()}>
                          Add Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : <div className="bg-white text-center p-12 rounded-xl shadow-sm border border-gray-100"><h3 className="text-lg font-semibold text-gray-800">No Commits Selected</h3><p className="mt-2 text-sm text-gray-500">Select a repository to see details.</p></div>}
          </main>
        </div>
      </div>
    </div>
  );
}