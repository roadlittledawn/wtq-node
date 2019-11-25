# WTQ Node

## Running
1. Clone the repository
2. Install project dependencies by running `scripts/install.sh` from the project root.
3. Run `docker-compose up` to start the application.

To bring down the application and its dependent containers, simply run `docker-compose down`.

To run an interactive terminal inside the container, run `scripts/terminal.sh`.

### Access site in browser
Access site via http://localhost:8002

Access graphql sandbox via http://localhost:8001/graphql

## Adding Dependencies
This repository utilizes Yarn workspaces. To add a package to the `api` service, execute `scripts/workspace.sh wtq-node-api add [package-name]`. Likewise, to remove a package, execute `scripts/workspace.sh wtq-node-api remove [package-name]`

## GraphQL playground examples
[https://graphqlbin.com/v2/OgLJHZ]

[https://graphqlbin.com/v2/NYRnI9]

## How to add new type to GraphQL
It can be a little tricky adding new types to GraphQL. You must update several files and names and fields must line up accordingly. I haven't mapped those yet because I mostly have just copied and pasted.

See [commit to add quotes type to graphql](https://github.com/roadlittledawn/wtq-node/commit/64354908936d64e84fc7f1206fc97fe51f3220c1)

General steps are:

  1. Add graphql definition for your new type in `/graphql/definitions`
  2. Update graphql definitions index in `/graphql/definitions`
  3. Add graphql resolver for your new type in `/graphql/resolvers`
  4. Update graphql resolvers index in `/graphql/resolvers`
  5. Add a schema for your new type in `/schema` (what is this for? mongoose and connecting to mongo?)
  6. Add a model for your new type in `/models`. This essentially defines the mongoDB collection name and brings in the schema. (what is this for? mongoose and connecting to mongo?)

# Content model
The site has the following 3 types of core content called entries, each with their own properties (some are shared between all/some of them, others are distinct to the entry):
* words
  * id
  * name
  * slug
  * definition
  * note
  * partsOfSpeech
  * etymologies
  * contexts
  * tones
* phrases
  * id
  * name
  * slug
  * definition
  * topics
  * tones
  * contexts
  * note
  * source
* quotes
  * id
  * name
  * slug
  * body
  * author
  * topics
  * tones
  * note
  * source

# TODO
* Add create/edit pages for all metadata fields
* Add edit entry pages
* Add word dictionary API calls / caching
* Add ability to add new terms to metadata fields on create/edit pages
* Add authentication for admin only data operations
* Add search (elastic?)
* Add [fontawesome library](https://github.com/FortAwesome/react-fontawesome)
* Improve words landing page: alphabetical browsing, alpha sort, pagination
* Improve phrases landing page: alpha sort, pagination
* Improve quotes landing: paginated, author cards w/image

## Refactor
* Combine create pages into one create page w/request parameter to know which entry model / data we need.
* Auto set `name` field for quote based on author, and meta field terms
