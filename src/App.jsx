import { useEffect, useState } from "react";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

export default function App() {
  const [user, setUser] = useState(null);

  // ✅ Persist theme in localStorage
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <>
      <header className="header">
        <h1 className="title">Github Explorer</h1>

        <button
          className={`theme-toggle-btn ${dark ? "dark" : "light"}`}
          onClick={() => setDark((prev) => !prev)}
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </header>

      {user ? (
        <UserDetails username={user} goBack={() => setUser(null)} />
      ) : (
        <Home setSelectedUser={setUser} />
      )}
    </>
  );
}