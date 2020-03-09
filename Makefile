.PHONY: slides

deploy: ## build and deploy reveal slides
	reveal-md slides/WORKSHOP.md --css slides/reveal.css --template slides/reveal.html --static dist
	now dist --prod

readme: ## generate the README file TOC
	doctoc README.md --github

sandbox-server: ## sandbox for server-side dev purpose
	./server/node_modules/.bin/nodemon ./server/index.js

slides: ## start reveal on localhost
	reveal-md slides/WORKSHOP.md --css slides/reveal.css --template slides/reveal.html -w

help: ## This help dialog.
	@IFS=$$'\n' ; \
  help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
  printf "%-20s %s\n" "target" "help" ; \
  printf "%-20s %s\n" "------" "----" ; \
  for help_line in $${help_lines[@]}; do \
      IFS=$$':' ; \
      help_split=($$help_line) ; \
      help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
      help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
      printf '\033[36m'; \
      printf "%-20s %s" $$help_command ; \
      printf '\033[0m'; \
      printf "%s\n" $$help_info; \
  done
.DEFAULT_GOAL := help
