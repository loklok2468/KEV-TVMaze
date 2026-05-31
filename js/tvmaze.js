/*
    It fetches TV shows and displays them on the page.
*/

function loadShows(query) {

    //TVMaze URL
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;

    //Results container
    const results = document.getElementById('results');

    //Clear old results
    results.innerHTML = '';

    //Fetch data from TVMaze
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // If no results were found
            if (!data || data.length === 0) {
                results.innerHTML = '<p>No results found.</p>';
                return;
            }

            // Loop through each result
            data.forEach(item => {

                const show = item.show;

                //every details
                const title = show.name;
                const link = show.url;
                const image = show.image ? show.image.medium : '';
                const genres = show.genres && show.genres.length
                    ? show.genres.join(', ')
                    : 'TV Show';

                //HTML output
                const html = `
                    <div class="bg-white border p-4 rounded shadow mb-4">

                        ${image
                            ? `<img src="${image}" alt="${title}" class="w-full h-auto mb-3">`
                            : ''
                        }

                        <h3 class="font-bold text-lg mb-2">
                            ${title}
                        </h3>

                        <p class="text-sm mb-2">
                            ${genres}
                        </p>

                        <a href="${link}" target="_blank"
                           class="text-blue-600 font-bold hover:underline">
                           View on TVMaze
                        </a>

                    </div>
                `;

                // Add to the page
                results.insertAdjacentHTML('beforeend', html);
            });
        })
        .catch(error => {
            console.error('Error fetching TVMaze data:', error);
            results.innerHTML = '<p>Something went wrong.</p>';
        });
}

/* ---RANDOM PREVIEW SHOW -- */

function loadPreview(query, elementId) {

    const url = `https://api.tvmaze.com/search/shows?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (!data || data.length === 0) {
                return;
            }

            //random show
            const randomIndex = Math.floor(Math.random() * data.length);
            const show = data[randomIndex].show;

            const element = document.getElementById(elementId);

            const title = show.name;
            const link = show.url;
            const image = show.image ? show.image.medium : '';
            const genres = show.genres && show.genres.length
                ? show.genres.join(', ')
                : 'TV Show';

            element.innerHTML = `
                <span class="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-5 py-2 text-base font-semibold mb-5">
                    ${genres}
                </span>

                ${image
                    ? `<img src="${image}" alt="${title}"
                           class="w-full h-60 object-cover rounded mb-4">`
                    : ''
                }

                <h2 class="mt-4 text-xl font-bold">
                    ${title}
                </h2>

                <a href="${link}" target="_blank"
                   class="font-bold mt-4 inline-block text-blue-600 hover:text-blue-800">
                   View Show →
                </a>
            `;
        })
        .catch(error => {
            console.error('Preview error:', error);
        });
}