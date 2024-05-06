document.addEventListener('DOMContentLoaded', function() {
    const textobuscador = document.getElementById('buscador');
    const elementos = document.querySelectorAll('.elemento');

    textobuscador.addEventListener('input', function() {
        const texto = textobuscador.value.toLowerCase();

        elementos.forEach(function(elemento) {
            const nombre = elemento.querySelector('h2').textContent.toLowerCase();
            const autor = elemento.querySelector('h3').textContent.toLowerCase();
            const estrellas = elemento.querySelectorAll('.estrellas_llenas').length; 
            
            const estrellasTexto = estrellas.toString();

            if (nombre.includes(texto) || autor.includes(texto) || estrellasTexto.includes(texto)) {
                elemento.style.display = 'flex'; 
            } else {
                elemento.style.display = 'none';
            }
        });
    });
});