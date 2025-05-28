// src/db.js

export const db = {
  users: [
    {
      id: 1,
      name: "Rahul Sharma",
      age: 28,
      profession: "Software Engineer",
      education: "B.Tech Computer Science",
      location: "Mumbai, India",
      photo: "/api/placeholder/150/150",
      phone: "+91 9876543210",
      email: "rahul.sharma@email.com",
      bio: "Looking for a life partner who values family traditions and modern thinking.",
      interests: ["Reading", "Traveling", "Photography"],
      isMainUser: true
    },
    {
      id: 2,
      name: "Priya Singh",
      age: 26,
      profession: "Doctor",
      education: "MBBS",
      location: "Delhi, India",
      photo: "/api/placeholder/150/150",
      phone: "+91 9876543211",
      email: "priya.singh@email.com",
      bio: "Family-oriented person seeking a understanding and caring partner.",
      interests: ["Music", "Cooking", "Yoga"]
    }
  ],
  familyMembers: [
    // Rahul's Family
    { id: 101, userId: 1, name: "Rajesh Sharma", relation: "Father", age: 55, profession: "Retired Bank Manager", education: "B.Com", location: "Mumbai, India", photo: "/api/placeholder/100/100", isLinked: false },
    { id: 102, userId: 1, name: "Sunita Sharma", relation: "Mother", age: 52, profession: "Homemaker", education: "B.A.", location: "Mumbai, India", photo: "/api/placeholder/100/100", isLinked: false },
    { id: 103, userId: 1, name: "Amit Sharma", relation: "Brother", age: 25, profession: "CA", education: "B.Com, CA", location: "Pune, India", photo: "/api/placeholder/100/100", isLinked: false },
    { id: 104, userId: 1, name: "Kavita Sharma", relation: "Sister", age: 30, profession: "Teacher", education: "M.Ed", location: "Mumbai, India", photo: "/api/placeholder/100/100", isLinked: false },
    { id: 105, userId: 1, name: "Mohan Sharma", relation: "Grandfather", age: 78, profession: "Retired", education: "High School", location: "Mumbai, India", photo: "/api/placeholder/100/100", isLinked: false },
    { id: 106, userId: 1, name: "Kamala Sharma", relation: "Grandmother", age: 75, profession: "Homemaker", education: "Primary", location: "Mumbai, India", photo: "/api/placeholder/100/100", isLinked: false },
    { id: 107, userId: 1, name: "Dr. Suresh Sharma", relation: "Uncle", age: 50, profession: "Doctor", education: "MBBS, MD", location: "Chennai, India", photo: "/api/placeholder/100/100", isLinked: true, linkedUserId: 3 },
    { id: 108, userId: 1, name: "Meera Sharma", relation: "Aunt", age: 47, profession: "Teacher", education: "M.A.", location: "Chennai, India", photo: "/api/placeholder/100/100", isLinked: false },
    // Priya's Family
    { id: 201, userId: 2, name: "Vikram Singh", relation: "Father", age: 58, profession: "IAS Officer", education: "M.A. Political Science", location: "Delhi, India", photo: "/api/placeholder/100/100", isLinked: false },
    { id: 202, userId: 2, name: "Anita Singh", relation: "Mother", age: 54, profession: "Professor", education: "PhD Literature", location: "Delhi, India", photo: "/api/placeholder/100/100", isLinked: false },
    { id: 203, userId: 2, name: "Arjun Singh", relation: "Brother", age: 24, profession: "Engineering Student", education: "B.Tech (Pursuing)", location: "Delhi, India", photo: "/api/placeholder/100/100", isLinked: false }
  ]
};