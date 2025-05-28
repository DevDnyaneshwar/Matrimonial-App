// src/components/FamilyTreeNode.js

import React from 'react';
import { User, Heart, Calendar, Briefcase, GraduationCap, MapPin, Eye, EyeOff } from 'lucide-react';
import { getRelationColor } from '../utils';

export const FamilyTreeNode = ({
  member,
  isMainUser = false,
  onClick,
  onToggleVisibility,
  isVisible = true
}) => {
  return (
    <div className={`relative ${isMainUser ? 'transform scale-110' : ''}`}>
      <div
        className={`
          ${isMainUser ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white'}
          rounded-xl shadow-lg border-2 p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105
          ${isMainUser ? 'border-purple-300' : 'border-gray-200'}
          ${!isVisible ? 'opacity-50' : ''}
          min-w-[250px] max-w-[280px]
        `}
        onClick={() => onClick(member)}
      >
        {/* Visibility Toggle for non-main users */}
        {!isMainUser && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(member.id);
            }}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        )}

        {/* Profile Image */}
        <div className="flex items-center mb-3">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-3 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-lg truncate ${isMainUser ? 'text-white' : 'text-gray-800'}`}>
              {member.name}
            </h3>
            {!isMainUser && (
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRelationColor(member.relation)}`}>
                {member.relation}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className={`space-y-2 text-sm ${isMainUser ? 'text-purple-100' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{member.age} years</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{member.profession}</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{member.education}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{member.location}</span>
          </div>
        </div>

        {/* Linked Profile Indicator */}
        {member.isLinked && (
          <div className="mt-3 pt-2 border-t border-purple-200">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              <Heart className="w-3 h-3 mr-1" />
              Profile Linked
            </span>
          </div>
        )}
      </div>
    </div>
  );
};