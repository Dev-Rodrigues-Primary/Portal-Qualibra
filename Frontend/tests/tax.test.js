import { test } from 'node:test';
import assert from 'node:assert/strict';

// Módulo ESM absoluto com caminho local pra Node. (Precisamos importar funções nativas do node no .js )
import { 
  calcularIrrfProgressivo, 
  calcularInssProgressivo, 
  calculateRescisaoCLTCompleto 
} from '../src/domain/taxCalculators.js';

test('[Motor Rígido INSS 25/RFB] - Tributo Base Fixa sobre Salario Minimo Limite Faixas Bruta ', (t) => {
    // Alvo Faixa 1 Absoluta: 1412 a aliquota pura
    const tetoMenorAmostragem = calcularInssProgressivo(1412.00); // 105.9! 
    assert.equal(tetoMenorAmostragem, 105.9, 'Base do RGPS erro. Verique arredondament do V8. INSS Incompativo C DAE/RFB ');
    
    // Extremo max
    const maxTetoS = calcularInssProgressivo(18500.52); 
    assert.equal(maxTetoS, 951.63, 'Seletividade Quebrada  No Limiter MaxTETO (Resta Garantit: Reto Invalidad Teto RGp)! ');
});

test('[Cerebro Matemático De Fechamento (IR Progressivos de Sobras/Ferias Limpo)]', (t) => {
     // A Dedução Maior deve Ser Escolhido(Ou A oficial base deduvies Dependent/Indenizatoria/INSS ... ou Custeio 564.8!) . O Dev EscolhEU as faixAs Da MP , Corretamente: .0 e ate os limites de parcela :    
    const salarioIRbaseDuroAmostrCebrosReals= calcularIrrfProgressivo( 3000 , 0 ); 
    // Matematics Interna: 3000 Base limpa entra... Tem Direto descnt  Maximos dos Dependent. ? nn Tem dependentes!. Cmp (Legal < 564? s. Simplificado Gaba!!) .. . 
    // Nova Base ir 3000 - 564.80  =  2435,2.  Cai Em: A 2435 ta  Entre Faixa1  ( <=  2826!).  Logo  Pega Base Nova(2435.2)*0.075 ! Menos! Descob Parcela =   Arit:  182,64 -169,44 =   Exato  R,20! O BRL TemQ ue dar Exato
    assert.strictEqual(salarioIRbaseDuroAmostrCebrosReals, 13.20 , 'Tributação Ir quebra Centava de Impost! . Recib eHoliterie e T-R-CT Errado ' )
    
    // Ir Base Izenta  (Faixa Abaix dedut)  Ret. deve Ser ZERO PONTO
    const BaseIZENTA_LIsSAndrErs_G = calcularIrrfProgressivo( 2259.00 );  
    assert.equal(BaseIZENTA_LIsSAndrErs_G, 0); 
});

test('[TRCT COMPLETO DO E-SOCIAL(Decomposicoes e CAIXAS PIS  T/Justicas Do dp) DP BRL Fixation Rigeros]!', () => {
    
   // Validacao ResciAcordo: Em um funcionario De Base R\$ 3500... Com  CAixa Saldo Antoho Rs R\.00 . ! Demissa Com JustAcordo %:  SOmamente ele Saca(Tanto Da Caixa Histot. Ou dos novos que Cairem Afora ) LIMITe DE oitenTA daS SomAs!!:
    const reCals= calculateRescisaoCLTCompleto({
          salarioBase: 3500, diasTrabalhadosMes: 15,
          motivo: 'acordo', meses13: 4,  
          feriasVencidasPeriodos: 0,  mesesFeriasProporcionais: 2 ,
          anosCompletosCasa: 1, 
          saldoFgts: 150 
     });
    
     // Tem de ta garantindo os centavos da Grra de Guia de empresa !: 
    const  TotalPendenteDecimoERestoTRT=   ( 3500/12 * 4  ) /*13 */ + (  (3500/30)*15) /* mes base normal */ + ((3500/30)* 33* 0.5 ) /*50 da Indeniiz */ ;  // Pq 50 ? = Porque Aviso PrevnoAcordo 1346/é METAdoE!. e eL Tem UM ANo de casa . E(Avsio MorteBase =30)+  +(3 d)= 33 
    // Somatoria das base Que A emresa deve GRRf =  AvIso=1925 + baseMesal(1750)+Dec = 1166 . == Somar =  4841.67
    // GRF  MES  =(  Somo*  0.08  )= 387.33 DE BASE INcide! ... 
    // Caixa Geral do Cara AtualziDa (387 + ! Os "Centr5O CinQn"   DE Historios do Parâmto q ele passou). TOTAL NA  CAIX : 537 . (Ganha 20 ! = DA Mlt  PagaR! :> Guia total 107. 4! + (387 de Guia Norm))  Total de BoLETI GUU =   ~R\  (Balanç do V8 Bato cRavo)! :
     
     assert.strictEqual( reCals.percentualMulta, 20  ); // ELe  pede JustO CAuS / e Accoro TST = Mutia = VInC(Atr,A!)! ;
     assert.equal( reCals.diasAviso , 33 , 'Avss projeca TST errotA'); 
     assert.equal( reCals.avisoPrevio,  1925 , 'Valor Incorroto Metato Lei! ') 
    
    // TST isent  Feria Totais (TRct E 13 , n ) //
    const irpfDasFErisaGanhadaProrprocoesDasRe_FerTrccisD = reCals.totalFeriasLiquido  ;
     assert.ok( irpfDasFErisaGanhadaProrprocoesDasRe_FerTrccisD > 0, "Sem Projencoes "); 

    assert.equal(reCals.bases.irpfMensal < 3500, true );   //  Mesal nao Soma ASisoe NEMFerios! : Tira isse  Da MAiia  ;     

}); 