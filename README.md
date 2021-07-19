# ECONVERSE - Builder


Workflow criado em Gulp para automatizações de tarefas.


# Estrutura dos diretórios


├─── assets

│   ├─── common

│   │   ├─── images

│   │   ├─── js

│   │   └─── scss

│   ├─── desktop

│   │   ├─── js

│   │   └─── scss

│   ├─── mobile

│   │   ├─── js

│   │   └─── scss

└─── views

├  ├  ├─── common

├  ├  ├─── desktop

├  ├  └─── mobile


# Ferramentas disponíveis


- **GulpJS**: Gerenciamento de tarefas;
- **RollupJS**: Bundler de módulos JavaScript;
- **BabelJS**: Transpilador de códigos JavaScript;
- **SASS**: Compilador para arquivos SCSS;
- **PostCSS**, **Autoprefixer**, **cssnano**: Processadores de estilos CSS;
- **ESLint**: Validação de códigos JavaScript;
- **MinifyJS, SCSS**: Minificação de arquivos JavaScript e CSS;
- **Minify Images**: Minificação de imagens;

# Comandos de diretório


- **node -v**: Verificar instalação / versão do NodeJS;
- Recomendado: >= 8.0.0


- **gulp --version**: Verificar instalação / versão do Gulp;
- Recomendado: CLI version: 2.3.0 / Local version: 4.0.2


- **npm install gulp -g**: Instalar o Gulp globalmente;
- **npm install yarn -g**: Instalar o Yarn globalmente;


- **yarn install** - Instala todas as dependências do projeto;


- **yarn start** - Gera uma build de desenvolvimento e observa alterações nos arquivos de diretório;
- **yarn build** - Gera uma build de produção para deploy dos arquivos;


- **yarn watch** - Observa mudanças nos arquivos de diretório;
- **yarn images** - Gera os arquivos de imagens minificadas;


- **yarn clean** - Remove a pasta de **dist** via CLI.