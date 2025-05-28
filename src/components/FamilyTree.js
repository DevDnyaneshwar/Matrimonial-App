// src/components/FamilyTree.js

import React, { useState, useEffect } from 'react';
import { db } from '../db';
import { groupFamilyMembersByRelation } from '../utils';
import { Header } from './Header';
import { FamilyTreeNode } from './FamilyTreeNode';
import { ProfileModal } from './ProfileModal';
import { FamilyLevel } from './FamilyLevel';
import { FamilyStatistics } from './FamilyStatistics.js';
import  AddMemberForm  from './AddMemberForm.js';

import { PlusCircle } from 'lucide-react';

export const FamilyTree = () => {
  const [selectedUser, setSelectedUser] = useState(db.users.find(user => user.isMainUser) || db.users[0]);
  const [familyMembers, setFamilyMembers] = useState({});
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hiddenMembers, setHiddenMembers] = useState(new Set());
   const [isAddMemberFormOpen, setIsAddMemberFormOpen] = useState(false); // New state for form


  useEffect(() => {
    const members = db.familyMembers.filter(member => member.userId === selectedUser.id);
    const grouped = groupFamilyMembersByRelation(members);
    setFamilyMembers(grouped);
  }, [selectedUser]);



  const toggleMemberVisibility = (memberId) => {
    setHiddenMembers(prevHidden => {
      const newHidden = new Set(prevHidden);
      if (newHidden.has(memberId)) {
        newHidden.delete(memberId);
      } else {
        newHidden.add(memberId);
      }
      return newHidden;
    });
  };
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };
   const handleAddMember = (newMember) => {
    // For a real app, you'd send this to a backend API.
    // For this demo, we'll simulate adding it to our in-memory db and then updating state.

    // Find the current user in db.users and add the member there
    const userIndex = db.users.findIndex(u => u.id === newMember.userId);
    if (userIndex !== -1) {
      // Create a temporary, mutable copy of db.familyMembers to add the new member
      // In a real app, this would be an API call and then fetching updated data
      db.familyMembers.push(newMember); // Simulate adding to your "database"

      // Re-filter and group family members for the current selected user to reflect the new addition
      const updatedMembers = db.familyMembers.filter(member => member.userId === selectedUser.id);
      setFamilyMembers(groupFamilyMembersByRelation(updatedMembers));
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <Header
        selectedUser={selectedUser}
        users={db.users}
        onUserChange={setSelectedUser}
      />

      <button
  onClick={() => setIsAddMemberFormOpen(true)}
  className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform z-50"
>
  <PlusCircle className="w-6 h-6" />
</button>


      {/* Family Tree Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Grandparents */}
          <FamilyLevel
            relations={['grandfather', 'grandmother']}
            title="Grandparents"
            familyMembers={familyMembers}
            className="mb-8"
            onMemberClick={handleMemberClick}
            onToggleVisibility={toggleMemberVisibility}
            hiddenMembers={hiddenMembers}
          />

          {/* Parents & Uncles/Aunts */}
          <FamilyLevel
            relations={['father', 'mother', 'uncle', 'aunt']}
            title="Parents & Relatives"
            familyMembers={familyMembers}
            className="mb-8"
            onMemberClick={handleMemberClick}
            onToggleVisibility={toggleMemberVisibility}
            hiddenMembers={hiddenMembers}
          />

          {/* Main User */}
          <div className="flex justify-center mb-8">
            <FamilyTreeNode
              member={selectedUser}
              isMainUser={true}
              onClick={handleMemberClick}
              onToggleVisibility={() => {}} // Main user visibility cannot be toggled
              isVisible={true} // Main user is always visible
            />
          </div>

          {/* Siblings */}
          <FamilyLevel
            relations={['brother', 'sister']}
            title="Siblings"
            familyMembers={familyMembers}
            className="mb-8"
            onMemberClick={handleMemberClick}
            onToggleVisibility={toggleMemberVisibility}
            hiddenMembers={hiddenMembers}
          />
        </div>

        {/* Statistics */}
        <FamilyStatistics
          familyMembers={familyMembers}
          hiddenMembers={hiddenMembers}
        />
      </div>

      {/* Profile Modal */}
      <ProfileModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

       <AddMemberForm
        isOpen={isAddMemberFormOpen}
        onClose={() => setIsAddMemberFormOpen(false)}
        onAddMember={handleAddMember}
        currentUserId={selectedUser.id} // Pass current user's ID
      />

    </div>
  );
};