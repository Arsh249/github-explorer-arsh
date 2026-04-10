export default function Error({ message }) {
  return (
    <div className="error-box">
      <p>❌ {message || "Something went wrong"}</p>
    </div>
  );
}