# PrimeForm 3D — vitrine de homologação (GitHub Pages)

Prévia estática da vitrine v3, publicada para avaliação de layout, responsividade,
filtro por categoria e links de orçamento **antes** de replicar para produção.

> Esta é uma prévia de homologação. Não é o site de produção e não substitui o
> catálogo oficial servido pela API.

## O que é

- Vitrine estática (HTML + CSS + JS), sem build e sem dependências externas.
- Catálogo com **77 produtos, espelhado da API oficial de produção** e
  **sanitizado**: saem apenas nome, categoria, preço de venda, quantidade por
  lote e o caminho da foto. Custos, lucro, margem e markup **não** existem
  neste repositório.
- Sem backend: o `CONFIG.api` do `app.js` aponta para o JSON estático em vez de
  `/api/products`. Essa é a **única** diferença estrutural em relação ao app
  que roda em produção.

## Estrutura

```
index.html                     página da vitrine
assets/app.js                  lógica de menu, scroll-spy e catálogo
assets/catalog.css             estilos dos cartões e do filtro
assets/data/catalogo.json      77 produtos (somente campos públicos)
assets/images/                 logo e imagens do hero
uploads/                       local reservado para as fotos dos produtos
```

## Como o catálogo é mantido (dev espelha produção)

A prévia segue a **regra do projeto: qualquer replicação dev→prod só acontece
depois de sincronizar o dev com a produção** para não perder dados que foram
inseridos/enviados ao ambiente produtivo enquanto o dev estava em uso.

O catálogo desta prévia é regenerado a partir da **própria API pública de
produção** (idêntica ao que a vitrine real exibe):

```bash
python .ai/deliverables/T4/build_preview.py assets/data/catalogo.json
```

O script (mantido no repositório privado `AI-Orchestrator`) baixa a API, aplica
a allowlist de campos e **aborta se encontrar qualquer campo de custo/lucro/
margem/markup** na entrada. O resultado é versionado aqui.

### Antes de replicar o dev para produção — rotina obrigatória

1. Regenerar `catalogo.json` da API atual de produção (comando acima) e conferir
   a mensagem (`produtos: N`).
2. Validar `git diff` para ver o que mudou em relação ao que estava publicado.
3. Rodar o workflow do Pages e abrir o preview para conferir o layout.
4. Somente após essa conferência, promoção dev→prod pode ser feita.

## Diferenças em relação à produção

| Item | Produção | Esta prévia |
|---|---|---|
| Origem dos produtos | API `/api/products` | `assets/data/catalogo.json` |
| Quantidade | 77 (espelhado) | 77 (mesma fonte) |
| Fotos | `/uploads/` no servidor | pasta `uploads/` vazia, ver abaixo |
| Categorias | campo `category` da API† | todos como `Outros` |

† *pendente: o campo `category` não existe na API atual — correção registrada
como tarefa de backend (novo campo no precificador).*

### Fotos: local reservado, sem publicação

A pasta `uploads/` existe e está vazia. Cada produto já aponta, no
`image_url`, o nome do arquivo que espera ali. Enquanto o arquivo não existir,
o card mostra *"Imagem indisponível"* — que é o comportamento previsto, não um
erro. Basta colocar a foto com o nome correto que ela passa a ser exibida,
**sem alterar código**.

Os arquivos de origem ficam em `https://catalogo.primeform3d.com.br/uploads/`
(acesso por senha básica) e somam ~12,5 MB no total. Eles não foram publicados
aqui de propósito: em um repositório público as fotos ficariam acessíveis sem a
senha que protege o site.

### Categorias: pendente de correção

O campo `category` **não existe** na resposta da API de produção, então o filtro
aparece com uma única opção (`Outros`). Isso é um defeito da API, não da
vitrine — a correção está registrada como tarefa de backend: **incluir o campo
`category` no precificador** (fonte dos dados) e expô-lo na API da vitrine.

As categorias oficiais são:

`Action figure` · `Anime` · `Personalizados` · `Chaveiros` · `Decorativos` · `Outros`

Nada foi inventado para preencher esse campo.

## Ajustes de runtime aplicados nesta cópia

Duas alterações, ambas isoladas nesta cópia (o app de produção não é tocado):

1. `CONFIG.api` aponta para o JSON estático em vez de `/api/products`.
2. `safeImage()` passou a aceitar caminhos relativos de `uploads/`, para que as
   fotos resolvam dentro do subdiretório do Pages. A proteção original é
   mantida: URLs de outra origem continuam sendo rejeitadas.

## Publicação

Publicada por GitHub Actions a partir de `main`. Qualquer push em `main` dispara
o workflow. Configuração: **Settings → Pages → Source: GitHub Actions**.

## Segurança

Este repositório é público e contém apenas conteúdo já exibido publicamente no
site (nomes, categorias e preços de venda). Não há aqui custos, margens,
lucros, dados do precificador, credenciais, bancos de dados nem fotos de produto.
