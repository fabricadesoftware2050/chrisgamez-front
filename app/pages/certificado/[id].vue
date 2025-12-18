<template>

    <div>
        <!-- V-APP es el root obligatorio para Vuetify -->
        
            
            
    <AppBar />

         <div >
      
          
            <div class="v-main__wrap">
              <div class="container pt-2 container--fluid text-center">
        <v-btn @click="imprimir">Imprimir</v-btn>
                <div class="certificate-wrapper text-center">
                  <p class="text-h6" style="color: rgb(84, 110, 122)">
                    <img 
                      src="https://agenciacristal.com/wp-content/uploads/2025/01/logofinal_otro.png"
                      alt="Academia Cristal Logo"
                      style="height: 80px" />
                  </p>
                  <p class="text-h6" style="color: rgb(84, 110, 122)">
                    Certifica a
                  </p>
                  <h1 class="certificate-recipient mx-auto">
                    {{ currentSession?.name }}
                  </h1>
                  <p class="text-h5 my-4" style="color: rgb(84, 110, 122)">
                    Quién ha completado satisfactoriamente el curso
                  </p>
                  <h2 class="certificate-course">
                    {{ cursoActual?.titulo }}
                  </h2>
                  <hr
                    role="separator"
                    aria-orientation="horizontal"
                    class="v-divider theme--dark"
                    style="
                      border-color: rgb(207, 216, 220);
                      margin: 10px auto;
                      width: 60%;
                    "
                  />
                  <p class="text-body-1" style="color: rgb(120, 144, 156)">
                    Con un total de {{ cursoActual?.duracion }} de duración y completando
                    todos los módulos y exámenes requeridos.
                  </p>
                  <p class="text-body-1 mb-2" style="color: rgb(120, 144, 156)">
                    se expide a solicitu del interesado el presente certificado en Colombia, el {{ new Date().toLocaleDateString() }}.
                  </p>
                  <div class="seal-section">
                    <div class="signature-area">
                      
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Alice_Sara_Ott_-_Signature.jpg"
                                    alt="Firma de Christian C. S. Gámez" class="img-fluid mb-1"
                                    style="max-width: 180px; height: auto;">
                                <span class="fw-bold d-block"
                                    style="color: rgb(38, 50, 56); font-size: 1.1rem; border-top: 1px solid rgb(120, 144, 156); padding-top: 5px;">
                                    Christian C. S. Gámez
                                </span>
                                <p class="small mb-0" style="color: rgb(120, 144, 156);">
                                    Gerente AGENCIA CRISTAL
                                </p>
                    </div>
                    <div
                      class="v-avatar mx-5 elevation-5 primary"
                      style="height: 100px; min-width: 100px; width: 100px"
                    >
                      <i
                        aria-hidden="true"
                        class="v-icon notranslate mdi mdi-seal theme--dark white--text"
                        style="font-size: 60px"
                      ></i>
                    </div>
                    <div class="signature-area">
                      
                                <img src="https://docoon.com/wp-content/uploads/2023/12/Snag_cc3121.png"
                                    alt="Firma de Christian C. S. Gámez" class="img-fluid mb-1"
                                    style="max-width: 180px; height: auto;">
                                <span class="fw-bold d-block"
                                    style="color: rgb(38, 50, 56); font-size: 1.1rem; border-top: 1px solid rgb(120, 144, 156); padding-top: 5px;">
                                    Y. María G. Palacios
                                </span>
                                <p class="small mb-0" style="color: rgb(120, 144, 156);">
                                    Directora ACADEMIA CRISTAL
                                </p>
                    </div>
                  </div>
                  <p
                    class="text-caption mt-10"
                    style="color: rgb(120, 144, 156)"
                  >
                    Verificación: {{ cursoActual?.id }}-{{ currentSession?.user_id }}-{{ uuidParse(currentSession?.user_id) }}
                  </p>
                </div>
              </div>
            </div>
          
       
    </div>

       
    </div>
</template>
<style>
@media print {
  button {
    visibility: hidden;
  }
  body{
    -webkit-print-color-adjust: exact;
    background-color: white;
  }
  
}

.v-application a { color: #00b894; }
.v-application .primary {
  background-color: #00b894 !important;
  border-color: #00b894 !important;
}
.v-application .primary--text {
  color: #00b894 !important;
  caret-color: #00b894 !important;
}
.v-application .primary.lighten-5 {
  background-color: #beffff !important;
  border-color: #beffff !important;
}
.v-application .primary--text.text--lighten-5 {
  color: #beffff !important;
  caret-color: #beffff !important;
}
.v-application .primary.lighten-4 {
  background-color: #9fffff !important;
  border-color: #9fffff !important;
}
.v-application .primary--text.text--lighten-4 {
  color: #9fffff !important;
  caret-color: #9fffff !important;
}
.v-application .primary.lighten-3 {
  background-color: #81ffe6 !important;
  border-color: #81ffe6 !important;
}
.v-application .primary--text.text--lighten-3 {
  color: #81ffe6 !important;
  caret-color: #81ffe6 !important;
}
.v-application .primary.lighten-2 {
  background-color: #61f1ca !important;
  border-color: #61f1ca !important;
}
.v-application .primary--text.text--lighten-2 {
  color: #61f1ca !important;
  caret-color: #61f1ca !important;
}
.v-application .primary.lighten-1 {
  background-color: #3ed4af !important;
  border-color: #3ed4af !important;
}
.v-application .primary--text.text--lighten-1 {
  color: #3ed4af !important;
  caret-color: #3ed4af !important;
}
.v-application .primary.darken-1 {
  background-color: #009d7a !important;
  border-color: #009d7a !important;
}
.v-application .primary--text.text--darken-1 {
  color: #009d7a !important;
  caret-color: #009d7a !important;
}
.v-application .primary.darken-2 {
  background-color: #008261 !important;
  border-color: #008261 !important;
}
.v-application .primary--text.text--darken-2 {
  color: #008261 !important;
  caret-color: #008261 !important;
}
.v-application .primary.darken-3 {
  background-color: #00684a !important;
  border-color: #00684a !important;
}
.v-application .primary--text.text--darken-3 {
  color: #00684a !important;
  caret-color: #00684a !important;
}
.v-application .primary.darken-4 {
  background-color: #004f33 !important;
  border-color: #004f33 !important;
}
.v-application .primary--text.text--darken-4 {
  color: #004f33 !important;
  caret-color: #004f33 !important;
}
.v-application .secondary {
  background-color: #dc143c !important;
  border-color: #dc143c !important;
}
.v-application .secondary--text {
  color: #dc143c !important;
  caret-color: #dc143c !important;
}
.v-application .secondary.lighten-5 {
  background-color: #ffb8ba !important;
  border-color: #ffb8ba !important;
}
.v-application .secondary--text.text--lighten-5 {
  color: #ffb8ba !important;
  caret-color: #ffb8ba !important;
}
.v-application .secondary.lighten-4 {
  background-color: #ff9a9f !important;
  border-color: #ff9a9f !important;
}
.v-application .secondary--text.text--lighten-4 {
  color: #ff9a9f !important;
  caret-color: #ff9a9f !important;
}
.v-application .secondary.lighten-3 {
  background-color: #ff7d84 !important;
  border-color: #ff7d84 !important;
}
.v-application .secondary--text.text--lighten-3 {
  color: #ff7d84 !important;
  caret-color: #ff7d84 !important;
}
.v-application .secondary.lighten-2 {
  background-color: #ff5f6b !important;
  border-color: #ff5f6b !important;
}
.v-application .secondary--text.text--lighten-2 {
  color: #ff5f6b !important;
  caret-color: #ff5f6b !important;
}
.v-application .secondary.lighten-1 {
  background-color: #fc3f53 !important;
  border-color: #fc3f53 !important;
}
.v-application .secondary--text.text--lighten-1 {
  color: #fc3f53 !important;
  caret-color: #fc3f53 !important;
}
.v-application .secondary.darken-1 {
  background-color: #bc0026 !important;
  border-color: #bc0026 !important;
}
.v-application .secondary--text.text--darken-1 {
  color: #bc0026 !important;
  caret-color: #bc0026 !important;
}
.v-application .secondary.darken-2 {
  background-color: #9c0013 !important;
  border-color: #9c0013 !important;
}
.v-application .secondary--text.text--darken-2 {
  color: #9c0013 !important;
  caret-color: #9c0013 !important;
}
.v-application .secondary.darken-3 {
  background-color: #7d0000 !important;
  border-color: #7d0000 !important;
}
.v-application .secondary--text.text--darken-3 {
  color: #7d0000 !important;
  caret-color: #7d0000 !important;
}
.v-application .secondary.darken-4 {
  background-color: #600000 !important;
  border-color: #600000 !important;
}
.v-application .secondary--text.text--darken-4 {
  color: #600000 !important;
  caret-color: #600000 !important;
}
.v-application .accent {
  background-color: #ffc107 !important;
  border-color: #ffc107 !important;
}
.v-application .accent--text {
  color: #ffc107 !important;
  caret-color: #ffc107 !important;
}
.v-application .accent.lighten-5 {
  background-color: #ffffae !important;
  border-color: #ffffae !important;
}
.v-application .accent--text.text--lighten-5 {
  color: #ffffae !important;
  caret-color: #ffffae !important;
}
.v-application .accent.lighten-4 {
  background-color: #ffff91 !important;
  border-color: #ffff91 !important;
}
.v-application .accent--text.text--lighten-4 {
  color: #ffff91 !important;
  caret-color: #ffff91 !important;
}
.v-application .accent.lighten-3 {
  background-color: #ffff74 !important;
  border-color: #ffff74 !important;
}
.v-application .accent--text.text--lighten-3 {
  color: #ffff74 !important;
  caret-color: #ffff74 !important;
}
.v-application .accent.lighten-2 {
  background-color: #fff956 !important;
  border-color: #fff956 !important;
}
.v-application .accent--text.text--lighten-2 {
  color: #fff956 !important;
  caret-color: #fff956 !important;
}
.v-application .accent.lighten-1 {
  background-color: #ffdd37 !important;
  border-color: #ffdd37 !important;
}
.v-application .accent--text.text--lighten-1 {
  color: #ffdd37 !important;
  caret-color: #ffdd37 !important;
}
.v-application .accent.darken-1 {
  background-color: #e0a600 !important;
  border-color: #e0a600 !important;
}
.v-application .accent--text.text--darken-1 {
  color: #e0a600 !important;
  caret-color: #e0a600 !important;
}
.v-application .accent.darken-2 {
  background-color: #c18c00 !important;
  border-color: #c18c00 !important;
}
.v-application .accent--text.text--darken-2 {
  color: #c18c00 !important;
  caret-color: #c18c00 !important;
}
.v-application .accent.darken-3 {
  background-color: #a27300 !important;
  border-color: #a27300 !important;
}
.v-application .accent--text.text--darken-3 {
  color: #a27300 !important;
  caret-color: #a27300 !important;
}
.v-application .accent.darken-4 {
  background-color: #855a00 !important;
  border-color: #855a00 !important;
}
.v-application .accent--text.text--darken-4 {
  color: #855a00 !important;
  caret-color: #855a00 !important;
}
.v-application .error {
  background-color: #ff5252 !important;
  border-color: #ff5252 !important;
}
.v-application .error--text {
  color: #ff5252 !important;
  caret-color: #ff5252 !important;
}
.v-application .error.lighten-5 {
  background-color: #ffe4d5 !important;
  border-color: #ffe4d5 !important;
}
.v-application .error--text.text--lighten-5 {
  color: #ffe4d5 !important;
  caret-color: #ffe4d5 !important;
}
.v-application .error.lighten-4 {
  background-color: #ffc6b9 !important;
  border-color: #ffc6b9 !important;
}
.v-application .error--text.text--lighten-4 {
  color: #ffc6b9 !important;
  caret-color: #ffc6b9 !important;
}
.v-application .error.lighten-3 {
  background-color: #ffa99e !important;
  border-color: #ffa99e !important;
}
.v-application .error--text.text--lighten-3 {
  color: #ffa99e !important;
  caret-color: #ffa99e !important;
}
.v-application .error.lighten-2 {
  background-color: #ff8c84 !important;
  border-color: #ff8c84 !important;
}
.v-application .error--text.text--lighten-2 {
  color: #ff8c84 !important;
  caret-color: #ff8c84 !important;
}
.v-application .error.lighten-1 {
  background-color: #ff6f6a !important;
  border-color: #ff6f6a !important;
}
.v-application .error--text.text--lighten-1 {
  color: #ff6f6a !important;
  caret-color: #ff6f6a !important;
}
.v-application .error.darken-1 {
  background-color: #df323b !important;
  border-color: #df323b !important;
}
.v-application .error--text.text--darken-1 {
  color: #df323b !important;
  caret-color: #df323b !important;
}
.v-application .error.darken-2 {
  background-color: #bf0025 !important;
  border-color: #bf0025 !important;
}
.v-application .error--text.text--darken-2 {
  color: #bf0025 !important;
  caret-color: #bf0025 !important;
}
.v-application .error.darken-3 {
  background-color: #9f0010 !important;
  border-color: #9f0010 !important;
}
.v-application .error--text.text--darken-3 {
  color: #9f0010 !important;
  caret-color: #9f0010 !important;
}
.v-application .error.darken-4 {
  background-color: #800000 !important;
  border-color: #800000 !important;
}
.v-application .error--text.text--darken-4 {
  color: #800000 !important;
  caret-color: #800000 !important;
}
.v-application .info {
  background-color: #2196f3 !important;
  border-color: #2196f3 !important;
}
.v-application .info--text {
  color: #2196f3 !important;
  caret-color: #2196f3 !important;
}
.v-application .info.lighten-5 {
  background-color: #d4ffff !important;
  border-color: #d4ffff !important;
}
.v-application .info--text.text--lighten-5 {
  color: #d4ffff !important;
  caret-color: #d4ffff !important;
}
.v-application .info.lighten-4 {
  background-color: #b5ffff !important;
  border-color: #b5ffff !important;
}
.v-application .info--text.text--lighten-4 {
  color: #b5ffff !important;
  caret-color: #b5ffff !important;
}
.v-application .info.lighten-3 {
  background-color: #95e8ff !important;
  border-color: #95e8ff !important;
}
.v-application .info--text.text--lighten-3 {
  color: #95e8ff !important;
  caret-color: #95e8ff !important;
}
.v-application .info.lighten-2 {
  background-color: #75ccff !important;
  border-color: #75ccff !important;
}
.v-application .info--text.text--lighten-2 {
  color: #75ccff !important;
  caret-color: #75ccff !important;
}
.v-application .info.lighten-1 {
  background-color: #51b0ff !important;
  border-color: #51b0ff !important;
}
.v-application .info--text.text--lighten-1 {
  color: #51b0ff !important;
  caret-color: #51b0ff !important;
}
.v-application .info.darken-1 {
  background-color: #007cd6 !important;
  border-color: #007cd6 !important;
}
.v-application .info--text.text--darken-1 {
  color: #007cd6 !important;
  caret-color: #007cd6 !important;
}
.v-application .info.darken-2 {
  background-color: #0064ba !important;
  border-color: #0064ba !important;
}
.v-application .info--text.text--darken-2 {
  color: #0064ba !important;
  caret-color: #0064ba !important;
}
.v-application .info.darken-3 {
  background-color: #004d9f !important;
  border-color: #004d9f !important;
}
.v-application .info--text.text--darken-3 {
  color: #004d9f !important;
  caret-color: #004d9f !important;
}
.v-application .info.darken-4 {
  background-color: #003784 !important;
  border-color: #003784 !important;
}
.v-application .info--text.text--darken-4 {
  color: #003784 !important;
  caret-color: #003784 !important;
}
.v-application .success {
  background-color: #4caf50 !important;
  border-color: #4caf50 !important;
}
.v-application .success--text {
  color: #4caf50 !important;
  caret-color: #4caf50 !important;
}
.v-application .success.lighten-5 {
  background-color: #dcffd6 !important;
  border-color: #dcffd6 !important;
}
.v-application .success--text.text--lighten-5 {
  color: #dcffd6 !important;
  caret-color: #dcffd6 !important;
}
.v-application .success.lighten-4 {
  background-color: #beffba !important;
  border-color: #beffba !important;
}
.v-application .success--text.text--lighten-4 {
  color: #beffba !important;
  caret-color: #beffba !important;
}
.v-application .success.lighten-3 {
  background-color: #a2ff9e !important;
  border-color: #a2ff9e !important;
}
.v-application .success--text.text--lighten-3 {
  color: #a2ff9e !important;
  caret-color: #a2ff9e !important;
}
.v-application .success.lighten-2 {
  background-color: #85e783 !important;
  border-color: #85e783 !important;
}
.v-application .success--text.text--lighten-2 {
  color: #85e783 !important;
  caret-color: #85e783 !important;
}
.v-application .success.lighten-1 {
  background-color: #69cb69 !important;
  border-color: #69cb69 !important;
}
.v-application .success--text.text--lighten-1 {
  color: #69cb69 !important;
  caret-color: #69cb69 !important;
}
.v-application .success.darken-1 {
  background-color: #2d9437 !important;
  border-color: #2d9437 !important;
}
.v-application .success--text.text--darken-1 {
  color: #2d9437 !important;
  caret-color: #2d9437 !important;
}
.v-application .success.darken-2 {
  background-color: #00791e !important;
  border-color: #00791e !important;
}
.v-application .success--text.text--darken-2 {
  color: #00791e !important;
  caret-color: #00791e !important;
}
.v-application .success.darken-3 {
  background-color: #006000 !important;
  border-color: #006000 !important;
}
.v-application .success--text.text--darken-3 {
  color: #006000 !important;
  caret-color: #006000 !important;
}
.v-application .success.darken-4 {
  background-color: #004700 !important;
  border-color: #004700 !important;
}
.v-application .success--text.text--darken-4 {
  color: #004700 !important;
  caret-color: #004700 !important;
}
.v-application .warning {
  background-color: #fb8c00 !important;
  border-color: #fb8c00 !important;
}
.v-application .warning--text {
  color: #fb8c00 !important;
  caret-color: #fb8c00 !important;
}
.v-application .warning.lighten-5 {
  background-color: #ffff9e !important;
  border-color: #ffff9e !important;
}
.v-application .warning--text.text--lighten-5 {
  color: #ffff9e !important;
  caret-color: #ffff9e !important;
}
.v-application .warning.lighten-4 {
  background-color: #fffb82 !important;
  border-color: #fffb82 !important;
}
.v-application .warning--text.text--lighten-4 {
  color: #fffb82 !important;
  caret-color: #fffb82 !important;
}
.v-application .warning.lighten-3 {
  background-color: #ffdf67 !important;
  border-color: #ffdf67 !important;
}
.v-application .warning--text.text--lighten-3 {
  color: #ffdf67 !important;
  caret-color: #ffdf67 !important;
}
.v-application .warning.lighten-2 {
  background-color: #ffc24b !important;
  border-color: #ffc24b !important;
}
.v-application .warning--text.text--lighten-2 {
  color: #ffc24b !important;
  caret-color: #ffc24b !important;
}
.v-application .warning.lighten-1 {
  background-color: #ffa72d !important;
  border-color: #ffa72d !important;
}
.v-application .warning--text.text--lighten-1 {
  color: #ffa72d !important;
  caret-color: #ffa72d !important;
}
.v-application .warning.darken-1 {
  background-color: #db7200 !important;
  border-color: #db7200 !important;
}
.v-application .warning--text.text--darken-1 {
  color: #db7200 !important;
  caret-color: #db7200 !important;
}
.v-application .warning.darken-2 {
  background-color: #bb5900 !important;
  border-color: #bb5900 !important;
}
.v-application .warning--text.text--darken-2 {
  color: #bb5900 !important;
  caret-color: #bb5900 !important;
}
.v-application .warning.darken-3 {
  background-color: #9d4000 !important;
  border-color: #9d4000 !important;
}
.v-application .warning--text.text--darken-3 {
  color: #9d4000 !important;
  caret-color: #9d4000 !important;
}
.v-application .warning.darken-4 {
  background-color: #802700 !important;
  border-color: #802700 !important;
}
.v-application .warning--text.text--darken-4 {
  color: #802700 !important;
  caret-color: #802700 !important;
}
      /* Colores de Fondo */
      .dark-bg-main { background-color: #12161A !important; }
      .dark-bg-card { background-color: #1A2024 !important; }
      
      /* Estilo del Contenedor del Certificado */
      .certificate-wrapper {
          background-color: #ffffff; /* Fondo casi blanco para simular papel */
          color: #263238; /* Texto oscuro */
          width: 90%;
          max-width: 1100px;
          margin: 40px auto;
          padding: 50px;
          border: 15px solid #2D3436; /* Borde exterior oscuro */
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
          position: relative;
          min-height: 800px;
          display: flex;
          flex-direction: column;
          justify-content: center;
      }

      /* Estilos tipográficos del Certificado */
      .certificate-recipient {
          font-size: 3rem;
          font-weight: bold;
          color: #546E7A; /* Rojo/Magenta para destacar el nombre */
          border-bottom: 1px dashed #35353513;
          display: inline-block;
      }
      /* (Otros estilos de certificado...) */
      .certificate-course {
          font-size: 1.8rem;
          color: #546E7A;
          font-style: italic;
      }
      .seal-section {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          margin-top: 60px;
      }
      .signature-area {
          text-align: center;
          padding-top: 10px;
          width: 30%;
          font-size: 0.9rem;
      }
      /* ------------------------------------------------------------------ */
      /* --- REGLAS CLAVE PARA IMPRESIÓN/PDF (@media print) --- */
      /* ------------------------------------------------------------------ */
      @media print {
          /* Ocultar elementos de UI */
          .v-application--wrap,
          .v-application--is-rtl,
          .v-footer {
              display: none !important;
          }

          /* Ocultar la barra de navegación */
          .v-app-bar {
              display: none !important;
          }
          
          /* Forzar el fondo del documento a blanco y resetear márgenes */
          body, html, .v-application {
              background-color: white !important;
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact; /* Importante para Chrome/Safari */
              print-color-adjust: exact;
          }

          /* Asegurar que solo el wrapper del certificado se imprima correctamente */
          .v-main {
              background: white !important;
              padding: 0 !important;
          }
          .certificate-wrapper {
              margin: 0 auto; /* Centrar en la página */
              width: 100%;
              max-width: 100%;
              box-shadow: none; /* Eliminar sombras al imprimir */
              border: none; /* Eliminar borde CSS de visualización */
              /* Asegurar que los colores de fondo del certificado se impriman */
              background-color: #ffffff !important;
          }

          /* Ajustar la tipografía dentro del certificado a negro */
          .certificate-wrapper * {
              color: #263238 !important;
          }
          .certificate-recipient {
              color: #DC143C !important; /* Mantener color destacado */
              border-bottom-color: #DC143C !important;
          }
          .v-avatar, .v-icon {
              /* Forzar color de ícono y fondo del sello */
              background-color: #b80072 !important; 
              color: white !important;
          }
      }
    </style>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'

import { v5 as uuidv5 } from 'uuid';
const uuidParse =(str)=>{
    return uuidv5(`${str}`,'1b671a64-40d5-491e-99b0-da01ff1f3341')
}



const imprimir = () => {
      window.print();
}



const showLoginModal = useLoginModal();
const currentSession = useSession();
const error = ref('')
const cursoActual = ref(null)
const route = useRoute()
const loading = ref(false);
const token = ref('')
const token_type = ref('')
const router = useRouter()
import { jwtDecode } from 'jwt-decode'

function toggleLogin() {
    showLoginModal.value = !showLoginModal.value;
}
const getCourse = async (url) => {
    loading.value = true
    error.value = ''
    try {
        token.value = localStorage.getItem('token') || ''
        token_type.value = localStorage.getItem('token_type') || ''
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `${token_type.value || 'Bearer'} ${token.value || 'xy'}`
            }
        })

        cursoActual.value = data.data;
    } catch (err) {

        error.value = err.response?.data?.message || 'Intenta nuevamente'
        push.error({ title: 'Upps!', message: error.value, duration: 3000 })

    } finally {
        loading.value = false

    }
}



definePageMeta({ layout: false })


onMounted(() => {
try {
      token.value = localStorage.getItem('token') || ''
      token_type.value = localStorage.getItem('token_type') || ''

      currentSession.value = jwtDecode(token.value) ?? {}
    } catch (error) {
      push.warning({ title: 'Upps!', message: 'Su sesión expiró' })
      console.log('Error al decodificar el token JWT:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('token_type')
     router.push('/')
    }
    const courseId = route.params.id;
    if (courseId > 0 && !isNaN(courseId)) {
        getCourse(URL_BASE_API + '/v1/public/courses/' + courseId)
    } else {
        push.error({ title: 'Upps!', message: 'ID de curso inválido', duration: 3000 })
        navigateTo('/')
    }
  
    window.addEventListener("keydown", (e) => {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J")) ||
            (e.ctrlKey && e.key === "U")
        ) {
            e.preventDefault()
            e.stopPropagation()
        }
    })

})


</script>