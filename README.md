# 🏛️ Grupo Qualibra — Portal Operacional de Ferramentas & Rotinas (v3.0)

<p align="center">
  <img src="https://img.shields.io/badge/Vers%C3%A3o-3.0.0_Enterprise-059669?style=for-the-badge&logo=shield" alt="Version" />
  <img src="https://img.shields.io/badge/Legisla%C3%A7%C3%A3o-Vigente_2026-0284c7?style=for-the-badge&logo=balance-scale" alt="Legislação" />
  <img src="https://img.shields.io/badge/Stack-React_18_+_Node.js-10b981?style=for-the-badge&logo=react" alt="Tech Stack" />
  <img src="https://img.shields.io/badge/Infra-Dell_PowerEdge_T130-475569?style=for-the-badge&logo=dell" alt="Hardware" />
  <img src="https://img.shields.io/badge/VPN-ZeroTier_Mesh-ff6b00?style=for-the-badge&logo=zerotier" alt="ZeroTier" />
</p>

<p align="center">
  <strong>Hub Corporativo Unificado de Cálculos Fiscais, Inteligência Tributária, Rotinas de Departamento Pessoal e Gestão Operacional.</strong>
  <br />
  Projetado para eliminar retrabalho, blindar a conformidade jurídica perante a RFB/eSocial e acelerar a tomada de decisão executiva.
</p>

---

## 📑 Sumário

- [Visão Geral & Arquitetura](#-visão-geral--arquitetura)
- [Matriz de Inteligência Legal & Módulos](#-matriz-de-inteligência-legal--módulos)
  - [1. Simulador da Reforma Tributária (LC 214/2025 & LC 215/2025)](#1-simulador-da-reforma-tributária-lc-2142025--lc-2152025)
  - [2. Análise Estratégica do Fator R (LC 123/2006)](#2-análise-estratégica-do-fator-r-lc-1232006)
  - [3. Simples Nacional vs. Lucro Presumido](#3-simples-nacional-vs-lucro-presumido)
  - [4. Simulador Rescisório CLT (Padrão eSocial/DCTFWeb)](#4-simulador-rescisório-clt-padrão-esocialdctfweb)
  - [5. Pró-Labore x Distribuição Isenta de Lucros](#5-pró-labore-x-distribuição-isenta-de-lucros)
  - [6. Comparador Corporativo CLT vs. PJ](#6-comparador-corporativo-clt-vs-pj)
  - [7. Diagnóstico Tributário & Auditoria de GAP](#7-diagnóstico-tributário--auditoria-de-gap)
  - [8. Gerador Estruturado de Termos e Recibos](#8-gerador-estruturado-de-termos-e-recibos)
  - [9. Calendário Fiscal Dinâmico (2026)](#9-calendário-fiscal-dinâmico-2026)
  - [10. TI, Conectividade & Mapeamento SMB](#10-ti-conectividade--mapeamento-smb)
  - [11. Canal de Inovação & Ideias](#11-canal-de-inovação--ideias)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Instalação & Execução Local](#-instalação--execução-local)
- [Deploy Corporativo no Dell PowerEdge T130](#-deploy-corporativo-no-dell-poweredge-t130)
- [Acesso Remoto via ZeroTier (Home Office)](#-acesso-remoto-via-zerotier-home-office)
- [Padrões de Interface (UI/UX) & Impressão (@media print)](#-padrões-de-interface-uiux--impressão-media-print)

---

## 🔭 Visão Geral & Arquitetura

O **Portal Grupo Qualibra** foi construído com separação estrita de responsabilidades:
1. **Frontend Desacoplado**: Single Page Application (SPA) em **React 18** e **Vite 5**, com estilização em **Tailwind CSS 3** utilizando o tema *Clean Executive Glassmorphism*. Cálculos em tempo de execução a **0ms** com tolerância zero a erros de arredondamento.
2. **Camada de Domínio Puro (`/src/domain`)**: Motores matemáticos isolados de frameworks visuais, permitindo auditoria tributária independente.
3. **Backend Proxy (`/Backend`)**: Microsserviço leve em **Node.js/Express** para contornar restrições de CORS ao consumir APIs públicas governamentais (BrasilAPI, Receita Federal) e expor telemetria da máquina host.

```mermaid
graph TD
    User([Usuário / Navegador]) -->|Porta 5173| Frontend[React 18 + Vite SPA]
    Frontend --> Domain[Motores Fiscais / Domain Math]
    Frontend --> LocalStorage[(LocalStorage Cache)]
    Frontend -->|Porta 3001| Backend[Node.js Express API]
    Backend --> OS[Telemetria Host / T130]
    Backend --> ExtAPIs[BrasilAPI / Receita Federal]
    User -.->|ZeroTier Mesh VPN| LAN[Rede Local Qualibra 192.168.191.x]
