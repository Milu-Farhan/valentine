import { PROMISES } from "../../data/constants";

export default function PromisesSection() {
  return (
    <div className="promises-section">
      <p className="promises-title">My Promises to You 🤞</p>
      <div className="promises-list">
        {PROMISES.map((promise, i) => (
          <p key={i} className={`promise-item promise-${i + 1}`}>
            <span className="promise-icon">💫</span>{promise}
          </p>
        ))}
      </div>
    </div>
  );
}
