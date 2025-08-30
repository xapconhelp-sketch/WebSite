//preloader
document.addEventListener("DOMContentLoaded", function () {
    // El contenedor donde agregar los span
    const txtLoadingContainer = document.getElementById("txt-loading");
    if (txtLoadingContainer) {
        const title = txtLoadingContainer.dataset.title;

        // Crear un nuevo elemento style
        const style = document.createElement("style");
        document.head.appendChild(style);
        const sheet = style.sheet;

        // Separar el título en caracteres y crear un span para cada uno
        for (let i = 0; i < title.length; i++) {
            const char = title[i];
            const span = document.createElement("span");
            span.classList.add("characters");
            span.setAttribute("preloader-text", char);
            span.textContent = char;
            txtLoadingContainer.appendChild(span);

            // Agregar las reglas CSS para la animación
            const delay = (i * 0.05).toFixed(2);
            sheet.insertRule(`
            .th-preloader-2 .animation-preloader .txt-loading .characters:nth-child(${i + 1}):before {
                animation-delay: ${delay}s;
            }
            `, sheet.cssRules.length);
        }


        const words = title.split(' ')
        let charCount = 0;
        words.forEach((word, index) => {
            charCount += word.length;
            if (word.length >= 12) {
                // Antes de la palabra
                const longword = txtLoadingContainer.querySelector(`.txt-loading :nth-child(${charCount + index - word.length})`)
                // Despues de la palabra
                // const longword = txtLoadingContainer.querySelector(`.txt-loading :nth-child(${charCount + index + 1})`)
                const br = document.createElement("br");
                longword.appendChild(br);
            }
        });
    }

    window.addEventListener('load', function () {
        // Ocultar el pre-cargador después de 600 ms y luego desvanecerlo en 500 ms
        setTimeout(function () {
            const preLoadDev = document.getElementById("pre-load-dev");
            if (preLoadDev) {
                preLoadDev.style.transition = "opacity 500ms";
                preLoadDev.style.opacity = 0;
                setTimeout(function () {
                    preLoadDev.style.display = "none";
                }, 500);
            }

            const preLoader = document.querySelector(".pre-loader");
            if (preLoader) {
                preLoader.style.transition = "opacity 500ms";
                preLoader.style.opacity = 0;
                setTimeout(function () {
                    preLoader.style.display = "none";
                }, 500);
            }
        }, 600);

        // Configuración de .rs-menu para pantallas menores a 992px de ancho
        if (window.innerWidth < 992) {
            const rsMenu = document.querySelector('.rs-menu');
            if (rsMenu) {
                rsMenu.style.height = '0';
                rsMenu.style.opacity = '0';
                rsMenu.style.zIndex = '-1';
            }

            const rsMenuToggle = document.querySelector('.rs-menu-toggle');
            if (rsMenuToggle) {
                rsMenuToggle.addEventListener('click', function () {
                    if (rsMenu) {
                        rsMenu.style.opacity = '1';
                        rsMenu.style.zIndex = '1';
                    }
                });
            }
        }
    });

});

// $(window).on('load', function () {
//     $("#pre-load-dev").delay(600).fadeOut(500);
//     $(".pre-loader").delay(600).fadeOut(500);

//     if ($(window).width() < 992) {
//         $('.rs-menu').css('height', '0');
//         $('.rs-menu').css('opacity', '0');
//         $('.rs-menu').css('z-index', '-1');
//         $('.rs-menu-toggle').on('click', function () {
//             $('.rs-menu').css('opacity', '1');
//             $('.rs-menu').css('z-index', '1');
//         });
//     }
// })

