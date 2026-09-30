# Fotos dos produtos

Esta pasta é o **local reservado** para as fotos dos produtos na prévia de
homologação. Ela está vazia de propósito: as imagens não são publicadas.

## Como funciona

O catálogo (`assets/data/catalogo.json`) já aponta, para cada produto, o nome do
arquivo que ele espera aqui:

```json
{ "name": "Charmander Pequeno", "image_url": "uploads/modelo-39-6c4f62c84f3e.png" }
```

Enquanto o arquivo não existir, o card mostra o estado *"Imagem indisponível"* —
que é o comportamento esperado e não é um erro.

## Como adicionar

Baixe a foto da origem e salve com o nome exato indicado no `image_url` do
produto correspondente. A vitrine passa a exibi-la **sem nenhuma alteração de
código**.

As fotos de origem ficam em `https://catalogo.primeform3d.com.br/uploads/`
(acesso por senha básica). Cada uma tem cerca de 340 KB; as 37 somam ~12,5 MB.

## Por que estão vazias

Decisão do responsável: a prévia segue **sem fotos**, apenas com o local
reservado. Publicar as imagens em um repositório público as tornaria
acessíveis sem a senha que protege o site.
