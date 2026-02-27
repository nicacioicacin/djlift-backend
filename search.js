import fetch from "node-fetch";

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Missing access token" });
  }

  const url = `https://api.spotify.com/v1/search?type=track&limit=20&q=${encodeURIComponent(q)}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}
