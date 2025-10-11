import { useEffect, useState } from 'react';
import type { DashboardStats } from '@/types/api';
import { apiClient } from '@/services/api';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch dashboard stats
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Smart Dating Optimizer Dashboard
        </h1>
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900">Total Swipes</h3>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {stats?.total_swipes || 0}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900">Total Matches</h3>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {stats?.total_matches || 0}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900">Match Rate</h3>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {stats?.match_rate.toFixed(1) || 0}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

