import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, auth } from "../firebase";
import "./Research.css";

const ADMIN_UID = process.env.REACT_APP_ADMIN_UID;


const Research = () => {
  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newType, setNewType] = useState("");
  const [newLink, setNewLink] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch existing research items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "research"));
      const dataArr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(dataArr);
    };

    fetchItems();
  }, []);

  // Check authentication status and admin privileges
  useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      console.log("User detected:", loggedInUser);
      setUser(loggedInUser);
      setIsAdmin(loggedInUser?.uid === ADMIN_UID);
    });
  }, []);

  // Function to handle admin login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Admin logged in!");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out");
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Function to Add a New Research Item to Firestore
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!isAdmin) return; // Only allow admin to add

    try {
      const newItem = {
        title: newTitle.trim(),
        summary: newSummary.trim(),
        type: newType.trim(),
        link: newLink.trim(),
      };

      const docRef = await addDoc(collection(db, "research"), newItem);
      setItems([...items, { id: docRef.id, ...newItem }]); // Update UI dynamically

      // Clear form fields
      setNewTitle("");
      setNewSummary("");
      setNewType("");
      setNewLink("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // **New Function to Delete Research Items**
  const handleDelete = async (id) => {
    if (!isAdmin) return; // Only allow admin to delete

    try {
      await deleteDoc(doc(db, "research", id));
      setItems(items.filter((item) => item.id !== id)); // Update UI after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="research-container">
      <h1>Research</h1>

      {/* Login Form for Admin - shows only if no user is signed in */}
      {!user && (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}

      {user && <button onClick={handleLogout}>Logout</button>}

      {/* Admin Only: Form to Add Research Items */}
      {user && isAdmin && (
        <form onSubmit={handleAdd}>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            value={newSummary}
            onChange={(e) => setNewSummary(e.target.value)}
            placeholder="Summary"
            required
          />
          <input
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            placeholder="Type"
            required
          />
          <input
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Link URL"
            required
          />
          <button type="submit">Add Item</button>
        </form>
      )}

      {/* Display Research Items with Delete Option */}
      <ul className="research-list">
        {items.map((item) => (
          <li key={item.id} className="research-item">
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <p>Type: {item.type}</p>
            <p>
              Link:{" "}
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.link}
              </a>
            </p>
            {/* Show delete button only if the admin is logged in */}
            {isAdmin && (
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Research;
