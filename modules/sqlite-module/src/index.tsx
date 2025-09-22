import NativeSQLiteModule, { SQLiteRow, SQLiteResult } from './NativeSQLiteModule';

class SQLiteModule {
  private static instance: SQLiteModule;
  
  public static getInstance(): SQLiteModule {
    if (!SQLiteModule.instance) {
      SQLiteModule.instance = new SQLiteModule();
    }
    return SQLiteModule.instance;
  }

  /**
   * Open the WatermelonDB database for direct reading
   */
  async openWatermelonDatabase(): Promise<{success: boolean, path: string}> {
    console.log('NativeSQLiteModule available methods:', Object.keys(NativeSQLiteModule || {}));
    console.log('NativeSQLiteModule object:', NativeSQLiteModule);
    
    if (!NativeSQLiteModule) {
      throw new Error('SQLiteModule is not available');
    }
    
    if (!NativeSQLiteModule.openWatermelonDatabase) {
      throw new Error('openWatermelonDatabase method is not available');
    }
    
    console.log('Opening WatermelonDB database NativeSQLiteModule...', NativeSQLiteModule);
    return await NativeSQLiteModule.openWatermelonDatabase();
  }

  /**
   * Get all posts from WatermelonDB
   */
  async getWatermelonPosts(): Promise<SQLiteRow[]> {
    if (!NativeSQLiteModule) {
      throw new Error('SQLiteModule is not available');
    }
    const result = await NativeSQLiteModule.getWatermelonPosts();
    return result.rows;
  }

  /**
   * Get posts with comment counts from WatermelonDB
   */
  async getWatermelonPostsWithComments(): Promise<SQLiteRow[]> {
    if (!NativeSQLiteModule) {
      throw new Error('SQLiteModule is not available');
    }
    const result = await NativeSQLiteModule.getWatermelonPostsWithComments();
    return result.rows;
  }

  /**
   * Get comments for a specific post from WatermelonDB
   */
  async getWatermelonComments(postId: string): Promise<SQLiteRow[]> {
    if (!NativeSQLiteModule) {
      throw new Error('SQLiteModule is not available');
    }
    const result = await NativeSQLiteModule.getWatermelonComments(postId);
    return result.rows;
  }

  /**
   * Search posts in WatermelonDB
   */
  async searchWatermelonPosts(searchTerm: string): Promise<SQLiteRow[]> {
    if (!NativeSQLiteModule) {
      throw new Error('SQLiteModule is not available');
    }
    const result = await NativeSQLiteModule.searchWatermelonPosts(searchTerm);
    return result.rows;
  }

  /**
   * Get WatermelonDB database information
   */
  async getWatermelonDatabaseInfo(): Promise<{
    total_posts: number;
    total_comments: number;
    tables: string[];
    schema_version: number;
  }> {
    if (!NativeSQLiteModule) {
      throw new Error('SQLiteModule is not available');
    }
    return await NativeSQLiteModule.getWatermelonDatabaseInfo();
  }
}

export default SQLiteModule.getInstance();
export type { SQLiteRow, SQLiteResult };
