# Chatterbox-client

This assignment constitutes the beginning of a multi-sprint journey exploring client-server architecture. Today, you'll build a chat client that allows you to communicate with your fellow students. You'll do this using **`$.ajax`** to save (POST) and fetch (GET) JSON data to and from a remote server.
> This was assigned to me as a student when attending Hack Reactor.

## High Level Goals of this Sprint ##
* Successfully implement a request-response based chat application using component-based thinking with good separation of concerns.
* Gain experience interacting with a REST API
* Gain exposure to some common Browser Security themes

**Exercise repo: `https://github.com/hackreactor/<cohort>-chatterbox-client`**

## Key HTTP Vocabulary ##
The following reading will expose you to a lot of vocabulary having to do with HTTP. You don't need to memorize these terms yet, but be prepared to revisit them and commit them to memory when you begin your job hunt as you can expect to be asked about them during phone screens.
  * [Request-Response Communication](https://en.wikipedia.org/wiki/Request%E2%80%93response)
  * The [HTTP Session](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#HTTP_session) section of Wikipedia's [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) page
  * The [Request Methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) section of Wikipedia's [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) page
  * [List of HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). Don't read this entirely, but at least look into what each of the NXX (e.g. 2XX, 3XX) sections mean.
  
## Browser Security ##
* Read all about [Cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/). You may find this [Interactive Tutorial on Cross-site scripting (XSS)](https://xss-game.appspot.com/) or this one [from Google](https://www.google.com/about/appsecurity/learning/xss/) useful. Note that these tutorials are pretty hard, you don't have to complete them if you don't find them useful.

## Tools You'll Use ##

### ES6 ###
The ***ECMAScript*** specification is a scripting language specification upon which JavaScript implementations (such as those found in web browsers like Chrome) are based. In June 2015, the 6th edition of the ECMAScript standard was finalized, and is commonly referred to as ES6. This was the first major update to the language since 2009. Since then, the committe that decides on language updates has released ES7, ES8 and ES9 (about one update per year) with several smaller but important language improvements.

We encourage you to try experimenting with some new features. Here are some suggested ones for this sprint:
   * arrow functions
   * spread (...) operator
   * rest parameters
   * object literal extensions
   * for...of loops
   * template strings
   
### Package Management ###
A [package manager](https://en.wikipedia.org/wiki/Package_management_system) is a tool for automating the process of installing, upgrading, configuring and managing dependencies ([underscore](http://underscorejs.org/), [jquery](https://jquery.com/), etc) for projects. Most package managers run through a command-line interface.

Today, you'll use a popular package manager called __npm__ to install and keep track of the tools your client-side code requires.

### REST API ###
We've set up a remote API server. Later (as part of a different sprint) you'll build your own (local) server and replace the (remote) one you're using today.

Since you'll eventually reuse parts of your solution to this sprint, try to make your code readable/maintainable so that future-you doesn't get angry at present-you for making things messy.

This API has two endpoints available to you: 1. GET https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/:campus  2. POST https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/:campus

The message objects you send to the api server (via POST requests) should be in the following format:
```
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};
```

To get you started, here's an example POST request. Note that any messages you POST to the server are viewable by ***everyone***, so be nice.
```
$.ajax({
  // This is the url you should use to communicate with the API server.
  url: 'https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/CAMPUS',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
```

### Obtaining an API Key ###
Our API server authenticates users with github personal access tokens. To obtain a token:
  1. Go to: https://github.com/settings/tokens 
  2. Click Generate new token
  3. Give the Token a Description (Hackreactor API, or whatever is most descriptive to you)
  4. Under Select Scopes: Select the following: (You may select more for more featuers this API will offer down the road)
     * read:org
     * user
     * read:user
     * user:email
     * user:follow
  5. Generate Token

### API Keys and Git ###
You should ***NEVER*** check in API Keys to version control. It's easy to accidentally commit sensitive data to your git repo if you're not careful. If you do so (and push to GitHub), everyone will have access to your private keys (which means they can mess with your data).

A common practice (which we adopt here) is to prevent that by storing our API keys in a special file **`config.js`** (referenced in **`chatterbox.html`**) that we add to our **`.gitignore`** so that it's never committed to our repo. This means that after you clone down the repo, before running the app, you must re-create that special file and add your API keys to it or the app won't run.

To make this easier and less prone to breakage, we create a dummy file (which we ***do*** commit) in the correct format, and add placeholders for the real data within it. In this application, that dummy file is located at **`client/env/config.example.js`**.

To get your application running with the real API keys, follow these steps:
  1. Duplicate **`client/env/config.example.js`** renaming it to **`client/env/config.js`** in the process.
     * NOTE: **`client/env/config.js`** is also ignored in your **`.gitignore`** so that the API keys you add won't be committed.
  2. Replace the placeholder strings in your newly created **`client/env/config.js`** with the keys in the API Keys section of this learn block.
  3. Update the **`CAMPUS`** variable with your campus identifier (ex: hr-atx, hr-nyc, hr-lax, hr-sfo, hr-rpe, hr-rfp, hr-rpp, etc). The campus identifier is the letter code at the beginning of each repo name on github, excluding the cohort number.
  
## Bare minimum requirements ##
### Install Pomander ###
In Terminal, run the following command from within this repository:

```
curl -s https://raw.githubusercontent.com/reactorcore/pomander/master/bin/install | bash
```

[Pomander](https://github.com/reactorcore/pomander) will check your code for syntax errors and violations against the Hack Reactor style guide before each commit.

It uses a pre-commit hook to run staged files through **`eslint`** before each commit. **`eslint`** is a linter that will block your commit should you have any syntax errors, or, should you violate the Hack Reactor style guide. There are some preferred whitespace style rules that will give warnings but not block your commit. Your work will be of a higher quality if you follow the instructions of the linter. That said, if the linter gives you any funny bugs, these bugs are not intentional, and you should feel free to skip using it during commits with the **`--no-verify`** option.

### npm ###
This sprint uses [npm](https://www.npmjs.com/) to manage its dependencies. npm comes bundled with Node, and is another JavaScript package manager that makes it easy for developers to share and reuse code. Even though npm started in the Node ecosystem, it is quickly becoming the default choice for sharing all types of JavaScript code.

Here are a few tips to help get up and running:
   * To install all the dependencies run **`npm install`**
   * npm's configuration file is **`package.json`**
   * npm downloads packages into **`node_modules`**
   
Install this sprint's dependencies:
   - [ ] Run **`npm install`**
   
Now run **`npm start`**.
 
### Separation of Concerns ###
As you write the functions that will power your chat applciation, consider what job each of these functions is doing and in which file that function should ideally live. Take note of times where you are mixing concerns and attempt to split functions up into smaller functions so that it's easier to place similar or related concerns together into one file.

The files included in this project suggest one possible arrangement for the separation of concerns and project orgranization. Use the proposed structure or refactor to one you find more intuitive.

### Messages ###
Look inside the **`client/scripts`** folder and start coding.

   - [ ] Display messages retrieved from the api server.
     - [ ] Read about [Underscore's easy templating abilities](https://css-tricks.com/lodge/learn-jquery/24-templating-underscore/) , then create a template function to render a message to HTML. Alternatively, you may use jQuery to construct DOM nodes and compose them together to create the desired HTML output. Underscore's template system is quite extensive and you can read about it's advanced capabilities [here](https://2ality.com/2012/06/underscore-templates.html) .
     - [ ] Be sure to use proper escaping on any user input. Since you're displaying input that other users have typed, your app is vulnerable XSS attacks. See the section about escaping below.
    
**Note**: If you issue an XSS attack, you must make it innocuous enough to be educational, rather than disruptive. Basically you should scope your attacks to be console.log or **minor** style changes. The following are **not** allowed:
     * alerts or popups
     * adding or removing dom elements
     * anything using setInterval
     * spamming the server
     * DDOS attacks
  - [ ] Allow users to save new chat messages to the server
  - [ ] Setup a way to refresh the displayed messages (either automatically or with a button)
  
### A Note About Escaping ###
Escaping is the way we ensure that when users input things to our sites, we don't allow them to write our site's code for us. For example, what if someone's user name was **`<script>$('body').prepend('you got pwned')</script>`**? If we didn't escape, that 'user name' would get executed just like any other code, and all the sudden you'll have a new div on your site that says 'you got pwned', anytime that person's user name is displayed.

Now that might seem trivial, but understand that attacks like this can affect (or transmit) your users data too. That's not cool.

You'll need to figure out a way to effectively protect your app against cross-site scripting (XSS) attacks issued by your class-mates during this sprint. Part of the fun of this sprint is figuring out how to do so.

As always, google is your friend :)

### Rooms ###
   - [ ] Allow users to create rooms and enter existing rooms - Rooms are defined by the **`.roomname`** property of messages, so you'll need to filter them somehow.
   
### Socializing ###
   - [ ] Allow users to 'befriend' other users by clicking on their user name
   - [ ] Display all messages sent by friends in bold or with highlight
   
## Example ##
![image](https://user-images.githubusercontent.com/76498304/117230911-f5974100-add2-11eb-8cb5-ad5d079ea11e.png)
