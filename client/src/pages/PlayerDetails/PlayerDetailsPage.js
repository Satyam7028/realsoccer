// client/src/pages/PlayerDetails/PlayerDetailsPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// We are importing a selection of icons from react-icons/io5 and react-icons/fa
// to provide clear visual cues for player details, stats, and social links.
import {
  IoShirtOutline,
  IoStatsChart,
  IoCalendarOutline,
} from 'react-icons/io5';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

// Mock data for demonstration purposes
const mockPlayers = {
  '1': {
    id: 1,
    name: 'Player One',
    position: 'Striker',
    number: 9,
    team: 'RealSoccer United',
    imageUrl: 'https://placehold.co/400x500/0f172a/ffffff?text=Player+One',
    bio: 'An incredibly talented forward known for his speed and precision. He has been a key player for RealSoccer United for five seasons, leading the team in goals scored.',
    stats: {
      appearances: 34,
      goals: 28,
      assists: 10,
    },
    social: {
      twitter: 'playerone_official',
      instagram: 'playerone.official',
      facebook: 'playerone',
    },
  },
  // Add more mock players as needed
};

const PlayerDetailsPage = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching player data from an API
  useEffect(() => {
    setLoading(true);
    const fetchPlayerData = () => {
      // In a real application, you would make an API call here.
      // E.g., fetch(`/api/players/${id}`).then(res => res.json())...
      setTimeout(() => {
        setPlayer(mockPlayers[id]);
        setLoading(false);
      }, 500); // Simulate network delay
    };
    fetchPlayerData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading player details...
      </div>
    );
  }

  if (!player) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        Player not found!
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
          {/* Player Image */}
          <div className="md:w-1/3">
            <img
              src={player.imageUrl}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Player Details */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{player.name}</h1>
            <p className="text-xl text-indigo-600 font-semibold mb-4">{player.position}</p>

            {/* Key Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <IoShirtOutline className="h-6 w-6 text-indigo-500" />
                <span>Jersey Number: <span className="font-bold">{player.number}</span></span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <IoStatsChart className="h-6 w-6 text-indigo-500" />
                <span>Team: <span className="font-bold">{player.team}</span></span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <IoCalendarOutline className="h-6 w-6 text-indigo-500" />
                <span>Appearances: <span className="font-bold">{player.stats.appearances}</span></span>
              </div>
            </div>

            <hr className="my-6" />

            {/* Player Bio */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Biography</h2>
              <p className="text-gray-600">{player.bio}</p>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Follow {player.name}</h2>
              <div className="flex space-x-4">
                <a href={`https://twitter.com/${player.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
                  <FaTwitter className="h-8 w-8" />
                </a>
                <a href={`https://instagram.com/${player.social.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors duration-200">
                  <FaInstagram className="h-8 w-8" />
                </a>
                <a href={`https://facebook.com/${player.social.facebook}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors duration-200">
                  <FaFacebook className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsPage;
