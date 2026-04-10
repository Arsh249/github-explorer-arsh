import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import RepoCard from "../components/RepoCard";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Empty from "../components/Empty";
export default function UserDetails({ username, goBack }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sort, setSort] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );

        setRepos(res.data);
      } catch (err) {
        setError("Failed to fetch repositories");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  // Extract unique languages dynamically
  const languages = useMemo(() => {
    const langs = repos
      .map((r) => r.language)
      .filter(Boolean); // remove null
    return [...new Set(langs)];
  }, [repos]);

  // Filter + Sort logic
  const processedRepos = useMemo(() => {
    let result = [...repos];

    // Filter
    if (language) {
      result = result.filter((r) => r.language === language);
    }

    // Sort
    if (sort === "stars") {
      result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sort === "forks") {
      result.sort((a, b) => b.forks_count - a.forks_count);
    }

    return result;
  }, [repos, sort, language]);

  return (
    <div className="container">
      <button onClick={goBack} className="back-button">⬅ Back</button>

      
      <div className="controls">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="stars">⭐ Stars</option>
          <option value="forks">🍴 Forks</option>
        </select>

        {/* Language Filter Dropdown */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* States */}
      {loading && <Loader />}
      {error && <Error message={error} />}
      {!loading && processedRepos.length === 0 && <Empty />}

      {/* Repo List */}
      <div className="grid">
        {processedRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}