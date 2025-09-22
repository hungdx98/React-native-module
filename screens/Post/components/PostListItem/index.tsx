// PostListItem.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import withObservables from '@nozbe/with-observables'
import Post from '../../../../model/Post'

type Props = {
    post: Post
}

const PostListItem = ({ post }: Props) => (
    <View style={styles.item}>
        <Text style={styles.title}>{post.title}</Text>
        <Text>{post.body}</Text>
    </View>
)

const styles = StyleSheet.create({
    item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
    title: { fontWeight: 'bold' },
})

// wrap với withObservables để tự update khi DB thay đổi
export default withObservables(['post'], ({ post }) => ({
    post,
}))(PostListItem)
