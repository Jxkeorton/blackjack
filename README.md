# Blackjack Royale

![am i responsive](docs/amiresponsive-blackjack.png)

Blackjack Royale is a Javascript game build to allow users to play a game of blackjack online for fun. Built emulate real life gambling without the real life risk.

## Features

### Site wide
* Navigation menu
    * Contains links to the Home and Game pages and will be responsive on all devices.
![site navigation](docs/nav.png)

    * This will allow users to easily navigate between the pages within the site on any size device. 

* Footer
    * This will contain a link to my GitHub page and a font awesome icon to make it more visually appealing. Link will open in a new tab when clicked.
    * This will allow the user to follow me on my Github page
![footer](docs/footer.png)

* Favicon
    * A site wide favicon will be implemented with a red poker chip.
    * This will provide an image in the the tabs header to allow the user to easily identify the website if they have multiple tabs open.
![favicon](images/favicon/favicon-32x32.png)

* 404 page
    * A 404 page will be implemented and will display if a user navigates to a broken link.
    * The 404 page will allow the user to easily navigate back to the main website if they direct to a broken link / missing page, without the need  of the browsers back button.
![error page](docs/404-page.png)

### Home Screen
- Game Rules
    - instructions for the game so the user is informed on how to play and get the most out of the app.
![rules](docs/rules.png)

- Lets Play button
    - A button that will cause the game screen to be displayed.

![lets play button](docs/start-game-button.png)


### Game Screen
- Dealers hand
    - images of the cards that the dealer is holding to help the user make an informed decision when playing the game simulating the real life experience.

- players hand
    - To show the user what cards they are holding.
![game screen](docs/game-screen.png)

- Game controls
    - So the user can interact and have control over the game.
![game screen controls](docs/game-controls.png)

### Betting options
![betting options](docs/betting-options.png)
![betting options controls](docs/betting-options-controls.png)

### End game screen
- Feedback
    - This area will provide feedback to the user to describe wether they won or lost the game.
- Play again button
    - A button giving the user the option to play again.
![end game screen](docs/end-game-screen.png)

## Design

### Color pallette
![color pallette](docs/color-pallette.jpg)

### Wire frames
- Home Screen

![Home Wire frame](docs/home-screen-wireframe.png)

- Game Screen

![Game wire frame](docs/game-screen-wireframe.png)

- End game screen

![End game wire frame](docs/end-game-wireframe.png)

## Technologies

- HTML
  - The structure of the Website was developed using HTML as the main language.
- CSS
  - The Website was styled using custom CSS in an external file.
- JavaScript
  - The game play logic was created using JavaScript in an external file.
- Visual Studio Code
  - The website was developed using Visual Studio Code IDE
- GitHub
  - Source code is hosted on GitHub and deployed using Git Pages.
- Git
  - Used to commit and push code during the development of the Website
- Font Awesome
  - Icon obtained from https://fontawesome.com/ was used for GitHub Icon in the footer.
- Favicon.io
  - favicon files were created at https://favicon.io/favicon-converter/
- Balsamiq
  - wireframes were created using balsamiq from https://balsamiq.com/wireframes/desktop/#
- Canva
  - This was used to create the favicon

## Testing

### Responsiveness

All pages were tested to ensure responsiveness on screen sizes from 320px and upwards as defined in [WCAG 2.1 Reflow criteria for responsive design](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html) on Chrome, Edge, Firefox and Opera browsers.

Steps to test:

1. Open browser and navigate to [BlackJack Royale](https://jxkeorton.github.io/blackjack/)
2. Open the developer tools (right click and inspect)
3. Set to responsive and decrease width to 320px
4. Set the zoom to 50%
5. Click and drag the responsive window to maximum width

Expected:

Website is responsive on all screen sizes and no images are pixelated or stretched.
No horizontal scroll is present.
No elements overlap.

Actual:

Website behaved as expected.

Website was also opened on the following device and no responsive issues were seen:

IPhone X

### Accessibility

### Functional testing

### Validators
* HTML
* CSS
* Javascript

### Lighthouse

## Deployment

### Version Control

The site was created using the Visual Studio Code editor and pushed to github to the remote repository ‘Portfolio-Project-2-Poker-Fun’.

The following git commands were used throughout development to push code to the remote repo:

```git add <file>``` - This command was used to add the file(s) to the staging area before they are committed.

```git commit -m “commit message”``` - This command was used to commit changes to the local repository queue ready for the final step.

```git push``` - This command was used to push all committed code to the remote repository on github.

### Deployment to Github Pages

- The site was deployed to GitHub pages. The steps to deploy are as follows:
  - In the GitHub repository, navigate to the Settings tab
  - From the menu on left select 'Pages'
  - From the source section drop-down menu, select the Branch: main
  - Click 'Save'
  - A live link will be displayed in a green banner when published successfully.

The live link can be found here - https://jxkeorton.github.io/blackjack/

### Clone the Repository Code Locally

Navigate to the GitHub Repository you want to clone to use locally:

- Click on the code drop down button
- Click on HTTPS
- Copy the repository link to the clipboard
- Open your IDE of choice (git must be installed for the next steps)
- Type git clone copied-git-url into the IDE terminal

The project will now have been cloned on your local machine for use.

## Credits
