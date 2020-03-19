# Stock Kings

### Stock Kings is hosted on [Heroku](http://stock-kings.herokuapp.com/)!

Boston University Term Project - CS673 - Team 5

All changes pushed to `master` are automatically deployed on Heroku.

## BLUF

### Problem Space

- It’s recommend for people to invest as early as they can, but aren’t sure where to start
- Investing in the stock market can be risky
- Current stock simulator apps are not engaging

### Solution

- Risk-free stock simulator trading application
- Simple and intuitive
- Social and engaging

### How

- Agile methodology
- Modern version control (git)
- Continuous integration/Continuous development (CI/CD)
- Collaborative balanced-team approach

## Background

This project is the term-long project for CS673 - Software Engineering and Boston University.

Today it is recommended that people should start investing their money as soon as they are able to. One form of investment that many people know of are stocks. Yet many people aren’t comfortable with stocks and which they should be investing in. To combat this, an environment will be created that will encourage users to be able to follow and try their hand at stocks in a no risk environment while being engaging and a good learning experience.

Our project will be a stock fantasy trading league where users will be able to follow and “buy” publicly-traded stocks. These stocks will be tracked and show users how the price changes over periods of time, ranging from daily to weekly performance. Other features include stock recommendation system, social media sharing/group chat, and performance comparison among users.

The application is planned to have a clean and intuitive front-end interface supported by persistent data storage. The number of web pages will be kept to a minimum. The application will be hosted in the cloud for public use. Functional requirements are enumerated below in terms of need-to-haves and nice-to-haves. It is planned for team members to work collaboratively using git for version control, Trello for issue tracking, transparency for stakeholders (Professor and TA), Slack for cross-team communication, and an open source CI/CD (CircleCI/Jenkins) pipeline for testing to reduce bugs. The team plans has taken a more aggressive approach in functional requirements and will scale back based on semester timeline.

## Functional Requirements

The following are functional requirements that are "must" haves.

1. Consume the data from Yahoo Finance API
2. User registration (user name, password, email)
3. User has the ability to buy stocks
4. User has the ability to compare stocks to other users
5. User has the ability to report issues/bugs

The following are functional requirements that are "nice" to haves.

1. Stock recommendation system
2. Daily competitions
3. Chat/message board/social media

## Non-Functional Requirements

1. Nice-looking and intuitive UI (3-5 pages)
2. Fast response time with stock API (near-instant)

## Pre-requsites

- [Microsoft Visual Studio Code](https://code.visualstudio.com/)
- [npm](https://www.npmjs.com/get-npm)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [MAMP](https://www.mamp.info/en/downloads/)
- Yarn

## Setup

1. Clone this repository `git clone https://github.com/johnsliao/cs673-team-5.git`
2. `yarn install`
3. Install MYSQL 8.0.19 with `root` as username and `password` as password
4. Connect to the database using MySQL Workbench
5. Run `1_stockkings_CreateDB.sql` to seed data
6. `yarn start:all` will start front end and backend server
7. Verify that front end is running on `http://localhost:3000`
8. Verify that back end is running on `http://localhost:4000/getAccounts`
