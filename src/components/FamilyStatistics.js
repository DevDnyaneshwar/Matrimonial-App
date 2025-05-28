// src/components/FamilyStatistics.js

import React from 'react';

export const FamilyStatistics = ({ familyMembers, hiddenMembers }) => {
  const allMembers = Object.values(familyMembers).flat();
  const linkedCount = allMembers.filter(m => m.isLinked).length;
  const citiesCount = new Set(allMembers.map(m => m.location)).size;

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Family Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {allMembers.length + 1}
          </div>
          <div className="text-blue-800">Total Members</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {linkedCount}
          </div>
          <div className="text-green-800">Linked Profiles</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {citiesCount}
          </div>
          <div className="text-purple-800">Cities</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {hiddenMembers.size}
          </div>
          <div className="text-orange-800">Hidden Members</div>
        </div>
      </div>
    </div>
  );
};