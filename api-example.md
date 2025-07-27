# Cara Posting Artikel dari Luar Aplikasi

## 1. Menggunakan cURL (Terminal/Command Prompt)

```bash
curl -X POST http://localhost:5000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer Th1sIsP4ssw0rd" \
  -d '{
    "title": "Judul Artikel Anda",
    "slug": "judul-artikel-anda",
    "content": "<p>Konten artikel dalam format HTML</p>",
    "cover_image": "https://example.com/gambar.jpg",
    "category": "AI",
    "source": "Nama Sumber",
    "published_at": "2025-01-26T10:00:00Z"
  }'
```

## 2. Menggunakan Postman

1. **Method**: POST
2. **URL**: `http://localhost:5000/api/news`
3. **Headers**:
   - `Content-Type: application/json`
   - `Authorization: Bearer Th1sIsP4ssw0rd`
4. **Body** (raw JSON):
```json
{
  "title": "Judul Artikel Anda",
  "slug": "judul-artikel-anda",
  "content": "<p>Konten artikel dalam format HTML</p>",
  "cover_image": "https://example.com/gambar.jpg",
  "category": "AI",
  "source": "Nama Sumber",
  "published_at": "2025-01-26T10:00:00Z"
}
```

## 3. Menggunakan JavaScript/Node.js

```javascript
const axios = require('axios');

const createArticle = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/news', {
      title: 'Judul Artikel Anda',
      slug: 'judul-artikel-anda',
      content: '<p>Konten artikel dalam format HTML</p>',
      cover_image: 'https://example.com/gambar.jpg',
      category: 'AI',
      source: 'Nama Sumber',
      published_at: '2025-01-26T10:00:00Z'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer Th1sIsP4ssw0rd'
      }
    });
    
    console.log('Artikel berhasil dibuat:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

createArticle();
```

## 4. Menggunakan Python

```python
import requests
import json

url = 'http://localhost:5000/api/news'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer Th1sIsP4ssw0rd'
}

data = {
    'title': 'Judul Artikel Anda',
    'slug': 'judul-artikel-anda',
    'content': '<p>Konten artikel dalam format HTML</p>',
    'cover_image': 'https://example.com/gambar.jpg',
    'category': 'AI',
    'source': 'Nama Sumber',
    'published_at': '2025-01-26T10:00:00Z'
}

response = requests.post(url, headers=headers, json=data)

if response.status_code == 201:
    print('Artikel berhasil dibuat:', response.json())
else:
    print('Error:', response.json())
```

## Field yang Wajib Ada:

- **title**: Judul artikel
- **slug**: URL-friendly version dari judul (huruf kecil, tanpa spasi)
- **content**: Konten artikel dalam format HTML
- **cover_image**: URL gambar cover artikel
- **category**: Kategori artikel (AI, Hardware, Startups, Security, Software, Green Tech)
- **source**: Sumber berita
- **published_at**: Tanggal publikasi dalam format ISO

## Kategori yang Tersedia:

- **AI**: Artificial Intelligence
- **Hardware**: Perangkat keras
- **Startups**: Berita startup
- **Security**: Keamanan siber
- **Software**: Pengembangan software
- **Green Tech**: Teknologi ramah lingkungan

## Contoh Response Sukses:

```json
{
  "message": "Article created successfully",
  "article": {
    "id": 7,
    "title": "Judul Artikel Anda",
    "slug": "judul-artikel-anda",
    "content": "<p>Konten artikel dalam format HTML</p>",
    "cover_image": "https://example.com/gambar.jpg",
    "category": "AI",
    "source": "Nama Sumber",
    "published_at": "2025-01-26T10:00:00.000Z",
    "created_at": "2025-01-26T12:00:00.000Z",
    "updated_at": "2025-01-26T12:00:00.000Z"
  }
}
```

## Password Autentikasi:
**Th1sIsP4ssw0rd**

Selalu gunakan password ini dalam header Authorization sebagai Bearer token.