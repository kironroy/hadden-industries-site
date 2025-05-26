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
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newType, setNewType] = useState("");
  const [newLink, setNewLink] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editType, setEditType] = useState("");
  const [editLink, setEditLink] = useState("");

  // Fetch research items, ensuring visibility for all users
  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching research items...");
        const querySnapshot = await getDocs(collection(db, "research"));
        const dataArr = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(dataArr);
      } catch (error) {
        console.error("Error fetching research items:", error);
      }
    };

    fetchItems();
  }, []);

  // Authentication status check
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

  // Function to Add a New Research Item to Firestore (Admin Only)
  // bug?
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
      setItems([...items, { id: docRef.id, ...newItem }]);

      setNewTitle("");
      setNewSummary("");
      setNewType("");
      setNewLink("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Function to Delete a Research Item from Firestore (Admin Only)
  const handleDelete = async (id) => {
    if (!isAdmin) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "research", id));
      setItems(items.filter((item) => item.id !== id));
      console.log("Item deleted:", id);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // Function to Enable Edit Mode
  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditSummary(item.summary);
    setEditType(item.type);
    setEditLink(item.link);
  };

  // Function to Update Firestore Entry
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

      setItems(
        items.map((item) =>
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
      );

      setEditingId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="research-container">
      <h1>Research</h1>

      <ul className="research-list">
        {items.map((item) => (
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
              {user && isAdmin && (
                <div className="button-group">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
            <hr />
          </div>
        ))}
      </ul>

      {editingId && (
        <form onSubmit={handleUpdate}>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            value={editSummary}
            onChange={(e) => setEditSummary(e.target.value)}
            placeholder="Summary"
            required
          />
          <input
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
            placeholder="Type"
            required
          />
          <input
            value={editLink}
            onChange={(e) => setEditLink(e.target.value)}
            placeholder="Link URL"
            required
          />
          <button type="submit">Update Item</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </form>
      )}

      {user && <button onClick={handleLogout}>Logout</button>}

      {!user && (
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
      )}
    </div>
  );
};

export default Research;
