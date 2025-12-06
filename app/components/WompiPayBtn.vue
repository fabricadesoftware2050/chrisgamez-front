<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  curso: { type: Object, required: true }
})

const moneda = "COP"
const monto = ref(0)
const referencia = ref("")
const signatureText = ref("")
const widgetReady = ref(false)

onMounted(() => {
  if (!process.client) return

  
  // Asignar valores
  monto.value = parseInt(props.curso?.precio_actual)+ "00" // en centavos
  const miRef = crypto.randomUUID()
  referencia.value = `${props.curso?.id}_${miRef}`

  // Crear texto para firma
  const secret = "prod_integrity_d2JyGsbZeEXpk44tfd9AcsZDidZEi7Qm"
  signatureText.value = `${referencia.value}${monto.value}${moneda}${secret}`

  // Cargar script dinámicamente
  if (!window.WidgetCheckout) {
    const script = document.createElement("script")
    script.src = "https://checkout.wompi.co/widget.js"
    script.async = true
    script.onload = () => {
      widgetReady.value = true
      console.log("Wompi cargado en el componente")
    }
    document.body.appendChild(script)
  } else {
    widgetReady.value = true
  }
})

const handlePayment = async () => {
  if (!widgetReady.value) {
    alert("Cargando pasarela…")
    return
  }

  // Crear firma SHA-256
  const encoded = new TextEncoder().encode(signatureText.value)
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("")

  // Crear checkout
  const checkout = new window.WidgetCheckout({
    currency: moneda,
    amountInCents: monto.value,
    reference: referencia.value,
    publicKey: "pub_prod_lgpBi94hzAoBqn5vJvccHrIDlHwslVr9",
    redirectUrl: "https://academia.agenciacristal.com/confirmacion-pago",
    signature: { integrity: hashHex }
  })

  checkout.open(result => {
    console.log("Resultado del pago:", result)
    console.log("Estado del pago:", result.transaction.status)
  })
}
</script>

<template>
  <v-btn block color="yellow darken-2" size="x-large"
    class="mb-3 font-weight-bold text-uppercase"
    elevation="4"
    @click="handlePayment">
    Comprar Ahora
  </v-btn>
</template>
