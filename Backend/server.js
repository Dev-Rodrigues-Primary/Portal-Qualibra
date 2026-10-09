import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = '127.0.0.1'; // Escuta apenas localmente

app.use(express.json({ limit: '100kb' }));

app.get('/api/status', (req, res) => {
  res.json({ status: 'ONLINE', timestamp: new Date().toISOString() });
});

app.get('/api/cnpj/:cnpj', async (req, res) => {
  const cnpjLimpo = (req.params.cnpj || '').replace(/\D/g, '');
  if (cnpjLimpo.length !== 14) return res.status(400).json({ error: 'CNPJ inválido' });
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
    if (!response.ok) return res.status(response.status).json({ error: 'Não encontrado' });
    const data = await response.json();
    return res.json(data);
  } catch {
    return res.status(502).json({ error: 'Falha na consulta' });
  }
});

app.get('/api/cep/:cep', async (req, res) => {
  const cepLimpo = (req.params.cep || '').replace(/\D/g, '');
  if (cepLimpo.length !== 8) return res.status(400).json({ error: 'CEP inválido' });
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepLimpo}`);
    if (!response.ok) return res.status(404).json({ error: 'Não encontrado' });
    const data = await response.json();
    return res.json(data);
  } catch {
    return res.status(502).json({ error: 'Falha na consulta' });
  }
});

const IDEIAS_FILE = path.join(__dirname, 'data', 'ideias_sugestoes.json');
app.post('/api/ideias', (req, res) => {
  const { nome, setor, emailRemetente, titulo, descricao } = req.body || {};
  if (!nome || !emailRemetente || !titulo || !descricao) {
    return res.status(400).json({ error: 'Campos incompletos' });
  }
  const novaIdeia = { id: Date.now().toString(), data: new Date().toISOString(), nome, setor, email: emailRemetente, titulo, descricao };
  try {
    const dir = path.dirname(IDEIAS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    let lista = fs.existsSync(IDEIAS_FILE) ? JSON.parse(fs.readFileSync(IDEIAS_FILE, 'utf-8')) : [];
    lista.unshift(novaIdeia);
    fs.writeFileSync(IDEIAS_FILE, JSON.stringify(lista.slice(0, 500), null, 2), 'utf-8');
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Erro ao salvar' });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`[QUALIBRA BACKEND] Ativo em http://${HOST}:${PORT}`);
});