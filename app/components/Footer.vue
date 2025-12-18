<template>
<v-footer class="footer-main-section" padless style="z-index: 9999;" >
  <v-container class="footer-container">
    <v-row class="footer-row" no-gutters>

      <!-- Columna 1 -->
      <v-col cols="12" md="4" class="footer-block">
        <div class="footer-brand">
          <v-img
            src="https://agenciacristal.com/wp-content/uploads/2025/01/cropped-logofinal_otro-192x192.png"
            max-width="28"
            max-height="28"
            class="mr-2"
          ></v-img>

          <span class="footer-title">CHRISGAMEZ.COM</span>
        </div>

        <p class="footer-description">
          Tu plataforma para dominar tecnologías FullStack.  
          Comprometidos con tu crecimiento desde 2024.
        </p>

        <div class="footer-social">
          <v-btn icon variant="text"><v-icon>mdi-twitter</v-icon></v-btn>
          <v-btn icon variant="text"><v-icon>mdi-linkedin</v-icon></v-btn>
          <v-btn icon variant="text"><v-icon>mdi-github</v-icon></v-btn>
        </div>
      </v-col>

      <!-- Columna 2 -->
      <v-col cols="6" md="2" class="footer-block">
        <h4 class="footer-heading">Rutas</h4>
        <a href="#">Todas las Series</a>
        <a href="#">Ruta Frontend</a>
        <a href="#">Ruta Backend</a>
        <a href="#">Ruta DevOps</a>
      </v-col>

      <!-- Columna 3 -->
      <v-col cols="6" md="2" class="footer-block">
        <h4 class="footer-heading">Recursos</h4>
        <a href="#">Planes y Precios</a>
        <a href="#">Blog y Noticias</a>
        <a href="#">Cursos por Nivel</a>
        <a href="#">Preguntas Frecuentes</a>
      </v-col>

      <!-- Columna 4 -->
      <v-col cols="12" md="4" class="footer-block">
        <h4 class="footer-heading">Legal y Contacto</h4>
        <a href="#">Términos y Condiciones</a>
        <a href="#">Política de Privacidad</a>
        <a href="#">Soporte Técnico</a>
        <p class="footer-description mt-2">
          Email: info@academiacristal.com<br>
          Medellín, Colombia
        </p>
      </v-col>

    </v-row>
  </v-container>

  <div class="footer-bottom text-center">
    © {{ new Date().getFullYear() }} AGENCIA CRISTAL — Todos los derechos reservados.
  </div>
</v-footer>

</template>
<style>
/* ====== CONTENEDOR GENERAL ====== */
.footer-main-section {
  background: #111A20 !important;
  padding-top: 50px;
  border-top: 2px solid rgba(255, 255, 255, 0.05);
}
.footer-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}

.footer-container {
  max-width: 1300px !important;
}

/* ====== FILAS Y COLUMNAS ====== */
.footer-row {
  display: flex;
  justify-content: space-between;
  gap: 25px;
}

.footer-block {
  display: flex;
  flex-direction: column;
}

/* ====== LOGO + TÍTULO ====== */
.footer-brand {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.footer-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: #ffffff;
}

/* ====== TEXTO ====== */
.footer-description {
  color: #B0BEC5;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-top: 8px;
}

/* ====== HEADERS ====== */
.footer-heading {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
  border-bottom: 2px solid #00B894;
  display: inline-block;
  padding-bottom: 4px;
}

/* ====== LINKS ====== */
.footer-block a {
  color: #B0BEC5;
  font-size: 0.9rem;
  margin-bottom: 6px;
  display: block;
  text-decoration: none;
  transition: all .25s ease;
}

.footer-block a:hover {
  color: #00B894;
  transform: translateX(4px);
}

/* ====== ICONOS ====== */
.footer-social .v-btn .v-icon {
  color: #B0BEC5 !important;
  transition: 0.25s ease;
}

.footer-social .v-btn:hover .v-icon {
  color: #00B894 !important;
}

/* ====== COPYRIGHT ====== */
.footer-bottom {
  background: #0D1418;
  padding: 14px;
  color: #90A4AE;
  margin-top: 40px;
  font-size: 0.85rem;
  letter-spacing: 0.4px;
}

</style>