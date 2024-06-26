document.addEventListener('DOMContentLoaded', () => {
    const carritoButton = document.getElementById('carrito');
    const cerrarButton = document.getElementById('x');
    const contenedorCompra = document.getElementById('contenedorCompra');
    const productoCompra = document.getElementById('productosCompra');
    const numero = document.getElementById('numero');
    const finalizarButton= document.querySelector('.fin')
    const totalElement = document.getElementById('total');
    let carrito = [];

    carritoButton.addEventListener('click', () => {
        contenedorCompra.classList.toggle('none');
        renderCarrito();
    });

    cerrarButton.addEventListener('click', () => {
        contenedorCompra.classList.add('none');
    });

    document.querySelectorAll('.agregar').forEach((button, index) => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const nombre = productCard.querySelector('.product-title').textContent;
            const precio = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '').trim());

            const productoEnCarrito = carrito.find(item => item.nombre === nombre);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad += 1;
            } else {
                carrito.push({ nombre, precio, cantidad: 1 });
            }

            updateCarrito();
            renderCarrito();
        });
    });


    finalizarButton.addEventListener('click', () => {
        if (carrito.length > 0) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });

            swalWithBootstrapButtons.fire({
                title: "¿Está seguro de finalizar la compra?",
                text: "¡No va a poder revertirlo!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, comprar!",
                cancelButtonText: "No, cancelar!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "¡Compra realizada con éxito!",
                        text: "Muchas gracias por confiar en nosotros.",
                        icon: "success"
                    }).then(() => {
                        carrito = [];
                        updateCarrito();
                        renderCarrito();
                        contenedorCompra.classList.add('none');
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelado",
                        text: "Puede seguir navegando y modificando su carrito",
                        icon: "error"
                    });
                }
            });
        }
    });

    
    function updateCarrito() {
        const cantidadTotal = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        const precioTotal = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        numero.textContent = cantidadTotal;
        totalElement.textContent = precioTotal.toFixed(2);
    }

    function renderCarrito() {
        productoCompra.innerHTML = '';
        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.innerHTML = `
                <span>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</span>
                <button class="remove" data-nombre="${producto.nombre}"><i class="bi bi-trash3"></i></button>
            `;
            productoCompra.appendChild(productoDiv);

            productoDiv.querySelector('.remove').addEventListener('click', (event) => {
                const button = event.currentTarget; // Cambiado de event.target a event.currentTarget
                const nombre = button.getAttribute('data-nombre');
                carrito = carrito.filter(producto => producto.nombre !== nombre);
                updateCarrito();
                renderCarrito();
            });
        });
    }
});
