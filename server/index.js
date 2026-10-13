import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4001;
app.use(cors());
app.use(express.json());

const timeline = [
  { year: '1866', title: 'First successful trial', detail: 'A pneumatic telegraph connection was tested between the Bourse post office and the Grand Hôtel.' },
  { year: '1867', title: 'Early expansion', detail: 'The first connections helped establish the potential of pneumatic message transport in the city.' },
  { year: '1879', title: 'Public service begins', detail: 'The pneumatic postal service opened to public correspondence.' },
  { year: '1933', title: 'Network at major scale', detail: 'Historical accounts describe a network extending to approximately 427 kilometres of tubes.' },
  { year: '1945', title: 'Wartime communications', detail: 'Pneumatic post continued to serve urban communication needs during the period.' },
  { year: '1984', title: 'Service closes', detail: 'The Paris public pneumatic postal network closed on 30 March 1984.' }
];

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'Paris Pneumatic Post API' }));
app.get('/api/timeline', (_req, res) => res.json(timeline));
app.post('/api/simulation', (req, res) => {
  const pressure = Number(req.body?.pressure);
  const area = Number(req.body?.area);
  if (!Number.isFinite(pressure) || !Number.isFinite(area) || pressure < 0 || area < 0) {
    return res.status(400).json({ error: 'Pressure difference and area must be non-negative numbers.' });
  }
  res.json({ pressure, area, force: pressure * area, unit: 'N', note: 'Ideal pressure-force estimate; actual motion depends on friction, leakage, geometry and air resistance.' });
});

app.listen(PORT, () => console.log(`Paris Pneumatic Post API running on http://localhost:${PORT}`));