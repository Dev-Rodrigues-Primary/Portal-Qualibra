# 🏛️ Grupo Qualibra — Portal de Inteligência Tributária, DP & Gestão (v3.4)

<p align="center">
  <img src="https://img.shields.io/badge/Vers%C3%A3o-3.4.0_Enterprise-059669?style=for-the-badge&logo=shield" alt="Version" />
  <img src="https://img.shields.io/badge/Legisla%C3%A7%C3%A3o-Vigente_2026-0284c7?style=for-the-badge&logo=balance-scale" alt="Legislação" />
  <img src="https://img.shields.io/badge/Stack-React_18_+_Vite_+_Node.js-10b981?style=for-the-badge&logo=react" alt="Tech Stack" />
  <img src="https://img.shields.io/badge/Infra-Ubuntu_Linux_•_Dell_T130-475569?style=for-the-badge&logo=dell" alt="Hardware" />
  <img src="https://img.shields.io/badge/VPN-ZeroTier_Mesh_Encrypted-ff6b00?style=for-the-badge&logo=zerotier" alt="ZeroTier" />
</p>

<p align="center">
  <strong>Hub Corporativo Unificado de Cálculos Fiscais, Inteligência Tributária, Rotinas de Departamento Pessoal e Gestão Operacional.</strong>
  <br />
  Desenvolvido com tolerância zero a desvios de arredondamento, compliance total perante a Receita Federal do Brasil (RFB), eSocial vS-1.2, FGTS Digital e diretrizes da Reforma Tributária (LC 214/2025).
</p>

---

## 📑 Sumário Executivo

- [Visão Geral & Arquitetura de Rede](#-visão-geral--arquitetura-de-rede)
- [Matriz de Inteligência Legal & Módulos](#-matriz-de-inteligência-legal--módulos)
  - [1. Transição da Reforma Tributária (IBS/CBS • LC 214/2025)](#1-transição-da-reforma-tributária-ibscbs--lc-2142025)
  - [2. Análise Estratégica do Fator R (LC 123/2006)](#2-análise-estratégica-do-fator-r-lc-1232006)
  - [3. Simples Nacional vs. Lucro Presumido (Lei nº 9.430/1996)](#3-simples-nacional-vs-lucro-presumido-lei-nº-94301996)
  - [4. Rescisão Contratual CLT (Padrão eSocial S-2299 & DCTFWeb)](#4-rescisão-contratual-clt-padrão-esocial-s-2299--dctfweb)
  - [5. Pró-Labore x Distribuição Isenta de Lucros (Teto RGPS 2026)](#5-pró-labore-x-distribuição-isenta-de-lucros-teto-rgps-2026)
  - [6. Comparador Estratégico CLT vs. PJ](#6-comparador-estratégico-clt-vs-pj)
  - [7. Agenda & Calendário Fiscal Perpétuo (2024–2099)](#7-agenda--calendário-fiscal-perpétuo-20242099)
  - [8. Protocolos de Conformidade Operacional (Laudos POP)](#8-protocolos-de-conformidade-operacional-laudos-pop)
  - [9. Emissor Estruturado de Documentos & Recibos em A4](#9-emissor-estruturado-de-documentos--recibos-em-a4)
  - [10. Repositório Institucional de Minutas e Tabelas Homologadas](#10-repositório-institucional-de-minutas-e-tabelas-homologadas)
  - [11. Diretório de Sistemas Governamentais Anti-Phishing](#11-diretório-de-sistemas-governamentais-anti-phishing)
  - [12. Canal de Inovação & Comunicação com a TI](#12-canal-de-inovação--comunicação-com-a-ti)
- [Estrutura do Repositório](#-estrutura-do-repositório)
- [Blindagem Aritmética & Precisão Decimal (Escudo DP)](#-blindagem-aritmética--precisão-decimal-escudo-dp)
- [Infraestrutura do Servidor (Dell PowerEdge T130)](#-infraestrutura-do-servidor-dell-poweredge-t130)
- [Acesso Seguro em Home Office (ZeroTier Mesh VPN)](#-acesso-seguro-em-home-office-zerotier-mesh-vpn)
- [Padrões de Interface (UI/UX) & Impressão A4](#-padrões-de-interface-uiux--impressão-a4)

---

## 🔭 Visão Geral & Arquitetura de Rede

O **Portal Grupo Qualibra** opera sob um modelo híbrido e desacoplado:

[ Usuário Home Office ] [ Usuário Escritório ] │ │ ▼ (VPN ZeroTier 192.168.191.x) ▼ (LAN Física 192.168.254.x)
┌─────────────────────────────────────────────────────────────┐
│ DELL POWEREDGE T130 (Ubuntu Server) │ │ │ │ Porta 80 (HTTP Padrão) │ │ ▲ NGINX (Reverse Proxy & Static Cache) │ │ │ │ │ ├──► / (Frontend SPA compilado: React 18 + Vite) │ │ │ (Execução 100% Client-Side com Latência de 0ms) │ │ │ │ │ └──► /api (Proxy Backend Node.js / Express na porta 3001) │ │ (APIs externas, telemetria de host e dados locais) │ └─────────────────────────────────────────────────────────────┘

1. **Frontend Desacoplado**: Single Page Application em **React 18** e **Vite 5**, estilizado com **Tailwind CSS 3** no tema *Executive Glassmorphism*. Cálculos fiscais e trabalhistas rodam na máquina do analista com latência zero.
2. **Camada de Domínio Puro (`/src/domain`)**: Funções matemáticas isoladas sem dependência de UI, permitindo auditoria independente e criação de testes automatizados (`node --test`).
3. **Servidor Web NGINX**: Escuta na porta 80 padrão, atendendo tanto a rede física local (`192.168.254.78`) quanto a interface virtual do ZeroTier (`192.168.191.236`), mapeado sob o domínio interno amigável `portalqualibra.local`.

---

## ⚖️ Matriz de Inteligência Legal & Módulos

### 1. Transição da Reforma Tributária (IBS/CBS • LC 214/2025)

- **Cronograma de Transição Oficial**:
  - **2026**: Fase de teste simbólica (CBS 0,9% + IBS 0,1% = 1,0%), integralmente compensável com tributos federais atuais.
  - **2027–2028**: Entrada da CBS integral em 8,8% (extinção definitiva de PIS e COFINS) e IBS mantido em 0,1%.
  - **2029–2032**: Escala decenal de transição com redução progressiva de 1/10 ao ano das parcelas de ICMS e ISS no DAS, substituídas pela elevação gradual do IBS.
  - **2033+**: Modelo definitivo plenamente integrado com alíquota estimada do IVA Dual em ~26,5%.
- **Decomposição do DAS Mantido**: Subtração exata das alíquotas de repartição do PIS/COFINS por anexo e faixa da LC 123/2006, preservando IRPJ, CSLL e CPP na guia unificada.
- **Não-Cumulatividade Plena**:

  $$\text{CBS/IBS Líquido a Pagar} = \max\Big(0, \big[(\text{Receita Serviços} + \text{Comércio}) \times \text{Alíquota IVA}\big] - \big[\text{Compras Creditáveis} \times \text{Alíquota IVA}\big]\Big)$$

- **Redutores Setoriais**: Suporte a deduções de 30% (profissões intelectuais e regulamentadas — Art. 138 LC 214) e 60% (serviços de saúde, educação e agronegócio).

### 2. Análise Estratégica do Fator R (LC 123/2006)

- **Régua Visual da Meta de 28%**:

  $$\text{Fator R} = \frac{\text{FS12 (Folha + Pró-Labore últimos 12 meses)}}{\text{RBT12 (Faturamento bruto últimos 12 meses)}} \ge 28,00\%$$

- **Enquadramento Dinâmico**: Desbloqueio automático do **Anexo III** (alíquota inicial de 6,00%) vs. permanência no **Anexo V** (alíquota inicial onerosa de 15,50%).
- **Tributação Marginal Consolidada (CNPJ vs. CPF)**:

  $$\text{Economia Líquida Real} = \Delta\text{DAS} - \Big(\Delta\text{INSS Incremental} + \Delta\text{IRPF Incremental}\Big)$$

- **Trava de Teto Previdenciário**: Opção para sócios que já recolhem sobre o teto do RGPS em outros vínculos, anulando o custo marginal de INSS.
- **Alerta de Malha Fiscal eSocial x PGDAS-D**: Aviso técnico orientando a conferência das 12 transmissões anteriores para evitar desenquadramento retroativo pela RFB.

### 3. Simples Nacional vs. Lucro Presumido (Lei nº 9.430/1996)

- **Comparativo de Encargos Previdenciários (CPP)**:
  - **Simples Nacional**: CPP Patronal inclusa na guia única nos Anexos I, III e V. No Anexo IV, recolhe 20% patronal à parte.
  - **Lucro Presumido**: Incidência de **~28,30% sobre folha de pagamento e pró-labore** (20% patronal + 2,5% RAT + 5,8% Terceiros/Sistema S).
- **Regra Trimestral Oficial (Lei nº 9.430/1996)**:
  - Demonstração dos **4 trimestres civis fechados** (31/03, 30/06, 30/09 e 31/12).
  - Cota de isenção do adicional de 10% do IRPJ fixada em **R$ 60.000,00 por trimestre** (R$ 240.000,00 anuais).
  - Alerta de sazonalidade para empresas com picos de faturamento concentrados.
- **Bases de Presunção Estritas**:
  - Serviços: 32% (IRPJ) e 32% (CSLL).
  - Comércio: 8% (IRPJ) e 12% (CSLL).
  - PIS (0,65%) e COFINS (3,00%) cumulativos sobre a receita bruta.

### 4. Rescisão Contratual CLT (Padrão eSocial S-2299 & DCTFWeb)

- **Aviso Prévio Proporcional (Lei nº 12.506/2011)**:

  $$\text{Dias de Aviso} = \min(90, 30 + [\text{Anos Completos de Casa} \times 3])$$

- **Segregação Rigorosa das Bases de Incidência do DP**:
  - **Competência Mensal (Saldo de Salário)**: Base isolada com apuração progressiva de INSS e IRPF com dedução legal/simplificada.
  - **Competência Exclusiva (13º Rescisório)**: Tributação definitiva exclusiva na fonte sem cumulatividade com a remuneração mensal.
  - **Verbas Indenizatórias Isentas**: Aviso prévio indenizado e todas as férias rescisórias (vencidas, proporcionais e 1/3 CF/88) são 100% isentas de INSS e IRPF (Súmula STJ).
- **Demissão por Acordo Consensual (Art. 484-A CLT)**:
  - Aviso prévio indenizado pago pela metade (50%);
  - Multa rescisória do FGTS reduzida para 20%;
  - Autorização de saque bancário na Caixa limitada a 80% do saldo da conta vinculada.
- **Painel FGTS Digital**: Segregação entre a **Guia da Empresa** (recolhida via Pix no portal FGTS Digital) e o **Saque do Trabalhador** liberado na Caixa.

### 5. Pró-Labore x Distribuição Isenta de Lucros (Teto RGPS 2026)

- **Teto do RGPS 2026**: Base máxima de contribuição de R$ 8.157,41, resultando no teto de retenção individual de **R$ 951,63** (14% progressivo / 11% autônomo).
- **Regra da Maior Dedução da Receita Federal (Lei nº 14.663/2023)**:

  $$\text{Dedução Efetiva} = \max\Big(\text{INSS Retido} + [\text{Dependentes} \times \text{R\$ 189,59}], \text{R\$ 564,80 (Desconto Simplificado)}\Big)$$

- **Isenção de Dividendos (Lei nº 9.249/95, Art. 10)**: Comparativo de retenção zero sobre lucros distribuídos amparados por escrituração contábil regular.

### 6. Comparador Estratégico CLT vs. PJ

- **Custo Global Contratante**: Mapeamento de encargos trabalhistas, provisões de 13º/Férias e benefícios de CCT (VR/VA, VT, Saúde).
- **Rendimento Líquido Profissional**: Remuneração líquida CLT (pós-INSS e IRPF) vs. Líquido PJ (pós-DAS Anexo III 6%, contabilidade e pró-labore mínimo).
- **Break-Even Point**: Cálculo do valor mínimo da nota fiscal de prestação de serviços para equiparação salarial.

### 7. Agenda & Calendário Fiscal Perpétuo (2024–2099)

- **Motor Matemático de Dias Úteis (Algoritmo de Meeus/Butcher)**:
  - Cálculo trigonométrico da Páscoa para qualquer ano do calendário civil.
  - Feriados móveis derivados: **Carnaval (-47 dias)**, **Sexta-Feira Santa (-2 dias)** e **Corpus Christi (+60 dias)**.
  - Feriados nacionais fixos: Mapeamento integral incluindo o novo feriado da **Consciência Negra (20/11 - Lei nº 14.759/2023)**.
- **Regras Oficiais de Vencimentos Bancários (Bacen / RFB)**:
  - **FGTS Digital**: Vence dia 20 e **ANTECIPA** para o dia útil imediatamente anterior (Art. 15 da Lei nº 8.036/90).
  - **DCTFWeb (DARF Único)**: Vence dia 20 e **ANTECIPA** (IN RFB nº 2.005/2021).
  - **PIS / COFINS / IPI**: Vence dia 25 e **ANTECIPA** (Art. 18 da Lei nº 11.933/2009 — último dia útil do 2º decêndio).
  - **DAS Simples Nacional**: Vence dia 20 e **POSTERGA** para o primeiro dia útil seguinte (Resolução CGSN nº 140/2018).
- **Seletor de Praça Tributária Regional**:
  - Opção **São Paulo (SP)** com inclusão do feriado estadual de **09 de Julho (Revolução Constitucionalista)** e **25 de Janeiro (Aniversário da Capital)**.
- **Dupla Visualização**: Alternador instantâneo entre **Grade Mensal 7x5 (Calendar Grid)** e **Lista de Auditoria**.

### 8. Protocolos de Conformidade Operacional (Laudos POP)

- **Gestão de Rotinas com Vinculação ao Cliente**:
  - Entrada de Razão Social, CNPJ/CPF, Analista Responsável e Data de Execução.
- **Procedimentos Homologados com Base Legal**:
  - *Constituição & Abertura de Empresa* (Junta Comercial, DBE/RFB, SEFAZ, CCM, e-CNPJ, Opção Simples — DREI 81, IN 2.119).
  - *Admissão de Colaborador CLT* (eSocial S-2190/S-2200, ASO Admissional, CTPS Digital — Portaria MTP 671).
  - *Desligamento Contratual* (eSocial S-2299, ASO Demissional, FGTS Digital Pix — CLT Art. 477).
  - *Fechamento Mensal Fiscal* (SPED, PGDAS-D, Reinf, DCTFWeb, Conciliação).
- **Gestão de Múltiplos Protocolos**: Persistência no `localStorage` por cliente para recuperação e auditoria.
- **Emissão de Laudo Técnico A4**: Impressão de folha timbrada formal com hash de rastreabilidade (`POP-XXXXX`) e campos de assinatura do analista e do cliente.

### 9. Emissor Estruturado de Documentos & Recibos em A4

- **Download Real em Formato Word (.doc)**: Geração direta via Blob de documentos formatados em HTML com cabeçalho timbrado Qualibra, compatíveis com Microsoft Word e Google Docs.
- **Motor Próprio de Valor por Extenso**: Conversão algorítmica de qualquer valor monetário para texto formal em Reais e centavos.
- **Modelos Homologados**: Recibos de quitação financeira, termos de entrega de documentos e recibos de honorários contábeis.
- **Carimbo de Autenticidade Digital**: Registro de código de validação único (`QUALIBRA-DOC-XXXXX`).

### 10. Repositório Institucional de Minutas e Tabelas Homologadas

- **Modelos Aderentes ao Conselho Federal de Contabilidade (CFC)**:
  - Contrato de Prestação de Serviços Contábeis (Resolução CFC nº 1.590/2020 com adequação à LGPD).
  - Termo de Transferência de Responsabilidade Técnica / Distrato (Resolução CFC nº 1.493/2015).
  - Procuração Eletrônica da Receita Federal / e-CAC com poderes específicos.
  - Declaração de Faturamento dos últimos 12 meses para concessão de crédito bancário.
  - Termo de Ciência e Opção do Regime Híbrido da Reforma Tributária (LC 214/2025).
- **Download Direto**: Exportação em arquivo Word (.doc) e botão de cópia rápida para e-mail/WhatsApp.

### 11. Diretório de Sistemas Governamentais Anti-Phishing

- **Segurança Operacional**: Links diretos validados exclusivamente com certificado TLS/HTTPS em domínios oficiais `.gov.br` e `.sp.gov.br`.
- **Badges de Autenticação Requerida**: Identificação de exigência de Certificado Digital (e-CNPJ/e-CPF), Gov.br Prata/Ouro ou Consulta Pública Livre.
- **Acessos Rápidos**: e-CAC, PGDAS-D, eSocial Web, FGTS Digital, Sintegra/CCC, Posto Fiscal Eletrônico SEFAZ-SP, REDESIM, JUCESP, Portal Nacional da NFS-e, CND Conjunta RFB/PGFN e CRF do FGTS na Caixa.

### 12. Canal de Inovação & Comunicação com a TI

- **Disparo Real via Protocolo `mailto:`**: Integração direta com a caixa técnica `suporte.TI@qualibra.com.br`, abrindo o cliente corporativo (Outlook/Webmail) com assunto e corpo pré-estruturados.
- **Copiar Chamado**: Função de cópia com um clique para envio da proposta via Microsoft Teams ou chat interno.
- **Critérios de Triagem**: Diretrizes transparentes da TI para priorização de novas calculadoras fiscais.

---

## 📁 Estrutura do Repositório

```text
C:\Users\DR\Documents\DEV\PQ\
├── Backend\
│   ├── package.json               # Dependências do serviço Node.js
│   └── server.js                  # Proxy local e telemetria (Porta 3001)
├── Frontend\
│   ├── public\
│   │   ├── logo.png               # Assinatura visual oficial do Grupo Qualibra
│   │   └── favicon.ico
│   ├── src\
│   │   ├── components\
│   │   │   ├── common\            # Canvas ambiental, Modais de Homologação, Inputs
│   │   │   ├── layout\            # Navbar ultra-glass, Footer com selos compliance, MainLayout
│   │   │   └── navigation\        # Breadcrumbs analíticos
│   │   ├── context\               # PortalContext (Favoritos, Recentes, LocalStorage)
│   │   ├── domain\                # MOTORES PUROS DE CÁLCULO FISCAL E TRABALHISTA
│   │   │   ├── taxCalculators.js  # Motor tributário (LC 123/06, LC 214/25, CLT, DP Shield)
│   │   │   ├── fiscalCalendarData.js # Motor perpétuo de dias úteis (2024-2099) e praças
│   │   │   ├── checklistData.js   # POPs operacionais com base legal
│   │   │   └── portalRegistry.js  # Catálogo mestre unificado de ferramentas
│   │   ├── features\              # Módulos operacionais do sistema
│   │   │   ├── dashboard\         # Hub central de acesso
│   │   │   ├── reforma\           # Simulador LC 214/2025 (Regime Híbrido vs Puro)
│   │   │   ├── fatorR\            # Análise do Fator R com régua visual e custo no CPF
│   │   │   ├── simplesPresumido\  # Comparador com decomposição trimestral Lei 9.430/96
│   │   │   ├── rescisao\          # Rescisão CLT com segregação de bases do eSocial
│   │   │   ├── prolabore\         # Pró-Labore x Lucros com teto RGPS e dedução RFB
│   │   │   ├── comparadores\      # Comparador executivo CLT vs PJ
│   │   │   ├── calendario\        # Calendário Fiscal com Grade Mensal e Praça SP
│   │   │   ├── checklists\        # Emissor de Laudo de Conformidade Operacional (POP)
│   │   │   ├── geradores\         # Emissor de Recibos em A4 com valor por extenso
│   │   │   ├── documentos\        # Repositório de Minutas CFC com download Word (.doc)
│   │   │   ├── sistemas\          # Diretório oficial governamental anti-phishing
│   │   │   ├── ti\                # Central de infraestrutura e conectividade
│   │   │   └── ideias\            # Canal de inovação com disparo mailto
│   │   ├── utils\                 # formatters.js (BRL, %, parser seguro)
│   │   ├── App.jsx                # Definição de rotas principais
│   │   ├── index.css              # Estilos globais Tailwind e regras de @media print
│   │   └── main.jsx               # Ponto de entrada React 18
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🛡️ Blindagem Aritmética & Precisão Decimal (Escudo DP)

O JavaScript nativamente opera aritmética de ponto flutuante sob a norma IEEE 754, gerando anomalias residuais como 0.1 + 0.2 = 0.30000000000000004. Em aplicações tributárias corporativas, esse resíduo pode causar divergências de R$ 0,01 em guias de recolhimento, ocasionando inconsistências em declarações como DCTFWeb e PGDAS-D.

Para eliminar essa vulnerabilidade, o domínio do portal utiliza o Escudo Decimal de Precisão (DP):

```javascript
const DP = (v) => {
  if (isNaN(v) || typeof v !== 'number' || !isFinite(v) || v < 0) return 0;
  return Math.round((v + Number.EPSILON) * 100) / 100;
};
```

Todas as somas parciais, deduções progressivas e alíquotas efetivas passam obrigatoriamente por essa blindagem antes de serem acumuladas, garantindo conformidade matemática idêntica aos ERPs contábeis e sistemas da Receita Federal.

## 🖥️ Infraestrutura do Servidor (Dell PowerEdge T130)

O portal está implantado em ambiente on-premise no servidor corporativo do escritório:

- Hardware: Dell PowerEdge T130 (Intel Xeon, Memória ECC)
- Sistema Operacional: Ubuntu Server 24.04 LTS (Linux)
- Servidor Web: NGINX 1.28 como Proxy Reverso na porta 80
- Serviço de Aplicação: Node.js gerenciado via systemd (`portal-qualibra.service`) na porta interna 3001
- Endereço Físico (LAN Escritório): `http://192.168.254.78`
- Endereço Virtual Seguro (ZeroTier): `http://192.168.191.236`
- Domínio Local Homologado: `http://portalqualibra.local` (Porta 80 padrão, sem necessidade de informar portas adicionais)

### Configuração do NGINX (`/etc/nginx/sites-available/qualibra`)

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name portalqualibra.local 192.168.191.236 192.168.254.78 _;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🌐 Acesso Seguro em Home Office (ZeroTier Mesh VPN)

Para viabilizar o trabalho remoto dos colaboradores sem expor o servidor à internet aberta (sem necessidade de abertura de portas no roteador de borda ou contratação de IP público fixo), o portal integra-se à rede privada virtual do Grupo Qualibra:

- Network ID Oficial: `856127940c12585d` (QualibraAWS)
- Node ID do Servidor T130: `fcff4d53fb`
- IP Atribuído ao Servidor: `192.168.191.236`
- Criptografia: Criptografia ponta a ponta assimétrica de 256 bits (Curve25519 e Salsa20).

### Roteiro de Conexão para o Colaborador Remoto

1. Instalar o cliente do ZeroTier One na estação de trabalho remota (`zerotier.com/download`).
2. Ingressar na rede corporativa informando o Network ID: `856127940c12585d`.
3. Solicitar autorização ao administrador técnico no painel ZeroTier Central.
4. **Mapeamento Amigável (Opcional, porém recomendado):** Adicionar no arquivo `C:\Windows\System32\drivers\etc\hosts` da máquina cliente:

   ```text
   192.168.191.236   portalqualibra.local
   ```

5. Abrir o navegador e navegar diretamente para `http://portalqualibra.local` (ou `http://192.168.191.236`).

## 🎨 Padrões de Interface (UI/UX) & Impressão A4

- **Tema Executivo Glassmorphism**: Uso de paleta corporativa slate-900 e acentos institucionais Qualibra Emerald (`#059669`), com painéis translúcidos em `backdrop-blur-xl` e microbordas refinadas.
- **Atalhos Globais**: Pressione `/` em qualquer tela para abrir a busca rápida (Spotlight) em todo o catálogo de ferramentas e POPs.
- **Telemetria de Conexão em Tempo Real**: Indicador dinâmico de latência no cabeçalho com calibração otimizada para conexões locais e VPNs de Home Office:
  - Verde (`< 120ms`): Conexão Excelente / Operação Fluida.
  - Amarelo (`120ms a 250ms`): Conexão Aceitável.
  - Vermelho (`> 250ms`): Instabilidade ou desconexão.
- **Impressão Profissional (`@media print`)**:
  - Todos os módulos dispõem de formatação exclusiva para impressora e exportação em PDF.
  - Ao emitir o comando de impressão (`Ctrl + P`), o CSS oculta automaticamente menus, barras de pesquisa, botões de ação e rodapés da web, imprimindo unicamente o relatório analítico em folha A4 limpa com papel timbrado oficial.

## 🔒 Conformidade & Privacidade (LGPD)

O Portal Qualibra opera estritamente em ambiente local restrito, cumprindo as disposições da Lei Geral de Proteção de Dados (Lei nº 13.709/2018):

- Não utiliza cookies de rastreamento de terceiros (trackers);
- Não envia dados cadastrais ou financeiros de clientes para servidores públicos em nuvem;
- Utiliza armazenamento local no navegador (`localStorage`) exclusivamente para preferências de interface e protocolos do terminal;
- Acesso remoto 100% blindado por criptografia de nível militar através de malha virtual privada.

© 2026 GRUPO QUALIBRA CONTABILIDADE • Auditores & Consultores Tributários
'@

[IO.File]::WriteAllText($readmePath, $readmeContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ README.MD ATUALIZADO COM SUCESSO! RIGOR TÉCNICO E DOCUMENTAÇÃO DEFINITIVA." -ForegroundColor Green
