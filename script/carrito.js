document.addEventListener('DOMContentLoaded', ()=> {
    const carritoButton= document.getElementById('carrito');
    const cerrarButton= document.getElementById('x');
    const contenedorCompra= document.getElementById('comtenedorCompra');
    const productoCompra= document.getElementById('productoCompra');
    const numero= document.getElementById('numero');
    const totalElement= document.getElementById('total');
    let carrito= []


    cerrarButton.addEventListener('click', () =>{
        contenedorCompra.classList.toggle('none');
        renderCarrito();
    });

    cerrarButton.addEventListener('click', () =>{
        contenedorCompra.classList.add('none');
    });

    document.querySelectorAll('.agregar').forEach((button,index)=> {
        button.addEventListener('click', ()=>{
            const productCard= button.closest('.product-card');
            const nombre= productCard.querySelector('.product-title').textContent;
            const precio= parseFloat(productCard.querySelector('.product-price').textContent.replace('$','').trim());

            const productoEnCarrito = carrito.find(item => item.nombre === nombre);
            if (productoEnCarrito){
                productoEnCarrito.cantidad +=1;
            }else {
                carrito.push({nombre, precio, cantidad:1})
            }

            updateCarrito();
            renderCarrito();
        })
        
    })

    function updateCarrito(){
        const cantidadTotal =carrito.reduce((acc,producto)=> acc+ producto.cantidad)
        const precioTotal= carrito.reduce((acc, producto) => acc+(producto.precio*producto.cantidad), 0);
        numero.textContent= cantidadTotal;
        totalElement.textContent=precioTotal.toFixed(2);
    }
    
    function renderCarrito(){
        productoCompra.innerHTML ='';
        carrito.forEach(prdocto => {
            const productoDiv =document.createElement('div');
            productoDiv.innerHTML=`
                <span>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</span>
                <button class="remove" data-nombre="${producto.nombre}"><i class="bi bi-trash3"></i></button>
            `;
        })
    
        productoCompra.appendChild(productoDiv);
    
        productoDiv.querySelector('.remove').addEventListener('click',(event)=> {
            const nombre= event.target.getAttribute('data-nombre');
            carrito= carrito.filter(producto => producto.nombre !== nombre);
            updateCarrito ();
            renderCarrito();
        })
    }
    
})
