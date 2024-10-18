# Proyecto de eCommerce - NASA

Este proyecto es una aplicación de eCommerce que permite a los usuarios navegar y comprar productos relacionados con la NASA. Los usuarios pueden agregar productos a un carrito de compras, ajustar las cantidades, eliminar productos y realizar pagos simulados. La aplicación utiliza JavaScript, Bootstrap y SweetAlert para mejorar la experiencia del usuario.

## Características

- **Carga de Productos**: Los productos se cargan desde un archivo JSON.
- **Carrito de Compras**: Los usuarios pueden agregar productos al carrito, ajustar cantidades y eliminar productos.
- **Persistencia de Datos**: Utiliza `localStorage` para guardar el carrito de compras y `sessionStorage` para guardar el nombre del usuario.
- **Interacción del Usuario**: Implementa modales y notificaciones con SweetAlert.
- **Validaciones**: Verifica que los datos del usuario sean correctos antes de procesar el pago.
- **Diseño Responsive**: Utiliza Bootstrap para garantizar una buena visualización en dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- HTML
- CSS (Bootstrap)
- JavaScript
- JSON
- SweetAlert

## Estructura del Proyecto

```
/ecommerce-nasa
├── index.html
├── styles
│   └── style.css
├── js
│   ├── main.js
│   ├── products.js
│   └── confirmarPago.js
├── productos.json
└── README.md
```

## Instalación

1. Clona este repositorio o descarga el código.
   ```bash
   git clone https://github.com/tu_usuario/ecommerce-nasa.git
   ```
2. Abre el archivo `index.html` en tu navegador web.

## Uso

1. Al cargar la página, se solicitará al usuario que ingrese su nombre.
2. Los productos se mostrarán en tarjetas. Cada tarjeta tiene un botón para agregar el producto al carrito.
3. El usuario puede ajustar la cantidad de cada producto antes de agregarlo al carrito.
4. El carrito de compras se muestra en un panel lateral, donde se puede ver el total y eliminar productos.
5. Al hacer clic en "Pagar", se solicitarán los datos del usuario y se mostrará un mensaje de agradecimiento.

## Validaciones

- El nombre del usuario no puede estar vacío.
- La dirección de correo electrónico debe ser válida.
- Los últimos cuatro dígitos de la tarjeta de crédito deben ser exactamente cuatro caracteres.

## Notas

- El proyecto se puede ampliar con funcionalidades adicionales, como autenticación de usuarios o un sistema de gestión de productos.
- Para una mejor experiencia, asegúrate de tener una conexión a Internet activa para cargar los estilos de Bootstrap y SweetAlert.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor, abre un problema o un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.
