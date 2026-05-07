document.getElementById("buscar").addEventListener("click", async () => {
      const nome = document.getElementById("username").value.trim();
      const resultado = document.getElementById("resultado");
      const jsonBox = document.getElementById("json");

      if (!nome) {
        resultado.innerHTML = `<div class="alert alert-warning">Digite um usuário válido.</div>`;
        jsonBox.textContent = "";
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/users/${nome}`);
        if (!response.ok) {
          throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const json = await response.json();
        resultado.innerHTML = `
          <div class="text-center mb-3">
            <img src="${json.avatar_url}" alt="Avatar" class="img-thumbnail" style="max-width:150px;">
          </div>
          <table class="table table-striped">
            <tbody>
              <tr><th>Nome</th><td>${json.name || "Não informado"}</td></tr>
              <tr><th>ID</th><td>${json.id}</td></tr>
              <tr><th>Login</th><td>${json.login}</td></tr>
              <tr><th>Perfil</th><td><a href="${json.html_url}" target="_blank">${json.html_url}</a></td></tr>
              <tr><th>Bio</th><td>${json.bio || "Não informada"}</td></tr>
              <tr><th>Localização</th><td>${json.location || "Não informada"}</td></tr>
              <tr><th>Repositórios públicos</th><td>${json.public_repos}</td></tr>
              <tr><th>Seguidores</th><td>${json.followers}</td></tr>
              <tr><th>Seguindo</th><td>${json.following}</td></tr>
              <tr><th>Criado em</th><td>${new Date(json.created_at).toLocaleDateString()}</td></tr>
              <tr><th>Última atualização</th><td>${new Date(json.updated_at).toLocaleDateString()}</td></tr>
            </tbody>
          </table> 
        `;
        // Exibir JSON formatado com cada atributo em linha
        //jsonBox.textContent = JSON.stringify(json, null, 2);
      } catch (err) {
        resultado.innerHTML = `<div class="alert alert-danger">Falha ao buscar usuário: ${err.message}</div>`;
        jsonBox.textContent = "";
      }
    });