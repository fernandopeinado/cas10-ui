# Cas10 UI Library

## Requisitos para construir

* NodeJS 8+
* Yarn 1.9+

## Para construir

    yarn install
    yarn build

## Para ativar Showcase eatravés do Storybook

    yarn storybook

## Para publicar uma nova versão no Nexus

**Importante:** Antes de publicar a nova versão, alterar a versão no arquivo **package.json** na raiz do projeto e executar o build.

**Importante:** O comando abaixo deve ser executado dentro da pasta **build** gerada pelo comando acima (que se encontra na raiz do projeto).

```
cd build
yarn publish
```

## Link temporário deste projeto

Durante o desenvolvimento, para poder observar as modificações na implementação deste projeto, é necessário fazer um link no projeto que o utiliza como dependência. Após publicar este projeto no Nexus, o link pode ser desfeito no outro projeto para que a dependência seja instalada (com `yarn install`) direto do Nexus.

### Como fazer o link temporário

Dentro da pasta **build**:

```
yarn link
```

No projeto que usa o **cas10** como dependência:

```
yarn link cas10
```

### Como desfazer o link temporário

No projeto que usa como dependência:

```
yarn unlink cas10
```