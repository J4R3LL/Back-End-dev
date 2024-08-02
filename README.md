# Starter Repository for Assignment
You are required to build your folder structures for your project.

## Folder structure
.
├── Project Root
├── public/
│   ├── css/
│   │   ├── color.css
│   │   └── style.css
│   ├── js/
│   │   ├── getCurrentURL.js
│   │   ├── loginUser.js
│   │   ├── queryCmds.js
│   │   ├── registerUser.js
│   │   ├── showAllLootPool.js
│   │   ├── showAllPets.js
│   │   ├── showAllQuest.js
│   │   ├── showMessage.js
│   │   ├── showPetProfile.js
│   │   ├── showProfileManage.js
│   │   ├── showPublicProfile.js
│   │   ├── showRandomUsers.js
│   │   ├── showSingleLoot.js
│   │   ├── showSingleQuest.js
│   │   ├── showSingleTrade.js
│   │   ├── showUserProfile.js
│   │   └── userNavbarToggle.js
│   ├── photos/
│   │   ├── cat.png
│   │   ├── chicken.png
│   │   ├── crow.png
│   │   ├── default_profile_picture.png
│   │   ├── giraffe.png
│   │   ├── hippo.png
│   │   ├── Logo.png
│   │   ├── unicorn.png
│   │   └── wolf.png
│   ├── forums.html
│   ├── index.html
│   ├── login.html
│   ├── lootPool.html
│   ├── lootView.html
│   ├── manageAccount.html
│   ├── pets.html
│   ├── petView.html
│   ├── profile.html
│   ├── publicProfile.html
│   ├── quest.html
│   ├── questView.html
│   ├── register.html
│   └── tradeView.html
├── src/
│   ├── configs/
│   │   └── initTables.js
│   ├── controllers/
│   │   ├── apiController.js
│   │   ├── battleController.js
│   │   ├── bioController.js
│   │   ├── currencyController.js
│   │   ├── inventoryController.js
│   │   ├── lootPoolController.js
│   │   ├── messageController.js
│   │   ├── petsController.js
│   │   ├── questController.js
│   │   ├── taskProgressController.js
│   │   ├── tradeController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── bcryptMiddleware.js
│   │   └── jwtMiddleware.js
│   ├── models/
│   │   ├── apiModel.js
│   │   ├── battleModel.js
│   │   ├── bioModel.js
│   │   ├── currencyModel.js
│   │   ├── inventoryModel.js
│   │   ├── lootPoolModel.js
│   │   ├── messageModel.js
│   │   ├── petsModel.js
│   │   ├── questModel.js
│   │   ├── taskProgressModel.js
│   │   ├── tradeModel.js
│   │   └── userModel.js
│   └── routes/
│       ├── apiRoutes.js
│       ├── battleRoutes.js
│       ├── currencyRoutes.js
│       ├── inventoryRoutes.js
│       ├── lootPoolRoutes.js
│       ├── mainRoutes.js
│       ├── messageRoutes.js
│       ├── petsRoutes.js
│       ├── questRoutes.js
│       ├── taskProgressRoutes.js
│       ├── tradingRoutes.js
│       └── userRoutes.js
├── services/
│   └── db.js
├── app.js
├── gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md

## Section A : Pet fighting simulator
 diagram link : https://dbdiagram.io/d/Pet-Fighting-Simulator-6593054eac844320ae0fb9b3


## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)
- Chromium browser (Playwright will use this as the default browser)

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/your-repository-name.git`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Setting Up Environment Variables

This repository provides instructions for setting up environment variables using a `.env` file in an Express.js application. The environment variables will be used in the `db.js` file located in the `src/services` directory.

### Setup

To set up environment variables for your Express.js application, follow these steps:

1. Create a file named `.env` in the root directory of your project.
2. Open the `.env` file and add the following lines:

   ```
   DB_HOST=<your_database_host>
   DB_USER=<your_database_user>
   DB_PASSWORD=<your_database_password>
   DB_DATABASE=<your_database_name>
   JWT_SECRET_KEY=<your_secret_key>
   JWT_EXPIRES_IN=<duration>
   JWT_ALGORITHM=<selected_algorithm>
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, and `<your_database_name>` with the appropriate values for your database connection.

   Replace `<your_secret_key>`, `<duration>`, and `<selected_algorithm>` with the appropriate values for your JSON web token usage.

   For example:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_DATABASE=pokemon
   JWT_SECRET_KEY=your-secret-key
   JWT_EXPIRES_IN=15m
   JWT_ALGORITHM=HS256
   ```

   Note: Make sure there are no spaces around the equal sign (=) in each line.

3. Save the `.env` file.

### Usage

The `db.js` file in the `src/services` directory uses the `dotenv` package to read the `.env` file and set the environment variables. Here's an example of how the `db.js` file should look:

```javascript
require('dotenv').config(); // Read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit: 10, // Set limit to 10 connections
    host: process.env.DB_HOST, // Get host from environment variable
    user: process.env.DB_USER, // Get user from environment variable
    password: process.env.DB_PASSWORD, // Get password from environment variable
    database: process.env.DB_DATABASE, // Get database from environment variable
    multipleStatements: true, // Allow multiple SQL statements
    dateStrings: true // Return date as string instead of Date object
}

const pool = mysql.createPool(setting);

module.exports = pool;
```

The `dotenv` package is used to load the environment variables from the `.env` file, and `process.env` is used to access these variables in your code.

Make sure to include the `require('dotenv').config();` line at the beginning of your file to load the environment variables from the `.env` file.

## Important Note

Ensure that the `.env` file is included in your `.gitignore` file to prevent sensitive information (such as database credentials) from being exposed in your version control system.

That's it! You have successfully set up environment variables using a `.env` file in your Express.js application. These variables can now be accessed in the `db.js` file or any other part of your application where needed.

Now you can move on to next part below.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

## Website/Endpoints Initialization

1. To initialize the Website/Endpoints,  open the terminal in VSCode and run the following command:

   ```
   npm run dev
   ```

#Back-end tables

### `User` Table

The `User` table contains the user's personal information. 

Properties :
- `user_id` unique identifier for user
- `username` text nickname/display name for user
- `password` text hashed password to verify user
- `email` text email of user

### `Quest` Table

The `Quest` table contains available quests

Properties :
- `quest_id` unique integer identifier for quest
- `title` text name of quest
- `description` text explaination of quest
- `tier` integer level of the quest, number of loot you get

### `TaskProgress` Table

The `TaskProgress` table contains trackings of completed quests

Properties :
- `progress_id` unique integer indentifier for task progress
- `user_id` integer identifier linking to the User table
- `task_id` integer identifier linking to the Quest table using quest_id, reusing Section A
- `completion_date` timestamp to mark date completion of task
- `notes` optional note for task progress

### `Currency` Table

The `Currency` table contains currencies and the pet that the user has

Properties :
- `user_id` integer identifier linking to the User table
- `pet_id` integer identifier linking to the Pets table
- `coin` integer amount of coins owned by the user
- `diamond` integer amount of diamonds owned by the user

### `Pets` Table

The `Pets` table contains all the available pets

Properties :
- `pet_id` unique integer identifier for each pet
- `name` text name of the pet
- `hp` integer health points of the pet
- `dmg` integer damage points of the pet
- `dmg_offset` integer damage offset of the pet
- `cost_coin` integer cost of the pet in coins
- `cost_diamond` integer cost of the pet in diamonds

### `LootPool` Table

The `LootPool` table contains all the obtainable loot

Properties :
- `loot_id` Unique integer identifier for each loot item
- `name` text name of the loot item
- `rarity` integer Rarity level of the loot item

### `Inventory` Table

The `Inventory` table contains all loot obtained by specific users

Properties :
- `inventory_id` Unique integer identifier for inventory item
- `user_id` integer identifier linking to the User table
- `loot_id` integer identifier linking to the LootPool table

### `Api` Table

The `Api` table contains information related to API settings for users

Properties:
- `user_id`: Unique integer identifier for the user
- `currency_status`: Boolean status of currency settings for the user
- `inventory_status`: Boolean status of inventory settings for the user

### `Bio` Table

The `Bio` table contains user profile information

Properties:
- `user_id`: Unique integer identifier for the user
- `profile_pic`: Text URL or path to the user's profile picture
- `bio`: Text description of the user

### `BattleLog` Table

The `BattleLog` table contains battle records between users

Properties:
- `battle_id`: Unique integer identifier for each battle log
- `attacker_id`: Integer user_id of the attacker
- `defender_id`: Integer user_id of the defender
- `status`: Text result of the battle

### `Trade` Table

The `Trade` table contains pending trade requests between users

**Properties:**
- `trade_id`: Unique integer identifier for each trade
- `user_id1`: Integer user_id of the trade requester
- `user_id2`: Integer user_id of the trade receiver
- `coin1`: Integer amount of coins exchanged by user1
- `coin2`: Integer amount of coins exchanged by user2
- `diamond1`: Integer amount of diamonds exchanged by user 1
- `diamond2`: Integer amount of diamonds exchanged by user 2
- `inventory_id1`: Integer inventory_id of loot exchanged by user 1
- `inventory_id2`: Integer inventory_id of loot exchanged by user 2

### `Messages` Table

The `Messages` table contains user messages

**Properties:**
- `message_id`: Unique integer identifier for each message
- `message_text`: Text content of the message
- `user_id`: Integer user_id of the sender
- `created_at`: Timestamp of the creation of the message


#How website works
## currentUrl
https://localhost:3000

## `User` creation
Front-end: [currentUrl](#currenturl) + '/register.html'
Endpoint:  [currentUrl](#currenturl) + '/api/register' (POST)

- Front-end will check if password and confirm password match, then it will check whether username or email exists. It will then hash the password with saltRounds of 15 for more security
- It will start creating a new row in `User` table, `Bio` table, `Api` table and `Currency` with the given information will other missing values as default, information not given can be updated when logged in
- You will then be redirected to login.html on the front-end to sign in

## `User` sign in
Front-end: [currentUrl](#currenturl) + '/login.html'
Endpoint: [currentUrl](#currenturl) + '/api/login' (POST)

- Front-end directly sends info to endpoint which will check that the fields are not empty or missing. Back-end will get `User` information by username and save password to res.locals . Password in res.locals will be compared with keyed in password using bcrypt
- Back-end will generate a new JsonWebToken and send it with the user's id to the front-end which will store the token and userId in localStorage of browser then you will be considered logged in

## `User` profile viewing
Front-end: [currentUrl](#currenturl) + '/profile.html'
Endpoint: [currentUrl](#currenturl) + '/api/users/profile/<user_id>' (GET)

- Front-end will take user_id from localStorage and put it into parameter <user_id>
- Back-end will request information about user from `User` table, `Currency` table, `Inventory` table and `Trade` table and pass it to Front-end to display

## `User` profile editing
Front-end: [currentUrl](#currenturl) + 'manageAccount.html'
Endpoint: [currentUrl](#currenturl) + '/api/users/profile/<user_id>' (GET)

- Front-end will use userId from localStorage to use as parameter <user_id> to use Endpoint
- Back-end will request information about user from `User` table and `Api` table and pass it to Front-end to display as a form which you can edit
- There is a **Save changes** button which uses endpoint [currentUrl](#currenturl) + '/api/users/profile/<user_id>' (PUT) to update profile
- There will be a confirmation message top right of the page

## `User` profile browsing
Front-end: [currentUrl](#currenturl) + '/index.html'
Endpoint: [currentUrl](#currenturl) + '/api/users/random'

- Front-end will request Endpoint that will get 12 random users and information from `User` table and display them
- There is a search bar for username searching. After typing similar or someone's exact username, click the **Search** button which will use endpoint [currentUrl](#currenturl) + '/api/users/username/<username>' where <username> is what you typed into the search bar. Users will appear.

## `LootPool` browsing
Front-end: [currentUrl](#currenturl) + '/lootPool.html'
Endpoint: [currentUrl](#currenturl) + '/api/lootPool' (GET)

- Front-end requests endpoint which will get all `LootPool` and their information and display them on Front-end. You can still view loot even if you are not logged in
- Individual loot are clickable to view individual `LootPool` more in depth. It will redirect you to [currentUrl](#currenturl) + '/lootView.html?loot_id=<loot_id>'
- There is a search bar for loot searching. After typing similar or exact loot name, click the **Search** button which will use endpoint [currentUrl](#currenturl) + '/api/lootPool/name/<name>' where <name> is what you typed into the search bar. Loot will appear.

## `LootPool` viewing
Front-end: [currentUrl](#currenturl) + '/lootView.html?loot_id=<loot_id>'
Endpoint: [currentUrl](#currenturl) + '/api/lootPool/<loot_id>' (GET)

- Front-end will request individual loot from endpoint by loot_id from url params and show more about the loot and how to obtain it
- There will be a link on Front-end that will redirect you to the url where you can obtain the loot

## `Quest` browsing
Front-end: [currentUrl](#currenturl) + '/quest.html'
Endpoint: [currentUrl](#currenturl) + '/api/quest' (GET)

- Front-end checks whether you have a token. If so, it requests endpoint which will get all `Quest` and their information and display them on Front-end else, it will show a message which request you to register or login
- Individual quests are clickable to view `Quest` more in depth and/or claim quest. It will redirect you to [currentUrl](#currenturl) + '/questView.html?quest_id=<quest_id>'
- There is a search bar for title searching. After typing similar or exact quest title, click the **Search** button which will use endpoint [currentUrl](#currenturl) + '/api/quest/title/<title>' where <title> is what you typed into the search bar. Quests will appear.

## `Quest` completion
Front-end: [currentUrl](#currenturl) + '/questView.html?quest_id=<quest_id>'
Endpoint: [currentUrl](#currenturl) + '/api/quest/<quest_id>' (GET)

- Front-end will request individual quest from endpoint by quest_id from url params and show more about the quest
- **Claim!** button allows you to claim the quest once a day, it will take the token from your localStorage to let you claim the quest
- An alert will pop up to show confirmation on the top right with loot earned.
- You can earn coins and diamond which will be passed into `Currency` table and loot from the `LootPool` table that will be stored in the `Inventory` table

## `Pets` browsing
Front-end: [currentUrl](#currenturl) + '/pets.html'
Endpoint: [currentUrl](#currenturl) + '/api/pets' (GET)

- Front-end requests endpoint which will get all `Pets` and their information and display them on Front-end. You can still view pets even if you are not logged in
- Individual pets are clickable to view `Pets` more in depth and/or claim quest. It will redirect you to [currentUrl](#currenturl) + '/petView.html?pet_id=<pet_id>'
- There is a search bar for pet name searching. After typing similar or exact pet name, click the **Search** button which will use endpoint [currentUrl](#currenturl) + '/api/pets/name/<name>' where <name> is what you typed into the search bar. Pets will appear.

## `Pets` purchase
Front-end: [currentUrl](#currenturl) + '/petView.html?pet_id=<pet_id>'
Endpoint: [currentUrl](#currenturl) + '/api/pets/<pet_id>' (GET)

- Front-end will request individual quest from endpoint by quest_id from url params and show more about the quest
- **Buy** button allows you to buy the pet, it will take the token from your localStorage to let you buy the pet. You will not be allowed to buy the pet you currently have
- An alert will pop up to show confirmation on the top right

## Battling of `Users`
Front-end: [currentUrl](#currenturl) + 'publicProfile.html?user_id=<user_id>'
Endpoint: [currentUrl](#currenturl) + '/api/battle/<attacker_id>/<defender_id>'

- Pressing the **Battle** button below user's currency will pass your userId from your localStorage as <attacker_id> and the user's user_id from url parameters as <defender_id>
- Outcome of the battle will appear on the top right of the page. Error messages also appear there

## Trading with `Users`
Front-end: [currentUrl](#currenturl) + 'publicProfile.html?user_id=<user_id>'
Endpoint: [currentUrl](#currenturl) + '/api/trading/possessions/<requester_id>/<receiver_id>'

- Pressing the **Trade** button below user's currency will pass your userId from your localStorage as <requester_id> and the user's user_id from url parameters as <receiver_id>
- Back-end will get your currency and inventory and display your trading options. If the user you are trading with does not wish to show their `Currency` or `Inventory` setting `Api` accordingly, their currency left will not be shown and all the loot that the user may have will be displayed, all loot that can be stored in `Inventory`.
- Pressing the **Send Trade** button will send form information to Endpoint [currentUrl](#currenturl) + /api/trading/<user_id1>/user2/<user_id2> where user_id1 is trade requester and user_id2 is trade receiver. The form information will be passed into the Endpoint as the request parameter
- trade request creation confirmation will be shown top right, as well as error message if any

## `Message` viewing
Front-end: [currentUrl](#currenturl) + '/forums.html'
Endpoint: [currentUrl](#currenturl) + '/api/message'

- Front-end will constantly refresh every second unless any action is being made like an edit or a delete
- Front-end will get the latest 25 messages with the latest at the bottom
- If the message is yours there will be an **Edit** button and a **Delete** button

- Pressing **Edit** button will hide the original paragraph and show a textarea where you can edit what you posted. Pressing **Submit** button below the textarea will update your message on the Back-end using Endpoint [currentUrl](#currenturl) + '/api/message/<message_id>' (PUT) and Front-end while showing back the edited paragraph and hiding the textarea and **Submit** button. 

- Pressing **Delete** button will make the button turn red and making the innerHtml of the button to "Delete message?" asking for confirmation. Pressing it again will hide the entire message on the Front-end while on the Back-end using Endpoint [currentUrl](#currenturl) + '/api/message/<message_id>' (DELETE) and deleting the message from the `Message` table

