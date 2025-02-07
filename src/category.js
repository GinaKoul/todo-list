import pages from './pages.json';

const Category = (function(doc) {
    let categoryContent;
    let heroImages;
    let mainContent = doc.querySelector('#content');

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
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
        heroTitle.textContent = categoryContent['title'];

        // Add the hero title to the text container
        heroText.appendChild(heroTitle);

        // Add the hero text container to the hero content container
        heroWrapper.appendChild(heroText);

        // Return the hero section
        return heroWrapper;
    }

    function createHeading2(heading) {
        let currentHeading = doc.createElement('h2');
        currentHeading.textContent = heading;
        return currentHeading;
    }

    function createParagraph(text) {
        let currentText = doc.createElement('p');
        currentText.textContent = text;
        return currentText;
    }

    function createCard(product) {
        let listItem = doc.createElement('li');
        let cardHeading = createHeading2(product['title']);
        let cardText = createParagraph(product['description']);
        listItem.id = product['id'];
        listItem.classList.add('card');
        listItem.append(cardHeading,cardText);
        return listItem;
    }

    function createCards() {
        let cardList = doc.createElement('ul');
        cardList.classList.add('card-list');
        let categorySubpages = categoryContent['subpages'];
        categorySubpages.forEach(product => {
            let card = createCard(product);
            cardList.appendChild(card);
        });
        return cardList;
    }

    function createArticleContent() {
        // Create article container
        let articleWrapper = doc.createElement('article');
        articleWrapper.classList.add('container');

        let cardList = createCards();

        // Add content to article container
        articleWrapper.append(cardList);

        // Return article container
        return articleWrapper;
    }

    function addCategoryContent() {
        mainContent.append(createHeroSection(),createArticleContent());
    }

    function initCategoryContent(categoryId) {
        let categoryParentId = categoryId.toString().split('').shift();
        let categoryParent = pages.find(obj => obj["id"] == Number(categoryId.toString().split('').shift()));
        categoryContent =  categoryParent['subpages'].find(obj => obj["id"]== categoryId);
        heroImages =require(`${categoryContent['imageSrc']}?sizes[]=500,sizes[]=1920`);
        scrollToTop();
        addCategoryContent();
    }

    return {
        load: initCategoryContent
    }
})(document);

export {Category};