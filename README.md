# PrimeForm 3D — vitrine de homologação (GitHub Pages)

Prévia estática da vitrine v3, publicada para avaliação de layout, responsividade,
filtro por categoria e links de orçamento **antes** de replicar para produção.

> Esta é uma prévia de homologação. Não é o site de produção e não substitui o
> catálogo oficial servido pela API.

## O que é

- Vitrine estática (HTML + CSS + JS), sem build e sem dependências externas.
- Catálogo com **37 produtos**, extraído da API oficial e **sanitizado**: saem
  apenas nome, categoria, preço de venda, quantidade por lote e o caminho da
  foto. Custos, lucro, margem e markup **não** existem neste repositório.
- Sem backend: o `CONFIG.api` do `app.js` aponta para o JSON estático em vez de
  `/api/products`. Essa é a **única** diferença estrutural em relação ao app
  que roda em produção.

## Estrutura

```
index.html                     página da vitrine
assets/app.js                  lógica de menu, scroll-spy e catálogo
assets/catalog.css             estilos dos cartões e do filtro
assets/data/catalogo.json      37 produtos (somente campos públicos)
assets/images/                 logo e imagens do hero
uploads/                       local reservado para as fotos dos produtos
```

## Diferenças em relação à produção

| Item | Produção | Esta prévia |
|---|---|---|
| Origem dos produtos | API `/api/products` | `assets/data/catalogo.json` |
| Quantidade | 77 no banco (37 públicos) | 37 (mesma allowlist do site) |
| Fotos | `/uploads/` no servidor | pasta `uploads/` vazia, ver abaixo |
| Categorias | campo `category` da API | todos como `Outros`, ver abaixo |

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
vitrine — a correção está registrada como tarefa específica.

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
