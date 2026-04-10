export default function RepoCard({ repo }) {
    const LANG_COLORS = {
        JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
        Java: "#b07219", "C++": "#f34b7d", Go: "#00ADD8", Rust: "#dea584",
        Ruby: "#701516", HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051",
    };

    const langColor = LANG_COLORS[repo.language] || "#888";

    return (
        <div className="repoCard">

            <div className="repoHeader">
                <span className="repoIcon">📁</span>
                <a className="repoName" href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                </a>
                <a className="repoLink" href={repo.html_url} target="_blank" rel="noreferrer" title="Open on GitHub">
                    ↗
                </a>
            </div>

            <p className="repoDesc">
                {repo.description || "No description provided."}
            </p>

            <div className="repoFooter">
                <span className="repoStat">⭐ {repo.stargazers_count.toLocaleString()}</span>
                <span className="repoStat">🍴 {repo.forks_count.toLocaleString()}</span>
                {repo.language && (
                    <span className="repoLang">
                        <span className="repoDot" style={{ background: langColor }} />
                        {repo.language}
                    </span>
                )}
                <span className="repoDate">
                    Updated {new Date(repo.updated_at).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                    })}
                </span>
            </div>

        </div>
    );
}