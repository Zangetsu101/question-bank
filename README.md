## Getting Started
1. clone the repo
2. install [bun](https://bun.sh/docs/installation)
3. run `bun install` to install all the dependencies
4. then run `bun vercel link` to link to a vercel project

This app uses vercel postgres so you need add a postgres storage to the vercel project.

5. use `bun vercel env pull .env.development.local` to pull the environment variables for local development
6. finally run `bun dev` to start the local development server

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Question Bank
This is platform where the user can submit questions which goes through an approval process before getting added to the question bank
## Features
Questions have 2 statuses, _in-review_ & _accepted_. When the user first submits a question it gets _in-review_ status. When the question gets approved then it receives an _accepted_ status.
- __Create questions__: User's are able to submit their questions. Each question requires has the following fields:
  - __Title__: The title of the question
  - __Difficulty__: Easy/Medium/Hard
  - __Tags__: Related tags for the question which can then be used for filtering in the question bank
  - __Question__: The actual question. The question should be supplied in the ___markdown___ format as it covers most if not all of the things that one would want to add in a question e.g. tables, figures (using mermaid) etc.
- __My questions__: A list all the user's question, both _in-review_ & _accepted_ ones.
- __Review questions__: Reviewers can give feedback on the questions as comments.
- __Timeline__: The full timeline of the question (comments, approvals) are shown along with the question when reviewing or when updating the question
- __Update questions__: Based on the given feedback, the submitter of the question can update his/her question
- __Edit history__: The full edit history of the question is available although it's not shown in the UI currently.
- __Approval__: A question requires a set amount of approvals before it can be added to the question bank. It requires the following amount of approvals depending on the set difficulty of the question
    - Easy: 1
    - Medium: 1
    - Hard: 2
- __Question Bank__: After a question has been given the set amount of approvals, it will get the _accepted_ status and become available in the question bank. Currently the questions can be filtered using thier __tags__

## TODO
- [ ] __Access control__
- [ ] __Markdown preview__
- [ ] __More filtering options__(e.g. by title, question body etc.)
- [ ] __Randomized question set generation__
- [ ] __UX review__

