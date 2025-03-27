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


/*-- FOIRE AUX QUESTIONS | FAQ | SECRET --*/
$(document).ready(function() {
    var $open = $(".open");
    var $topic = $(".faqTopic_container");
    var $answer = $(".answer");
    var $liveSearchBox = $('.faqSearch');
    var $noResultsMessage = $('.no-results-message');
    var $question = $('.question');

    // Liste des mots-clés aléatoires pour le ticket magique
    var motsCles = [
        "Flamme d'Avalar",
        "Souffle Ancien",
        "Éveil Draconique",
        "Cendres Magiques",
        "Lumière du Nexus"
    ];

    function getMotCleAleatoire() {
        return motsCles[Math.floor(Math.random() * motsCles.length)];
    }

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

        // Ajouter une condition pour empêcher la génération d'un mot-clé si l'espace est pressé avant
        if (searchTerm === '') {
            $topic.show();
            $noResultsMessage.hide();
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

        // Gérer le message de Spyro si le bon mot-clé est trouvé
        if (searchTerm === 'spyro') {
            var motCleAleatoire = getMotCleAleatoire();
            $noResultsMessage.html(`
                <div class="spyro-message">
                    <img class="dragon_img" src="img/secretEnigme.png" alt="Break">
                    <p><strong>Félicitations, voyageur(euse) !</strong></p>
                    <p>En inscrivant mon nom dans le Codex, tu as ravivé l’éclat de ma flamme, et avec elle, la magie du Crew Magique s’est renforcée. Pour avoir percé ce secret, je t’offre l’opportunité de rejoindre les <b>Messager(ère)s de l'Oublié.</b></p><br>
                    <p>Rends-toi dans le salon <b>Suggestion</b> du Discord, ouvre un <b>Ticket Magique</b> et inscris ce que je te révèle ci-dessous :</p><br>
                    <p class="avertissement"><em>Avertissement : Ne révèle ni le secret, ni l'accès à l’énigme. Ceux qui brisent ce pacte risquent de perdre leur chemin.</em></p>
                    <button class="key-btn" data-key="${motCleAleatoire}">${motCleAleatoire}</button>
                    <div class="copy-message">
                        <img class="check_merlin" src="img/cookies_illu.png">
                        <p class="copy-text">Le Mot-clé a bien été copié !</p>
                    </div>
                </div>
            `).show();
        } else {
            $noResultsMessage.toggle(!anyResults).text("Je vois que ta curiosité est sans limite, mais cette fois-ci, la réponse reste insaisissable !");
        }
    });

    // Fonction pour copier le mot-clé en un clic
    $(document).on("click", ".key-btn", function() {
        var motCle = $(this).data("key");
        var $tempInput = $("<input>");
        $("body").append($tempInput);
        $tempInput.val(motCle).select();
        document.execCommand("copy");
        $tempInput.remove();
        
        // Afficher un message de confirmation
        $(this).siblings(".copy-message").fadeIn(300).delay(2000).fadeOut(300);
    });

    // Réinitialiser la valeur de la barre de recherche
    $liveSearchBox.val('');
});

/*---- ------*/

document.addEventListener("DOMContentLoaded", function () {
    const letter = document.getElementById("letter");
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const today = now.toDateString();
    const lastReadDate = localStorage.getItem("letterReadDate");

    // 🔄 Heures et minutes d'apparition (modifiable)
    const schedule = [
        { hour: 11, minute: 48 },  // Affiche à 10h30
        { hour: 14, minute: 45 },  // Affiche à 14h45
        { hour: 18, minute: 0 },   // Affiche à 18h00
        { hour: 22, minute: 15 }   // Affiche à 22h15
    ];

    // 🔎 Vérifier si la lettre doit apparaître
    schedule.forEach(time => {
        if (currentHour === time.hour && currentMinute === time.minute && lastReadDate !== today) {
            letter.style.display = "block"; // Affiche l'enveloppe

            // 📌 Masquer après lecture (quand la lettre se referme)
            letter.addEventListener("click", function () {
                setTimeout(() => {
                    letter.style.display = "none";
                    localStorage.setItem("letterReadDate", today); // Marquer comme lue
                }, 800); // Attendre 0.8s pour simuler la fermeture
            });

            // ⏳ Masquer automatiquement après 10 secondes
            setTimeout(() => {
                letter.style.display = "none";
            }, 500450);
        }
    });
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
    let footer = document.getElementById('footer');

    // Footer | Chargement
    if (footer) {
        fetch('footer.html')
            .then(response => response.ok ? response.text() : Promise.reject(response.status))
            .then(data => footer.innerHTML = data)
            .catch(error => console.error("❌ Erreur de chargement du Footer:", error));
    }
});




/*---- CMD PAGINATION ---*/
document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll("tbody tr"); // Toutes les commandes
    const itemsPerPage = 10;
    let currentPage = 1;
    const totalCommands = rows.length;
    const totalPages = Math.ceil(totalCommands / itemsPerPage);

    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");
    const pageNumbersContainer = document.getElementById("pageNumbers");
    const commandInfo = document.getElementById("commandInfo");

    function afficherPage(page) {
        rows.forEach((row, index) => {
            row.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? "table-row" : "none";
        });

        updatePageNumbers();
        prevButton.disabled = page === 1;
        nextButton.disabled = page === totalPages;
    }

    function updatePageNumbers() {
        pageNumbersContainer.innerHTML = ""; // Reset des numéros de page

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("page-number");
            if (i === currentPage) {
                pageButton.classList.add("active");
            }
            pageButton.addEventListener("click", function () {
                currentPage = i;
                afficherPage(currentPage);
            });
            pageNumbersContainer.appendChild(pageButton);
        }

        commandInfo.textContent = `Total : ${totalCommands} commandes`;
    }

    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            afficherPage(currentPage);
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            afficherPage(currentPage);
        }
    });

    afficherPage(currentPage);
});
