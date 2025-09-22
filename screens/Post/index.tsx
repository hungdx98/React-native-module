// PostsList.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useDatabase } from '@nozbe/watermelondb/react'
import Post from '../../model/Post'

const PostsList = () => {
    const database = useDatabase()
    const postsCollection = database.get<Post>('posts')
    const [posts, setPosts] = useState<Post[]>([])

    // Quan sát dữ liệu posts
    useEffect(() => {
        const subscription = postsCollection.query().observe().subscribe(setPosts)
        return () => subscription.unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Thêm Post mới
    const addPost = async () => {
        await database.write(async () => {
            await postsCollection.create(post => {
                post.title = 'Hello ' + new Date().toLocaleTimeString()
                post.body = 'This is a new post'
            })
        })
    }

    // Xoá Post
    const deletePost = async (post: Post) => {
        await database.write(async () => {
            // Xoá logic để sync, muốn xoá hẳn dùng: await post.destroyPermanently()
            await post.markAsDeleted()
        })
    }


    const renderItem = ({ item }: { item: Post }) => (
        <View style={styles.item}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.body}</Text>
            </View>
            <TouchableOpacity onPress={() => deletePost(item)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <Button title="Add Post" onPress={addPost} />
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    title: { fontWeight: 'bold' },
    deleteButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#e74c3c',
        borderRadius: 4,
        marginLeft: 10,
    },
    deleteText: { color: 'white', fontWeight: 'bold' },
})

export default PostsList
