function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
  }
  
  // Método para cotizar el seguro
  Seguro.prototype.cotizarSeguro = function () {
    let cantidad;
    const base = 2000;
  
    switch (this.marca) {
      case '1':
        cantidad = base * 1;
        break;
      case '2':
        cantidad = base * 2;
        break;
      case '3':
        cantidad = base * 3;
        break;
      default:
        break;
    }
  
    const diferencia = new Date().getFullYear() - this.year;
    // Reduce el costo del seguro cada año
    cantidad -= ((diferencia * 3) * cantidad) / 100;
  
    // Multiplica por un 20% más si el seguro es básico, o un 40% más si es completo
    if (this.tipo === 'basico') {
      cantidad *= 1.20;
    } else {
      cantidad *= 1.40;
    }
  
    return cantidad;
  }
  
  function UI() { }
  
  UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 20;
  
    const selectYear = document.querySelector('#year');
  
    for (let i = max; i > min; i--) {
      let option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      selectYear.appendChild(option);
    }
  }
  
  UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo === 'error') {
      div.classList.add('mensaje', 'error');
    } else {
      div.classList.add('mensaje', 'correcto');
    }
    
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;
  
    // Insertar en el formulario antes del resultado
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));
  
    setTimeout(() => {
      div.remove();
    }, 2000);
  }
  
  UI.prototype.mostrarResultado = (total, seguro) => {
    const { marca, year, tipo } = seguro;
    let txtMarca;
    switch (marca) {
      case '1':
        txtMarca = 'MOTO';
        break;
      case '2':
        txtMarca = 'AUTO';
        break;
      case '3':
        txtMarca = 'SCOOTER';
        break;
      default:
        break;
    }
  
    // Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
  
    div.innerHTML = `
      <p class='header'> Tu Resumen </p>
      <p class='font-bold'> Marca: <span class='font-normal'> ${txtMarca}</span> </p>
      <p class='font-bold'> Año: <span class='font-normal'> ${year}</span> </p>
      <p class='font-bold'> Tipo: <span class='font-normal capitalize'> ${tipo}</span> </p>
      <p class='font-bold'> Total: <span class='font-normal'> $${total}</span> </p>
    `;
  
    const resultadoDiv = document.querySelector('#resultado');
    // Mostrar un spinner mientras se calcula
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
  
    setTimeout(() => {
      spinner.style.display = 'none';
      resultadoDiv.appendChild(div);
    }, 2000);
  }
  
  const ui = new UI();
  
  document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
  });
  
  // Agregar event listener al botón de cotizar
  function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
  }
  
  function cotizarSeguro(e) {
    e.preventDefault();
  
    // Leer la marca, el año y el tipo seleccionado
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name=tipo]:checked').value;
  
    if (marca === '' || year === '' || tipo === '') {
      ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
      return;
    }
    ui.mostrarMensaje('Cotizando...', 'exito');
    
    // Ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
      resultados.remove();
    }
    
    // Calcula la cotizacion
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    
    // Muestra el resultado
    ui.mostrarResultado(total, seguro);
  }
  
  eventListeners();


    document.addEventListener('DOMContentLoaded', function () {
        const resultElement = document.getElementById('resultload');
    
        fetch('https://dolarapi.com/v1/dolares/blue')
            .then(response => response.json())
            .then(data => {
                // Update the content of the result element
                console.log(data)
                resultElement.innerHTML = `Dólar Blue Venta: ${data.venta} ARS`;
            })
            .catch(error => {
                console.error('Error:', error);
                resultElement.innerHTML = 'Error occurred while fetching data.';
            });
    });
