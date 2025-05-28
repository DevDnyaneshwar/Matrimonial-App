// src/components/Header.js

import React from 'react';
import { Users } from 'lucide-react';
import { db } from '../db'; 
import styles from './Header.module.css';

export const Header = ({ selectedUser, users, onUserChange }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Family Tree</h1>
              <p className="text-gray-600">Explore family connections and relationships</p>
            </div>
          </div>

          {/* User Selector */}
          <select
            value={selectedUser.id}
            onChange={(e) => onUserChange(users.find(u => u.id === parseInt(e.target.value)))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          
        </div>
      </div>
    </div>
  );
};