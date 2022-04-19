# ECONVERSE - Build


Workflow criado em Gulp para automatizações de tarefas.


# Estrutura dos diretórios

**│ src**

├─── assets

│   ├─── common

│   │   ├─── images

│   │   ├─── scripts

│   │   └─── styles

│   ├─── desktop

│   │   ├─── scripts

│   │   └─── styles

│   ├─── mobile

│   │   ├─── scripts

│   │   └─── styles

│   ├─── responsive

│   │   ├─── scripts

│   │   └─── styles

└─── views



# Ferramentas disponíveis


- **GulpJS**: Gerenciamento de tarefas;
- **RollupJS**: Bundler de módulos JavaScript;
- **BabelJS**: Transpilador de códigos JavaScript;
- **UglifyJS**: Minificação de arquivos JavaScript;
- **TypeScript**: Suporte para tipagem em JavaScript;
- **Jest**: Testes para códigos JavaScript;
- **HTMLHint**: Validação estática de códigos HTML;
- **Stylelint**: Validação de códigos CSS/SCSS;
- **ESLint**: Validação de códigos JavaScript;
- **Prettier**: Formatação de códigos HTML, CSS e JavaScript;
- **Sass**: Compilador para arquivos SCSS;
- **PostCSS**, **Autoprefixer**, **CSSNANO**: Processadores de estilos CSS;
- **Image-min**: Minificação de imagens (jpg/png);

# Comandos de diretório

- **npm install gulp -g**: Instala o Gulp globalmente via **npm**;
- **npm install yarn -g**: Instala o Yarn globalmente via **npm**;


- **yarn install** - Instala todas as dependências do projeto;


- **yarn start** - Gera uma build de desenvolvimento e observa alterações nos arquivos de diretório;
- **yarn vtex** - Gera uma build de produção e observa alterações nos arquivos de diretório;
- **yarn build** - Gera uma build de produção;

- **yarn test** - Efetuar testes com **Jest**;

- **yarn watch** - Observa alterações nos arquivos de diretório;
- **yarn images** - Gera os arquivos de imagens minificadas;
- **yarn prettier** - Formata os arquivos do código-fonte;
- **yarn htmlhint** - Validação estática de código HTML;
- **yarn stylelint** - Validação de códigos CSS/SCSS;


- **yarn clear** - Remover a pasta **dist** via CLI;


- **node -v**: Verificar a versão do Nodejs (Recomendada: >= 12.13.0);
- **gulp --version**: Verificar a versão do Gulp (Recomendada: CLI: >= 2.3.0 / Local: >= 4.0.2);
- **yarn --version**: Verificar a versão do Yarn (Recomendada: >= 1.22.18);