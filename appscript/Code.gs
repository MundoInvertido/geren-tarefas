// =============================================
// Google Apps Script — Backend do Gerenciador
// =============================================
// Deploy como Web App:
// 1. No editor, vá em Deploy > Nova implantação
// 2. Tipo: App da Web
// 3. Executar como: Eu
// 4. Quem pode acessar: Qualquer pessoa
// 5. Copie a URL e cole no index.html

const SHEET_NAME = 'Tarefas';

/**
 * Inicializa a planilha com cabeçalhos se necessário
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['id', 'date', 'startTime', 'endTime', 'title', 'tags', 'completed']);
  }
  return sheet;
}

/**
 * GET — Retorna todas as tarefas como JSON
 */
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      return buildJsonResponse({ success: true, tasks: [] });
    }

    const headers = data[0];
    const tasks = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0]) continue; // pular linhas vazias

      tasks.push({
        id: String(row[0]),
        date: String(row[1]),
        startTime: String(row[2]),
        endTime: String(row[3]),
        title: String(row[4]),
        tags: row[5] ? JSON.parse(row[5]) : [],
        completed: row[6] === true || row[6] === 'true'
      });
    }

    return buildJsonResponse({ success: true, tasks: tasks });
  } catch (error) {
    return buildJsonResponse({ success: false, error: error.message });
  }
}

/**
 * POST — Recebe array de tarefas e sobrescreve a planilha
 */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const tasks = body.tasks || [];

    const sheet = getOrCreateSheet();

    // Limpar dados antigos (preservar cabeçalho)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, 7).clearContent();
    }

    // Escrever novas tarefas
    if (tasks.length > 0) {
      const rows = tasks.map(t => [
        t.id,
        t.date,
        t.startTime,
        t.endTime,
        t.title,
        JSON.stringify(t.tags || []),
        t.completed ? 'true' : 'false'
      ]);
      sheet.getRange(2, 1, rows.length, 7).setValues(rows);
    }

    return buildJsonResponse({ success: true, count: tasks.length });
  } catch (error) {
    return buildJsonResponse({ success: false, error: error.message });
  }
}

/**
 * Helper para retornar JSON com CORS correto
 */
function buildJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
