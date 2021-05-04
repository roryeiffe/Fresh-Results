### Project Name
# Spoiler Block

### Team Members

| UI Team         | Back-End Team    | Full Stack  |
| -------------   |:-------------:   | -----:      |
| Rory Eiffe      | Josh Wildfeuer   | Abdul-Muiz Yusuff (Leader)      |
| Covenant Faluyi | Ben Unger        |        |
| Serena Chen                |                  |      |
| Victoria Savage                |                  |      |
### Description

Spoiler Block is a Google Chrome Extension that filters out search result suggestions that "spoil" or reveal plot elements of the media (shows, movies, books, etc.).

### Business Model

#### Stakeholders
* Users - people who want to be "protected" from spoiler search suggestions.
* Businesses - companies who produce media that can be spoiled, they want their media to garner fame and interest.

We don't want to charge users for using the extension. However, businesses' interest is to increase popularity for their media. So, we can charge companies to submit lists of key-words to block from search results. Companies don't want their shows to be spoiled, as that will cause people to lose interest.

### License

We chose to use GPL because it is a good fit for expanding our ideas and allowing anyone to collaborate. As the project grows, there may be more opportunities to filter spoilers not just in search results, but on web-pages. Filtering out specific results may become difficult, and it would help if a lot of people could put their ideas on and develop solutions as a community. 

Furthermore, we want to encourage open source development, and GPL will ensure that if someone modifies our code or uses it in another project, the derived work will still be open.

### Technologies
We are using JavaScript for our back-end and ReactJS framework for our front-end. 

### Join the Discussion:

Most of our communication will take place on this [Discord](https://discord.gg/czmCt5yQ). Feel free to join to ask questions/discuss!

### Start guide:

First, clone the repository:
```
git clone https://github.com/roryeiffe/Spoiler-Block
cd Spoiler-Block
```
Run the following npm commands:
```
npm install
npm run build (run this every time you make changes)
```
Note: for custom builds, you should still run "npm run build *your build name here*"
- Next, go to chrome://extensions/. 
- Enable developer mode on the top right of the webpage. 
- Click "Load Unpacked" on the top left of the webpage.
- Navigate to the repository directory, and load the build folder. 
- Optional: pin the extension for quicker access by clicking on the extension icon on the top right of chrome and finding "Spoiler Block". 
- Test it out by clicking on the Spoiler Block extension. A pop-up should appear.

Playing around with the extension
- Make sure the toggle switch works
- If you hover your mouse over the "?" and nothing appears, something may have gone wrong
- Go to a wikipedia page of a show that you (preferably) have watched, turn on the extension, test out the color selector, put in some words of your own!
- Happy coding!
