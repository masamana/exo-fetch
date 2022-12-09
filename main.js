// EXO : 
// En utilisant l'api publique de meal DB (https://www.themealdb.com/api.php, faite dans un nouveau fichier html / js :
// - au clic sur un bouton, affichez une recette aléatoire
// - pour ça, utilisez fetch (soit avec async await soit avec then) sur la bonne url de l'api



const container = document.querySelector('#root');

const mealBtn = document.querySelector('.meal-btn');

const fetchMeal = async () => {
    const mealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const mealData = await mealResponse.json();

    return mealData.meals[0];

};

const createH2Element = (container, textToDisplay) => {
    const h2Element = document.createElement('h2');
    h2Element.textContent = textToDisplay;
    container.append(h2Element);
};

const createImgElement = (container, imgToDisplay) => {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', imgToDisplay);
    container.append(imgElement);  
};

const createPElement = (container, textToDisplay) => {
    const pElement = document.createElement('p');
    pElement.textContent = textToDisplay;
    container.append(pElement);
};

const createLiElement = (ulElement, mealData) => {
    for(let i = 1; i <= 20; i++) {
 
        if (mealData["strIngredient" + i]) {
            const liElement = document.createElement('li');
            liElement.textContent = mealData["strIngredient" + i];
            ulElement.append(liElement);
        }

    };
};


mealBtn.addEventListener('click', async () => {

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", "meal");
    history.replaceState(null, null, "?"+queryParams.toString());

    container.innerHTML = "";

    const mealData = await fetchMeal();
    
    createH2Element(container, mealData.strMeal);

    const ulElement = document.createElement('ul');
    container.append(ulElement); 
  

    createLiElement(ulElement, mealData); 

    createImgElement(container, mealData.strMealThumb);

    createPElement(container, mealData.strInstructions);
    
});




