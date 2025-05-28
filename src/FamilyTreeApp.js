import React, { useState, useRef } from 'react';
import { Zap } from 'lucide-react'; // Only need Zap here for the legend

// Import your components
import FamilyMemberCard from './components/FamilyMemberCard';
import ConnectionLines from './components/ConnectionLines';
import MemberDetailsModal from './components/MemberDetailsModal';
import ControlPanel from './components/ControlPanel';

// Sample family data (keep this here as it's the data source for the whole app)
const sampleFamilyData = {
  user: {
    id: 'user-1',
    name: 'Raj Sharma',
    relation: 'Self',
    age: 28,
    profession: 'Software Engineer',
    education: 'B.Tech Computer Science',
    location: 'Mumbai, Maharashtra',
    photo: null,
    isProfileLinked: true,
    level: 0,
    x: 0,
    y: 0
  },
  members: [
    // Parents
    { id: 'father', name: 'Suresh Sharma', relation: 'Father', age: 58, profession: 'Retired Bank Manager', education: 'B.Com', location: 'Pune, Maharashtra', level: 1, x: -200, y: -150 },
    { id: 'mother', name: 'Priya Sharma', relation: 'Mother', age: 52, profession: 'Homemaker', education: 'B.A.', location: 'Pune, Maharashtra', level: 1, x: 200, y: -150 },

    // Grandparents
    { id: 'grandfather-p', name: 'Ram Sharma', relation: 'Grandfather (Paternal)', age: 82, profession: 'Retired Teacher', education: 'B.A.', location: 'Nashik, Maharashtra', level: 2, x: -300, y: -300 },
    { id: 'grandmother-p', name: 'Sita Sharma', relation: 'Grandmother (Paternal)', age: 78, profession: 'Homemaker', education: 'High School', location: 'Nashik, Maharashtra', level: 2, x: -100, y: -300 },

    // Siblings
    { id: 'sister', name: 'Pooja Gupta', relation: 'Sister', age: 25, profession: 'Doctor', education: 'MBBS', location: 'Delhi, India', level: 0, x: -300, y: 0, isProfileLinked: true },
    { id: 'brother', name: 'Arjun Sharma', relation: 'Brother', age: 22, profession: 'Student', education: 'B.E. Mechanical', location: 'Pune, Maharashtra', level: 0, x: 300, y: 0 },

    // Extended family
    { id: 'uncle', name: 'Dr. Vikash Sharma', relation: 'Uncle (Paternal)', age: 55, profession: 'Doctor', education: 'MBBS, MD', location: 'Bangalore, Karnataka', level: 1, x: -400, y: -150, isProfileLinked: true },
    { id: 'aunt', name: 'Meera Sharma', relation: 'Aunt', age: 50, profession: 'Teacher', education: 'M.A. English', location: 'Bangalore, Karnataka', level: 1, x: -600, y: -150 },

    // Cousins
    { id: 'cousin1', name: 'Rohit Sharma', relation: 'Cousin', age: 26, profession: 'Engineer', education: 'B.Tech', location: 'Bangalore, Karnataka', level: 0, x: -500, y: 0, isProfileLinked: true },
  ]
};

const FamilyTreeApp = () => {
  const [familyData] = useState(sampleFamilyData);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedMember, setHighlightedMember] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPrivate, setIsPrivate] = useState(false);
  const containerRef = useRef(null);

  const handleCardClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    setHighlightedMember(member.id);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 }); // Reset pan as well
  };

  const handleTogglePrivacy = () => {
    setIsPrivate(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Family Tree</h1>
            <p className="text-gray-600">Discover family connections • Build trust • Find matches</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              {isPrivate ? 'Private View' : 'Public View'}
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Add Member
            </button>
          </div>
        </div>
      </div>

      {/* Tree Container */}
      <div className="relative w-full h-screen overflow-hidden" ref={containerRef}>
        <div
          className="relative w-full h-full"
          style={{
            transform: `scale(<span class="math-inline">\{zoom\}\) translate\(</span>{pan.x}px, ${pan.y}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease'
          }}
        >
          {/* Connection Lines */}
          <ConnectionLines members={familyData.members} user={familyData.user} />

          {/* User Card (Center) */}
          <FamilyMemberCard
            member={familyData.user}
            onCardClick={handleCardClick}
            isHighlighted={highlightedMember === familyData.user.id}
          />

          {/* Family Member Cards */}
          {familyData.members.map((member) => (
            <FamilyMemberCard
              key={member.id}
              member={member}
              onCardClick={handleCardClick}
              isHighlighted={highlightedMember === member.id}
            />
          ))}
        </div>

        {/* Control Panel */}
        <ControlPanel
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
          onTogglePrivacy={handleTogglePrivacy}
          isPrivate={isPrivate}
        />

        {/* Legend */}
        <div className="fixed bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 z-30">
          <h3 className="font-semibold text-gray-900 mb-2">Legend</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-2 bg-blue-500 rounded"></div>
              <span>Parent Connection</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-2 bg-green-500 rounded"></div>
              <span>Sibling Connection</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-2 bg-purple-500 rounded border-dashed border border-purple-300"></div>
              <span>Extended Family</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-green-500" />
              <span>On Matrimonial App</span>
            </div>
          </div>
        </div>
      </div>

      {/* Member Details Modal */}
      <MemberDetailsModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setHighlightedMember(null);
        }}
      />
    </div>
  );
};

export default FamilyTreeApp;