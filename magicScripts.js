/*-- SCROLL ANIMATION | MAGIC SCROLL --*/
const magicElements = document.querySelectorAll('.magicScroll');

if (window.innerWidth < 1024) {
    magicElements.forEach(el => el.classList.add('active'));
} else {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    magicElements.forEach(el => observer.observe(el));
};

/*-- TWITCH PLAYER --*/
let twitchPlayer = null;

function loadTwitchPlayer() {
    const embedElement = document.getElementById("twitch-embed");
    
    if (!embedElement) {
        console.warn("⚠️ Impossible de charger Twitch : #twitch-embed introuvable.");
        return;
    }

    if (!twitchPlayer) {
        twitchPlayer = new Twitch.Player("twitch-embed", {
            channel: "Astroxlemage",
            width: "100%",
            height: "100%",
            layout: "video",
        });

        twitchPlayer.addEventListener(Twitch.Player.READY, handleResize);
    }
}

function handleResize() {
    const container = document.getElementById("twitch-container");
    if (!container || !twitchPlayer) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const newHeight = containerWidth * (9 / 16);


    twitchPlayer.setWidth(containerWidth);
    twitchPlayer.setHeight(newHeight);

    const embedElement = document.getElementById("twitch-embed");
    if (embedElement) {
        embedElement.style.position = "absolute";
        embedElement.style.top = `${(containerHeight - newHeight) / 2}px`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadTwitchPlayer();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => requestAnimationFrame(handleResize), 100);
    });

    handleResize();
});

/*-- COOKIES | MAGIC COOKIES --*/
document.addEventListener("DOMContentLoaded", function () {
    const userChoice = getCookie("userChoice");
    const expiration = parseInt(getCookie("expiration"), 10) || 0;
    const cookiesContainer = document.getElementById("cookiesContainer");

    if (!cookiesContainer) {
        console.warn("⚠️ cookiesContainer introuvable dans le DOM.");
        return;
    }

    if ((userChoice === "accepted" || userChoice === "declined") && Date.now() < expiration) {
        hideCookiesPopup();
    } else {
        cookiesContainer.innerHTML = `
            <div id="magicCookies" class="cookies-popup">
                <div class="cookies_left">
                    <h3>Cookies</h3>
                    <p class="cookiesText">Des cookies magiques parsèment le site pour personnaliser ton expérience. Avant de poursuivre ta balade, tu peux accepter ou refuser cette touche de magie.</p>
                    <p class="cookiesText">Que l'aventure commence !</p>
                    <button id="acceptCookies" class="btn_cookies">Accepter</button>
                    <button id="rejectCookies" class="btn_cookies reject">Non merci !</button>
                </div>
                <div class="cookiesRight"></div>
            </div>
        `;

        document.getElementById("acceptCookies").addEventListener("click", function () {
            setCookieChoice("accepted");
            hideCookiesPopup();
        });

        document.getElementById("rejectCookies").addEventListener("click", function () {
            setCookieChoice("declined");
            hideCookiesPopup();
        });
    }
});

function setCookieChoice(choice) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    const expires = expirationDate.toUTCString();

    if (choice === "accepted" || choice === "declined") {
        document.cookie = `userChoice=${choice}; expires=${expires}; path=/; Secure; SameSite=Lax`;
        document.cookie = `expiration=${expirationDate.getTime()}; expires=${expires}; path=/; Secure; SameSite=Lax`;
    }
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return "";
}

function hideCookiesPopup() {
    const magicCookies = document.getElementById("magicCookies");
    if (magicCookies) {
        magicCookies.style.opacity = "0";
        setTimeout(() => magicCookies.remove(), 300);
    }
}

/*-- BARRE DE PROGRESSION | MAGIC PROGRESS --*/
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateProgressBar();
            ticking = false;
        });
        ticking = true;
    }
});

function updateProgressBar() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progressBar');

    if (!progress || !progressBar) return;

    const progressBarWidth = (scrolled / scrollableHeight) * 100;
    progress.style.width = progressBarWidth + '%';

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        progressBar.classList.add('hidden');
    } else {
        progressBar.classList.remove('hidden');
    }
}

/*-- FOIRE AUX QUESTIONS | FAQ --*/
$(document).ready(function() {
    var $open = $(".open");
    var $topic = $(".faqTopic_container");
    var $answer = $(".answer");
    var $liveSearchBox = $('.faqSearch');
    var $noResultsMessage = $('.no-results-message');
    var $question = $('.question');

    $open.click(function() {
        var $container = $(this).closest(".faqTopic_container");
        var $currentAnswer = $container.find(".answer");

        $answer.not($currentAnswer).slideUp(200);
        $topic.not($container).removeClass("expanded").css("background-color", "").find('.question, .answer').css("color", "");

        $currentAnswer.slideToggle(200);
        $container.toggleClass("expanded");

        if ($container.hasClass("expanded")) {
            $container.css("background-color", "#8172DA").find('.question, .answer').css("color", "#ffffff");
        } else {
            $container.css("background-color", "").find('.question, .answer').css("color", "");
        }
    });

    $question.each(function() {
        var tags = $(this).find(".faqTag").text().toLowerCase();
        $(this).attr('data-search-term', ($(this).text().toLowerCase() + " " + tags).trim());
    });

    $liveSearchBox.on('keyup', function() {
        var searchTerm = $(this).val().trim().toLowerCase();
        var anyResults = false;

        if (searchTerm === '') {
            $topic.show(); 
            anyResults = true;
        } else {
            $question.each(function() {
                var $parent = $(this).closest('.faqTopic_container');
                var term = $(this).attr('data-search-term');

                if (term.includes(searchTerm)) {
                    $parent.show();
                    anyResults = true;
                } else {
                    $parent.hide();
                }
            });
        }

        $noResultsMessage.toggle(!anyResults);
    });

    $liveSearchBox.val('');
});

/*-- MAGIC BADGES | HF --*/
document.addEventListener("DOMContentLoaded", function () {
    
    function showPopover(event) {
        var popover = document.getElementById("popover");
        if (!popover) return;
        
        popover.style.opacity = "1";
        popover.style.transition = "opacity 0.4s ease";
    }

    function hidePopover() {
        var popover = document.getElementById("popover");
        if (!popover) return;

        popover.style.opacity = "0";
        popover.style.transition = "opacity 0.3s ease";
    }

    var badgesImg = document.querySelector(".badges_img");
    if (badgesImg) {
        badgesImg.addEventListener("mouseover", showPopover);
        badgesImg.addEventListener("mouseout", hidePopover);
    } else {
        console.warn("⚠️ L'élément .badges_img n'a pas été trouvé dans le DOM.");
    }
});

/* -- NAVIGATION DROPDOWN ANIMATION -- */
let dropdownTimeout;

function showDropdown() {
    clearTimeout(dropdownTimeout);
    const dropContainer = document.querySelector('.dropContainer');
    const dropBtn = document.querySelector('.dropbtn');
    const navCat = document.querySelector('.navCat.dropdown');

    dropContainer.style.opacity = '1';
    dropContainer.style.visibility = 'visible';
    dropContainer.style.transform = 'translateX(-50%) translateY(0)';
    dropContainer.style.pointerEvents = 'auto';
    
    navCat.classList.add('active');
}

function hideDropdown() {
    dropdownTimeout = setTimeout(() => {
        const dropContainer = document.querySelector('.dropContainer');
        const dropBtn = document.querySelector('.dropbtn');
        const navCat = document.querySelector('.navCat.dropdown');

        dropContainer.style.opacity = '0';
        dropContainer.style.transform = 'translateX(-50%) translateY(-10px)';
        dropContainer.style.visibility = 'hidden';
        dropContainer.style.pointerEvents = 'none';

        navCat.classList.remove('active');
    }, 100);
}

/* -- CHARGEMENT NAVIGATION | FOOTER --*/
document.addEventListener("DOMContentLoaded", function () {
    let navigation = document.getElementById('navigation');
    let footer = document.getElementById('footer');

    // Navigation | Chargement
    if (navigation) {
        fetch('nav.html')
            .then(response => response.ok ? response.text() : Promise.reject(response.status))
            .then(data => navigation.innerHTML = data)
            .catch(error => console.error("❌ Erreur de chargement de la Navigation:", error));
    }

    // Footer | Chargement
    if (footer) {
        fetch('footer.html')
            .then(response => response.ok ? response.text() : Promise.reject(response.status))
            .then(data => footer.innerHTML = data)
            .catch(error => console.error("❌ Erreur de chargement du Footer:", error));
    }
});