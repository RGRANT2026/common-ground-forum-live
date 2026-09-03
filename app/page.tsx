"use client";

import { useState } from "react";

type Space = { icon: string; name: string; members: string; color: string };

const spaces: Space[] = [
  { icon: "🌱", name: "Climate & Community", members: "12.4k members", color: "mint" },
  { icon: "🧠", name: "The Learning Loop", members: "8.1k members", color: "lavender" },
  { icon: "🏙️", name: "Better Cities", members: "6.8k members", color: "peach" },
  { icon: "⚖️", name: "Civic Commons", members: "4.2k members", color: "sky" }
];

const rules = [
  ["01", "Assume good intent", "Start by believing there’s a person worth understanding."],
  ["02", "Steelman before you challenge", "Summarize the strongest version of the other view."],
  ["03", "Bring your sources", "Link evidence and name what would change your mind."],
  ["04", "Make room", "Invite quieter voices and don’t turn the thread into a performance."],
  ["05", "Pause with care", "Use a timebox or take a breather when the heat rises."]
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("For you");
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [toast, setToast] = useState("");
  const [newSpace, setNewSpace] = useState("");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const toggle = (list: number[], setList: (v: number[]) => void, id: number) =>
    setList(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">✦</span><span>common<span className="brand-dot">.</span>ground</span></a>
        <div className="top-search"><span>⌕</span><input aria-label="Search" placeholder="Search conversations, spaces, people" /></div>
        <div className="top-actions"><button className="icon-button" aria-label="Notifications">♧<i /></button><button className="avatar">AR</button></div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <button className="new-space" onClick={() => setShowCreate(true)}><b>＋</b> Create a space</button>
          <nav className="nav" aria-label="Main navigation">
            <a className="nav-item active" href="#"><span>⌂</span> Home</a>
            <a className="nav-item" href="#rules"><span>✧</span> Healthy debate</a>
            <a className="nav-item" href="#"><span>◷</span> Your activity</a>
          </nav>
          <div className="sidebar-label"><span>Your spaces</span><button onClick={() => notify("Space manager coming soon")}>＋</button></div>
          <div className="space-list">{spaces.map((space) => <a className="space-link" href="#" key={space.name}><span className={`space-icon ${space.color}`}>{space.icon}</span><span>{space.name}<small>{space.members}</small></span></a>)}</div>
          <div className="sidebar-foot"><div className="mini-mentor">☼</div><div><strong>Need a reset?</strong><p>Try a 2-minute pause before replying.</p><button onClick={() => notify("Two-minute timer started")}>Start a timer <span>→</span></button></div></div>
        </aside>

        <section className="feed">
          <div className="welcome"><div><p className="eyebrow">THURSDAY, SEPTEMBER 3</p><h1>Good conversations<br /><em>start with curiosity.</em></h1><p className="welcome-copy">A place to think out loud, test ideas, and leave people feeling heard.</p></div><div className="welcome-art"><span>✦</span><div /></div></div>
          <div className="tabs" role="tablist">{["For you", "Following", "New & rising"].map((tab) => <button role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "selected" : ""} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div>
          <div className="composer"><div className="avatar small">AR</div><button onClick={() => notify("Composer opened — choose a space to begin")}>What are you thinking about?</button><div className="composer-actions"><button onClick={() => notify("Source prompt added")}>⌁ <span>Source</span></button><button onClick={() => notify("A 10-minute timebox is ready")}>◷ <span>Timebox</span></button></div></div>

          <Post id={1} space="The Learning Loop" spaceIcon="🧠" time="24 min ago" title="What’s a belief you changed your mind about?" body="I used to think changing your mind meant you weren’t confident. Now I see it as a sign that you’re paying attention. What’s something you see differently today—and what helped you get there?" tags={["#reflection", "#growth-mindset"]} liked={liked.includes(1)} saved={saved.includes(1)} onLike={() => toggle(liked, setLiked, 1)} onSave={() => toggle(saved, setSaved, 1)} onReport={() => setShowReport(true)} />
          <Post id={2} space="Climate & Community" spaceIcon="🌱" time="1 hr ago" title="Should cities charge for downtown parking?" body="I’m collecting perspectives for a neighborhood forum. If you support a fee, what should the revenue fund? If you oppose it, what alternative would reduce congestion?" tags={["#cities", "#policy"]} liked={liked.includes(2)} saved={saved.includes(2)} onLike={() => toggle(liked, setLiked, 2)} onSave={() => toggle(saved, setSaved, 2)} onReport={() => setShowReport(true)} debate />
        </section>

        <aside className="right-rail" id="rules">
          <section className="rail-card rules-card"><div className="card-heading"><span className="heading-icon">✦</span><div><p className="eyebrow">OUR NORTH STAR</p><h2>Healthy debate, by design</h2></div></div><p className="rail-intro">Disagreement is welcome here. Disrespect isn’t. These are the practices that keep our spaces useful.</p><div className="rules-list">{rules.map(([number, title, copy]) => <div className="rule" key={number}><span className="rule-number">{number}</span><div><strong>{title}</strong><p>{copy}</p></div></div>)}</div><button className="text-button" onClick={() => notify("Full community guide opened")}>Read the full community guide <span>↗</span></button></section>
          <section className="rail-card mediator-card"><div className="mediator-top"><div className="mediator-avatar">☼</div><span className="live-pill"><i /> 3 mediators online</span></div><h2>Feeling stuck in a thread?</h2><p>Ask a mediator to help slow things down, find common ground, or clarify what’s being said.</p><button className="outline-button" onClick={() => notify("Mediator request sent — someone will join shortly")}>Invite a mediator <span>→</span></button></section>
          <p className="footer-note">Built for better conversations · <a href="#rules">How it works</a></p>
        </aside>
      </div>

      {showCreate && <Modal title="Create a new space" onClose={() => setShowCreate(false)}><p className="modal-subtitle">Give people a welcoming place to explore one shared question.</p><label>Space name<input autoFocus value={newSpace} onChange={(e) => setNewSpace(e.target.value)} placeholder="e.g. Food for thought" /></label><label>What will you explore?<textarea placeholder="A short description of the conversations you want to host." /></label><button className="primary-button" onClick={() => { setShowCreate(false); notify(newSpace ? `"${newSpace}" is ready to set up` : "Let’s name your space first"); }}>Continue <span>→</span></button></Modal>}
      {showReport && <Modal title="Report with care" onClose={() => setShowReport(false)}><p className="modal-subtitle">Help us understand what happened. Reports are private and reviewed by our moderation team.</p><div className="report-options">{["Harassment or personal attack", "Misinformation or missing context", "Hate or discrimination", "Something else"].map((option) => <button key={option} onClick={() => { setShowReport(false); notify("Thanks — your report was sent for review"); }}>{option}<span>›</span></button>)}</div></Modal>}
      {toast && <div className="toast" role="status">✓ {toast}</div>}
    </main>
  );
}

function Post({ id, space, spaceIcon, time, title, body, tags, liked, saved, onLike, onSave, onReport, debate }: { id: number; space: string; spaceIcon: string; time: string; title: string; body: string; tags: string[]; liked: boolean; saved: boolean; onLike: () => void; onSave: () => void; onReport: () => void; debate?: boolean }) {
  return <article className="post"><div className="post-meta"><span className="post-space">{spaceIcon} {space}</span><span>·</span><span>{time}</span><button className="more" aria-label="More options">•••</button></div><h2>{title}</h2><p className="post-body">{body}</p><div className="tag-row">{tags.map((tag) => <span key={tag}>{tag}</span>)}{debate && <span className="guided-tag">Guided debate</span>}</div><div className="post-footer"><button className={liked ? "action liked" : "action"} onClick={onLike}>♡ <span>{liked ? "13" : "12"}</span></button><button className="action" onClick={() => window.alert("Reply composer opened")}>◌ <span>{debate ? "28" : "19"} replies</span></button><button className={saved ? "action saved" : "action"} onClick={onSave}>⚑ <span>{saved ? "Saved" : "Save"}</span></button><button className="action report" onClick={onReport}>⚐ <span>Report</span></button></div></article>;
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="modal"><button className="modal-close" onClick={onClose} aria-label="Close">×</button><h2>{title}</h2>{children}</div></div>;
}
