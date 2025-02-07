import pages from './pages.json';
import { Category } from './category.js';

const Categories = (function(doc) {
    const categoriesContent = pages.find(obj => obj["id"]== 2);
    const heroImages = require(`${categoriesContent['imageSrc']}?sizes[]=500,sizes[]=1920`);
    let mainContent = doc.querySelector('#content');

    function loadCategory(categoryId) {
        mainContent.innerHTML = null;
        Category.load(categoryId);
    }

    function createHeroSection() {
        // Create a container for hero content
        let heroWrapper = doc.createElement('section');
        heroWrapper.classList.add('hero-container');
        if(window.innerWidth <= 767) {
            heroWrapper.style.setProperty('--hero-image',`url(${heroImages.images.find(image => image.width == 500).path})`);
        }else {
            heroWrapper.style.setProperty('--hero-image',`url(${heroImages.images.find(image => image.width == 1920).path})`);
        }

        // Create container for hero text
        let heroText = doc.createElement('div');
        heroText.classList.add('hero-text','container');

        // Create hero title
        let heroTitle = doc.createElement('h1');
        heroTitle.textContent = categoriesContent['title'];

        // Add the hero title to the text container
        heroText.appendChild(heroTitle);

        // Add the hero text container to the hero content container
        heroWrapper.appendChild(heroText);

        // Return the hero section
        return heroWrapper;
    }

    function createHeading3(heading) {
        let currentHeading = doc.createElement('h3');
        currentHeading.textContent = heading;
        return currentHeading;
    }

    function createParagraph(text) {
        let currentText = doc.createElement('p');
        currentText.textContent = text;
        return currentText;
    }

    function createCard(category) {
        let listItem = doc.createElement('li');
        let cardWrapper = doc.createElement('figure');
        let cardImage = doc.createElement('img');
        let cardText = doc.createElement('figcaption');
        const cardImageFile = require(`${category['imageSrc']}?sizes[]=500,sizes[]=364`);
        listItem.id = category['id'];
        listItem.setAttribute('data-id',category['id']);
        listItem.classList.add('card','has-hover');
        listItem.addEventListener('click', ()=>{
            loadCategory(category['id']);
        });
        let cardHeading = createHeading3(category['title']);
        cardImage.setAttribute('srcset',cardImageFile.srcSet);
        cardImage.setAttribute('src',cardImageFile.src);
        cardImage.setAttribute('alt',cardImageFile.placeholder);
        cardImage.setAttribute('sizes','(max-width: 676px) 500px, 364px');
        cardText.append(cardHeading);
        cardWrapper.append(cardImage,cardText);
        listItem.appendChild(cardWrapper);
        return listItem;
    }

    function createCards() {
        let cardList = doc.createElement('ol');
        cardList.classList.add('card-list','row-md-3');
        let categoriesSubpages = categoriesContent['subpages'];
        categoriesSubpages.forEach(category => {
            let card = createCard(category);
            cardList.appendChild(card);
        });
        return cardList;
    }

    function createArticleContent() {
        // Create article container
        let articleWrapper = doc.createElement('article');
        articleWrapper.classList.add('container');

        // Create article title
        let articleHeading = doc.createElement('h2');
        articleHeading.textContent = categoriesContent['articleTitle'];

        // Create article text 1
        let articleText1 = createParagraph(categoriesContent['articleText1']);
        
        // Create article text 2
        let articleText2 = createParagraph(categoriesContent['articleText2']);

        let cardList = createCards();

        // Add content to article container
        articleWrapper.append(articleHeading,articleText1,articleText2,cardList);

        // Return article container
        return articleWrapper;
    }

    function addCategoriesContent() {
        mainContent.append(createHeroSection(),createArticleContent());
    }

    return {
        load: addCategoriesContent
    }
})(document);

export {Categories};