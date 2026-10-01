#!/usr/bin/env bash
# Adiciona um movimento ao capoeirista 3D.
# Uso: scripts/add-move.sh caminho/do/movimento.fbx nome-do-movimento
set -euo pipefail

FBX="$1"
NOME="$2"
BLENDER="${BLENDER:-/Applications/Blender.app/Contents/MacOS/Blender}"
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
DESTINO="$RAIZ/public/models/moves/$NOME.glb"
TEMP="$(mktemp -d)"

"$BLENDER" -b --python "$RAIZ/scripts/export-move.py" -- "$FBX" "$TEMP/$NOME.glb" | grep ACAO_ESCOLHIDA
npx -y @gltf-transform/cli optimize "$TEMP/$NOME.glb" "$DESTINO" --compress meshopt --simplify false > /dev/null
rm -rf "$TEMP"

LISTA="$RAIZ/app/data/movimentos.ts"
grep -q "\"$NOME\"" "$LISTA" || sed -i '' "s/^export const MOVIMENTOS = \[/export const MOVIMENTOS = [\"$NOME\", /" "$LISTA"
echo "Pronto: $DESTINO ($(du -h "$DESTINO" | cut -f1)) — já entra no rodízio."
