'use client';

import { useEffect, useState } from 'react';

interface UserStats {
  balance: number;
  propertiesCount: number;
  carsCount: number;
  email: string;
}

interface LeaderboardUser {
  rank: number;
  email: string;
  balance: number;
  propertiesCount: number;
  carsCount: number;
}

export default function StatsPage() {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userStatsRes, leaderboardRes] = await Promise.all([
          fetch('/api/stats/user'),
          fetch('/api/stats/leaderboard'),
        ]);

        if (userStatsRes.ok) {
          const userData = await userStatsRes.json();
          setUserStats(userData);
        }

        if (leaderboardRes.ok) {
          const leaderboardData = await leaderboardRes.json();
          setLeaderboard(leaderboardData);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-2xl text-gray-300">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 text-center">
          Статистика
        </h1>

        {/* User Statistics Block */}
        {userStats && (
          <div className="mb-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-6">Ваша статистика</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/30 rounded-lg p-4 border border-purple-400/20">
                <div className="text-gray-400 text-sm mb-1">Баланс</div>
                <div className="text-3xl font-bold text-green-400">
                  ${userStats.balance.toLocaleString()}
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-purple-400/20">
                <div className="text-gray-400 text-sm mb-1">Недвижимость</div>
                <div className="text-3xl font-bold text-blue-400">
                  {userStats.propertiesCount}
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-purple-400/20">
                <div className="text-gray-400 text-sm mb-1">Автомобили</div>
                <div className="text-3xl font-bold text-yellow-400">
                  {userStats.carsCount}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Block */}
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <h2 className="text-3xl font-bold text-white mb-6">Топ-100 игроков</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-400/30">
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Место</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Email</th>
                  <th className="text-right py-3 px-4 text-gray-300 font-semibold">Баланс</th>
                  <th className="text-right py-3 px-4 text-gray-300 font-semibold">Недвижимость</th>
                  <th className="text-right py-3 px-4 text-gray-300 font-semibold">Автомобили</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user) => (
                  <tr
                    key={user.rank}
                    className="border-b border-purple-400/10 hover:bg-purple-500/10 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span
                        className={`font-bold ${
                          user.rank === 1
                            ? 'text-yellow-400'
                            : user.rank === 2
                            ? 'text-gray-300'
                            : user.rank === 3
                            ? 'text-orange-400'
                            : 'text-gray-400'
                        }`}
                      >
                        {user.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white">{user.email}</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">
                      ${user.balance.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-blue-400">
                      {user.propertiesCount}
                    </td>
                    <td className="py-3 px-4 text-right text-yellow-400">
                      {user.carsCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
