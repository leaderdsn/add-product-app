import Vue from 'vue'
import AppSvgIcon from '@/components/AppSvgIcon.vue'

// Register a global component, form a named SVG-ICON
Vue.component('AppSvgIcon', AppSvgIcon)

// Reference SVG icon
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/svg', true, /\.svg$/)
requireAll(req)
