import express from 'express';
import cors from 'cors';
import os from 'os';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 1. Endpoint de Saúde e Monitoramento Real da Máquina
app.get('/api/status', (req, res) => {
  const freeMem = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
  const totalMem = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
  const uptimeHours = (os.uptime() / 3600).toFixed(1);

  res.json({
    status: 'ONLINE',
    servidor: 'Servidor Qualibra Local',
    sistema: `${os.type()} ${os.release()}`,
    porta: PORT,
    ipLocal: '192.168.191.204',
    memoriaLivreGB: `${freeMem} GB / ${totalMem} GB`,
    uptimeHoras: `${uptimeHours} horas`,
    timestamp: new Date().toISOString()
  });
});

// 2. Endpoint Real de Consulta CNPJ (Consome dados oficiais via BrasilAPI sem bloqueio de CORS)
app.get('/api/cnpj/:cnpj', async (req, res) => {
  const cnpjLimpo = req.params.cnpj.replace(/\D/g, '');

  if (cnpjLimpo.length !== 14) {
    return res.status(400).json({ error: 'CNPJ deve conter exatamente 14 dígitos numéricos.' });
  }

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'CNPJ não encontrado na base oficial da Receita Federal.' });
      }
      return res.status(response.status).json({ error: 'Erro ao consultar a base da Receita Federal.' });
    }
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Falha na comunicação com o serviço da Receita Federal.' });
  }
});

// 3. Endpoint Real de Consulta CEP
app.get('/api/cep/:cep', async (req, res) => {
  const cepLimpo = req.params.cep.replace(/\D/g, '');

  if (cepLimpo.length !== 8) {
    return res.status(400).json({ error: 'CEP deve conter exatamente 8 dígitos numéricos.' });
  }

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepLimpo}`);
    if (!response.ok) {
      return res.status(404).json({ error: 'CEP não localizado nos Correios.' });
    }
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Falha na comunicação com o serviço de CEP.' });
  }
});

// 4. Endpoint de Feriados Nacionais Oficiais
app.get('/api/feriados/:ano', async (req, res) => {
  const ano = req.params.ano || new Date().getFullYear();
  try {
    const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return res.json(data);
  } catch {
    return res.status(500).json({ error: 'Não foi possível carregar os feriados nacionais.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[BACKEND QUALIBRA] Rodando com sucesso na porta ${PORT}`);
  console.log(`[STATUS ENDPOINT] http://localhost:${PORT}/api/status`);
});