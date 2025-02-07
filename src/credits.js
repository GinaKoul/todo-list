import pages from './pages.json';

const Credits = (function(doc) {
    const creditsContent = pages.find(obj => obj["id"]== 4);
    let mainContent = doc.querySelector('#content');

    function createHeading1(heading) {
        let currentHeading = doc.createElement('h1');
        currentHeading.textContent = heading;
        return currentHeading;
    }

    function createCard(credit) {
        let listItem = doc.createElement('li');
        let cardWrapper = doc.createElement('figure');
        let cardImage = doc.createElement('img');
        const cardImageFile = require(`${credit['imageSrc']}?sizes[]=500,sizes[]=364`);
        let cardHeading = doc.createElement('h2');
        let cardText = doc.createElement('figcaption');
        let cardParagraph = doc.createElement('p');
        let cardLink = doc.createElement('a');
        listItem.classList.add('card','has-hover');
        cardImage.setAttribute('srcset',cardImageFile.srcSet);
        cardImage.setAttribute('src',cardImageFile.src);
        cardImage.setAttribute('alt',cardImageFile.placeholder);
        cardImage.setAttribute('sizes','(max-width: 676px) 500px, 364px');
        cardLink.href = credit['link'];
        cardLink.setAttribute('target','_blank');
        let imageLink = cardLink.cloneNode(true);
        imageLink.append(cardImage);
        cardLink.textContent = credit['title'];
        cardHeading.appendChild(cardLink);
        cardText.append(cardHeading);
        cardWrapper.append(imageLink,cardText);
        listItem.appendChild(cardWrapper);
        return listItem;
    }

    function createCards() {
        let cardList = doc.createElement('ol');
        cardList.classList.add('card-list','row-md-3');
        let creditsSubpages = creditsContent['subpages'];
        creditsSubpages.forEach(credit => {
            let card = createCard(credit);
            cardList.appendChild(card);
        });
        return cardList;
    }

    function createArticleContent() {
        // Create article container
        let articleWrapper = doc.createElement('article');
        articleWrapper.classList.add('container');

        // Create article title
        let articleHeading = createHeading1(creditsContent['title']);

        let cardList = createCards();

        // Add content to article container
        articleWrapper.append(articleHeading,cardList);

        // Return article container
        return articleWrapper;
    }

    function addCreditsContent() {
        mainContent.classList.add('pt-h');
        mainContent.append(createArticleContent());
    }

    return {
        load: addCreditsContent
    }
})(document);

export {Credits};