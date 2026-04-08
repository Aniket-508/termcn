# Open a PR

- Check that I'm in a branch other than `main` or `prod`. If not, bail and explain.
- Check the diff between my branch and the main branch of the repo
- If there's unstaged or staged work that hasn't been commited, commit all the relevant code first
(Use `gh` in case it's installed)
- Write up a quick PR description in the following format

<feature_area>: <Title> (80 characters or less)

<TLDR> (no more than 2 sentences)

<Description>
- 1~3 bullet points explaining what's changing


- Always paste the link to the PR in your response so I can click it easily
- Prepend GIT_EDITOR=true to all git commands you run, so you can avoid getting blocked as you execute commands