<a name="Site Imobiliária LSILVA"></a>
# Site Imobiliária LSILVA


Versão: 1.0


<a name="Status do Projeto"></a>
## 🔹 Status do Projeto : 


⚠️Em Andamento


<a name="Descrição do Projeto"></a>
## 🔹 Descrição do Projeto :


O projeto consiste em uma plataforma web dedicada a oferecer uma experiência intuitiva e abrangente para clientes específicos em propriedades nas regiões de São Roque, Ibiúna, Mairinque e Alumínio. Com um foco especial nessas localidades, a plataforma fornecerá aos usuários uma visão detalhada e atrativa das propriedades disponíveis, facilitando a busca por residências, terrenos ou investimentos.



<a name="Recursos Principais"></a>
## 🔹 Recursos Principais :

**Página Inicial :** :globe_with_meridians:

Destaques das propriedades mais recentes ou em destaque.
Navegação fácil para diferentes categorias (venda, aluguel).


**Visualização de Propriedades :** :mag:

Descrições completas, incluindo características, extensão, número de quartos/banheiros etc.
Galeria de fotos de alta qualidade.
Localização no mapa.

**Área de Contato :** :busts_in_silhouette:

Formulário para contato direto com a imobiliária ou corretores associados.
Informações de contato claramente visíveis.


**Login do Administrador :** :lock:

Área restrita para o administrador, permitindo:
Cadastro de novas propriedades.
Associação de propriedades a corretores.
Gerenciamento completo do catálogo.


**Corretores :**  💼

Perfil individual para cada corretor com informações de contato.
Associação dinâmica entre corretores e propriedades.


**Solicitação de Cadastro de Propriedade :**  🏡


Formulário para proprietários específicos em cadastrar suas propriedades.
Processo de revisão antes da inclusão no catálogo.


**Objetivo :** :chart_with_upwards_trend:

Facilitar o processo de busca por propriedades para potenciais compradores ou locatários, oferecendo informações fornecidas e meios diretos de contato. Ao mesmo tempo, fornecer uma ferramenta eficaz para uma equipe administrativa e expandir o catálogo de propriedades de forma eficiente.


<a name="Benefícios"></a>
## 🔹Benefícios :

**Facilidade de Uso :**  🆓

Interface intuitiva para navegação rápida e eficiente.

**Informações úteis :**  :mag:

Descrições completas e galerias de fotos para uma visualização eficaz dos imóveis.

**Comunicação Direta :**  📞

Contato direto com a imobiliária e corretores associados.

**Ampla Cobertura :**  🥇

Foco específico nas regiões de São Roque, Ibiúna, Mairinque e Alumínio.
Com essa proposta, o site da imobiliária será uma referência confiável para aqueles que buscam propriedades nessas localidades, promovendo uma experiência positiva tanto para os clientes quanto para a equipe administrativa.

<a name="Pré-requisitos"></a>
## 🔹 Pré-requisitos :

Antes de iniciar a implementação e utilização do projeto, certifique-se de que os seguintes pré-requisitos foram atendidos:

**Node.js e npm :**  💻

Certifique-se de ter o Node.js instalado. 

Você pode baixá-lo em [NodeJS](https://nodejs.org/.) ,
O npm (Node Package Manager) também é necessário para gerenciar as dependências. Ele é geralmente incluído na instalação do Node.js.

**Banco de Dados :**  🏦


Configure um banco de dados para armazenar as propriedades, corretores e outras informações relevantes.
Recomendado: Utilize um banco de dados relacional, como MySQL ou PostgreSQL.


**Express.js e Framework Web :**  💻


O projeto utiliza o framework web Express.js. Instale-o usando o seguinte comando:
> npm install express


**Gerenciador de Pacotes :**  📦

Garanta que um gerenciador de pacotes seja utilizado para manter as dependências do projeto. O npm é recomendado e geralmente já está instalado com o Node.js.

**Git (Opcional):**  :octocat:


Para colaboração e controle de versão, é útil ter o Git instalado. Você pode baixá-lo em [git](https://git-scm.com/.)


**Configuração do Ambiente :**  🖥️


Configure as variáveis de ambiente necessárias, como as credenciais do banco de dados e outras informações sensíveis.
Certifique-se de seguir as instruções de instalação específicas do projeto no README para garantir uma configuração adequada.

<a name="Como rodar a aplicação"></a>
## 🔹 Como rodar a aplicação :


### Para rodar a aplicação Imobiliária LSILVA localmente, siga estas instruções ⚠️


**Clone este repositório : :octocat:**


git clone [Site Imobiliaria](https://github.com/yVinii/SiteImobi.git)

Navegue até o diretório do projeto:


>cd SiteImobi

Instale as dependências:

>npm install

Configure as variáveis de ambiente:


>Altere o arquivo na raiz do projeto no arquivo conn.js e defina as variáveis necessárias, como as credenciais do banco de dados.

Executando a Aplicação
>npm start

Acesse a aplicação no navegador:

>http://localhost:3000

### Observações:

Certifique-se de ter o banco de dados configurado corretamente antes de iniciar a aplicação.
Modifique as configurações no arquivo conn.js conforme necessário para o seu ambiente.
Consulte a documentação do projeto para informações específicas sobre a configuração.

<a name="Testes realizados"></a>
## 🔹 Testes realizados : 

O projeto passou por uma rigorosa bateria de testes para garantir a robustez e o correto funcionamento de suas funcionalidades no backend. A API, construída em Node.js, utiliza rotas específicas para realizar operações CRUD (Create, Read, Update, Delete) nas entidades do sistema. Abaixo está uma descrição detalhada de como os testes foram conduzidos usando o Postman.

**Ambiente de Desenvolvimento :** 💻


**Node.js :** 💠

Certificamos-nos de ter o Node.js instalado localmente para executar o servidor backend.

**Postman :** 🚀

Utilizamos o Postman como uma ferramenta de teste de API para criar, organizar e executar testes nas rotas da aplicação.

## Configuração do Projeto :
**Instalação de Dependências :** ☄️

Utilizamos o npm para instalar todas as dependências necessárias do projeto. O comando npm install garantiu que todas as bibliotecas estivessem presentes.

**Execução do Servidor :** 🌐

Iniciamos o servidor Node.js usando o comando npm start. Isso permitiu que a API estivesse acessível em http://localhost:3000, por exemplo.

### Testes com Postman : 🚀

**Criação de Coleções:**

No Postman, organizamos nossos testes criando coleções. Cada coleção reflete um conjunto de rotas relacionadas a uma entidade específica.

### Requisições CRUD:
GET: Testamos as rotas de leitura (GET) para garantir que os dados fossem recuperados corretamente. 

POST: Validamos a funcionalidade de criação (POST) de novas entidades, fornecendo os parâmetros necessários no corpo da requisição.

PUT/PATCH: Testamos as rotas de atualização (PUT/PATCH) para garantir que as alterações nos dados fossem refletidas adequadamente no sistema.

DELETE: Verificamos a funcionalidade de exclusão (DELETE) para garantir que as entidades fossem removidas conforme esperado.
![Exemplo de rotas do projeto](<Exemplo de rotas - API.JPG>)

### Testes Automatizados:

Utilizamos os recursos de teste automático do Postman para verificar automaticamente se as respostas da API estavam corretas, como códigos de status e estrutura de dados.

### Testes de Casos de Borda:

Exploramos situações de limite, como dados inválidos ou ausentes, para garantir que a API respondesse apropriadamente.

Documentação no Postman:
Documentamos todas as nossas requisições e testes no próprio Postman. Exportamos a coleção para compartilhar com outros membros da equipe.
![Requisições no Postman](<Exemplo de teste API.JPG>)

Conclusão:
Os testes do backend garantiram que a API Node.js estava totalmente funcional, manipulando corretamente as entidades do sistema. Asseguramos que todas as rotas respondessem conforme esperado, proporcionando uma base sólida para o desenvolvimento e a entrega bem-sucedidos do projeto.

<a name="Banco de Dados"></a>
## 🔹 Banco de Dados 🗂️

O banco de dados utilizado no projeto foi o MySQL versão 8.0.34 3256917 CE(64 bits)

<a name="Linguagens, dependências e bibliotecas utilizadas"></a>
## 🔹 Linguagens, dependências e bibliotecas utilizadas 📚

O Backend foi desenvolvido utilizando um conjunto específico de tecnologias, linguagens, dependências e bibliotecas. Abaixo está uma descrição detalhada desses componentes:

Linguagens Utilizadas:
JavaScript (Node.js): A linguagem principal para o desenvolvimento do backend, utilizando o ambiente Node.js.
Dependências e Bibliotecas:

Express:
Descrição: Framework web para Node.js simplificando as rotas e requisições HTTP.
Uso: Responsável pelo roteamento e manipulação de configurações na API.

Sequelize:
Descrição: ORM (Mapeamento Objeto-Relacional) para Node.js, facilitando a interação com bancos de dados relacionais, como o MySQL.
Uso: Abstrai operações de banco de dados e simplifica a manipulação de modelos.

Body-parse:
Descrição: Middleware para Express que facilita a distribuição de dados no corpo das requisições HTTP.
Uso: Ajuda a analisar e formatar os dados recebidos nas compensações.

Cors:
Descrição: Middleware para Express que permite restringir o acesso a recursos de API de diferentes origens.
Uso: Facilita o controle de políticas de segurança de acesso a recursos.

Nodemon:
Descrição: Utilitário que monitora alterações nos arquivos e reinicia automaticamente o servidor durante o desenvolvimento.
Uso: Melhora a eficiência do processo de desenvolvimento.

Dotenv:
Descrição: Carrega variáveis ​​de ambiente de um arquivo .envpara o processo Node.js.
Uso: Gerenciar configurações sensíveis, como chaves de API, de forma segura.

MySQL2:
Descrição: Driver MySQL para Node.js, oferecendo uma interface para interação com o banco de dados MySQL.
Uso: Estabelece a conexão e executa consultas no banco de dados MySQL.

Postman:
Descrição: Ferramenta de desenvolvimento colaborativo para testar APIs.
Uso: Facilita a criação, organização e execução de testes nas rotas da aplicação.
Banco de Dados:

MySQL:
Descrição: Sistema de gerenciamento de banco de dados relacional.
Uso: Armazena e recupera dados para a aplicação, fornece um modelo relacional para a manipulação de dados.
Ambiente de Desenvolvimento:

Node.js:
Descrição: Ambiente de execução para JavaScript do lado do servidor.
Uso: Permite a execução de código JavaScript fora de navegadores, facilitando o desenvolvimento de aplicativos backend.

Conclusão:
O backend foi construído com base em tecnologias modernas, aproveitando as vantagens da biodiversidade JavaScript para desenvolvimento web. O Sequelize simplificou a interação com o banco

Descrição Técnica do Frontend

O frontend do projeto foi desenvolvido com foco na criação de uma experiência de usuário intuitiva e agradável. Abaixo estão as tecnologias, linguagens e bibliotecas utilizadas:

Linguagens Utilizadas:

HTML (HyperText Markup Language):
Descrição: Linguagem de marcação que define a estrutura básica de uma página web.
Uso: Responsável por estruturar o conteúdo da página.

CSS (Cascading Style Sheets):
Descrição: Linguagem de estilo que controla a apresentação visual de documentos HTML.
Uso: Aplica estilos, como layout, cores e fontes, para melhorar a estética e a usabilidade.

JavaScript:
Descrição: Linguagem de programação que permite a criação de interações dinâmicas e reativas em páginas web.
Uso: Manipula o DOM (Document Object Model) para criar comportamentos interativos.
Bibliotecas e Frameworks:

Bootstrap:
Descrição: Framework de código aberto que simplifica o design responsivo e a criação de interfaces web.
Uso: Fornece estilos predefinidos e componentes para melhorar a consistência visual e a responsividade.

jQuery:
Descrição: Biblioteca JavaScript rápida e leve, simplificando a manipulação do DOM e a interação com o servidor.
Uso: Facilita operações comuns de JavaScript e simplifica a escrita de código.

Font Awesome:
Descrição: Biblioteca de ícones vetoriais escaláveis que podem ser personalizados com CSS.
Uso: Adiciona ícones estilizados para melhorar a estética e a clareza visual.
Ambiente de Desenvolvimento:

Visual Studio Code:
Descrição: Editor de código-fonte leve e poderoso.
Uso: Facilita o desenvolvimento, oferecendo recursos como realce de sintaxe, autocompletar e integração com controle de versão.

Conclusão:
O frontend foi construído com HTML, CSS e JavaScript, aproveitando frameworks e bibliotecas populares para acelerar o desenvolvimento e garantir uma experiência visual moderna e responsiva. O Bootstrap proporcionou uma base sólida para o design, enquanto o jQuery simplificou a manipulação do DOM. A inclusão de Font Awesome contribuiu para a estética do projeto, adicionando ícones estilizados. O Visual Studio Code serviu como ambiente de desenvolvimento eficiente, oferecendo ferramentas robustas para a criação e manutenção do código. O resultado é uma interface web atraente e funcional, projetada para atender às necessidades dos usuários finais.


<a name="Novas Recursos"></a>
## 🔹 Novas Recursos : 

O projeto foi continuamente aprimorado com a introdução de novos recursos e melhorias. Abaixo estão alguns dos recursos recentemente adicionados:

Cadastro de Propriedades:
Descrição: Agora é possível cadastrar novas propriedades diretamente pelo painel administrativo. O usuário administrador pode incluir informações detalhadas, como localização, características e imagens.

Associação de Corretores:
Descrição: A funcionalidade de associar corretores a propriedades foi implementada. O administrador pode vincular corretores específicos a cada propriedade, facilitando a gestão e a distribuição de responsabilidades.

Visualização Aprimorada:
Descrição: A página de visualização de propriedades foi aprimorada para oferecer uma experiência mais rica aos visitantes do site. Agora, além de fotos, há uma descrição completa de cada propriedade, destacando seus pontos fortes.

Contato Direto com Corretores:
Descrição: Visitantes interessados em uma propriedade podem entrar em contato diretamente com os corretores associados. Os detalhes de contato dos corretores são exibidos junto com as informações da propriedade.

Solicitação de Inclusão de Propriedades:
Descrição: Os proprietários de imóveis agora têm a opção de solicitar a inclusão de suas propriedades no site. Um formulário simples permite que eles enviem informações básicas para avaliação.

Testes Abrangentes:
Descrição: Uma bateria abrangente de testes foi implementada para garantir a robustez das funcionalidades do backend. Testes unitários e de integração foram realizados, cobrindo operações CRUD e garantindo a estabilidade do sistema.
Esses novos recursos foram projetados para enriquecer a experiência dos usuários finais, oferecendo mais opções, transparência e interação. O projeto continua evoluindo, incorporando feedbacks de usuários e mantendo-se alinhado com as necessidades do mercado imobiliário local.

<a name="Resolvendo problemas"></a>
## 🔹 Resolvendo problemas : 



<a name="Desenvolvedores/Contribuintes"></a>
## 🔹 Desenvolvedores/Contribuintes : 
- [David Lucas](https://github.com/dvdlucas)
- [Vinicius Fabrini](https://github.com/yVinii)
- [Arthur Bechir](https://github.com/ArthurBechir)
- [Kauan Souza](https://github.com/KauanS0uza)

<a name="Informações Extras"></a>
## 🔹 Informações Extras : 



<a name="Funcionalidades"></a>
## Funcionalidades ⚙️

✔️ Autenticação de Administrador:
    Login seguro para o administrador acessar o sistema.
    Criação de token de acesso, dessa forma as alterações só são permitidas se o usuário estiver cadastrado no banco e logado no sistema.

✔️ Gerenciamento de Corretores:
    Adição, remoção e edição de informações de corretores.
    Associação de corretores às propriedades.

✔️ Gerenciamento de Propriedades:
    Adição, remoção e edição de informações de propriedades.
    Upload de fotos e descrição completa das propriedades.
    Associação de propriedades a corretores responsáveis.

✔️ Visualização de Propriedades:
    Páginas desenvolvidas para cada propriedade com informações abrangentes.
    Categorização das propriedades por tipo (venda ou aluguel).

✔️ Contato com Imobiliária: 
    Formulário de contato para os clientes se comunicarem diretamente com a imobiliária.

✔️ Contato com Corretores:
    Informações de contato visíveis para os clientes são comunicadas diretamente aos corretores responsáveis ​​por cada propriedade.

✔️ Anúncio de Propriedades pelos Clientes:
    Formulário para os clientes enviarem detalhes de suas propriedades para serem anunciadas.
    Processo de revisão pela imobiliária antes da publicação.

✔️ Filtragem e Pesquisa de Propriedades:
    Recursos de pesquisa e filtros para que os clientes encontrem propriedades com base em critérios específicos.

✔️ Diferenciação entre Venda e Aluguel:
    Indicação clara se uma propriedade está disponível para venda, aluguel ou ambos.

✔️ Seção de Notícias e Informações:
    Possibilidade de incluir notícias ou informações relevantes sobre o mercado imobiliário.

✔️ Layout Responsivo:
    Garanta uma experiência de usuário consistente em diferentes dispositivos, como desktops, tablets e smartphones.

✔️ Sistema de Feedback:
    Mecanismo para os usuários fornecerem feedback sobre propriedades ou experiência geral.

    Essas funcionalidades são projetadas para oferecer uma experiência completa para administradores, corretores e clientes, abrangendo desde o gerenciamento interno até a interação externa e a inclusão ativa de clientes no processo de anúncio de propriedades.


<a name="Distribuição"></a>
## 🔹 Distribuição (Pré-Lançamento) :

Acesso Antecipado:

O sistema está em fase de desenvolvimento e pode ser acessado antecipadamente por meio do repositório no GitHub.
Os usuários podem explorar o código-fonte, testar funcionalidades em desenvolvimento e fornecer feedback valioso.

Contribuições da Comunidade:
Encorajamos contribuições da comunidade para melhorar o código e adicionar novos recursos.
Faça fork do repositório e envie pull requests para colaborar conosco no desenvolvimento.

Ambiente Local de Desenvolvimento:
Desenvolvedores podem configurar um ambiente local para executar o sistema e testar as últimas alterações.
Consulte o arquivo README no repositório para instruções de configuração do ambiente.

Discussões e Feedback:
Participe das discussões sobre o sistema, novas funcionalidades e melhorias propostas no GitHub Discussions.
Fornecer feedback é fundamental para aprimorar a qualidade e usabilidade do sistema.

Notificações de Lançamento:
Inscreva-se no repositório do GitHub para receber notificações sobre lançamentos, atualizações e correções de bugs.

Suporte Comunitário:
Utilize os fóruns da comunidade no GitHub para buscar ajuda, compartilhar conhecimentos e interagir com outros desenvolvedores.

Aprimoramentos Constantes:
O sistema passará por melhorias regulares com base no feedback da comunidade e nas contribuições recebidas.
Fique atento às atualizações do repositório para acompanhar o progresso.

Testes Beta:
Testes beta podem ser realizados por desenvolvedores e entusiastas que desejam experimentar novas funcionalidades antes do lançamento oficial.
Detalhes sobre testes beta serão compartilhados no repositório.

Código-Fonte Aberto:
O código-fonte do sistema é totalmente aberto e disponível para consulta, aprendizado e colaboração.
Acesse o repositório no GitHub para explorar o código.

Licença Open Source:
O sistema é distribuído sob uma licença de código aberto para promover a transparência e a participação da comunidade no desenvolvimento.

Este é um estágio inicial de distribuição, permitindo que a comunidade de desenvolvedores e entusiastas interaja com o sistema antes do lançamento oficial. O feedback e as contribuições são bem-vindos para enriquecer o projeto e garantir um lançamento robusto no futuro.


<a name="Recursos de inserção"></a>
## Recursos de inserção 🧰
Se para o caso, liste tarefas/funcionalidades que ainda precisam ser inovadoras em sua aplicação, insira fotos da tela do app.

📝 Tarefa 1

📝 Tarefa 2

📝 Tarefa 3


Licença
A Licença MIT (MIT)

Copyright ©️ 2023 - Site Imobiliaria LSILVA
