let allResults = [];
const pageSize = 11;
// max is 10 result
const searchShows = (event) => {
    event.preventDefault();

    const keyword = document.querySelector('#keywords').value;
    const url = `https://api.tvmaze.com/search/shows?q=${keyword}`;
    const resultList = document.querySelector('#results');

    // Clear old results
    resultList.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            allResults = data.map(item => item.show);
            renderPage(1);
        })
        .catch(error => {
            console.error(error);
            resultList.innerHTML = '<p>Something went wrong.</p>';
        });
};

function renderPage(page) {
    const resultList = document.querySelector('#results');
    resultList.innerHTML = '';

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    allResults.slice(start, end).forEach(show => {

        const title = show.name;
        const image = show.image ? show.image.medium : '';
        const genres = show.genres && show.genres.length
            ? show.genres.join(', ')
            : 'TV Show';
        const link = show.url;

        const articleElement = `
            <div class="bg-white border-2 p-4 mb-4 rounded shadow">

                <h5 class="text-lg font-bold mt-1">
                    ${title}
                </h5>

                ${image
                    ? `<img src="${image}" class="w-full h-auto mb-3">`
                    : ''
                }

                <p class="text-gray-600 mb-3 mt-6">
                    ${genres}
                </p>

                <a target="_blank" href="${link}"
                   class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                   View Show
                </a>

            </div>
        `;

        resultList.insertAdjacentHTML('beforeend', articleElement);
    });
}