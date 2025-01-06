import React from 'react';

const LogsBox = ({ logs }) => {
  return (
    <div className="p-4 bg-gray-100 shadow-md h-[548px]">
      <h2 className="text-lg font-bold text-[#2A2A2A] mb-3">Recent Activity</h2>
      <div className="h-[470px] overflow-y-auto bg-white p-3 rounded-lg border border-gray-300">
        {logs.map((log, index) => (
          <div
            key={index}
            className="flex items-center p-2 mb-2 bg-gray-50 rounded-md border border-gray-200"
          >
            <div className="w-10 h-10 flex-shrink-0 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
              <i className="fas fa-user"></i>
            </div>
            <div className="ml-3">
              <p className="font-bold text-sm text-gray-800">{log.title}</p>
              <p className="text-sm text-gray-600">{log.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsBox;
