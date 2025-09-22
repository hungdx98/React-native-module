import Foundation
import SQLite3
import React

@objc(SQLiteModule)
class SQLiteModule: NSObject, RCTBridgeModule {
    
    private var databases: [String: OpaquePointer] = [:]
    
    @objc
    static func moduleName() -> String! {
        return "SQLiteModule"
    }
    
    // MARK: - Database Operations

    @objc
    func openWatermelonDatabase(
       _ resolve: @escaping RCTPromiseResolveBlock,
       rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        let paths = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)
        guard let documentsDirectory = paths.first else {
            reject("DATABASE_PATH_ERROR", "Could not find documents directory", nil)
            return
        }
        
        // WatermelonDB typically creates a database file named "watermelon.db" or similar
        // Check common WatermelonDB database paths
        let possiblePaths = [
            (documentsDirectory as NSString).appendingPathComponent("lawkred.db"),
            // (documentsDirectory as NSString).appendingPathComponent("myapp.db"),
            (documentsDirectory as NSString).appendingPathComponent("default.db")
        ]
        
        var foundPath: String?
        for path in possiblePaths {
            if FileManager.default.fileExists(atPath: path) {
                foundPath = path
                break
            }
        }
        
        guard let databasePath = foundPath else {
            reject("WATERMELON_DB_NOT_FOUND", "WatermelonDB database file not found", nil)
            return
        }
        
        var database: OpaquePointer?
        let result = sqlite3_open(databasePath, &database)
        
        if result == SQLITE_OK {
            databases["watermelon"] = database
            resolve(["success": true, "path": databasePath])
        } else {
            let errorMessage = String(cString: sqlite3_errmsg(database))
            sqlite3_close(database)
            reject("WATERMELON_DB_OPEN_ERROR", errorMessage, nil)
        }
    }
    
    // MARK: - WatermelonDB Specific Methods
    @objc
    func getWatermelonPosts(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let database = databases["watermelon"] else {
            reject("WATERMELON_DB_NOT_OPEN", "WatermelonDB not opened. Call openWatermelonDatabase first.", nil)
            return
        }
        
        let query = """
            SELECT 
                id,
                title,
                body
            FROM posts 
            WHERE _status != 'deleted'
            ORDER BY id DESC
        """
        
        executeQueryOnDatabase(database: database, query: query, params: nil, resolve: resolve, reject: reject)
    }
    
    @objc
    func getWatermelonPostsWithComments(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let database = databases["watermelon"] else {
            reject("WATERMELON_DB_NOT_OPEN", "WatermelonDB not opened. Call openWatermelonDatabase first.", nil)
            return
        }
        
        let query = """
            SELECT 
                p.id,
                p.title,
                p.body,
                COUNT(c.id) as comment_count
            FROM posts p 
            LEFT JOIN comments c ON p.id = c.post_id AND c._status != 'deleted'
            WHERE p._status != 'deleted'
            GROUP BY p.id, p.title, p.body
            ORDER BY p.id DESC
        """
        
        executeQueryOnDatabase(database: database, query: query, params: nil, resolve: resolve, reject: reject)
    }
    
    @objc func getWatermelonComments(
        _ postId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let database = databases["watermelon"] else {
            reject("WATERMELON_DB_NOT_OPEN", "WatermelonDB not opened. Call openWatermelonDatabase first.", nil)
            return
        }
        
        let query = """
            SELECT 
                id,
                body,
                post_id,
                _status
            FROM comments 
            WHERE post_id = ? AND _status != 'deleted'
            ORDER BY id ASC
        """
        
        executeQueryOnDatabase(database: database, query: query, params: [postId], resolve: resolve, reject: reject)
    }
    
    @objc func searchWatermelonPosts(
        _ searchTerm: String,
        resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let database = databases["watermelon"] else {
            reject("WATERMELON_DB_NOT_OPEN", "WatermelonDB not opened. Call openWatermelonDatabase first.", nil)
            return
        }
        
        let query = """
            SELECT 
                id,
                title,
                body
            FROM posts 
            WHERE _status != 'deleted' 
                AND (title LIKE ? OR body LIKE ?)
            ORDER BY id DESC
        """
        
        let searchPattern = "%\(searchTerm)%"
        executeQueryOnDatabase(database: database, query: query, params: [searchPattern, searchPattern], resolve: resolve, reject: reject)
    }
    
    @objc
    func getWatermelonDatabaseInfo(
        _ resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let database = databases["watermelon"] else {
            reject("WATERMELON_DB_NOT_OPEN", "WatermelonDB not opened. Call openWatermelonDatabase first.", nil)
            return
        }
        
        let queries = [
            "SELECT COUNT(*) as total_posts FROM posts WHERE _status != 'deleted'",
            "SELECT COUNT(*) as total_comments FROM comments WHERE _status != 'deleted'",
            "SELECT name FROM sqlite_master WHERE type='table'",
            "PRAGMA user_version"
        ]
        
        var results: [String: Any] = [:]
        var completed = 0
        let totalQueries = queries.count
        
        for (index, query) in queries.enumerated() {
            executeQueryOnDatabase(database: database, query: query, params: nil, resolve: { result in
                if let resultDict = result as? [String: Any],
                   let rows = resultDict["rows"] as? [[String: Any]] {
                    switch index {
                    case 0:
                        if let firstRow = rows.first {
                            results["total_posts"] = firstRow["total_posts"]
                        }
                    case 1:
                        if let firstRow = rows.first {
                            results["total_comments"] = firstRow["total_comments"]
                        }
                    case 2:
                        results["tables"] = rows.map { $0["name"] }
                    case 3:
                        if let firstRow = rows.first {
                            results["schema_version"] = firstRow["user_version"]
                        }
                    default:
                        break
                    }
                }
                completed += 1
                if completed == totalQueries {
                    resolve(results)
                }
            }, reject: reject)
        }
    }
    
    // Helper method to execute queries on a specific database
    private func executeQueryOnDatabase(
        database: OpaquePointer,
        query: String,
        params: [Any]?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        var statement: OpaquePointer?
        let result = sqlite3_prepare_v2(database, query, -1, &statement, nil)
        
        guard result == SQLITE_OK else {
            let errorMessage = String(cString: sqlite3_errmsg(database))
            reject("QUERY_PREPARE_ERROR", errorMessage, nil)
            return
        }
        
        // Bind parameters
        if let params = params {
            for (index, param) in params.enumerated() {
                let bindIndex = Int32(index + 1)
                
                if param is NSNull {
                    sqlite3_bind_null(statement, bindIndex)
                } else if let stringParam = param as? String {
                    sqlite3_bind_text(statement, bindIndex, stringParam, -1, nil)
                } else if let numberParam = param as? NSNumber {
                    if CFNumberIsFloatType(numberParam) {
                        sqlite3_bind_double(statement, bindIndex, numberParam.doubleValue)
                    } else {
                        sqlite3_bind_int64(statement, bindIndex, numberParam.int64Value)
                    }
                } else if let boolParam = param as? Bool {
                    sqlite3_bind_int(statement, bindIndex, boolParam ? 1 : 0)
                }
            }
        }
        
        var rows: [[String: Any]] = []
        let columnCount = sqlite3_column_count(statement)
        
        while sqlite3_step(statement) == SQLITE_ROW {
            var row: [String: Any] = [:]
            
            for i in 0..<columnCount {
                let columnName = String(cString: sqlite3_column_name(statement, i))
                let columnType = sqlite3_column_type(statement, i)
                
                let value: Any
                switch columnType {
                case SQLITE_INTEGER:
                    value = sqlite3_column_int64(statement, i)
                case SQLITE_FLOAT:
                    value = sqlite3_column_double(statement, i)
                case SQLITE_TEXT:
                    if let text = sqlite3_column_text(statement, i) {
                        value = String(cString: text)
                    } else {
                        value = ""
                    }
                case SQLITE_NULL:
                    value = NSNull()
                default:
                    value = NSNull()
                }
                
                row[columnName] = value
            }
            
            rows.append(row)
        }
        
        let changes = sqlite3_changes(database)
        let lastInsertId = sqlite3_last_insert_rowid(database)
        
        sqlite3_finalize(statement)
        
        let result_dict: [String: Any] = [
            "rows": rows,
            "rowsAffected": changes,
            "insertId": lastInsertId
        ]
        
        resolve(result_dict)
    }
}
