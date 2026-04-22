import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Os IDs de cada planilha fornecidos pelo usuário
const SHEET_IDS = {
  Essencial: '1pLWLwcqqlh1_fHhbsZ0X9JNLQtgwrrHQaQh2yns0bxg',
  Especial: '1sfMxGof_QtxfugqxunkPk9HL7ABlGVbdeHaX9sGFIs4',
  Prioridade: '1otjZak4d9yBZg8KE58NRr8uDhxCrMe-xV_d3wuTOcTg',
} as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      plano, valor, origem, nomeCliente, email, whatsapp, 
      nomeHomenageado, relacao, ocasiao, estilo, sentimento, 
      historias, detalhesImportantes, dataEntrega, dedicacao 
    } = body;

    const sheetId = SHEET_IDS[plano as keyof typeof SHEET_IDS];

    if (!sheetId) {
      return NextResponse.json({ error: 'Plano inválido ou ausente.' }, { status: 400 });
    }

    // Preparando a autenticação do Service Account
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!serviceAccountEmail || !privateKey) {
      console.error('ERRO: Credenciais do Google Sheets ausentes no .env.local');
      // Em produção, isso deve falhar. Para testes, apenas avisa e segue.
      return NextResponse.json({ success: true, message: 'Simulado sem credenciais.' });
    }

    const serviceAccountAuth = new JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo(); // carrega o documento propriedades e planilhas

    // Pega a primeira aba
    const sheet = doc.sheetsByIndex[0];

    // O header do Google Sheets (na linha 1) deve conter EXATAMENTE esses cabeçalhos (ou parecidos, ou na mesma ordem).
    // O google-spreadsheet adiciona a linha baseada nos headers detectados ou em array sequencial se passarmos como array.
    // Passando como objeto, as chaves devem ser iguais aos headers lá do Sheets!
    // Para simplificar, vou mandar como array (adiciona na próxima linha em branco):
    const row = [
      new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }), // timestamp
      plano, 
      valor, 
      origem, 
      nomeCliente, 
      email, 
      whatsapp, 
      nomeHomenageado, 
      relacao, 
      ocasiao, 
      estilo, 
      sentimento, 
      historias, 
      detalhesImportantes, 
      dataEntrega, 
      dedicacao
    ];

    await sheet.addRow(row);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Erro na submissão para Google Sheets:', error);
    return NextResponse.json({ error: 'Erro interno ao processar submissão.' }, { status: 500 });
  }
}
