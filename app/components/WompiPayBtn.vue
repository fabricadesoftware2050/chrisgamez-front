<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { push } from 'notivue'
const showLoginModal = useLoginModal();
const currentSession = useSession();
const props = defineProps({
  curso: { type: Object, required: true }
})

const moneda = "COP"
const monto = ref(0)
const referencia = ref("")
const signatureText = ref("")
const widgetReady = ref(false)
const loading = ref(false);
const token = ref('')
const token_type = ref('')
onMounted(() => {
  if (!process.client) return

  
  // Asignar valores
  monto.value = parseInt(props.curso?.precio_actual)*100 // en centavos
  const miRef = crypto.randomUUID()
  referencia.value = `${props.curso?.id}-${currentSession.value?.user_id}-${miRef}`

  // Crear texto para firma
  const secret = "test_integrity_O4q6TAvX7XrInK5tfWHdXxRT2tL0T6GA"
  //const secret = "prod_integrity_d2JyGsbZeEXpk44tfd9AcsZDidZEi7Qm"
  signatureText.value = `${referencia.value}${monto.value}${moneda}${secret}`

console.log("Texto para firma:", signatureText.value)
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
  if (!process.client) return
      token.value = localStorage.getItem('token') || ''
      token_type.value = localStorage.getItem('token_type') || ''
try{
      currentSession.value = await jwtDecode(token.value) 
}catch(e){
  currentSession.value = {}
}
      console.log("Sesión actual:", currentSession.value)
    
  if(currentSession.value?.name == null){
    showLoginModal.value = true;
    return;
  }
  if (!widgetReady.value) {
    alert("Cargando pasarela…")
    return
  }

  loading.value = true;
  // Crear firma SHA-256
const encondedText = new TextEncoder().encode(signatureText.value);
const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
const hashArray = Array.from(new Uint8Array(hashBuffer));
const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  // Crear checkout
  const checkout = new window.WidgetCheckout({
    currency: moneda,
    amountInCents: monto.value,
    reference: referencia.value,
    publicKey: "pub_test_jao85xojssDWrtxy5y47eDVwztdncXOk",
    //publicKey: "pub_prod_lgpBi94hzAoBqn5vJvccHrIDlHwslVr9",
    signature: { integrity: hashHex }
  })

  checkout.open(result => {
    console.log("Resultado del pago:", result)
    console.log("Estado del pago:", result.transaction.status)
    if (result.transaction.status === "APPROVED") {
    //window.location.href = "/escritorio"
    
    savePayment(result).then(() => {
      loading.value = false;
       push.success({ title: 'Pago OK!', message: '¡Gracias por tu compra! El pago fue procesado correctamente.', duration: 3000 })
      navigateTo('/escritorio');
      loading.value = false;
    }).catch((error) => {
      console.error("Error guardando el pago:", error)
       push.error({ title: 'Upps!', message: 'Error e el pago', duration: 3000 })
    })
  } else {
    push.error({ title: 'Upps!', message: 'No se logró el pago', duration: 3000 })
  }
  })
}

const savePayment = async(paymentData) => {
  loading.value = true;
  // Aquí puedes enviar paymentData al backend para guardarlo en la base de datos
  console.log("Guardando pago en el backend:", paymentData)
  const { data } = await axios.post(URL_BASE_API + '/v1/public/pagos', {
                user_id: currentSession.value?.user_id,
                course_id: props.curso?.id,
                price: monto.value / 100,
                status: paymentData.transaction.status,
                id_transaction: paymentData.transaction.id,
                reference: referencia.value,
                detalle: JSON.stringify(paymentData)
            },{
              headers: {
        Authorization: `${localStorage.getItem('token_type') || 'Bearer'} ${localStorage.getItem('token') || ''}`
      }
            })
            loading.value = false;
console.log("Pago guardado en el backend:", data)
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
