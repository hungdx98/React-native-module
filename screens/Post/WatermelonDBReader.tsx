/* eslint-disable react-hooks/exhaustive-deps */
// WatermelonDBReader.tsx - Component to read WatermelonDB data using SQLite TurboModule
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    Alert,
    ScrollView,
    RefreshControl,
    TextInput,
} from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/react';
import Post from '../../model/Post';
import SQLiteModule from '@coin98/sqlite-module';

interface WatermelonPost {
    id: string;
    title: string;
    subtitle?: string | null;
    body: string;
    is_pinned: boolean;
    created_at: string;
    updated_at: string;
    comment_count?: number | null;
}

interface WatermelonComment {
    id: string;
    body: string;
    post_id: string;
    created_at: string;
    updated_at: string;
}

interface DatabaseInfo {
    total_posts: number;
    total_comments: number;
    tables: string[];
    schema_version: number;
}

const WatermelonDBReader = () => {
    const database = useDatabase();
    const postsCollection = database.get<Post>('posts');

    // WatermelonDB direct reading states
    const [watermelonPosts, setWatermelonPosts] = useState<WatermelonPost[]>([]);
    const [postsWithComments, setPostsWithComments] = useState<WatermelonPost[]>([]);
    const [selectedPostComments, setSelectedPostComments] = useState<WatermelonComment[]>([]);
    const [searchResults, setSearchResults] = useState<WatermelonPost[]>([]);
    const [databaseInfo, setDatabaseInfo] = useState<DatabaseInfo | null>(null);

    // UI states
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [databasePath, setDatabasePath] = useState<string>('');
    const [isWatermelonDbOpen, setIsWatermelonDbOpen] = useState(false);



    useEffect(() => {
        const initDB = async () => {
            try {
                setIsLoading(true);
                const result = await SQLiteModule.openWatermelonDatabase();
                setDatabasePath(result.path);
                setIsWatermelonDbOpen(result.success);

                if (result.success) {
                    await loadAllData();
                }
            } catch (error) {
                console.error('Failed to initialize WatermelonDB reader:', error);
                Alert.alert('Initialization Error', 'Failed to open WatermelonDB for reading');
            } finally {
                setIsLoading(false);
            }
        };

        const loadAllData = async () => {
            try {
                await Promise.all([
                    loadWatermelonPosts(),
                    loadPostsWithComments(),
                    loadDatabaseInfo(),
                ]);
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        };

        const loadWatermelonPosts = async () => {
            try {
                const posts = await SQLiteModule.getWatermelonPosts();
                setWatermelonPosts(posts as unknown as WatermelonPost[]);
            } catch (error) {
                console.error('Failed to load WatermelonDB posts:', error);
            }
        };

        const loadPostsWithComments = async () => {
            try {
                const posts = await SQLiteModule.getWatermelonPostsWithComments();
                setPostsWithComments(posts as unknown as WatermelonPost[]);
            } catch (error) {
                console.error('Failed to load posts with comments:', error);
            }
        };

        const loadDatabaseInfo = async () => {
            try {
                const info = await SQLiteModule.getWatermelonDatabaseInfo();
                setDatabaseInfo(info);
            } catch (error) {
                console.error('Failed to load database info:', error);
            }
        };

        initDB();
    }, []);

    const loadAllData = async () => {
        try {
            await Promise.all([
                loadWatermelonPosts(),
                loadPostsWithComments(),
                loadDatabaseInfo(),
            ]);
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    };

    const loadWatermelonPosts = async () => {
        try {
            const posts = await SQLiteModule.getWatermelonPosts();
            console.log('Loaded WatermelonDB posts:', posts);
            setWatermelonPosts(posts as unknown as WatermelonPost[]);
        } catch (error) {
            console.error('Failed to load WatermelonDB posts:', error);
        }
    };

    const loadPostsWithComments = async () => {
        try {
            const posts = await SQLiteModule.getWatermelonPostsWithComments();
            setPostsWithComments(posts as unknown as WatermelonPost[]);
        } catch (error) {
            console.error('Failed to load posts with comments:', error);
        }
    };

    const loadDatabaseInfo = async () => {
        try {
            const info = await SQLiteModule.getWatermelonDatabaseInfo();
            setDatabaseInfo(info);
        } catch (error) {
            console.error('Failed to load database info:', error);
        }
    };

    const searchPosts = async () => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            const results = await SQLiteModule.searchWatermelonPosts(searchTerm);
            setSearchResults(results as unknown as WatermelonPost[]);
        } catch (error) {
            console.error('Failed to search posts:', error);
            Alert.alert('Search Error', 'Failed to search posts');
        }
    };

    const loadCommentsForPost = async (postId: string) => {
        try {
            const comments = await SQLiteModule.getWatermelonComments(postId);
            setSelectedPostComments(comments as unknown as WatermelonComment[]);
        } catch (error) {
            console.error('Failed to load comments:', error);
            Alert.alert('Error', 'Failed to load comments for this post');
        }
    };

    const addSamplePost = async () => {
        try {
            await database.write(async () => {
                await postsCollection.create(post => {
                    post.title = `Sample Post ${new Date().getTime()}`;
                    post.body = `This is a sample post created at ${new Date().toISOString()}`;
                });
            });

            // Refresh data after adding
            await loadAllData();
            Alert.alert('Success', 'Sample post added successfully!');
        } catch (error) {
            console.error('Failed to add sample post:', error);
            Alert.alert('Error', 'Failed to add sample post');
        }
    };

    const onRefresh = async () => {
        setIsLoading(true);
        await loadAllData();
        setIsLoading(false);
    };

    const renderPost = ({ item }: { item: WatermelonPost }) => (
        <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            {item.subtitle && <Text style={styles.postSubtitle}>{item.subtitle}</Text>}
            <Text style={styles.postBody} numberOfLines={2}>{item.body}</Text>
            <View style={styles.postMeta}>
                <Text style={styles.metaText}>
                    Created: {new Date(item.created_at).toLocaleDateString()}
                </Text>
                {item.comment_count !== undefined && (
                    <Text style={styles.metaText}>
                        Comments: {item.comment_count}
                    </Text>
                )}
                {item.is_pinned && <Text style={styles.pinnedText}>📌 Pinned</Text>}
            </View>
            <Button
                title="Load Comments"
                onPress={() => loadCommentsForPost(item.id)}
            />
        </View>
    );

    const renderComment = ({ item }: { item: WatermelonComment }) => (
        <View style={styles.commentItem}>
            <Text style={styles.commentBody}>{item.body}</Text>
            <Text style={styles.commentMeta}>
                {new Date(item.created_at).toLocaleDateString()}
            </Text>
        </View>
    );

    const renderSearchResult = ({ item }: { item: WatermelonPost }) => (
        <View style={styles.searchItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postBody} numberOfLines={2}>{item.body}</Text>
        </View>
    );

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>WatermelonDB Reader</Text>
                <Text style={styles.headerSubtitle}>
                    Status: {isWatermelonDbOpen ? '🟢 Connected' : '🔴 Disconnected'}
                </Text>
                <Text style={styles.pathText} numberOfLines={1}>
                    Path: {databasePath}
                </Text>
            </View>

            {/* Database Info */}
            {databaseInfo && (
                <View style={styles.infoCard}>
                    <Text style={styles.sectionTitle}>Database Information</Text>
                    <Text>Total Posts: {databaseInfo.total_posts}</Text>
                    <Text>Total Comments: {databaseInfo.total_comments}</Text>
                    <Text>Schema Version: {databaseInfo.schema_version}</Text>
                    <Text>Tables: {databaseInfo.tables.join(', ')}</Text>
                </View>
            )}

            {/* Actions */}
            <View style={styles.actionsRow}>
                <Button title="Add Sample Post" onPress={addSamplePost} />
                <Button title="Refresh Data" onPress={onRefresh} />
            </View>

            {/* Search */}
            <View style={styles.searchSection}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search posts in WatermelonDB..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onSubmitEditing={searchPosts}
                />
                <Button title="Search" onPress={searchPosts} />
            </View>

            {/* Search Results */}
            {searchResults.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Search Results ({searchResults.length})
                    </Text>
                    <FlatList
                        data={searchResults}
                        keyExtractor={item => `search-${item.id}`}
                        renderItem={renderSearchResult}
                        scrollEnabled={false}
                    />
                </View>
            )}

            {/* Posts with Comment Counts */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Posts with Comment Counts ({postsWithComments.length})
                </Text>
                <FlatList
                    data={postsWithComments}
                    keyExtractor={item => `with-comments-${item.id}`}
                    renderItem={renderPost}
                    scrollEnabled={false}
                />
            </View>

            {/* Regular Posts */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    All Posts ({watermelonPosts.length})
                </Text>
                <FlatList
                    data={watermelonPosts}
                    keyExtractor={item => `post-${item.id}`}
                    renderItem={renderPost}
                    scrollEnabled={false}
                />
            </View>

            {/* Comments for Selected Post */}
            {selectedPostComments.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Comments for Post ({selectedPostComments.length})
                    </Text>
                    <FlatList
                        data={selectedPostComments}
                        keyExtractor={item => `comment-${item.id}`}
                        renderItem={renderComment}
                        scrollEnabled={false}
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    pathText: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    infoCard: {
        backgroundColor: 'white',
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 8,
        elevation: 1,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 8,
        elevation: 1,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        marginRight: 8,
    },
    section: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 8,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    postItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    postSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    postBody: {
        fontSize: 14,
        color: '#444',
        marginBottom: 8,
    },
    postMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    metaText: {
        fontSize: 12,
        color: '#666',
    },
    pinnedText: {
        fontSize: 12,
        color: '#e74c3c',
        fontWeight: 'bold',
    },
    commentItem: {
        padding: 12,
        marginLeft: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fafafa',
    },
    commentBody: {
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
    },
    commentMeta: {
        fontSize: 12,
        color: '#666',
    },
    searchItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#f9f9f9',
    },
});

export default WatermelonDBReader;
