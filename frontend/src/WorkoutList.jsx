import { useEffect, useState } from 'react';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  // This is the "Pipe" that grabs data from your Backend
  useEffect(() => {
    fetch('http://localhost:5000/api/workouts')
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((err) => console.error("Error fetching workouts:", err));
  }, []);

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>Available Workouts</h2>
      {workouts.length === 0 ? (
        <p>The Database is empty! Go grocery shopping (add data) first.</p>
      ) : (
        <ul>
          {workouts.map((w) => (
            <li key={w._id} style={{ marginBottom: '10px' }}>
              <strong>{w.name}</strong> - {w.xpReward} XP <br />
              <small>Focus: {w.targetSectors.join(', ')}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;