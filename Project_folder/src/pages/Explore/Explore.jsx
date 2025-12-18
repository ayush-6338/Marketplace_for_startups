import { useEffect, useState } from 'react';
import { getAllStartups } from '../../services/startupApi';
import { Link } from 'react-router-dom';

const Explore = () => {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    getAllStartups()
      .then(res => setStartups(res.data))
      .catch(() => alert('Failed to load startups'));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explore Startups</h1>

      {startups.map(startup => (
        <div key={startup._id} className="border p-4 mb-3 rounded">
          <h2 className="text-lg font-semibold">{startup.name}</h2>
          <p>{startup.tagline}</p>
        </div>
      ))}
    </div>
  );
};

export default Explore;
