<template>
  <div v-if="item">
    <v-row>
      <v-col cols="12">
        <div class="text-center text-h3 text-primary">{{ item.name }}</div>
      </v-col>
    </v-row>

    <div class="mb-10 d-flex justify-center">
      <v-breadcrumbs
        density="compact"
        :items="getBreadcrumbItems(item)"
        divider=":"
      ></v-breadcrumbs>
    </div>

    <v-row v-if="item.images.length">
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <div
              class="img-zoom-container container"
              @mouseover="zoom = true"
              @mouseleave="zoom = false"
            >
              <img
                style="width: 100%; height: 100%; object-fit: cover"
                id="selectedImage"
                width="300"
                :src="store.getImage(selectedImage)"
              />
              <v-btn
                v-if="item.stock == 0"
                class="ma-2 out-stock-btn"
                elevation="0"
                size="x-small"
                rounded
              >
                Out of stock
              </v-btn>
              <div
                v-show="zoom"
                id="selectedImageZoom"
                class="img-zoom-result"
              ></div>
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters class="my-1">
          <v-col
            class="mr-1"
            cols="auto"
            v-for="(image, i) in item.images"
            :key="i"
          >
            <v-img
              width="50"
              :src="store.getImage(image)"
              @click="selectImage(image)"
            ></v-img>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="8">
        <v-card variant="solo" class="d-flex">
          <v-card-text>
            <div
              class="my-1 text-indigo-darken-1 text-subtitle-1 font-weight-bold"
            >
              ${{ item.price }}
            </div>

            <v-rating
              v-model="item.rating"
              bg-color="orange-lighten-1"
              color="red"
              size="18"
            ></v-rating>

            <div class="my-5">
              Want to make your child happy? In our virtual store, you will find
              the most fun and educational toys for all ages. In addition, we
              have a wide selection of clothing and accessories so that they
              always look fashionable. Place your order now and surprise your
              little one!
            </div>

            <div class="my-5">
              <v-row no-gutters>
                <v-col cols="3" v-if="item.stock > 0">
                  <v-text-field
                    background-color="grey darken-3"
                    type="number"
                    min="1"
                    hide-details
                    density="compact"
                    v-model="amount"
                    rounded="0"
                    variant="text"
                    style="border: dashed 1px black"
                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-btn
                    v-if="item.stock > 0"
                    style="height: 42px"
                    color="red-lighten-2"
                    class="ml-1"
                    rounded="0"
                  >
                    add to cart
                  </v-btn>

                  <v-btn
                    v-else
                    icon="mdi-heart"
                    style="height: 42px; width: 120px"
                    color="red-lighten-2"
                    class="ml-1"
                    rounded="0"
                  ></v-btn>
                </v-col>
              </v-row>
            </div>

            <div class="my-7">
              Product added!
              <span class="text-primary">Browse Wishlist</span>
            </div>

            <v-card>
              <v-card-text>
                <v-table density="compact">
                  <tbody>
                    <tr>
                      <td width="150">SKU:</td>
                      <td>{{ item.id }}</td>
                    </tr>

                    <tr>
                      <td width="150">Category:</td>
                      <td>{{ item.title }}</td>
                    </tr>

                    <tr>
                      <td width="150">Tags:</td>
                      <td>Some Tag</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card variant="plain">
          <v-card-text>
            <v-tabs v-model="tabs" color="primary" align-tabs="center">
              <v-tab value="1">DESCRIPTION</v-tab>
              <v-tab value="2">ADDITIONAL INFORMATION</v-tab>
              <v-tab value="3">REVIEWS (1)</v-tab>
            </v-tabs>

            <v-window v-model="tabs">
              <v-window-item value="1" :active-class="active - tab">
                <v-card flat>
                  <v-card-text>{{ item.description }}</v-card-text>
                </v-card>
              </v-window-item>

              <v-window-item value="2">
                <v-card>
                  <v-card-text>
                    <v-table>
                      <tbody>
                        <tr>
                          <td width="150">Color:</td>
                          <td>{{ item.color }}</td>
                        </tr>

                        <tr>
                          <td width="150">Material:</td>
                          <td>{{ item.material }}</td>
                        </tr>

                        <tr>
                          <td width="150">Age:</td>
                          <td>
                            <span v-if="item.ega > 0"
                              >{{ item.age }} years</span
                            >
                            <span v-else>-1 year</span>
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-card-text>
                </v-card>
              </v-window-item>

              <v-window-item value="3">
                <v-card flat>
                  <v-card-text>Reviews</v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <related-products @updateItem="updateItem" />
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/app";
import router from "@/router/index";

import RelatedProducts from "@/components/itemDetails/RelatedProducts.vue";

const item = ref(null);
const selectedImage = ref(null);
const selectedImageZoom = ref(null);
const amount = ref(1);
const zoom = ref(false);
const tabs = ref(null);

const store = useAppStore();

const route = useRoute();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["updateItem"]);

watchEffect(() => {
  if (props.id) {
    if (store.categories) {
      const category = route.query.category;

      let data = [];

      if (category) {
        data = store.categories[category].items.find((x) => x.id == props.id);
      } else {
        const categories = Object.keys(store.categories);

        for (let _category of categories) {
          data = store.categories[_category].items.find(
            (x) => x.id == props.id
          );
          if (data) break;
        }
      }

      if (data) {
        item.value = data;
        selectedImage.value = item.value.images[0];
      }
    }
  }
});

onMounted(() => {
  loadItem();
  startZoom();
});

const loadItem = () => {
  if (!store.categories) {
    store.getCategories();
  }

  const category = route.query.category;

  let data = [];

  if (category) {
    data = store.categories[category].items.find((x) => x.id == props.id);
  } else {
    const categories = Object.keys(store.categories);

    for (let _category of categories) {
      data = store.categories[_category].items.find((x) => x.id == props.id);
      if (data) break;
    }
  }

  if (data) {
    item.value = data;
    selectedImage.value = item.value.images[0];
  }
};

const selectImage = (image) => {
  selectedImage.value = image;
  startZoom();
};

const getBreadcrumbItems = (item) => {
  let category = route.query.category;
  let title = null;

  if (category) {
    title = store.categories[category].title;
  } else {
    const categories = Object.keys(store.categories);

    for (let _category of categories) {
      const data = store.categories[_category].items.find(
        (x) => x.id == props.id
      );
      if (data) {
        title = store.categories[_category].title;
        break;
      }
    }
  }

  const data = [
    {
      title: "Home",
      disabled: false,
    },
    {
      title: title,
      disabled: false,
      to: { name: "Home" },
    },
    {
      title: item.name,
      disabled: false,
    },
  ];

  return data;
};

const startZoom = () => {
  setTimeout(() => {
    imageZoom("selectedImage", "selectedImageZoom");
  }, 1000);
};

const updateItem = (item) => {
  store.updateItem(item);
  startZoom();
};

const imageZoom = (imgID, resultID) => {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);

  /* Create lens: */
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");

  /* Insert lens: */
  img.parentElement.insertBefore(lens, img);

  /* Calculate the ratio between result DIV and lens: */
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;

  /* Set background properties for the result DIV */
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";

  /* Execute a function when someone moves the cursor over the image, or the lens: */
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);

  /* And also for touch screens: */
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);

  function moveLens(e) {
    var pos, x, y;

    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();

    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);

    /* Calculate the position of the lens: */
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;

    /* Prevent the lens from being positioned outside the image: */
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }

    if (x < 0) {
      x = 0;
    }

    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }

    if (y < 0) {
      y = 0;
    }

    /* Set the position of the lens: */
    lens.style.left = x + "px";
    lens.style.top = y + "px";

    /* Display what the lens "sees": */
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }

  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;

    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();

    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.img-zoom-container {
  position: relative;
}

.img-zoom-lens {
  position: absolute;
  border: 1px solid #d4d4d4;
  /*set the size of the lens:*/
  width: 40px;
  height: 40px;
}

.img-zoom-result {
  border: 1px solid #d4d4d4;
  /*set the size of the result div:*/
  width: 100%;
  height: 99%;
  position: absolute;
  top: 0;
  left: 110%;
  z-index: 999;
}

.container {
  position: relative;
  width: 100%;
}

.container img {
  width: 100%;
  height: auto;
}

.container .out-stock-btn {
  position: absolute;
  top: 7%;
  left: 70%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>
