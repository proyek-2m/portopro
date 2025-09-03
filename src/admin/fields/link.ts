import { linkCollection } from '$payload-libs/link-utils'
import type { Page, Portofolio, Post, PostCategory, Reusable } from '$payload-types'
import type { AfterReadHook } from 'node_modules/payload/dist/collections/config/types'
import type { Field } from 'payload'

export const linkField: Field = {
	name: 'link',
	type: 'text',
	virtual: true,
	admin: {
		readOnly: true,
		components: {
			Field: {
				path: '$payload-fields/components/link#LinkField',
			},
		},
	},
}

export const afterReadHookLink: AfterReadHook<
	Page | Post | PostCategory | Portofolio | Reusable
> = ({ doc, collection }) => {
	const post = {
		link: linkCollection({
			collection: collection.slug,
			doc,
		}),
		...doc,
	}

	return post
}
