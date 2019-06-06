const puppeteer = require('puppeteer');

(async () => {
    try {
        const navegador = await puppeteer.launch()
        const pagina = await navegador.newPage()
        await pagina.goto('https://e-consulta.sunat.gob.pe/cl-at-ittipcam/tcS01Alias')
        let tabla = await pagina.evaluate(() => {
            const dias = [
                ...document.querySelectorAll('.beta')
            ].map((nodoDia) => nodoDia.innerText);

            const numeroDia = [
                ...document.querySelectorAll('.h3')
            ].map((nodoNumeroDia) => nodoNumeroDia.innerText);

            var compraventas = [
                ...document.querySelectorAll('.tne10')
            ].map((nodoCompraVenta) => nodoCompraVenta.innerText);



            const soloPares = (compraventas, index) => index %2==0; // dias pares tienen la compra
            const compra = compraventas.filter(soloPares); 

            const soloImpares = (compraventas, index) => index %2!=0; // dias impares tienen la venta
            const venta = compraventas.filter(soloImpares); 


            return numeroDia.map((dia, i) => ({ dia: numeroDia[i], compra: compra[i], venta: venta[i] }))
        })

        console.log(tabla)
        await navegador.close()
    } catch (e) {

    }
})()
