import pages from './pages.json';

const Contact = (function(doc) {
    let contactContent = pages.find(obj => obj["id"] == 3);;
    let mainContent = doc.querySelector('#content');

    function createHeading1(heading) {
        let currentHeading = doc.createElement('h1');
        currentHeading.textContent = heading;
        return currentHeading;
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

    function createAddressCard(address) {
        let listItem = doc.createElement('li');
        let cardHeading = createHeading2(address['title']);
        let fullAddress = [];
        Object.entries(address['content']).forEach(([key, value]) => {
            fullAddress.push(value);
        });
        let cardText = createParagraph(fullAddress.join(', '));
        listItem.classList.add('card');
        listItem.append(cardHeading,cardText);
        return listItem;
    }

    function createEmailCard(el) {
        let listItem = doc.createElement('li');
        let cardHeading = createHeading2(el['title']);
        let cardText = doc.createElement('p');
        let cardLink = doc.createElement('a');
        cardLink.href = `mailto:${el['content']}`;
        cardLink.textContent = el['content'];
        cardText.append(cardLink);
        listItem.classList.add('card');
        listItem.append(cardHeading,cardText);
        return listItem;
    }

    function createTelCard(el) {
        let listItem = doc.createElement('li');
        let cardHeading = createHeading2(el['title']);
        let cardText = doc.createElement('p');
        let cardLink = doc.createElement('a');
        cardLink.href = `tel:${el['content']}`;
        cardLink.textContent = el['content'];
        cardText.append(cardLink);
        listItem.classList.add('card');
        listItem.append(cardHeading,cardText);
        return listItem;
    }

    function createCards() {
        let cardList = doc.createElement('ul');
        cardList.classList.add('card-list');
        let cardAddress = createAddressCard(contactContent['address']);
        let cardEmail = createEmailCard(contactContent['email']);
        let cardTel = createTelCard(contactContent['tel']);
        cardList.append(cardAddress,cardEmail,cardTel)
        return cardList;
    }

    function createArticleContent() {
        // Create article container
        let articleWrapper = doc.createElement('article');
        articleWrapper.classList.add('container','wmax-sm');

        let articleTitle = createHeading1(contactContent['title']);

        let cardList = createCards();

        // Add content to article container
        articleWrapper.append(articleTitle,cardList);

        // Return article container
        return articleWrapper;
    }

    function addContactContent() {
        mainContent.classList.add('pt-h');
        mainContent.append(createArticleContent());
    }

    return {
        load: addContactContent
    }
})(document);

export {Contact};