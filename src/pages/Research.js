import BackToTop from "../components/BackToTop";
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
import "../index.css";
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
  // New state for the dynamic search input and error message
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Hadden Industries - Research";
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
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

  useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
      setIsAdmin(loggedInUser?.uid === ADMIN_UID);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Reset any previous error
    setErrorMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Check if the logged in user is the ADMIN
      if (userCredential.user.uid !== ADMIN_UID) {
        setErrorMessage(`You are not authorized to sign in email: ${email}`);
        await signOut(auth); // sign out unauthorized user immediately
        return;
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      // Also clear any error message on logout
      setErrorMessage("");
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
      setItems([...items, { id: docRef.id, ...newItem }]);

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
      setItems(items.filter((item) => item.id !== id));
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

      setEditingId(null);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Filter items by title, summary, or type and sort alphabetically by title
  const filteredItems = items
    .filter((item) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.summary.toLowerCase().includes(lowerCaseQuery) ||
        item.type.toLowerCase().includes(lowerCaseQuery)
      );
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="research-container">
      <h1>Research</h1>
      {/* Dynamic search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Counter showing the number of currently visible entries */}
      <div className="counter">
        <p>Showing {filteredItems.length} entries</p>
      </div>
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
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <details className="login-container">
          <summary>Login</summary>
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
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
        </details>
      )}
      <BackToTop /> {/* Add the BackToTop button */}
    </div>
  );
};

export default Research;
