// src/pages/PointsDetail.tsx (or mark_assign.tsx)

import React, { useEffect, useState } from 'react';

interface LostReason {
  reason: string;
  pointsLost: number;
}

// Define props interface for PointsDetail
interface PointsDetailProps {
  currentTotalPoints: number; // This is the prop we'll receive
}

const PointsDetail: React.FC<PointsDetailProps> = ({ currentTotalPoints }) => { // Destructure the prop
  // Remove the useState for totalPoints if it's always coming from the prop
  // const [totalPoints, setTotalPoints] = useState<number>(0);
  const [lostReasons, setLostReasons] = useState<LostReason[]>([]);
  const [midtermMark, setMidtermMark] = useState<number>(0);
  const [averageMark, setAverageMark] = useState<number>(0);

  useEffect(() => {
    // The totalPoints will now come from the prop: currentTotalPoints
    const fetchedLost: LostReason[] = [
      { reason: '2 days late on “Setup CI/CD” task', pointsLost: 5 },
      { reason: '1 day late on “Write unit tests” task', pointsLost: 3 },
      { reason: '3 days late on “Deploy to staging” task', pointsLost: 4 },
    ];
    const fetchedMidterm = 85; // example first midterm mark

    // setTotalPoints(currentTotalPoints); // No need for this if using prop directly
    setLostReasons(fetchedLost);
    setMidtermMark(fetchedMidterm);

    // Calculate average using the prop value
    setAverageMark(Math.round((currentTotalPoints + fetchedMidterm) / 2));
  }, [currentTotalPoints]); // Add currentTotalPoints to dependency array so average recalculates if prop changes

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Points Breakdown</h1>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Points: {currentTotalPoints}/100</span> {/* Use prop here */}
          <span className="text-sm font-medium text-gray-700">{currentTotalPoints}%</span> {/* Use prop here */}
        </div>
        <div className="w-full bg-gray-200 h-4 rounded">
          <div
            className="bg-amber-700 h-4 rounded"
            style={{ width: `${currentTotalPoints}%` }} // Use prop here
          />
        </div>
      </div>

      {/* Lost reasons */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Points Lost</h2>
        <ul className="space-y-2">
          {lostReasons.map((lr, idx) => (
            <li key={idx} className="flex justify-between bg-gray-50 p-3 rounded shadow-sm">
              <span>{lr.reason}</span>
              <span className="font-medium text-red-600">−{lr.pointsLost}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Average calculation */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Average Mark</h2>
        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <p>
            <strong>First Midterm:</strong> {midtermMark}/100
          </p>
          <p>
            <strong>Current Points:</strong> {currentTotalPoints}/100 {/* Use prop here */}
          </p>
          <p className="mt-2 text-lg">
            <strong>Average:</strong> {averageMark}/100
          </p>
        </div>
      </section>
    </div>
  );
};

export default PointsDetail;