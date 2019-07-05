'use strict'

const unified = require('unified')
const markdown = require('remark-parse')
const toPairs = require('lodash/toPairs')
const fromPairs = require('lodash/fromPairs')

const mdjson = text => {
	if (typeof text !== 'string') throw new Error('text must be a markdown string')
	const { children } = unified().use(markdown).parse(text)

	// @todo write this less imperatively
	const dictionary = {}
	let currentKey = null
	for (let child of children) {
		if (!['heading', 'paragraph'].includes(child.type)) throw new Error(`unsupported child type: ${child.type}`)
		if (child.type === 'heading') {
			currentKey = child.children[0].value || null
		} else {
			if (!currentKey) continue
			if (!dictionary[currentKey]) dictionary[currentKey] = []
			dictionary[currentKey].push(child.children[0].value)
		}
	}

	return fromPairs(toPairs(dictionary).map(([key, strings]) => [key, strings.join('\n\n')]).filter(([key, value]) => !!key))
}

module.exports = mdjson
