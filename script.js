const burger = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-nav');

burger.addEventListener('click', (e) => {
    primaryNav.hasAttribute('data-visible') ? 
        burger.setAttribute('aria-expanded', false) :
        burger.setAttribute('aria-expanded', true);

    primaryNav.toggleAttribute('data-visible')
})

const copyButtons = document.querySelectorAll('.btn-copy');
copyButtons.forEach(b => {
    b.addEventListener('click', (e) => {
        b.toggleAttribute('data-iscopied');

        if (b.hasAttribute('data-iscopied')) {
            b.innerHTML = 'Copied!';
            b.setAttribute('data-type', "neutral");
            navigator.clipboard.writeText(b.getAttribute('data-text'))
            copyButtons.forEach(x => {
                if (x != b) {
                    x.removeAttribute('data-iscopied');
                    x.innerHTML = 'Copy';
                    x.setAttribute('data-type', "primary");
                }
            })
        } else {
            b.innerHTML = 'Copy';
            b.setAttribute('data-type', "primary");
        }
    })
})

const linkInput = document.getElementById('link');
const form = document.getElementById('form');
const linksContainer = document.querySelector('.links');


window.addEventListener('load', (e) => {
    loadLinksToHtml();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (linkInput.value === '') {
        linkInput.invalid = true;
        linkInput.classList.add('input-error')
    } else {
        shortenLink(linkInput.value);

        linkInput.value = '';
        linkInput.classList.remove('input-error');

    }

})

linkInput.addEventListener('keyup', (e) => {
    if (e.target.value == '' || !e.target.value) {
        // Uncomment if you want to have an error message when input is blank when every key pressed.
        // linkInput.classList.add('input-error')
    }
})


function loadLinksToHtml() {
    const links = JSON.parse(window.localStorage.getItem('links'));
    const htmls = links?.map(link => {
        return `
        <div class="link-card">
            <span class="original">${link?.original ?? "https://www.frontendmentor.io"}</span>
            <span class="new-link | color-primary-400">${link?.newLink ?? "https://relink.sqwe"}</span>
            <button class="btn" data-type="primary">${link?.isCopied ? 'Copied' : 'Copy'}</button>
        </div>
        `
    })

    htmls?.forEach(x => {
        linksContainer.innerHTML += x;
    })

}

function shortenLink(origLink) {
    const api = 'https://api.shrtco.de/v2/shorten' + `?url=${origLink}`;
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            // "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
          },
        mode: 'cors'
    };


    fetch(api, options).then(res => {
        storeResult(res);
      }, (err) => {
        console.log("Request failed! resposnse:", err)
      });
}

function storeResult(result) {
    // TODO
    console.warn(result);
}