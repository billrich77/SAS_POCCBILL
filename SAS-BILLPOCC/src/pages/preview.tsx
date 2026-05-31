import { useEffect, useState } from "react";

interface ImageResult {
  thumbnail: string;
  title: string;
  author: string;
  rating: number;
  reviews: string;
  downloads: string;
}

interface SerpApiResponse {
  app_highlight: ImageResult;
}

function Preview() {
  // const [data, setData] = useState(null);
  const [data, setData] = useState<SerpApiResponse | null>(null);
  // const API_KEY =
  //   "cb78d842a104c3b9581a6e1558d30de49fb8fc1733a57b6b14cdcacedc675f9a";

  useEffect(() => {
    // const serpUrl =
    //   "https://serpapi.com/search?engine=google_play&q=brawl+stars&hl=en&api_key=" +
    //   API_KEY;

    // fetch("https://corsproxy.io/?" + encodeURIComponent(serpUrl))
     const queryString = new URLSearchParams(params).toString()
     fetch(`/api/search?${queryString}`)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return (
      <div style={styles.loading}>
        Loading Game Store...
      </div>
    );
  }

  const app = data?.app_highlight;
  const apps = data?.organic_results?.[0]?.items || [];

  return (
    <div style={styles.page}>
    
      <h1 style={styles.header}>🎮 Game Store</h1>

      
      {app && (
        <div style={styles.hero}>
          <img src={app.thumbnail} alt={app.title} style={styles.heroImg} />

          <div>
            <h2 style={styles.title}>{app.title}</h2>

            <p style={styles.text}>👨‍💻 {app.author}</p>

            <p style={styles.text}>
              ⭐ {app.rating} • {app.reviews?.toLocaleString()} reviews
            </p>

            <p style={styles.text}>📥 {app.downloads}</p>

            <button style={styles.button}>Install</button>
          </div>
        </div>
      )}

     
      <h3 style={styles.section}>🔥 Similar Games</h3>

      {/* GRID */}
      <div style={styles.grid}>
        {apps.map((item, i) => (
          <div key={i} style={styles.card}>
            <img src={item.thumbnail} style={styles.icon} />

            <div style={styles.cardTitle}>{item.title}</div>

            <div style={styles.small}>{item.author}</div>

            <div style={styles.small}>⭐ {item.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


const styles = {
  page: {
    fontFamily: "Arial",
    minHeight: "100vh",
    padding: 20,
    background: "radial-gradient(circle at top, #1a1f2b, #0b0e14)",
    color: "#fff",
  },

  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#aaa",
    fontSize: 18,
    background: "#0b0e14",
  },

  header: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 28,
    letterSpacing: 1,
  },

  hero: {
    display: "flex",
    gap: 20,
    background: "linear-gradient(145deg, #1b2230, #121723)",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    border: "1px solid #2a3244",
  },

  heroImg: {
    width: 110,
    height: 110,
    borderRadius: 18,
    boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
  },

  title: {
    margin: 0,
    fontSize: 20,
  },

  text: {
    margin: "4px 0",
    color: "#b7c0d1",
    fontSize: 14,
  },

  button: {
    marginTop: 10,
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, #4f7cff, #2d5bff)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(45, 91, 255, 0.4)",
  },

  section: {
    marginTop: 30,
    fontSize: 18,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 16,
    marginTop: 12,
  },

  card: {
    background: "linear-gradient(145deg, #1a2130, #111623)",
    padding: 14,
    borderRadius: 14,
    textAlign: "center",
    border: "1px solid #2a3244",
    transition: "0.2s",
    cursor: "pointer",
  },

  icon: {
    width: 64,
    height: 64,
    borderRadius: 14,
    marginBottom: 8,
    boxShadow: "0 8px 15px rgba(0,0,0,0.4)",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },

  small: {
    fontSize: 12,
    color: "#9aa4b2",
  },
};

export default Preview;