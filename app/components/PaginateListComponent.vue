<template>
  <div class="d-flex flex-column align-center mt-6">

    <!-- Paginación Vuetify -->
    <v-pagination
      v-model="pageModel"
      :length="myList.last_page"
      :total-visible="5"
      @update:model-value="onPageChange"
      rounded="circle"
    ></v-pagination>

    <!-- Información -->
    <p class="text-caption text-grey mt-2">
      Mostrando {{ myList.from }} - {{ myList.to }} de {{ myList.total }} registros
    </p>
  </div>
</template>

<script>
export default {
  props: {
    myList: { type: Object, required: true },
    getDataFunc: { type: Function, required: true }
  },

  computed: {
    pageModel: {
      get() {
        return this.myList.current_page;
      },
      set(val) {
        this.onPageChange(val);
      }
    }
  },

  methods: {
    onPageChange(page) {
      const url = `${this.myList.path}?page=${page}`;
      this.getDataFunc(url);
    }
  }
};
</script>
