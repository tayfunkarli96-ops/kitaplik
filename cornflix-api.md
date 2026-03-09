# API Tasarımı - OpenAPI Specification Örneği

**OpenAPI Spesifikasyon Dosyası:** [lamine.yaml](./lamine.yaml)

Bu doküman, Cornflix ekibi tarafından geliştirilen "Film ve İçerik Yönetim Platformu" projesi için OpenAPI Specification (OAS) 3.0 standardına göre hazırlanmış API tasarımını içermektedir.

## OpenAPI Specification

- **Proje Adı:** Cornflix
- **Standart:** OpenAPI 3.0.3
- **Güvenlik:** JWT (Bearer Token)
- **Dosya Yolu:** [lamine.yaml](./lamine.yaml)

### 📋 Gereksinim Karşılama Listesi

Hocamızın belirlediği 10 temel gereksinim aşağıda teknik olarak eşleştirilmiştir:

1. **Profil Düzenleme:** `/users/{userId}` (PUT)
2. **Film Güncelleme (Admin):** `/movies/{movieId}` (PUT)
3. **Oyuncu/Yönetmen Detayı:** `/people/{personId}` (GET)
4. **Film Filtreleme:** `/movies` (GET) - *Sayfalama (Pagination) destekli.*
5. **Yorum Düzenleme:** `/comments/{commentId}` (PUT)
6. **İzleme Listesi Ekleme:** `/users/{userId}/watchlist` (POST)
7. **Yorum Onaylama (Admin):** `/comments/{commentId}/approve` (PATCH)
8. **Film Öneri Quiz:** `/quiz/recommend` (POST)
9. **Haber Düzenleme (Admin):** `/news/{newsId}` (PUT)
10. **Çoklu Dil Desteği:** `/settings/languages` (GET)

---
openapi: 3.0.3
info:
  title: Cornflix Film ve İçerik Yönetim API
  description: |
    Cornflix platformu için RESTful API tasarımı.
    
    ## Özellikler
    - Kullanıcı ve Profil Yönetimi
    - Film Kataloğu ve Oyuncu Veritabanı
    - İzleme Listesi ve Favori Yönetimi
    - JWT Tabanlı Kimlik Doğrulama
    - Admin Onay Sistemi ve Haber Yönetimi
  version: 1.0.0
  contact:
    name: Cornflix API Destek Ekibi
    email: api-support@cornflix.com
    url: https://api.cornflix.com/support
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.cornflix.com/v1
    description: Production server
  - url: https://staging-api.cornflix.com/v1
    description: Staging server
  - url: http://localhost:3000/v1
    description: Development server

tags:
  - name: auth
    description: Kimlik doğrulama işlemleri
  - name: users
    description: Kullanıcı yönetimi ve profil işlemleri
  - name: movies
    description: Film kataloğu ve içerik işlemleri
  - name: community
    description: Yorum ve değerlendirme işlemleri

paths:
  /auth/login:
    post:
      tags: [auth]
      summary: Kullanıcı girişi
      description: Email ve şifre ile giriş yapar, JWT token döner.
      operationId: loginUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginCredentials'
      responses:
        '200':
          description: Giriş başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthToken'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /users/{userId}:
    put:
      tags: [users]
      summary: 1. Kullanıcı profilini güncelleme
      description: Kullanıcı bilgilerini günceller.
      operationId: updateUser
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/UserIdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserUpdate'
      responses:
        '200':
          description: Profil başarıyla güncellendi
        '400':
          $ref: '#/components/responses/BadRequest'

  /movies/{movieId}:
    put:
      tags: [movies]
      summary: 2. Film bilgilerini güncelleme (Admin)
      operationId: updateMovie
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/MovieIdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MovieUpdate'
      responses:
        '200':
          description: Film güncellendi.
        '403':
          $ref: '#/components/responses/Forbidden'

  /people/{personId}:
    get:
      tags: [movies]
      summary: 3. Oyuncu/Yönetmen detayı görüntüleme
      parameters:
        - name: personId
          in: path
          required: true
          schema: { type: string, format: uuid }
      responses:
        '200':
          description: Başarılı.

  /movies:
    get:
      tags: [movies]
      summary: 4. Gelişmiş film filtreleme
      parameters:
        - $ref: '#/components/parameters/PageParam'
        - $ref: '#/components/parameters/LimitParam'
        - name: genre
          in: query
          schema: { type: string }
      responses:
        '200':
          description: Başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MovieList'

  /comments/{commentId}:
    put:
      tags: [community]
      summary: 5. Kullanıcı yorumunu düzenleme
      security:
        - bearerAuth: []
      parameters:
        - name: commentId
          in: path
          required: true
          schema: { type: string, format: uuid }
      responses:
        '200':
          description: Yorum güncellendi.

  /users/{userId}/watchlist:
    post:
      tags: [users]
      summary: 6. İzleme listesine film ekleme
      security:
        - bearerAuth: []
      responses:
        '201':
          description: Listeye başarıyla eklendi.

  /comments/{commentId}/approve:
    patch:
      tags: [community]
      summary: 7. Yorum onaylama (Admin)
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Yorum onaylandı.

  /quiz/recommend:
    post:
      tags: [movies]
      summary: 8. Film testi (Quiz) ile öneri yapma
      responses:
        '200':
          description: Öneriler oluşturuldu.

  /news/{newsId}:
    put:
      tags: [movies]
      summary: 9. Platform haberlerini düzenleme (Admin)
      responses:
        '200':
          description: Haber güncellendi.

  /settings/languages:
    get:
      tags: [users]
      summary: 10. Çoklu dil desteği seçenekleri
      responses:
        '200':
          description: Diller listelendi.

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  parameters:
    UserIdParam:
      name: userId
      in: path
      required: true
      schema: { type: string, format: uuid }
    MovieIdParam:
      name: movieId
      in: path
      required: true
      schema: { type: string, format: uuid }
    PageParam:
      name: page
      in: query
      schema: { type: integer, minimum: 1, default: 1 }
    LimitParam:
      name: limit
      in: query
      schema: { type: integer, maximum: 100, default: 20 }

  schemas:
    UserUpdate:
      type: object
      properties:
        firstName: { type: string, example: "Ahmet" }
        lastName: { type: string, example: "Yılmaz" }
    
    LoginCredentials:
      type: object
      required: [email, password]
      properties:
        email: { type: string, format: email, example: "kullanici@example.com" }
        password: { type: string, format: password, example: "Guvenli123!" }

    AuthToken:
      type: object
      properties:
        token: { type: string, example: "eyJhbGciOiJIUzI1Ni..." }
        expiresIn: { type: integer, example: 3600 }

    MovieUpdate:
      type: object
      properties:
        title: { type: string, example: "Inception" }
        description: { type: string, example: "Rüya içinde rüya..." }

    MovieList:
      type: object
      properties:
        data:
          type: array
          items:
            type: object
            properties:
              id: { type: string, format: uuid }
              title: { type: string }
        pagination:
          $ref: '#/components/schemas/Pagination'

    Pagination:
      type: object
      properties:
        page: { type: integer, example: 1 }
        totalItems: { type: integer, example: 95 }

    Error:
      type: object
      required: [code, message]
      properties:
        code: { type: string, example: "NOT_FOUND" }
        message: { type: string, example: "Kaynak bulunamadı" }

  responses:
    BadRequest:
      description: Geçersiz istek
      content:
        application/json:
          schema: { $ref: '#/components/schemas/Error' }
    Unauthorized:
      description: Yetkisiz erişim
      content:
        application/json:
          schema: { $ref: '#/components/schemas/Error' }
    Forbidden:
      description: Erişim reddedildi
      content:
        application/json:
          schema: { $ref: '#/components/schemas/Error' }
    NotFound:
      description: Kaynak bulunamadı
      content:
        application/json:
          schema: { $ref: '#/components/schemas/Error' }
