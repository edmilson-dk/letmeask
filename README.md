# LeMeask 1.0v

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Product-Flow&message=Welcome&color=FFFFFF&labelColor=835afd" alt="PRs welcome!" />
  <img alt="License" src="https://img.shields.io/static/v1?label=version&message=1.0&color=FFFFFF&labelColor=835afd">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=FFFFFF&labelColor=835afd">
  <img alt="Stars" src="https://img.shields.io/github/stars/edmilson-dk/letmeask?color=FFFFFF&labelColor=835afd">
  <img alt="Languages" src="https://img.shields.io/github/languages/count/edmilson-dk/letmeask?color=FFFFFF&labelColor=835afd">
</p>

O projeto LetMeask foi desenvolvido durante a semana next level week, oferecida pela [Rocketseat](https://rocketseat.com.br/) na trilha de ReactJs, uma semana repleta de aprendizados e muito código!

# Tópicos 

- [Tecologias](#techs)
- [Check-list](#chech)
- [Layout](#layout)
- [Rodando local](#execute)
- [Página online](#online)
- [Licença](#license)

<a id="techs"></a>
## Tecnologias e bibliotecas utilizadas

- [ReactJS](https://pt-br.reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)

<a id="check"></a>
### Check List

- [x] Login com o Google
- [x] Criação de salas
- [x] Acessar sala existente
- [x] Admin encerrar sala
- [x] Notificação de usúarios após sala ser encerrada
- [x] Destacar perguntas
- [x] Remover perguntas
- [x] Marcar perguntas como respondida

<a id="layout"></a>
## Layout

[Figma](https://www.figma.com/file/y1Ts8vEbiMepJ5K4oa8xN8/Letmeask-Copy)

### Home

![Home](https://github.com/edmilson-dk/letmeask/blob/main/.github/project/home.png)

### Criação de sala

![Criação de sala](https://github.com/edmilson-dk/letmeask/blob/main/.github/project/new-room.png)

### Tela do usúario

[Tela do usúario](https://github.com/edmilson-dk/letmeask/blob/main/.github/project/user.png)

### Tela do administrador

![Tela do administrador](https://github.com/edmilson-dk/letmeask/blob/main/.github/project/admin.png)

<a id="execute"></a>
## Executando o projeto

Para executar o projeto em sua máquina siga os passos abaixo.

- 1 Clone meu repositório em sua máquina 

```sh
git clone git@github.com:edmilson-dk/letmeask.git

# entre na pasta

cd letmeask
```

- 2 Após o passo acima, instale as dependências necessárias, para isso é preciso que você tenha o [NodeJS](https://nodejs.org/en/) instalado em sua máquina.

```sh
npm install

# ou com yarn

yarn install
```

- 3 Agora é necessárioque você crie um app web no [Firebase](https://firebase.google.com/docs/database/web/start?hl=pt-br) e adicione as credências geradas no arquivo ``.env`` na raiz do projeto como descrito no arquivo de exemplo o [env.example](https://github.com/edmilson-dk/letmeask/blob/main/)

- 4 Feito isso é hora de executar o projeto, para isso execute o comando abaixo.

```sh
npm start 

# ou com yarn

yarn start
```

<a id="online"></a>
## Veja a aplicação funcionando

Caso você não queira executar os passos de instalação manualmente, para sua sorte fiz o deploy da aplicação, e você pode testa-la no link abaixo.

[Aplicação aqui](https://letmeask-dk.web.app/)

<a id="license"></a>
## 🤝 Licença

[MIT](https://github.com/edmilson-dk/letmeask/blob/main/LICENSE) Project License

Creator with 💙 by [Edmilson Jesus](https://www.linkedin.com/in/edmilson-jesus-4128711b5)
