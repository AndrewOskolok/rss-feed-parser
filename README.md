# rss-feed-parser

Current project can parse rss feed from lifehacker.com/feed/rss

For starting project you should:

- Pull repo to your environment
- Create .env based on .env.example
- Install docker in your environment
- Create new containers executed corresponding row below
- For getting first data need wait time that was set up in .env

Create new containers:

# docker-compose -f docker/docker-compose.yml -p rss-feed-parser up -d

Rebuild exist containers:

# docker-compose -f docker/docker-compose.yml down

# docker-compose -f docker/docker-compose.yml -p rss-feed-parser up -d --build
