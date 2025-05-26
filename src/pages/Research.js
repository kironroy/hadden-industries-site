import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
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
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newType, setNewType] = useState("");
  const [newLink, setNewLink] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); // New error state
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editType, setEditType] = useState("");
  const [editLink, setEditLink] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "research"));
        const dataArr = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => a.title.localeCompare(b.title)); // Sort initially
        setItems(dataArr);
      } catch (error) {
        console.error("Error fetching research items:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
      setIsAdmin(loggedInUser?.uid === ADMIN_UID);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(""); // Reset error state

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoginError(
        "❌ You are not authorized to sign in. Please check your email and password."
      ); // Set error message
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const newItem = {
        title: newTitle.trim(),
        summary: newSummary.trim(),
        type: newType.trim(),
        link: newLink.trim(),
      };

      const docRef = await addDoc(collection(db, "research"), newItem);

      // Add new item and sort alphabetically
      const updatedItems = [...items, { id: docRef.id, ...newItem }].sort(
        (a, b) => a.title.localeCompare(b.title)
      );

      setItems(updatedItems);

      setNewTitle("");
      setNewSummary("");
      setNewType("");
      setNewLink("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "research", id));
      setItems(
        items
          .filter((item) => item.id !== id)
          .sort((a, b) => a.title.localeCompare(b.title))
      );
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditSummary(item.summary);
    setEditType(item.type);
    setEditLink(item.link);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isAdmin || !editingId) return;

    try {
      const docRef = doc(db, "research", editingId);
      await updateDoc(docRef, {
        title: editTitle.trim(),
        summary: editSummary.trim(),
        type: editType.trim(),
        link: editLink.trim(),
      });

      const updatedItems = items
        .map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: editTitle,
                summary: editSummary,
                type: editType,
                link: editLink,
              }
            : item
        )
        .sort((a, b) => a.title.localeCompare(b.title)); // Sort after update

      setItems(updatedItems);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const filteredItems = items
    .filter((item) =>
      [item.title, item.summary, item.type].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => a.title.localeCompare(b.title)); // Alphabetical order

  return (
    <div className="research-container">
      <h1>Research</h1>
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>Total entries: {filteredItems.length}</p>
      {isAdmin && (
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
      <ul className="research-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="research-entry">
            <li className="research-item">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <p>Type: {item.type}</p>
              <p>
                Link:{" "}
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.link}
                </a>
              </p>
            </li>
            <hr />
          </div>
        ))}
      </ul>
      {loginError && <p className="error-message">{loginError}</p>}{" "}
      {/* Show error message */}
      <div className="login-container">
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
      </div>
    </div>
  );
};

export default Research;
