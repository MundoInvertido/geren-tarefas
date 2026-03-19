# 📋 Planner de Alta Performance

Gerenciador de tarefas com blocos de foco, análise de desempenho e sincronização com Google Sheets.

🔗 **Acesse:** [https://mundoinvertido.github.io/geren-tarefas/](https://mundoinvertido.github.io/geren-tarefas/)

## Funcionalidades

- ✅ **Blocos de foco** com horário de início/fim e tags
- 📊 **Análise de desempenho** por dia e categoria
- 🔄 **Drag & Drop** para reordenar tarefas entre dias
- 📅 **Vista Lista e Calendário**
- 📥 **Importar/Exportar** no formato TickTick
- 💾 **Salvar localmente** (localStorage — funciona offline)
- ☁️ **Sincronizar com Google Sheets** via Google Apps Script
- 🔄 **Auto-sync** com debounce de 2 segundos

## Como Configurar a Sincronização com Google Sheets

### 1. Criar a Planilha
- Crie uma nova planilha no [Google Sheets](https://sheets.new)
- Dê um nome qualquer (ex: "Planner Tarefas")

### 2. Criar o Apps Script
- Na planilha, vá em **Extensões > Apps Script**
- Apague o código padrão e cole o conteúdo do arquivo [`appscript/Code.gs`](appscript/Code.gs)
- Salve (Ctrl+S)

### 3. Publicar como Web App
- No editor do Apps Script, clique em **Implantar > Nova implantação**
- Selecione **Tipo: App da Web**
- **Executar como:** Eu
- **Quem pode acessar:** Qualquer pessoa
- Clique em **Implantar**
- Copie a **URL** gerada

### 4. Configurar no Planner
- Abra o Planner no browser
- Clique no ícone ⚙️ (Configurações) na navbar
- Cole a URL do Web App
- Clique em **Guardar**

### 5. Usar
- **💾 Local** — Salva no browser (funciona offline)
- **☁️ Servidor** — Salva no Google Sheets
- **⬇️ Carregar** — Busca dados do Google Sheets
- **Auto toggle** — Liga/desliga auto-sync (salva a cada 2s após mudanças)

## Tecnologias

- HTML + JavaScript (SPA, arquivo único)
- [Tailwind CSS](https://tailwindcss.com/) via CDN
- [Lucide Icons](https://lucide.dev/)
- [SortableJS](https://sortablejs.github.io/Sortable/)
- [Google Apps Script](https://script.google.com/) como backend
