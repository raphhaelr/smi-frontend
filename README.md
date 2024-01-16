## O projeto

Frontend da aplicação para gerenciar produtos e demandas, onde cada demanda possuí suas características como produtos, quantidade a ser produzida de cada produto. Os usuários podem realizar as operaçoes CRUD para produtos e demandas.

### :zap: Tecnologias Usadas

O projeto foi feito com as seguintes tecnologias:

- [ReactJS](https://pt-br.reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React-Hook-Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
{...}


## :zap: Executando o Projeto
#### Clonando o projeto
```sh
$ git clone https://github.com/raphhaelr/smi-frontend.git
$ cd smi-frontend
$ npm install
```

#### Configurando o Frontend
```sh
$ Definir baseURL da API no arquivo ./src/api/api.ts
$ Necessário deixar o prefix /api após a URL ex: https://localhost:3333/api
```

#### Iniciando o Frontend
```sh
$ npm run dev
```

### :zap: Acesso ao exemplo

O projeto exemplo está hospedado na AWS em um servidor EC2

- [Frontend](http://ec2-3-145-145-251.us-east-2.compute.amazonaws.com/)
- [Backend](http://ec2-3-145-145-251.us-east-2.compute.amazonaws.com/api)
- [Documentação](http://ec2-3-145-145-251.us-east-2.compute.amazonaws.com/api/documentation)