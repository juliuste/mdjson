const path = require('path')
const test = require('tape')
const fs = require('fs')

const mdjson = require('..')

test('throws with invalid input', t => {
	t.throws(() => mdjson(/not a string/))
	t.end()
})

test('works with simple markdown', t => {
	const markdown = fs.readFileSync(path.resolve(__dirname, 'text.md'), { encoding: 'utf-8' })
	const dictionary = mdjson(markdown)
	t.deepLooseEqual(dictionary, {
		'my heading': 'oh wow, amazing',
		'another heading': 'gorgeous copy, stunning `details` and [a link](https://www.web.com)'
	})
	t.end()
})

test('works with multiple paragraphs', t => {
	const markdown = fs.readFileSync(path.resolve(__dirname, 'text-multi.md'), { encoding: 'utf-8' })
	const dictionary = mdjson(markdown)
	t.deepEqual(dictionary, {
		'first heading': '  Hi there!\n\nThis content runs over multiple lines...',
		'second heading': 'As does this one.\n\nYup.\n\nWith even more whitespace :O'
	})
	t.end()
})

test('ignores text before headings and headings without text', t => {
	const markdown = fs.readFileSync(path.resolve(__dirname, 'ignored.md'), { encoding: 'utf-8' })
	const dictionary = mdjson(markdown)
	t.deepEqual(dictionary, {
		'Main Content': 'Goes here'
	})
	t.end()
})
