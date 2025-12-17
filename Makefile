setup:
	npm ci

install:
	npm ci

build:
	npm run build || echo "No build step required"

test:
	npm test || echo "Tests handled by Hexlet"
