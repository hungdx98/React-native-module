import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface SQLiteRow {
  [key: string]: string | number | boolean | null;
}

export interface SQLiteResult {
  rows: SQLiteRow[];
  rowsAffected: number;
  insertId?: number;
}

export interface Spec extends TurboModule {
  // WatermelonDB specific operations
  openWatermelonDatabase(): Promise<{success: boolean, path: string}>;
  getWatermelonPosts(): Promise<SQLiteResult>;
  getWatermelonPostsWithComments(): Promise<SQLiteResult>;
  getWatermelonComments(postId: string): Promise<SQLiteResult>;
  searchWatermelonPosts(searchTerm: string): Promise<SQLiteResult>;
  getWatermelonDatabaseInfo(): Promise<{
    total_posts: number;
    total_comments: number;
    tables: string[];
    schema_version: number;
  }>;
}

export default TurboModuleRegistry.get<Spec>('SQLiteModule');
