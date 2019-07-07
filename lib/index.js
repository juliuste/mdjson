'use strict'

const unified = require('unified')
const markdown = require('remark-parse')
const disableTokenizers = require('remark-disable-tokenizers')
const toPairs = require('lodash/toPairs')
const fromPairs = require('lodash/fromPairs')

const mdjson = text => {
	if (typeof text !== 'string') throw new Error('text must be a markdown string')
	const { children } = unified()
		.use(markdown)
		// disable parsing for everything except text/paragraph and atxHeading
		.use(disableTokenizers, {
			block: [
				'indentedCode',
				'fencedCode',
				'blockquote',
				'setextHeading',
				'thematicBreak',
				'list',
				'html',
				'footnote',
				'definition',
				'table'
			],
			inline: [
				'escape',
				'autoLink',
				'url',
				'html',
				'link',
				'reference',
				'strong',
				'emphasis',
				'deletion',
				'code',
				'break'
			]
		})
		.parse(text)

	// @todo write this less imperatively
	const dictionary = {}
	let currentKey = null
	for (let child of children) {
		if (!['heading', 'paragraph'].includes(child.type)) throw new Error(`unsupported child type: ${child.type}`)
		if (child.children.some(child => child.type !== 'text')) throw new Error(`unsupported child type`)
		const content = child.children.map(c => c.value).join('')

		if (child.type === 'heading') {
			currentKey = content
			dictionary[currentKey] = []
		} else {
			if (!currentKey) continue
			dictionary[currentKey].push(content)
		}
	}

	return fromPairs(toPairs(dictionary).map(([key, strings]) => [key, strings.join('\n\n')]).filter(([key, value]) => !!key && !!value))
}

module.exports = mdjson
