#!/usr/bin/env bash
# Usage: ./create-project.sh slug "Project Title" image.png
# Creates projects/<slug>.html from projects/template.html and reminds you to add projects.json entry
set -e
if [ $# -lt 2 ]; then
  echo "Usage: $0 slug \"Project Title\" [image-filename]"
  exit 1
fi

SLUG="$1"
TITLE="$2"
IMAGE="${3:-example-1.png}"
OUT="projects/${SLUG}.html"
TEMPLATE="projects/template.html"

if [ ! -f "$TEMPLATE" ]; then
  echo "Template $TEMPLATE not found. Create it first."
  exit 1
fi

if [ -f "$OUT" ]; then
  echo "File $OUT already exists. Aborting."
  exit 1
fi

# simple placeholder replacement
sed \
  -e "s/{{TITLE}}/${TITLE//\//\\/}/g" \
  -e "s/{{IMAGE}}/${IMAGE//\//\\/}/g" \
  -e "s/{{LONG_DESCRIPTION}}/Write your project description here./g" \
  -e "s/{{TECH}}/Add tech tags here./g" \
  -e "s/{{LIVE_URL}}/#/g" \
  -e "s/{{REPO_URL}}/#/g" \
  "$TEMPLATE" > "$OUT"

echo "Created $OUT"
echo ""
echo "Next steps:"
echo " 1) Add an entry to projects.json, for example:"
echo "    {\"title\":\"$TITLE\",\"description\":\"Short desc\",\"image\":\"assets/$IMAGE\",\"url\":\"projects/$SLUG.html\",\"tech\":[\"Tech1\",\"Tech2\"],\"date\":\"2026-01\"}"
echo " 2) Add the image to assets/ and commit changes."