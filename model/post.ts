import { Model } from '@nozbe/watermelondb'
import { text } from '@nozbe/watermelondb/decorators'

export default class Post extends Model {
    static table = 'posts'

    @text('title') title!: string
    @text('body') body!: string
}