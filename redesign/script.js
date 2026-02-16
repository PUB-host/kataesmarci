// ======================================== // Fő szekció jelölő komment. 
// DOM ELEMEK
// ======================================== // Fő szekció jelölő komment. 

const navbar = document.getElementById('navbar'); // Navbar elem lekérése DOM-ból. 
const navToggle = document.querySelector('.nav-toggle'); // Mobil hamburger gomb lekérése. 
const navMenu = document.querySelector('.nav-menu'); // Mobil menü (ul) lekérése. 
const navLinks = document.querySelectorAll('.nav-menu a'); // Menü linkek listája. 

// ======================================== // Fő szekció jelölő komment. 
// NAVBAR HÁTTÉR SCROLL-NÁL
// ======================================== // Fő szekció jelölő komment. 

window.addEventListener('scroll', () => { // Scroll esemény figyelése. 
    if (window.scrollY > 100) { // Ha lejjebb görgettünk 100px-nél. 
        navbar.classList.add('scrolled'); // Add hozzá a "scrolled" osztályt. 
    } else { // Ha visszagörgettünk. 
        navbar.classList.remove('scrolled'); // Vedd le a "scrolled" osztályt. 
    } // Elágazás vége. 
}, { passive: true }); // Passzív listener: gördülékenyebb mobilon. 

// ======================================== // Fő szekció jelölő komment. 
// MOBIL/TABLET NAVBAR AUTO-ELREJTÉS (le -> eltűnik, fel -> megjelenik)
// ======================================== // Fő szekció jelölő komment. 

let elozoScrollY = window.scrollY; // Előző scroll pozíció tárolása. 
const navRejtKuszob = 120; // Küszöb: a tetején ne villogjon a rejtés. 

window.addEventListener('scroll', () => { // Scroll esemény figyelése. 
    const aktualisScrollY = window.scrollY; // Aktuális scroll pozíció. 
    const menuNyitva = navMenu.classList.contains('active'); // Nyitva van-e a hamburger menü. 

    if (menuNyitva) { // Ha a menü nyitva van. 
        navbar.classList.remove('nav-hidden'); // A navbar maradjon látható. 
        elozoScrollY = aktualisScrollY; // Előző érték frissítése. 
        return; // Kilépünk, nehogy elrejtse. 
    } // Menü nyitva eset vége. 

    const scrollLefele = aktualisScrollY > elozoScrollY; // Lefelé görgetünk-e. 
    const marElegLent = aktualisScrollY > navRejtKuszob; // Elég lent vagyunk-e. 

    if (scrollLefele && marElegLent) { // Lefelé + nem a tetején. 
        navbar.classList.add('nav-hidden'); // Navbar elrejtése. 
    } else { // Felfelé görgetésnél vagy a tetején. 
        navbar.classList.remove('nav-hidden'); // Navbar megjelenítése. 
    } // Elágazás vége. 

    elozoScrollY = aktualisScrollY; // Előző scroll frissítése. 
}, { passive: true }); // Passzív listener: simább görgetés. 

// ======================================== // Fő szekció jelölő komment. 
// MOBIL MENÜ TOGGLE
// ======================================== // Fő szekció jelölő komment. 

if (navToggle && navMenu) { // Ellenőrizzük hogy léteznek-e az elemek
    navToggle.addEventListener('click', () => { // Kattintás esemény figyelése a hamburgeren. 
        navMenu.classList.toggle('active'); // Menü ki/be kapcsolása. 

        const isOpen = navMenu.classList.contains('active'); // Menü nyitva van-e. 
        navToggle.setAttribute('aria-expanded', String(isOpen)); // Aria állapot frissítése. 

        const spans = navToggle.querySelectorAll('span'); // Hamburger 3 vonal lekérése. 
        if (isOpen) { // Ha nyitva van a menü. 
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)'; // Felső vonal X-be. 
            spans[1].style.opacity = '0'; // Középső eltüntetése. 
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)'; // Alsó vonal X-be. 
            navbar.classList.remove('nav-hidden'); // Nyitáskor biztosan látszódjon a navbar. 
        } else { // Ha zárva van. 
            spans[0].style.transform = 'none'; // Reset felső vonal. 
            spans[1].style.opacity = '1'; // Reset középső. 
            spans[2].style.transform = 'none'; // Reset alsó. 
        } // Elágazás vége. 
    }); // Eseménykezelő vége. 
} // navToggle null check vége 

// ======================================== // Fő szekció jelölő komment. 
// SMOOTH SCROLL + MENÜ BEZÁRÁS LINKRE
// ======================================== // Fő szekció jelölő komment. 

navLinks.forEach(link => { // Minden nav linken végigmegyünk. 
    link.addEventListener('click', (e) => { // Kattintás esemény. 
        e.preventDefault(); // Default anchor ugrás letiltása. 

        const targetId = link.getAttribute('href'); // Cél szekció ID-je (pl. #datum). 
        const targetSection = document.querySelector(targetId); // Cél szekció elem lekérése. 

        if (targetSection) { // Ha a cél szekció létezik. 
            const navHeight = navbar.offsetHeight; // Navbar magassága (ne takarja). 
            const targetPosition = targetSection.offsetTop - navHeight; // Korrigált cél pozíció. 

            window.scrollTo({ // Görgetés. 
                top: targetPosition, // Cél pozíció. 
                behavior: 'smooth' // Simított animáció. 
            }); // scrollTo vége. 
        } // targetSection ellenőrzés vége. 

        navMenu.classList.remove('active'); // Bezárjuk a mobil menüt. 
        navToggle.setAttribute('aria-expanded', 'false'); // Aria állapot zártra. 

        const spans = navToggle.querySelectorAll('span'); // Hamburger vonalak újra lekérése. 
        spans[0].style.transform = 'none'; // Reset felső. 
        spans[1].style.opacity = '1'; // Reset középső. 
        spans[2].style.transform = 'none'; // Reset alsó. 
    }); // Link katt esemény vége. 
}); // forEach vége. 

// ======================================== // Fő szekció jelölő komment. 
// HERO CTA (Részletek gomb)
// ======================================== // Fő szekció jelölő komment. 

const heroCta = document.querySelector('.hero-cta'); // Hero "Részletek" gomb. 

if (heroCta) { // Ha a gomb létezik. 
    heroCta.addEventListener('click', (e) => { // Kattintás esemény. 
        e.preventDefault(); // Default ugrás letiltása. 
        const datumSection = document.getElementById('datum'); // Dátum szekció lekérése. 

        if (datumSection) { // Ha megtaláltuk. 
            const navHeight = navbar.offsetHeight; // Navbar magassága. 
            const targetPosition = datumSection.offsetTop - navHeight; // Korrigált célpozíció. 

            window.scrollTo({ // Simított scroll. 
                top: targetPosition, // Cél pozíció. 
                behavior: 'smooth' // Animáció. 
            }); // scrollTo vége. 
        } // datumSection ellenőrzés vége. 
    }); // CTA esemény vége. 
} // heroCta ellenőrzés vége. 

// ======================================== // Fő szekció jelölő komment. 
// VISSZASZÁMLÁLÓ
// ======================================== // Fő szekció jelölő komment. 

const weddingDate = new Date('2026-08-07T16:30:00').getTime(); // Esküvő dátuma (timestamp). 

function updateCountdown() { // Visszaszámláló frissítő függvény. 
    const now = new Date().getTime(); // Jelenlegi idő (timestamp). 
    const distance = weddingDate - now; // Hátralévő idő ms-ban. 

    const countdownEl = document.getElementById('countdown'); // Countdown konténer. 
    if (!countdownEl) return; // Ha nincs a DOM-ban, kilépünk. 

    if (distance < 0) { // Ha már elmúlt. 
        countdownEl.innerHTML = '<p style="font-family: var(--font-script); font-size: 2rem; color: var(--gold);">Az esküvő megtörtént! ❤️</p>'; // Üzenet. 
        return; // Kilépés. 
    } // Távolság ellenőrzés vége. 

    const days = Math.floor(distance / (1000 * 60 * 60 * 24)); // Napok számítása. 
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Órák. 
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // Percek. 
    const seconds = Math.floor((distance % (1000 * 60)) / 1000); // Másodpercek. 

    const daysEl = document.getElementById('days'); // Napok elem. 
    const hoursEl = document.getElementById('hours'); // Órák elem. 
    const minutesEl = document.getElementById('minutes'); // Percek elem. 
    const secondsEl = document.getElementById('seconds'); // Másodpercek elem. 

    if (daysEl) daysEl.textContent = String(days); // Napok kiírása. 
    if (hoursEl) hoursEl.textContent = String(hours); // Órák kiírása. 
    if (minutesEl) minutesEl.textContent = String(minutes); // Percek kiírása. 
    if (secondsEl) secondsEl.textContent = String(seconds); // Másodpercek kiírása. 
} // updateCountdown vége. 

updateCountdown(); // Első futtatás. 
setInterval(updateCountdown, 1000); // Frissítés 1 mp-enként. 

// ======================================== // Fő szekció jelölő komment. 
// SCROLL ANIMÁCIÓK
// ======================================== // Fő szekció jelölő komment. 

const observerOptions = { // IntersectionObserver beállítások. 
    threshold: 0.1, // Mikor számítson láthatónak. 
    rootMargin: '0px 0px -50px 0px' // Kicsit előbb induljon. 
}; // Options vége. 

const observer = new IntersectionObserver((entries) => { // Observer példány. 
    entries.forEach(entry => { // Minden megfigyelt elemre. 
        if (entry.isIntersecting) { // Ha belépett a viewportba. 
            entry.target.style.opacity = '1'; // Megjelenítés. 
            entry.target.style.transform = 'translateY(0)'; // Felcsúszás. 
        } // intersecting vége. 
    }); // forEach vége. 
}, observerOptions); // Options átadása. 

const animatedElements = document.querySelectorAll( // Megfigyelt elemek listája. 
    '.timeline-item, .venue-card, .gallery-item, .accommodation-card, .gift-option, .rsvp-contact, .upload-card' // Megfigyelt selectorok. 
); // querySelectorAll vége. 

animatedElements.forEach(el => { // Minden elemre. 
    el.style.opacity = '0'; // Kezdetben rejtve. 
    el.style.transform = 'translateY(30px)'; // Kezdetben lejjebb. 
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Animáció. 
    observer.observe(el); // Megfigyelés indítása. 
}); // forEach vége. 

// ======================================== // Fő szekció jelölő komment. 
// LAZY LOADING “loaded” OSZTÁLY (vizuális)
 // ======================================== // Fő szekció jelölő komment. 

if ('IntersectionObserver' in window) { // Ha támogatott. 
    const imageObserver = new IntersectionObserver((entries, obs) => { // Kép observer. 
        entries.forEach(entry => { // Minden megfigyelt képre. 
            if (entry.isIntersecting) { // Ha látszik. 
                const img = entry.target; // Kép elem. 
                img.classList.add('loaded'); // “loaded” osztály. 
                obs.unobserve(img); // További megfigyelés nem kell. 
            } // intersecting vége. 
        }); // forEach vége. 
    }); // imageObserver vége. 

    const images = document.querySelectorAll('.gallery-item img'); // Galéria képek. 
    images.forEach(img => imageObserver.observe(img)); // Megfigyelés indítása. 
} // IntersectionObserver támogatás vége. 

// ======================================== // Fő szekció jelölő komment. 
// AKTÍV NAVIGÁCIÓS LINK
// ======================================== // Fő szekció jelölő komment. 

const sections = document.querySelectorAll('section[id]'); // Összes ID-s szekció. 

function activateNavLink() { // Aktív menü link beállítása. 
    const scrollY = window.pageYOffset; // Jelenlegi scroll pozíció. 

    sections.forEach(section => { // Minden szekcióra. 
        const sectionHeight = section.offsetHeight; // Szekció magassága. 
        const sectionTop = section.offsetTop - 120; // Szekció teteje (ráhagyással). 
        const sectionId = section.getAttribute('id'); // Szekció ID. 

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { // Ha a szekcióban vagyunk. 
            navLinks.forEach(link => { // Minden linkre. 
                link.classList.remove('active'); // Mindenről levesszük. 
                if (link.getAttribute('href') === `#${sectionId}`) { // Ha ez a megfelelő link. 
                    link.classList.add('active'); // Aktívvá tesszük. 
                } // href egyezés vége. 
            }); // navLinks forEach vége. 
        } // szekció tartomány ellenőrzés vége. 
    }); // sections forEach vége. 
} // activateNavLink vége. 

window.addEventListener('scroll', activateNavLink, { passive: true }); // Scrollra futtatjuk. 
activateNavLink(); // Induláskor is beállítjuk. 

// ======================================== // Fő szekció jelölő komment. 
// CONSOLE ÜZENET (húsvéti tojás 😊)
// ======================================== // Fő szekció jelölő komment. 

console.log('%c💒 Kata & Marci Esküvő 2026 💒', 'font-size: 20px; color: #B48B58; font-weight: bold;'); // Fejléc. 
console.log('%cSzeretettel várunk mindenkit! ❤️', 'font-size: 14px; color: #765830; font-style: italic;'); // Kísérő.