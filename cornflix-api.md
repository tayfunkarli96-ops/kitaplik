openapi: 3.0.3
info:
  title: Cornflix Film ve İçerik Yönetim API
  description: |
    Kullanıcıların filmleri keşfetmelerini, izleme listeleri oluşturmalarını ve 
    adminlerin içerik yönetimi yapmalarını sağlayan modern bir streaming platformu için Restful API.

    ## Özellikler
    - Kullanıcı Profil ve Hesap Yönetimi
    - Film ve Oyuncu Bilgi Sistemi
    - İzleme Listesi ve Favori Yönetimi
    - Admin İçerik ve Yorum Onay Sistemi
    - Akıllı Film Öneri (Quiz) Sistemi
  version: 1.0.0
  contact:
    name: Cornflix API Destek Ekibi
    email: api-support@cornflix.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.cornflix.com/v1
    description: Production server
  - url: http://localhost:3000/v1
    description: Development server

tags:
  - name: UserOperations
    description: Profil ve izleme listesi işlemleri
  - name: ContentOperations
    description: Film, oyuncu ve haber yönetim işlemleri
  - name: SocialOperations
    description: Yorum ve değerlendirme işlemleri
  - name: RecommendationOperations
    description: Quiz ve öneri sistemleri

paths:
  # 1. GEREKSİNİM: PROFİL DÜZENLEME
  /users/{id}:
    put:
      tags: [UserOperations]
      summary: 1. Profil bilgilerini düzenleme
      parameters:
        - $ref: '#/components/parameters/idParam'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserUpdate'
      responses:
        '200':
          description: Profil başarıyla güncellendi.
        '401':
          $ref: '#/components/responses/Unauthorized'

  # 2. GEREKSİNİM: FİLM GÜNCELLEME (ADMIN)
  /movies/{id}:
    put:
      tags: [ContentOperations]
      summary: 2. Film bilgilerini güncelleme (Admin)
      parameters:
        - $ref: '#/components/parameters/idParam'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MovieUpdate'
      responses:
        '200':
          description: Film detayları başarıyla güncellendi.

  # 3. GEREKSİNİM: OYUNCU/YÖNETMEN BİLGİSİ
  /people/{id}:
    get:
      tags: [ContentOperations]
      summary: 3. Oyuncu ve yönetmen detaylarını görüntüleme
      parameters:
        - $ref: '#/components/parameters/idParam'
      responses:
        '200':
          description: Kişi bilgileri başarıyla getirildi.

  # 4. GEREKSİNİM: FİLM FİLTRELEME
  /movies:
    get:
      tags: [ContentOperations]
      summary: 4. Gelişmiş film filtreleme ve arama
      parameters:
        - name: genre
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Filtrelenmiş film listesi.

  # 5. GEREKSİNİM: YORUM DÜZENLEME
  /comments/{id}:
    put:
      tags: [SocialOperations]
      summary: 5. Kullanıcının kendi yorumunu düzenlemesi
      parameters:
        - $ref: '#/components/parameters/idParam'
      responses:
        '200':
          description: Yorum başarıyla güncellendi.

  # 6. GEREKSİNİM: İZLENECEKLER LİSTESİ
  /users/{id}/watchlist:
    post:
      tags: [UserOperations]
      summary: 6. İzlenecekler listesine film ekleme
      parameters:
        - $ref: '#/components/parameters/idParam'
      responses:
        '201':
          description: Film listeye başarıyla eklendi.

  # 7. GEREKSİNİM: YORUM ONAYLAMA (ADMIN)
  /comments/{id}/approve:
    patch:
      tags: [SocialOperations]
      summary: 7. Yorumların admin tarafından onaylanması
      parameters:
        - $ref: '#/components/parameters/idParam'
      responses:
        '200':
          description: Yorum yayına alındı.

  # 8. GEREKSİNİM: FİLM ÖNERİ TESTİ (QUIZ)
  /quiz/recommend:
    post:
      tags: [RecommendationOperations]
      summary: 8. Film testi/quiz sonucuna göre öneri yapma
      responses:
        '200':
          description: Kişiselleştirilmiş öneriler getirildi.

  # 9. GEREKSİNİM: HABER DÜZENLEME (ADMIN)
  /news/{id}:
    put:
      tags: [ContentOperations]
      summary: 9. Platform haberlerini düzenleme (Admin)
      parameters:
        - $ref: '#/components/parameters/idParam'
      responses:
        '200':
          description: Haber güncellendi.

  # 10. GEREKSİNİM: ÇOKLU DİL DESTEĞİ
  /settings/language:
    get:
      tags: [UserOperations]
      summary: 10. Sistem dil seçeneklerini görüntüleme
      responses:
        '200':
          description: Mevcut diller listelendi (TR/EN).

components:
  parameters:
    idParam:
      name: id
      in: path
      required: true
      schema:
        type: integer

  responses:
    Unauthorized:
      description: Yetkisiz erişim (Giriş yapmalısınız).
    NotFound:
      description: Kayıt bulunamadı.

  schemas:
    UserUpdate:
      type: object
      properties:
        name: {type: string}
        email: {type: string}
        password: {type: string}
    
    MovieUpdate:
      type: object
      properties:
        title: {type: string}
        description: {type: string}
        rating: {type: number}
