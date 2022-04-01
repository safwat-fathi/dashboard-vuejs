import { darkModeKey, styleKey } from '@/config.js'
import axios from 'axios'
import * as styles from '@/styles.js'

export default {
	setStyle ({ commit, dispatch }, payload) {
		const style = styles[payload] ?? styles.basic

		document.body.className = style.body
		document.documentElement.className = style.html

		if (localStorage[styleKey] !== payload) {
			localStorage.setItem(styleKey, payload)
		}

		commit('styles', style)
	},

	asideMobileToggle ({ commit, state }, payload = null) {
		const isShow = payload !== null ? payload : !state.isAsideMobileExpanded

		document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60', 'lg:ml-0')

		document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

		commit('basic', {
			key: 'isAsideMobileExpanded',
			value: isShow
		})
	},

	asideLgToggle ({ commit, state }, payload = null) {
		commit('basic', { key: 'isAsideLgActive', value: payload !== null ? payload : !state.isAsideLgActive })
	},

	fullScreenToggle ({ commit, state }, value) {
		commit('basic', { key: 'isFullScreen', value })

		document.documentElement.classList[value ? 'add' : 'remove']('full-screen')
	},

	darkMode ({ commit, state }, payload = null) {
		const value = payload !== null ? payload : !state.darkMode

		document.documentElement.classList[value ? 'add' : 'remove']('dark')

		localStorage.setItem(darkModeKey, value ? '1' : '0')

		commit('basic', {
			key: 'darkMode',
			value
		})
	},

	fetch ({ commit }, payload) {
		axios
			.get(`data-sources/${payload}.json`)
			.then((r) => {
				if (r.data && r.data.data) {
					commit('basic', {
						key: payload,
						value: r.data.data
					})
				}
			})
			.catch(error => {
				alert(error.message)
			})
	}
}