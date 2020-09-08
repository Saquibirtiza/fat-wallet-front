## Fat Wallet

### Description:

Fat Wallet is a web based expense tracker. Users can login to their account and add, delete or update expenses as they incur. They can categorize their expenses to one of the five default categories or they can create their own catepgory. The application then displays infographics based on the user data that helps them visualize their spending habits and change them if necessary. To try the demo go to this link:<br />
https://saquibirtiza.github.io/fat-wallet-front/#/

### Frameworks:

ReactJs is used to build the frontend of the aplication whereas for the backend, Django is used. All user data is stored using SQL in Postgres.

## Key Components:

### Signin Page and Home:

The first thing that a user is greated with when he/she first launches the app, is the signin/signup page. Once the user enters his/her credentials, the app redirects the user to the homepage via a short welcome animation. The user can then swtich between the infographics, see important stats about his/her expenses or add new expenses. While adding an expense, the user can also add new categories if needed.<br />

<!-- ![Welcome Page demo](demo/gig.gif) -->

### Expense List:

Besides being able to see the details of the all the expenses the user has entered so far, he/she can also do the following:

- Update any expense
- Delete any expense
- Sort table according to column
- Search for a particular expense by name
It is to be noted that any changes made in the table are reflected in the graphs and statistics in the homepage. <br />
<!-- ![Signin demo](demo/signup.gif) -->
