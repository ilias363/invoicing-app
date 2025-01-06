import React from 'react';

const LogsBox = ({ logs }) => {
  
  const fourDaysAgo = new Date();
  fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

  const recentLogs = logs.filter((log) => new Date(log.time_action) >= fourDaysAgo);

  return (
    <div className="p-4 bg-gray-100 shadow-md h-[548px]">
      <h2 className="text-lg font-bold text-[#2A2A2A] mb-3">Recent Activity</h2>
      <div className="h-[470px] overflow-y-auto bg-white p-3 rounded-lg border border-gray-300">
        {recentLogs.length === 0 ? (
          <p className="text-sm text-gray-600">No recent activity in the last four days.</p>
        ) : (
          <ul>
            {recentLogs.map((log) => (
              <li
                key={log.id}
                className="flex flex-col p-2 mb-2 bg-gray-50 rounded-md border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 flex-shrink-0 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="ml-3">
                    <p className="font-bold text-sm text-gray-800">
                      {log.user ? `${log.user.first_name} ${log.user.last_name}` : 'Unknown User'}
                    </p>
                    <p className="text-sm text-gray-600">{log.action}</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <p>Time: {new Date(log.time_action).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LogsBox;
