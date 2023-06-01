// Utilities
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import resources from "@/utils/resources.json"
import router from '@/router'

export const useAppStore = defineStore('app', {
  state: () => ({
    // drawer state
    drawer: true,

    // all category list
    categories: null,

    // Selected items from categories
    categoryItems: [],

    // Selected category
    selectedCategory: null,

    // Selected category title
    selectedCategoryTitle: null,
    
    // Route
    route: useRoute()
  }),

  actions: {
    getCategories() {
      // Gets the categories from JSON file
      this.selectedCategory = null
      this.selectedCategoryTitle = null
      this.categories = resources
    },

    getCategoryItems(category) {
      // Gets the items of the selected category
      if (category) {
        this.selectedCategory = category
        this.selectedCategoryTitle = this.categories[category].title
        this.categoryItems = this.categories[category].items
      }
    },

    updateItem(item) {
      // Update the item selected
      const category = this.route.query.category

      router.push({
        name: "ItemDetail",
        params: { id: item.id },
        query: { category: category },
      });
    },

    getImage(fileName) {
      try {
        const modules = import.meta.glob('@/assets/**/*.{png,svg,jpg}', { eager: true })
        const moduleKeys = Object.keys(modules)
        const fileSrc = moduleKeys.find(key => key.includes(fileName))
    
        return fileSrc ? modules[fileSrc].default : ''
      } catch (err) {
        console.log(err)
      }
    }
  }
})
