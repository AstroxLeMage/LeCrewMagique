/*-- MAGIC SCROLL --*/
// Sélectionne tous les éléments correspondant à la classe '.section-container'
const magicElements = document.querySelectorAll('.explorer');
// Ajoute un écouteur d'événement au défilement de la fenêtre
window.addEventListener('scroll', () => {
    // Récupère la position de défilement verticale (scroll) et la hauteur visible de la fenêtre
    const { scrollTop, clientHeight } = document.documentElement;
    // Parcourt chaque élément sélectionné
    magicElements.forEach(magicElement => {
        // Calcule la distance entre le haut de l'élément et le haut de la fenêtre visible
        const topElementToTopViewport = magicElement.getBoundingClientRect().top;
        // Vérifie si le défilement dépasse la position de l'élément moins une portion de la hauteur visible
        if (scrollTop > scrollTop + topElementToTopViewport - clientHeight * 1) {
            // Ajoute la classe 'active' à l'élément si la condition est remplie
            magicElement.classList.add('active');
        }
    });
});

/*-- MAGIC COOKIES --*/
// Attend que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function() {
    // Récupère le choix de l'utilisateur depuis les cookies
    var userChoice = getCookie("userChoice");
    var expiration = getCookie("expiration");
    var cookiesContainer = document.getElementById('cookiesContainer');
    // Vérifie si l'utilisateur a déjà pris une décision et si la période d'expiration n'est pas passée
    if ((userChoice === "accepted" || userChoice === "declined") && new Date().getTime() < expiration) {
        hideCookiesPopup(); // Cache le popup si les conditions sont remplies
    } else {
        // Affiche le popup de cookies si aucune décision n'a été prise ou si la période d'expiration est dépassée
        var cookiesPopupHTML = `
            <div id="magicCookies">
                <div class="cookies_left">
                    <h3>Cookies</h3>
                    <p class="cookiesText">Des cookies magiques parsèment le site pour personnaliser ton expérience. Avant de poursuivre ta balade, tu peux accepter ou refuser cette touche de magie.</p>
                    <p class="cookiesText">Que l'aventure commence !</p>
                    <button class="btn_cookies">Accepter</button>
                    <button class="btn_cookies reject">Non merci !</button>
                </div>
                <div class="cookiesRight"></div>
            </div>
        `;
        cookiesContainer.innerHTML = cookiesPopupHTML; // Affiche le contenu du popup dans l'élément 'cookiesContainer'
    }
    // Sélectionne les boutons d'acceptation et de refus
    var acceptBtn = document.querySelector('.btn_cookies');
    var rejectBtn = document.querySelector('.btn_cookies.reject');
    // Écouteur d'événement pour le bouton d'acceptation
    acceptBtn.addEventListener('click', function() {
        setCookieChoice("accepted"); // Enregistre le choix de l'utilisateur comme "accepté"
        hideCookiesPopup(); // Cache le popup
    });
    // Écouteur d'événement pour le bouton de refus
    rejectBtn.addEventListener('click', function() {
        setCookieChoice("declined"); // Enregistre le choix de l'utilisateur comme "refusé"
        hideCookiesPopup(); // Cache le popup
    });
});
// Fonction pour définir le choix de l'utilisateur dans les cookies
function setCookieChoice(choice) {
    var expirationDate = new Date(); // Date d'expiration
    expirationDate.setDate(expirationDate.getDate() + 30); // 30 Jours
    if (choice === "accepted" || choice === "declined") {
        // Crée un cookie pour enregistrer le choix de l'utilisateur avec une durée de vie de 30 jours
        document.cookie = `userChoice=${choice}; expires=${expirationDate.toUTCString()}; path=/`;
        setExpiration(expirationDate.getTime());
    }
}
// Fonction pour définir la date d'expiration des cookies
function setExpiration(expirationTime) {
    var expirationDate = new Date(expirationTime);
    // Crée un cookie pour enregistrer la date d'expiration des cookies
    document.cookie = `expiration=${expirationDate.getTime()}; expires=${expirationDate.toUTCString()}; path=/`;
}
// Fonction pour récupérer la valeur d'un cookie
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return '';
}
// Fonction pour cacher le popup de cookies
function hideCookiesPopup() {
    var magicCookies = document.getElementById('magicCookies');
    if (magicCookies) {
        magicCookies.style.display = "none";
    }
}

/*-- MAGIC PROGRESS --*/
window.addEventListener('scroll', () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progressBar');
    const progressBarWidth = (scrolled / scrollableHeight) * 100;
    progress.style.width = progressBarWidth + '%';
    // Vérifie si l'utilisateur est arrivé en bas de la page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        progressBar.classList.add('hidden'); // Ajouter la classe pour masquer la barre
    } else {
        progressBar.classList.remove('hidden'); // Retirer la classe pour afficher la barre
    }
});

/*-- MAGIC FAQ --*/
$(document).ready(function() {
    var $open = $(".open");
    var $topic = $(".faqTopic_container");
    var $answer = $(".answer");
    var $liveSearchBox = $('.faqSearch');
    var $noResultsMessage = $('.no-results-message');
    var $question = $('.question');
    $open.click(function() {
      var $container = $(this).parents(".faqTopic_container");
      var $currentAnswer = $container.find(".answer");
      $answer.not($currentAnswer).slideUp(200);
      $currentAnswer.slideToggle(200);
      $topic.not($container).removeClass("expanded");
      $topic.css("background-color", ""); // Réinitialise la couleur de fond pour tous les sujets
      $topic.find('.question').css("color", ""); // Réinitialise la couleur du texte pour toutes les questions
      $answer.css("color", ""); // Réinitialise la couleur du texte pour toutes les réponses
      if (!$container.hasClass("expanded")) {
        $container.toggleClass("expanded");
        $container.css("background-color", "#8172DA"); // Change la couleur de fond pour le sujet ouvert
        $container.find('.question').css("color", "#ffffff"); // Change la couleur du texte pour les questions ouvertes
        $container.find('.answer').css("color", "#ffffff"); // Change la couleur du texte pour les réponses ouvertes
      } else {
        $container.removeClass("expanded");
      }
    });
    $question.each(function() {
      $(this).attr('data-search-term', $(this).text().toLowerCase() + $(this).find("faqTag").text().toLowerCase());
    });
    $liveSearchBox.on('keyup', function() {
      var searchTerm = $(this).val().trim().toLowerCase();
      var anyResults = false;
      if (searchTerm === '') {
        $topic.show(); // Affiche toutes les questions si la recherche est vide
        anyResults = true; // Marque qu'il y a des résultats
      } else {
        $question.each(function() {
          var $parent = $(this).parent().parent();
          var containsTerm = $(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0;
          if (containsTerm) {
            $parent.show(); // Affiche les questions correspondantes
            anyResults = true; // Marque qu'il y a des résultats
          } else {
            $parent.hide(); // Cache les questions non correspondantes
          }
        });
      }
      $noResultsMessage.toggle(!anyResults);
    });
      // Efface le champ de recherche au chargement de la page
    $('.faqSearch').val('');
  });
  
/*-- MAGIC BADGES | HF --*/
/* Fonction pour afficher le popover lorsque la souris survole l'image des badges */
function showPopover(event) {
  // Récupère l'élément du popover et l'image des badges
  var popover = document.getElementById("popover");
  var badgesImg = document.querySelector(".badges_img");
  // Vérifie si la souris est actuellement sur l'image "badges_img"
  if (event.target === badgesImg) {
      // Affiche le popover avec une transition de 0.4 secondes
      popover.style.opacity = "1";
      popover.style.transition = "opacity 0.4s ease";
  }
}
/* Fonction pour masquer le popover */
function hidePopover() {
  // Récupère l'élément du popover
  var popover = document.getElementById("popover");
  // Masque le popover avec une transition de 0.3 secondes
  popover.style.opacity = "0";
  popover.style.transition = "opacity 0.3s ease";
}
// Récupère l'élément de l'image des badges
var badgesImg = document.querySelector(".badges_img");
// Ajoute des écouteurs d'événements pour le survol et la sortie de la souris
badgesImg.addEventListener("mouseover", showPopover);
badgesImg.addEventListener("mouseout", hidePopover);