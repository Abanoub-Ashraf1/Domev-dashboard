export default function StatsStrip({ pendingCount, chargers }) {
  const { total, verified, notVerified } = chargers;
  const share = (n) => (total ? `${(n / total) * 100}%` : "0%");

  const items = [
    { key: "pending", label: "Pending reviews", value: pendingCount },
    { key: "total", label: "Chargers", value: total },
    { key: "verified", label: "Verified", value: verified },
    { key: "unverified", label: "Not verified", value: notVerified },
  ];

  return (
    <section className="stats" aria-label="Summary">
      <dl className="stats__list">
        {items.map((item) => (
          <div key={item.key} className={`stats__item stats__item--${item.key}`}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      <div className="stats__bar" role="img" aria-label={`${verified} of ${total} chargers verified`}>
        <span className="stats__seg stats__seg--accepted" style={{ width: share(verified) }} />
      </div>
    </section>
  );
}
