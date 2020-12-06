exports.fileList = fileList
exports.fileForm = fileForm

// File List HTML Page Template  -----------------------------------------
function fileList( files, d){
    let pagHTML = `
      <html>
          <head>
              <title>Lista de Ficheiros</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="/favicon.png"/>
              <link rel="stylesheet" href="/w3.css"/>
              <script src="/jquery-3.5.1.min.js"></script>
              <script src="/imagens.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
          </head>
          <body>
              <div class="w3-card-4 modal" id="display"></div>

              <div class="w3-container w3-teal">
                  <h2>Lista de Ficheiros</h2>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Date</th>
                      <th>File</th>
                      <th>Size</th>
                      <th>Type</th>
                  </tr>
    `
    files.forEach( f => {
      pagHTML += `
          <tr onclick='showImage(\"${f.name}", \"${f.mimetype}\");'>
              <td>${f.date}</td>
              <td>${f.name}</td>
              <td>${f.size}</td>
              <td>${f.mimetype}</td>
          </tr>
      `
    })
  
    pagHTML += `
          </table>
    `
    return pagHTML
  }

// File Form HTML Page Template ------------------------------------------
function fileForm( d ){
    return `
            <div class="w3-container w3-teal">
                <h2>Upload de Ficheiros</h2>
            </div>

            <form class="w3-container" action="/files" method="POST" enctype="multipart/form-data">
                <label class="w3-text-teal"><b>Selecione os ficheiros</b></label>
                <div id="adiciona">
                    <input class="w3-input w3-border w3-light-grey" type="file" name="myFile">
                </div>
                <button class="w3-button w3-circle w3-teal" type="button" onclick="adiciona()">+</button>
                <input class="w3-btn w3-blue-grey" type="submit" value="Submit"/>
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por Diogo pereira :: PRI2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}