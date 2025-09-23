# Icon System Setup

## Để sử dụng Icon System với icomoon font:

### 1. Thêm font icomoon vào iOS project:
- Copy file `icomoon.ttf` vào `ios/SampleApp/`
- Thêm vào `Info.plist`:
```xml
<key>UIAppFonts</key>
<array>
    <string>icomoon.ttf</string>
</array>
```

### 2. Sử dụng trong code:

```tsx
import { Icon } from '@coin98/icon-component';
import IconStorageModule from '@coin98/icon-storage-module';

// Store icon set data
const iconSet = {
  name: 'default',
  version: '1.0.0',
  icons: [
    {
      name: 'home',
      unicode: 'e900',
      tags: ['house', 'building']
    }
  ],
  metadata: {
    fontFamily: 'icomoon'
  }
};

await IconStorageModule.storeIconSet(iconSet);

// Render icon
<Icon name="home" size={24} color="#007AFF" />
```

### 3. Features:
- ✅ TurboModule để lưu trữ icon data
- ✅ Fabric Component để render icons
- ✅ Search icons theo name/tags
- ✅ Multiple icon sets support
- ✅ Fallback text khi icon không tìm thấy
- ✅ TypeScript support

### 4. Architecture:
- **IconStorageModule**: TurboModule để lưu/đọc icon data
- **IconComponent**: Fabric Component để render icons với font
- **UserDefaults**: Persistence layer cho icon data
- **JSON serialization**: Để lưu complex icon objects
