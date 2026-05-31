// Initial Sport JS - starter file for Guardian API fetching
// API endpoint placeholders
const url = 'https://content.guardianapis.com/search?q=sport&api-key=';
const apiKey = 'c45dcd36-eaee-482a-8b0e-1d9a241a0c8f';
// .Log to testing
console.log(url);

// Select results container 
const resultList = document.querySelector('#results');

fetch(url + apiKey)
    .then((response) => response.json())
    .then((data) => {
        data.response.results.forEach(function (value) {
         console.log(value);

           // console.log(value.webUrl); 
           // grey color means it is not being used in the code, 
           // but it is still there and can be used if needed.
           // console.log(value.webTitle);

           // Append each title to the results list
            const articleElement = 
            `<div> 
                <div class="bg-white border-2 p-4 mb-4 rounded shadow">
                 <h5 class="text-lg font-semibold">${value.webTitle}</h5>
                 
                 <p class="text-gray-600 mb-3 mt-3">${value.sectionName}</p>
                 <a target="_blank" href="${value.webUrl}" 
                 class="inline-block bg-blue-500 text-white
                    px-4 py-2 rounded hover:bg-blue-600">
                 View Article</a>
                </div>
            </div>`;
                                    
            resultList.insertAdjacentHTML('beforeend', articleElement);
        });
    });

